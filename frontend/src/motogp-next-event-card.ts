import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./shared/styles";
import {
  formatCountdown,
  filterByClasses,
  groupScheduleByDay,
  nextSessionIndex,
  type ScheduleItem,
} from "./shared/format";
import { CLASS_COLORS } from "./shared/team-colors";
import type { HomeAssistant, NextEventCardConfig, ClassAcronym } from "./shared/types";

const KIND_MARK: Record<string, string> = { RACE: "🏁", SPRINT: "⚡" };

function flagEmoji(code?: string): string {
  if (!code || code.length !== 2) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => A + c.charCodeAt(0) - 65),
  );
}

@customElement("motogp-next-event-card")
export class MotoGPNextEventCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: NextEventCardConfig;
  private _timer?: number;

  static getStubConfig(): NextEventCardConfig {
    return { type: "custom:motogp-next-event-card", entity: "sensor.motogp_next_event" };
  }

  static async getConfigElement() {
    await import("./editors/next-event-card-editor");
    return document.createElement("motogp-next-event-card-editor");
  }

  setConfig(config: NextEventCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      entity: "sensor.motogp_next_event",
      show_circuit: true,
      show_countdown: true,
      ...config,
    };
  }

  getCardSize() { return 6; }

  connectedCallback() {
    super.connectedCallback();
    // Live countdown tick.
    this._timer = window.setInterval(() => this.requestUpdate(), 1000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const ent = this.hass.states[this._config.entity ?? "sensor.motogp_next_event"];
    if (!ent || ent.state === "unavailable" || ent.state === "unknown") {
      return html`<ha-card><div class="empty">MotoGP next-event sensor unavailable.</div></ha-card>`;
    }
    const a = ent.attributes;
    const ci = a.circuit_info ?? {};
    const name = a.name ?? "Next Grand Prix";
    const countdown =
      this._config.show_countdown !== false && a.date_start
        ? formatCountdown(a.date_start)
        : "";
    const schedule: ScheduleItem[] = filterByClasses(
      (a.schedule ?? []) as ScheduleItem[],
      this._config.classes as ClassAcronym[] | undefined,
    );
    const nextIdx = nextSessionIndex(schedule);
    const groups = groupScheduleByDay(schedule, this.hass.locale?.language);
    let flatIdx = 0;

    return html`
      <ha-card>
        ${this._config.title ? html`<div class="title">${this._config.title}</div>` : nothing}
        <div class="header">
          <span class="flag">${flagEmoji(ci.country_code)}</span>
          <span class="title">${name}</span>
          ${countdown ? html`<span class="countdown">${countdown}</span>` : nothing}
        </div>
        <div class="sub">
          ${a.circuit ?? ""}${a.city ? `, ${a.city}` : ""}
        </div>
        ${this._config.show_circuit !== false ? this._circuit(ci) : nothing}
        ${schedule.length === 0
          ? html`<div class="empty">Schedule not available yet.</div>`
          : groups.map(
              (g) => html`
                <div class="day">${g.label}</div>
                ${g.items.map((s) => {
                  const isNext = flatIdx++ === nextIdx;
                  return html`
                    <div class="row ${isNext ? "next" : ""}">
                      <span class="time">
                        ${new Date(s.start).toLocaleTimeString(
                          this.hass!.locale?.language,
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </span>
                      <span class="chip" style="background:${CLASS_COLORS[s.class]}"
                        >${s.class}</span
                      >
                      <span class="session">${KIND_MARK[s.kind] ?? ""} ${s.session}</span>
                    </div>
                  `;
                })}
              `,
            )}
      </ha-card>
    `;
  }

  private _circuit(ci: Record<string, any>) {
    const pills: string[] = [];
    if (ci.length_km) pills.push(`${ci.length_km} km`);
    if (ci.corners) pills.push(`${ci.corners} corners (${ci.left_corners ?? 0}L/${ci.right_corners ?? 0}R)`);
    if (ci.longest_straight_m) pills.push(`${ci.longest_straight_m} m straight`);
    if (ci.width_m) pills.push(`${ci.width_m} m wide`);
    if (ci.designer) pills.push(`${ci.designer}`);
    if (ci.constructed) pills.push(`Built ${ci.constructed}`);
    if (pills.length === 0) return nothing;
    return html`<div class="pills">${pills.map((p) => html`<span class="pill">${p}</span>`)}</div>`;
  }
}
