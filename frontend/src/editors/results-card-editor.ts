import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, ResultsCardConfig, ClassKey } from "../shared/types";

const ALL: ClassKey[] = ["motogp", "moto2", "moto3"];

@customElement("motogp-results-card-editor")
export class ResultsCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: ResultsCardConfig;

  setConfig(config: ResultsCardConfig) {
    this._config = config;
  }

  private _emit(patch: Partial<ResultsCardConfig>) {
    this._config = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }),
    );
  }

  render() {
    if (!this._config) return nothing;
    const dc = this._config.default_class ?? "motogp";
    return html`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Title (optional)
          <input .value=${this._config.title ?? ""}
            @change=${(e: Event) => this._emit({ title: (e.target as HTMLInputElement).value || undefined })} />
        </label>
        <label>
          Default class
          <select @change=${(e: Event) => this._emit({ default_class: (e.target as HTMLSelectElement).value as ClassKey })}>
            ${ALL.map((c) => html`<option value=${c} ?selected=${c === dc}>${c}</option>`)}
          </select>
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_standings !== false}
            @change=${(e: Event) => this._emit({ show_standings: (e.target as HTMLInputElement).checked })} />
          Show standings
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_podium !== false}
            @change=${(e: Event) => this._emit({ show_podium: (e.target as HTMLInputElement).checked })} />
          Show latest podium
        </label>
      </div>
    `;
  }
}
