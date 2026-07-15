import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./shared/styles";
import { colorForTeam } from "./shared/team-colors";
import type { HomeAssistant, ResultsCardConfig, ClassKey } from "./shared/types";

const CLASS_LABELS: Record<ClassKey, string> = {
  motogp: "MotoGP",
  moto2: "Moto2",
  moto3: "Moto3",
};
const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// Map the API weather string to an emoji; default to a neutral cloud.
function weatherEmoji(weather?: string): string {
  const w = (weather ?? "").toLowerCase();
  if (w.includes("rain") || w.includes("wet")) return "🌧️";
  if (w.includes("storm") || w.includes("thunder")) return "⛈️";
  if (w.includes("partly")) return "⛅";
  if (w.includes("cloud") || w.includes("overcast")) return "☁️";
  if (w.includes("sun") || w.includes("clear") || w.includes("fair")) return "☀️";
  return "🌡️";
}

// Winner shows total time; others show the gap to the leader.
function resultMeta(r: any): string {
  const parts: string[] = [];
  if (r.position === 1 && r.time) parts.push(r.time);
  else if (r.gap && r.gap !== "0.000") parts.push(`+${r.gap}s`);
  if (r.average_speed) parts.push(`${r.average_speed} km/h`);
  return parts.join(" · ");
}

@customElement("motogp-results-card")
export class MotoGPResultsCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: ResultsCardConfig;
  @state() private _selected: ClassKey = "motogp";

  static getStubConfig(): ResultsCardConfig {
    return { type: "custom:motogp-results-card" };
  }

  static async getConfigElement() {
    await import("./editors/results-card-editor");
    return document.createElement("motogp-results-card-editor");
  }

  setConfig(config: ResultsCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      classes: ["motogp", "moto2", "moto3"],
      show_standings: true,
      show_podium: true,
      show_weather: true,
      default_class: "motogp",
      ...config,
    };
    this._selected = this._config.default_class ?? "motogp";
  }

  getCardSize() { return 6; }

  render() {
    if (!this._config || !this.hass) return nothing;
    const classes = this._config.classes ?? ["motogp", "moto2", "moto3"];
    const sel = this._selected;
    return html`
      <ha-card>
        ${this._config.title ? html`<div class="title">${this._config.title}</div>` : nothing}
        <div class="tabs" role="tablist">
          ${classes.map(
            (c) => html`<button
              class="tab" role="tab"
              aria-selected=${c === sel ? "true" : "false"}
              @click=${() => (this._selected = c)}
            >${CLASS_LABELS[c]}</button>`,
          )}
        </div>
        ${this._config.show_standings !== false ? this._standings(sel) : nothing}
        ${this._config.show_podium !== false ? this._podium(sel) : nothing}
      </ha-card>
    `;
  }

  private _standings(cls: ClassKey) {
    const ent = this.hass!.states[`sensor.motogp_${cls}_standings`];
    const rows = ent?.attributes?.standings ?? [];
    if (rows.length === 0) return html`<div class="empty">No standings.</div>`;
    return html`
      <table class="standings">
        <tr><th>#</th><th>Rider</th><th class="pts">Pts</th></tr>
        ${rows.map(
          (r: any) => html`<tr>
            <td>${r.position}</td>
            <td class="rider-cell">
              ${r.photo
                ? html`<img class="rider-photo" src=${r.photo} alt="" loading="lazy" />`
                : nothing}
              <span>${r.rider}</span>
            </td>
            <td class="pts"><strong>${r.points}</strong></td>
          </tr>`,
        )}
      </table>
    `;
  }

  private _podium(cls: ClassKey) {
    const ent = this.hass!.states[`sensor.motogp_${cls}_latest_result`];
    const res = ent?.attributes;
    const podium = res?.podium ?? [];
    if (podium.length === 0) return nothing;
    const weather = res.weather;
    return html`
      <div class="day">${res.event ?? "Latest result"}</div>
      ${this._config.show_weather !== false && weather
        ? html`<div class="weather">
            ${weatherEmoji(weather.weather)} ${weather.weather ?? ""}
            ${weather.track ? html`· Track ${weather.track}` : nothing}
            ${weather.air ? html`· Air ${weather.air}` : nothing}
            ${weather.ground ? html`· Ground ${weather.ground}` : nothing}
          </div>`
        : nothing}
      ${podium.map(
        (r: any) => html`<div class="podium-row">
          <span class="swatch" style="background:${colorForTeam(r.team, this._config.team_colors)}"></span>
          <span class="medal">${MEDALS[r.position] ?? r.position}</span>
          ${r.photo
            ? html`<img class="rider-photo" src=${r.photo} alt="" loading="lazy" />`
            : nothing}
          <div class="podium-text">
            <strong class="podium-name">${r.rider}</strong>
            <span class="sub">
              ${r.team ?? ""}${resultMeta(r) ? html` — ${resultMeta(r)}` : nothing}
            </span>
          </div>
        </div>`,
      )}
    `;
  }
}
