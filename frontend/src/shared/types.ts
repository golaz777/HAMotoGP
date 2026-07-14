export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  localize?: (key: string) => string;
  language?: string;
  locale?: { language: string };
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: any): void;
  getCardSize(): number | Promise<number>;
}

export type ClassKey = "motogp" | "moto2" | "moto3";
export type ClassAcronym = "MGP" | "MT2" | "MT3";

export interface NextEventCardConfig {
  type: string;
  entity?: string;
  title?: string;
  show_circuit?: boolean;
  show_track_map?: boolean;
  show_countdown?: boolean;
  classes?: ClassAcronym[];
}

export interface ResultsCardConfig {
  type: string;
  title?: string;
  classes?: ClassKey[];
  show_standings?: boolean;
  show_podium?: boolean;
  default_class?: ClassKey;
  team_colors?: Record<string, string>;
}
