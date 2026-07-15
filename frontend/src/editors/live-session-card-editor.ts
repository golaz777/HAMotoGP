import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LiveSessionCardConfig, ClassAcronym } from "../shared/types";

@customElement("motogp-live-session-card-editor")
export class LiveSessionCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: LiveSessionCardConfig;

  setConfig(config: LiveSessionCardConfig) {
    this._config = config;
  }

  private _selectedClass(): "all" | ClassAcronym {
    const c = this._config.classes;
    return c && c.length === 1 ? (c[0] as ClassAcronym) : "all";
  }

  private _emit(patch: Partial<LiveSessionCardConfig>) {
    this._config = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }),
    );
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Entity
          <input
            .value=${this._config.entity ?? "binary_sensor.motogp_session_live"}
            @change=${(e: Event) => this._emit({ entity: (e.target as HTMLInputElement).value })}
          />
        </label>
        <label>
          Schedule entity
          <input
            .value=${this._config.schedule_entity ?? "sensor.motogp_next_event"}
            @change=${(e: Event) => this._emit({ schedule_entity: (e.target as HTMLInputElement).value })}
          />
        </label>
        <label>
          Title (optional)
          <input
            .value=${this._config.title ?? ""}
            @change=${(e: Event) => this._emit({ title: (e.target as HTMLInputElement).value || undefined })}
          />
        </label>
        <label>
          Classes
          <select
            .value=${this._selectedClass()}
            @change=${(e: Event) => {
              const v = (e.target as HTMLSelectElement).value;
              this._emit({ classes: v === "all" ? undefined : [v as ClassAcronym] });
            }}
          >
            <option value="all">All classes</option>
            <option value="MGP">MotoGP only</option>
            <option value="MT2">Moto2 only</option>
            <option value="MT3">Moto3 only</option>
          </select>
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_upcoming !== false}
            @change=${(e: Event) => this._emit({ show_upcoming: (e.target as HTMLInputElement).checked })} />
          Show upcoming sessions
        </label>
      </div>
    `;
  }
}
