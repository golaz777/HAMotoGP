import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, NextEventCardConfig, ClassAcronym } from "../shared/types";

@customElement("motogp-next-event-card-editor")
export class NextEventCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: NextEventCardConfig;

  setConfig(config: NextEventCardConfig) {
    this._config = config;
  }

  private _selectedClass(): "all" | ClassAcronym {
    const c = this._config.classes;
    return c && c.length === 1 ? (c[0] as ClassAcronym) : "all";
  }

  private _emit(patch: Partial<NextEventCardConfig>) {
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
            .value=${this._config.entity ?? "sensor.motogp_next_event"}
            @change=${(e: Event) => this._emit({ entity: (e.target as HTMLInputElement).value })}
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
          <input type="checkbox" .checked=${this._config.show_circuit !== false}
            @change=${(e: Event) => this._emit({ show_circuit: (e.target as HTMLInputElement).checked })} />
          Show circuit data
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_track_map !== false}
            @change=${(e: Event) => this._emit({ show_track_map: (e.target as HTMLInputElement).checked })} />
          Show track map
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_countdown !== false}
            @change=${(e: Event) => this._emit({ show_countdown: (e.target as HTMLInputElement).checked })} />
          Show live countdown
        </label>
      </div>
    `;
  }
}
