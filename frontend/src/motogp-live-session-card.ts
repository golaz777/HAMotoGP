import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./shared/styles";
import {
  formatCountdown,
  filterByClasses,
  nextSessionIndex,
  type ScheduleItem,
} from "./shared/format";
import { CLASS_COLORS } from "./shared/team-colors";
import type { HomeAssistant, LiveSessionCardConfig, ClassAcronym } from "./shared/types";

const KIND_MARK: Record<string, string> = { RACE: "🏁", SPRINT: "⚡" };

interface SessionSummary {
  class: ClassAcronym;
  class_name?: string;
  session: string;
  kind: string;
  start: string;
  end: string;
  num_laps?: number | null;
}

@customElement("motogp-live-session-card")
export class MotoGPLiveSessionCard extends LitElement {
  static styles = [
    cardStyles,
    css`
      .live-head {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 4px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-weight: 800;
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        border-radius: 999px;
        padding: 4px 12px;
      }
      .badge.on {
        color: #fff;
        background: var(--mgp-red);
      }
      .badge.off {
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
      }
      .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #fff;
      }
      .badge.on .dot {
        animation: pulse 1.2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.35; transform: scale(0.7); }
      }
      .focus {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0 4px;
      }
      .focus .name {
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .focus .meta {
        color: var(--secondary-text-color);
        font-size: 0.85rem;
      }
      .focus .cd {
        margin-left: auto;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        color: var(--mgp-red);
        white-space: nowrap;
      }
    `,
  ];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: LiveSessionCardConfig;
  private _timer?: number;

  static getStubConfig(): LiveSessionCardConfig {
    return {
      type: "custom:motogp-live-session-card",
      entity: "binary_sensor.motogp_session_live",
    };
  }

  static async getConfigElement() {
    await import("./editors/live-session-card-editor");
    return document.createElement("motogp-live-session-card-editor");
  }

  setConfig(config: LiveSessionCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      entity: "binary_sensor.motogp_session_live",
      schedule_entity: "sensor.motogp_next_event",
      show_upcoming: true,
      ...config,
    };
  }

  getCardSize() { return 4; }

  connectedCallback() {
    super.connectedCallback();
    // Live countdown / auto-flip tick.
    this._timer = window.setInterval(() => this.requestUpdate(), 1000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const ent = this.hass.states[this._config.entity ?? "binary_sensor.motogp_session_live"];
    if (!ent || ent.state === "unavailable" || ent.state === "unknown") {
      return html`<ha-card><div class="empty">MotoGP session-live sensor unavailable.</div></ha-card>`;
    }
    const live = ent.state === "on";
    const liveSession = ent.attributes.live_session as SessionSummary | null;
    const nextSession = ent.attributes.next_session as SessionSummary | null;

    return html`
      <ha-card>
        ${this._config.title ? html`<div class="title">${this._config.title}</div>` : nothing}
        <div class="live-head">
          ${live
            ? html`<span class="badge on"><span class="dot"></span>LIVE</span>`
            : html`<span class="badge off"><span class="dot"></span>OFF AIR</span>`}
        </div>
        ${live && liveSession
          ? this._focus(liveSession, null)
          : nextSession
            ? this._focus(nextSession, nextSession.start)
            : html`<div class="empty">No upcoming session scheduled.</div>`}
        ${this._config.show_upcoming !== false ? this._upcoming() : nothing}
      </ha-card>
    `;
  }

  private _focus(s: SessionSummary, countdownStart: string | null) {
    const cd = countdownStart ? formatCountdown(countdownStart) : "";
    const laps = s.num_laps ? `${s.num_laps} laps` : "";
    const meta = [s.class_name, laps].filter(Boolean).join(" · ");
    return html`
      <div class="focus">
        <span class="chip" style="background:${CLASS_COLORS[s.class]}">${s.class}</span>
        <div>
          <div class="name">${KIND_MARK[s.kind] ?? ""} ${s.session}</div>
          ${meta ? html`<div class="meta">${meta}</div>` : nothing}
        </div>
        ${cd ? html`<span class="cd">${cd}</span>` : nothing}
      </div>
    `;
  }

  private _upcoming() {
    const schedEnt = this.hass!.states[this._config.schedule_entity ?? "sensor.motogp_next_event"];
    const all = (schedEnt?.attributes?.schedule ?? []) as ScheduleItem[];
    const filtered = filterByClasses(all, this._config.classes as ClassAcronym[] | undefined);
    const startIdx = nextSessionIndex(filtered);
    if (startIdx < 0) return nothing;
    const upcoming = filtered.slice(startIdx, startIdx + 4);
    if (upcoming.length === 0) return nothing;
    return html`
      <div class="day">Upcoming</div>
      ${upcoming.map(
        (s) => html`
          <div class="row">
            <span class="time">
              ${new Date(s.start).toLocaleTimeString(this.hass!.locale?.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span class="chip" style="background:${CLASS_COLORS[s.class]}">${s.class}</span>
            <span class="session">
              ${KIND_MARK[s.kind] ?? ""} ${s.session}
              ${s.num_laps ? html`<span class="pill">${s.num_laps} laps</span>` : nothing}
              ${s.has_live || s.has_on_demand ? html`<span title="Broadcast">📺</span>` : nothing}
            </span>
          </div>
        `,
      )}
    `;
  }
}
