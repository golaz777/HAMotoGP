# MotoGP Custom Lovelace Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two Lit/TypeScript Lovelace cards (`motogp-next-event-card`, `motogp-results-card`), bundled with and auto-registered by the MotoGP integration, that render circuit data + the weekend schedule and standings/podium with a native, themed UI.

**Architecture:** A dev-only `frontend/` project (TypeScript + Lit) is bundled by esbuild into a single committed file at `custom_components/motogp/frontend/motogp-cards.js`. The integration registers that file as an HTTP static path and adds it as an extra frontend JS module at setup (idempotently), so the cards appear in the dashboard picker with no manual resource install. Cards consume existing entity attributes only — no coordinator/API changes.

**Tech Stack:** TypeScript, Lit 3, esbuild, vitest (+ happy-dom), Home Assistant frontend (`custom-card-helpers` types not required; minimal local types), Python (Home Assistant integration).

## Global Constraints

- Home Assistant minimum version: **2024.7.0** (bump from 2024.6.0 — required for `hass.http.async_register_static_paths`). Update `hacs.json` and README.
- Version lives only in `custom_components/motogp/manifest.json`; ship this work as **0.3.0**.
- Never credit AI/Claude in any commit, code comment, or doc.
- No changes to `coordinator.py` or `api.py` — cards use existing entity data only.
- The committed bundle `custom_components/motogp/frontend/motogp-cards.js` MUST be reproducible from `frontend/` via `npm run build`; CI enforces they match.
- Card custom element names: `motogp-next-event-card`, `motogp-results-card`. Editor element names: `motogp-next-event-card-editor`, `motogp-results-card-editor`.
- Class acronyms in data: `MGP`, `MT2`, `MT3` (map to labels MotoGP / Moto2 / Moto3).
- Default entities: `sensor.motogp_next_event`; standings `sensor.motogp_<key>_standings`; results `sensor.motogp_<key>_latest_result` where `<key>` ∈ `motogp|moto2|moto3`.

---

## File Structure

```
frontend/
  package.json            # deps: lit; devDeps: esbuild, typescript, vitest, happy-dom
  tsconfig.json
  build.mjs               # esbuild → ../custom_components/motogp/frontend/motogp-cards.js
  vitest.config.ts
  src/
    entry.ts              # imports & registers both cards + editors; window.customCards
    motogp-next-event-card.ts
    motogp-results-card.ts
    editors/
      next-event-card-editor.ts
      results-card-editor.ts
    shared/
      types.ts            # HomeAssistant, HassEntity, LovelaceCard, config interfaces
      format.ts           # countdown, schedule grouping, class filter, labels
      team-colors.ts      # TEAM_COLORS, CLASS_COLORS, colorForTeam()
      styles.ts           # shared css`` block (ha-card theming)
  test/
    format.test.ts
    team-colors.test.ts
    cards.test.ts         # elements register; render smoke with a fake hass
custom_components/motogp/
  frontend/
    motogp-cards.js       # BUILT artifact (committed)
    __init__.py           # empty marker so package data ships (see Task 6)
  frontend_registration.py  # async_register_frontend(hass) helper
  __init__.py             # call registration in async_setup_entry
.github/workflows/frontend.yml  # build + drift check
```

---

## Task 1: Frontend project scaffold + build pipeline

**Files:**
- Create: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/build.mjs`, `frontend/vitest.config.ts`, `frontend/.gitignore`
- Create: `frontend/src/shared/types.ts`
- Create: `frontend/src/entry.ts` (minimal, no cards yet)

**Interfaces:**
- Produces: `npm run build` (in `frontend/`) writes `../custom_components/motogp/frontend/motogp-cards.js`. `npm test` runs vitest.
- Produces types in `shared/types.ts`: `HassEntity`, `HomeAssistant`, `LovelaceCard`, `NextEventCardConfig`, `ResultsCardConfig`.

- [ ] **Step 1: Create `frontend/package.json`**

```json
{
  "name": "motogp-cards",
  "version": "0.3.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node build.mjs",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "lit": "^3.1.0"
  },
  "devDependencies": {
    "esbuild": "^0.20.0",
    "happy-dom": "^14.0.0",
    "typescript": "^5.4.0",
    "vitest": "^1.4.0"
  }
}
```

- [ ] **Step 2: Create `frontend/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "types": ["vitest/globals"]
  },
  "include": ["src", "test"]
}
```

- [ ] **Step 3: Create `frontend/build.mjs`**

```js
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outfile = resolve(
  __dirname,
  "../custom_components/motogp/frontend/motogp-cards.js",
);

await build({
  entryPoints: [resolve(__dirname, "src/entry.ts")],
  outfile,
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2021",
  legalComments: "none",
  sourcemap: false,
});

console.log(`Built ${outfile}`);
```

- [ ] **Step 4: Create `frontend/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["test/**/*.test.ts"],
  },
});
```

- [ ] **Step 5: Create `frontend/.gitignore`**

```
node_modules/
```

- [ ] **Step 6: Create `frontend/src/shared/types.ts`**

```ts
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
```

- [ ] **Step 7: Create minimal `frontend/src/entry.ts`**

```ts
// Card registrations are added in later tasks.
export {};
```

- [ ] **Step 8: Install and build**

Run: `cd frontend && npm install && npm run build`
Expected: prints `Built .../custom_components/motogp/frontend/motogp-cards.js`; file exists (near-empty bundle).

- [ ] **Step 9: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/tsconfig.json \
  frontend/build.mjs frontend/vitest.config.ts frontend/.gitignore \
  frontend/src/shared/types.ts frontend/src/entry.ts \
  custom_components/motogp/frontend/motogp-cards.js
git commit -m "chore(frontend): scaffold Lit/TS card project and esbuild pipeline"
```

---

## Task 2: Shared formatting + color helpers (TDD)

**Files:**
- Create: `frontend/src/shared/format.ts`
- Create: `frontend/src/shared/team-colors.ts`
- Test: `frontend/test/format.test.ts`, `frontend/test/team-colors.test.ts`

**Interfaces:**
- Consumes: `ClassAcronym`, `ClassKey` from `shared/types.ts`.
- Produces:
  - `formatCountdown(startIso: string, now?: Date): string`
  - `classLabel(acronym: ClassAcronym): string`
  - `groupScheduleByDay(schedule: ScheduleItem[], locale?: string): DayGroup[]`
  - `filterByClasses(schedule: ScheduleItem[], classes?: ClassAcronym[]): ScheduleItem[]`
  - `nextSessionIndex(schedule: ScheduleItem[], now?: Date): number`
  - Types `ScheduleItem`, `DayGroup`.
  - `CLASS_COLORS: Record<ClassAcronym, string>`, `TEAM_COLORS: Record<string,string>`, `colorForTeam(team: string, overrides?): string`.

- [ ] **Step 1: Write failing tests `frontend/test/format.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import {
  formatCountdown,
  classLabel,
  groupScheduleByDay,
  filterByClasses,
  nextSessionIndex,
} from "../src/shared/format";

const now = new Date("2026-08-14T09:00:00Z");

const schedule = [
  { class: "MGP", session: "Free Practice Nr. 1", kind: "PRACTICE", start: "2026-08-14T10:45:00Z", end: "2026-08-14T11:30:00Z" },
  { class: "MT3", session: "Qualifying Nr. 2", kind: "QUALIFYING", start: "2026-08-15T09:50:00Z", end: "2026-08-15T10:05:00Z" },
  { class: "MGP", session: "Sprint", kind: "SPRINT", start: "2026-08-15T13:00:00Z", end: "2026-08-15T13:30:00Z" },
  { class: "MGP", session: "Race", kind: "RACE", start: "2026-08-16T12:00:00Z", end: "2026-08-16T13:00:00Z" },
];

describe("classLabel", () => {
  it("maps acronyms to labels", () => {
    expect(classLabel("MGP")).toBe("MotoGP");
    expect(classLabel("MT2")).toBe("Moto2");
    expect(classLabel("MT3")).toBe("Moto3");
  });
});

describe("formatCountdown", () => {
  it("formats a future gap as days/hours", () => {
    expect(formatCountdown("2026-08-17T13:15:00Z", now)).toMatch(/^In 3d/);
  });
  it("says Starts today when same day and future", () => {
    expect(formatCountdown("2026-08-14T18:00:00Z", now)).toMatch(/today|In 0d|^In \d+h/);
  });
  it("says under way when start has passed", () => {
    expect(formatCountdown("2026-08-14T08:00:00Z", now).toLowerCase()).toContain("under way");
  });
});

describe("filterByClasses", () => {
  it("keeps only requested classes", () => {
    const out = filterByClasses(schedule as any, ["MGP"]);
    expect(out.every((s) => s.class === "MGP")).toBe(true);
    expect(out).toHaveLength(3);
  });
  it("returns all when classes omitted", () => {
    expect(filterByClasses(schedule as any, undefined)).toHaveLength(4);
  });
});

describe("groupScheduleByDay", () => {
  it("groups into three days preserving order", () => {
    const groups = groupScheduleByDay(schedule as any);
    expect(groups).toHaveLength(3);
    expect(groups[0].items).toHaveLength(1);
    expect(groups[1].items).toHaveLength(2);
    expect(groups[2].items).toHaveLength(1);
  });
});

describe("nextSessionIndex", () => {
  it("returns the first session starting at/after now", () => {
    expect(nextSessionIndex(schedule as any, now)).toBe(0);
    expect(nextSessionIndex(schedule as any, new Date("2026-08-15T12:00:00Z"))).toBe(2);
  });
  it("returns -1 when all are past", () => {
    expect(nextSessionIndex(schedule as any, new Date("2026-09-01T00:00:00Z"))).toBe(-1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd frontend && npx vitest run test/format.test.ts`
Expected: FAIL (module `../src/shared/format` not found).

- [ ] **Step 3: Implement `frontend/src/shared/format.ts`**

```ts
import type { ClassAcronym } from "./types";

export interface ScheduleItem {
  class: ClassAcronym;
  session: string;
  kind: string;
  start: string;
  end: string;
}

export interface DayGroup {
  label: string;
  items: ScheduleItem[];
}

const LABELS: Record<ClassAcronym, string> = {
  MGP: "MotoGP",
  MT2: "Moto2",
  MT3: "Moto3",
};

export function classLabel(acronym: ClassAcronym): string {
  return LABELS[acronym] ?? acronym;
}

export function formatCountdown(startIso: string, now: Date = new Date()): string {
  const start = new Date(startIso).getTime();
  if (Number.isNaN(start)) return "";
  const diff = start - now.getTime();
  if (diff <= 0) return "Race weekend under way";
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (days > 0) return `In ${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `In ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function filterByClasses(
  schedule: ScheduleItem[],
  classes?: ClassAcronym[],
): ScheduleItem[] {
  if (!classes || classes.length === 0) return schedule.slice();
  const set = new Set(classes);
  return schedule.filter((s) => set.has(s.class));
}

export function groupScheduleByDay(
  schedule: ScheduleItem[],
  locale = "en",
): DayGroup[] {
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const groups: DayGroup[] = [];
  let current: DayGroup | undefined;
  for (const item of schedule) {
    const label = fmt.format(new Date(item.start));
    if (!current || current.label !== label) {
      current = { label, items: [] };
      groups.push(current);
    }
    current.items.push(item);
  }
  return groups;
}

export function nextSessionIndex(
  schedule: ScheduleItem[],
  now: Date = new Date(),
): number {
  const t = now.getTime();
  return schedule.findIndex((s) => new Date(s.start).getTime() >= t);
}
```

- [ ] **Step 4: Write failing tests `frontend/test/team-colors.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { CLASS_COLORS, colorForTeam } from "../src/shared/team-colors";

describe("CLASS_COLORS", () => {
  it("defines a color per class acronym", () => {
    expect(CLASS_COLORS.MGP).toMatch(/^#/);
    expect(CLASS_COLORS.MT2).toMatch(/^#/);
    expect(CLASS_COLORS.MT3).toMatch(/^#/);
  });
});

describe("colorForTeam", () => {
  it("matches known teams case-insensitively and loosely", () => {
    expect(colorForTeam("Ducati Lenovo Team")).toMatch(/^#/);
    expect(colorForTeam("aprilia racing")).toBe(colorForTeam("Aprilia Racing"));
  });
  it("falls back to a neutral color for unknown teams", () => {
    expect(colorForTeam("Some Unknown Squad")).toMatch(/^#/);
  });
  it("prefers an override map when provided", () => {
    expect(colorForTeam("Ducati Lenovo Team", { ducati: "#000000" })).toBe("#000000");
  });
});
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `cd frontend && npx vitest run test/team-colors.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 6: Implement `frontend/src/shared/team-colors.ts`**

```ts
import type { ClassAcronym } from "./types";

export const CLASS_COLORS: Record<ClassAcronym, string> = {
  MGP: "#e2001a",
  MT2: "#0090d4",
  MT3: "#00a651",
};

// Loose keyword → color. Matched by substring against the lowercased team name.
export const TEAM_COLORS: Record<string, string> = {
  ducati: "#cc0000",
  aprilia: "#0a0a5e",
  ktm: "#ff6600",
  gasgas: "#cc0000",
  honda: "#003da5",
  yamaha: "#0a3d91",
  vr46: "#ffcf00",
  gresini: "#00a0d6",
  trackhouse: "#1a1a1a",
  tech3: "#0091d0",
  pramac: "#6a1b9a",
  lcr: "#e30613",
};

const FALLBACK = "#8a8a8a";

export function colorForTeam(
  team: string | undefined,
  overrides?: Record<string, string>,
): string {
  if (!team) return FALLBACK;
  const name = team.toLowerCase();
  const maps = [overrides ?? {}, TEAM_COLORS];
  for (const map of maps) {
    for (const key of Object.keys(map)) {
      if (name.includes(key.toLowerCase())) return map[key];
    }
  }
  return FALLBACK;
}
```

- [ ] **Step 7: Run all tests to verify they pass**

Run: `cd frontend && npx vitest run`
Expected: PASS (all format + team-colors tests green).

- [ ] **Step 8: Commit**

```bash
git add frontend/src/shared/format.ts frontend/src/shared/team-colors.ts \
  frontend/test/format.test.ts frontend/test/team-colors.test.ts
git commit -m "feat(frontend): add schedule/countdown formatting and team-color helpers"
```

---

## Task 3: Shared styles + Next Event card + its editor

**Files:**
- Create: `frontend/src/shared/styles.ts`
- Create: `frontend/src/motogp-next-event-card.ts`
- Create: `frontend/src/editors/next-event-card-editor.ts`
- Modify: `frontend/src/entry.ts`
- Test: `frontend/test/cards.test.ts`

**Interfaces:**
- Consumes: helpers from Task 2; `HomeAssistant`, `LovelaceCard`, `NextEventCardConfig` from types.
- Produces: custom element `motogp-next-event-card` (registered), `motogp-next-event-card-editor`; `window.customCards` entry.

- [ ] **Step 1: Create `frontend/src/shared/styles.ts`**

```ts
import { css } from "lit";

export const cardStyles = css`
  :host {
    --mgp-gap: 12px;
  }
  ha-card {
    padding: 16px;
    display: block;
  }
  .header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .flag { font-size: 1.25rem; }
  .countdown {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    color: var(--primary-color);
    font-weight: 600;
  }
  .sub { color: var(--secondary-text-color); font-size: 0.9rem; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
  .pill {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 2px 10px;
    font-size: 0.8rem;
    color: var(--primary-text-color);
  }
  .day {
    margin-top: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--divider-color);
    padding-bottom: 4px;
  }
  .row {
    display: grid;
    grid-template-columns: 4.5rem 3.2rem 1fr;
    align-items: center;
    gap: 8px;
    padding: 6px 4px;
  }
  .row.next { background: var(--secondary-background-color); border-radius: 8px; }
  .time { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }
  .chip {
    color: #fff;
    border-radius: 6px;
    padding: 1px 6px;
    font-size: 0.72rem;
    text-align: center;
    font-weight: 600;
  }
  .session { color: var(--primary-text-color); }
  .empty { color: var(--secondary-text-color); font-style: italic; }
  table.standings { width: 100%; border-collapse: collapse; }
  table.standings td, table.standings th {
    padding: 4px 6px; text-align: left; border-bottom: 1px solid var(--divider-color);
  }
  table.standings td.pts, table.standings th.pts { text-align: right; }
  .podium-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
  .swatch { width: 4px; height: 1.2em; border-radius: 2px; }
  .tabs { display: flex; gap: 6px; margin: 8px 0; }
  .tab {
    cursor: pointer; padding: 4px 10px; border-radius: 14px;
    background: var(--secondary-background-color); color: var(--primary-text-color);
    font-size: 0.85rem; border: none;
  }
  .tab[aria-selected="true"] { background: var(--primary-color); color: #fff; }
`;
```

- [ ] **Step 2: Implement `frontend/src/motogp-next-event-card.ts`**

```ts
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./shared/styles";
import {
  formatCountdown,
  filterByClasses,
  groupScheduleByDay,
  nextSessionIndex,
  classLabel,
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
```

- [ ] **Step 3: Implement `frontend/src/editors/next-event-card-editor.ts`**

```ts
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, NextEventCardConfig } from "../shared/types";

@customElement("motogp-next-event-card-editor")
export class NextEventCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: NextEventCardConfig;

  setConfig(config: NextEventCardConfig) {
    this._config = config;
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
          <input type="checkbox" .checked=${this._config.show_circuit !== false}
            @change=${(e: Event) => this._emit({ show_circuit: (e.target as HTMLInputElement).checked })} />
          Show circuit data
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
```

- [ ] **Step 4: Update `frontend/src/entry.ts` to register the card and picker metadata**

```ts
import "./motogp-next-event-card";

(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push({
  type: "motogp-next-event-card",
  name: "MotoGP Next Event",
  description: "Circuit data and the full weekend schedule for all three classes.",
});
```

- [ ] **Step 5: Write smoke test `frontend/test/cards.test.ts`**

```ts
import { describe, it, expect, beforeAll } from "vitest";
import type { HomeAssistant } from "../src/shared/types";

beforeAll(async () => {
  await import("../src/entry");
});

function fakeHass(): HomeAssistant {
  return {
    states: {
      "sensor.motogp_next_event": {
        entity_id: "sensor.motogp_next_event",
        state: "2026-08-16T12:00:00Z",
        attributes: {
          name: "British GP",
          circuit: "Silverstone",
          city: "Silverstone",
          date_start: "2026-08-16T12:00:00Z",
          date_end: "2026-08-16T13:00:00Z",
          circuit_info: { country_code: "GB", length_km: 5.9, corners: 18, left_corners: 8, right_corners: 10 },
          schedule: [
            { class: "MGP", session: "Race", kind: "RACE", start: "2026-08-16T12:00:00Z", end: "2026-08-16T13:00:00Z" },
          ],
        },
      },
    },
    locale: { language: "en" },
  };
}

describe("motogp-next-event-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("motogp-next-event-card")).toBeTypeOf("function");
  });

  it("renders event name and a schedule row", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card" });
    el.hass = fakeHass();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("British GP");
    expect(text).toContain("Race");
    el.remove();
  });

  it("shows an unavailable message when the entity is missing", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card" });
    el.hass = { states: {}, locale: { language: "en" } };
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain("unavailable");
    el.remove();
  });
});
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd frontend && npx vitest run test/cards.test.ts`
Expected: PASS (element registers; renders name + Race; unavailable message).

- [ ] **Step 7: Typecheck and build**

Run: `cd frontend && npm run typecheck && npm run build`
Expected: no type errors; bundle rebuilt.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/shared/styles.ts frontend/src/motogp-next-event-card.ts \
  frontend/src/editors/next-event-card-editor.ts frontend/src/entry.ts \
  frontend/test/cards.test.ts custom_components/motogp/frontend/motogp-cards.js
git commit -m "feat(frontend): add motogp-next-event-card with live countdown and editor"
```

---

## Task 4: Results card + its editor

**Files:**
- Create: `frontend/src/motogp-results-card.ts`
- Create: `frontend/src/editors/results-card-editor.ts`
- Modify: `frontend/src/entry.ts`
- Test: extend `frontend/test/cards.test.ts`

**Interfaces:**
- Consumes: `colorForTeam` (Task 2), `cardStyles` (Task 3), types.
- Produces: `motogp-results-card`, `motogp-results-card-editor`; second `window.customCards` entry.

- [ ] **Step 1: Implement `frontend/src/motogp-results-card.ts`**

```ts
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
            <td>${r.rider}</td>
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
    return html`
      <div class="day">${res.event ?? "Latest result"}</div>
      ${podium.map(
        (r: any) => html`<div class="podium-row">
          <span class="swatch" style="background:${colorForTeam(r.team, this._config.team_colors)}"></span>
          <span>${MEDALS[r.position] ?? r.position}</span>
          <strong>${r.rider}</strong>
          <span class="sub">${r.team ?? ""}</span>
        </div>`,
      )}
    `;
  }
}
```

- [ ] **Step 2: Implement `frontend/src/editors/results-card-editor.ts`**

```ts
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
```

- [ ] **Step 3: Update `frontend/src/entry.ts` to also register the results card**

```ts
import "./motogp-next-event-card";
import "./motogp-results-card";

(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push(
  {
    type: "motogp-next-event-card",
    name: "MotoGP Next Event",
    description: "Circuit data and the full weekend schedule for all three classes.",
  },
  {
    type: "motogp-results-card",
    name: "MotoGP Results",
    description: "Championship standings and the latest podium, per class.",
  },
);
```

- [ ] **Step 4: Extend `frontend/test/cards.test.ts` with results-card cases**

Append these tests inside the file (after the existing describe block):

```ts
describe("motogp-results-card", () => {
  function hassWithResults(): HomeAssistant {
    return {
      states: {
        "sensor.motogp_motogp_standings": {
          entity_id: "sensor.motogp_motogp_standings",
          state: "Jorge Martin",
          attributes: { standings: [ { position: 1, rider: "Jorge Martin", team: "Aprilia Racing", points: 208 } ] },
        },
        "sensor.motogp_motogp_latest_result": {
          entity_id: "sensor.motogp_motogp_latest_result",
          state: "Marc Marquez",
          attributes: { event: "GERMAN GP", podium: [ { position: 1, rider: "Marc Marquez", team: "Ducati Lenovo", points: 25 } ] },
        },
      },
      locale: { language: "en" },
    };
  }

  it("registers the element", () => {
    expect(customElements.get("motogp-results-card")).toBeTypeOf("function");
  });

  it("renders standings and podium for the default class", async () => {
    const el = document.createElement("motogp-results-card") as any;
    el.setConfig({ type: "custom:motogp-results-card" });
    el.hass = hassWithResults();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("Jorge Martin");
    expect(text).toContain("Marc Marquez");
    expect(text).toContain("GERMAN GP");
    el.remove();
  });
});
```

- [ ] **Step 5: Run all tests + typecheck + build**

Run: `cd frontend && npx vitest run && npm run typecheck && npm run build`
Expected: PASS; no type errors; bundle rebuilt.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/motogp-results-card.ts frontend/src/editors/results-card-editor.ts \
  frontend/src/entry.ts frontend/test/cards.test.ts \
  custom_components/motogp/frontend/motogp-cards.js
git commit -m "feat(frontend): add motogp-results-card with class tabs and editor"
```

---

## Task 5: Integration auto-registration of the bundle (TDD, Python)

**Files:**
- Create: `custom_components/motogp/frontend/__init__.py` (empty marker; ensures the dir ships)
- Create: `custom_components/motogp/frontend_registration.py`
- Modify: `custom_components/motogp/__init__.py`
- Modify: `hacs.json` (min HA → 2024.7.0)
- Test: `tests/test_frontend_registration.py`

**Interfaces:**
- Consumes: `hass` from setup.
- Produces: `async_register_frontend(hass: HomeAssistant) -> None` — registers static path `/motogp/motogp-cards.js` and adds it as an extra JS module URL, exactly once per hass.

- [ ] **Step 1: Create empty `custom_components/motogp/frontend/__init__.py`**

```python
"""Marker so the built frontend bundle ships with the integration package."""
```

- [ ] **Step 2: Write failing test `tests/test_frontend_registration.py`**

```python
"""Tests for frontend bundle registration."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

from homeassistant.core import HomeAssistant

from custom_components.motogp.frontend_registration import (
    FRONTEND_URL,
    async_register_frontend,
)


async def test_registers_static_path_and_js_url_once(hass: HomeAssistant) -> None:
    """The bundle is registered as a static path and extra JS URL, only once."""
    hass.http = AsyncMock()
    with patch(
        "custom_components.motogp.frontend_registration.add_extra_js_url"
    ) as add_js:
        await async_register_frontend(hass)
        await async_register_frontend(hass)  # second call must be a no-op

    hass.http.async_register_static_paths.assert_awaited_once()
    paths = hass.http.async_register_static_paths.await_args.args[0]
    assert paths[0].url_path == FRONTEND_URL
    add_js.assert_called_once_with(hass, FRONTEND_URL)
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd /home/klemen/Documents/AI-Development/Homeassistant-MOTOGP && python -m pytest tests/test_frontend_registration.py -q`
Expected: FAIL (module `frontend_registration` not found).

- [ ] **Step 4: Implement `custom_components/motogp/frontend_registration.py`**

```python
"""Register the bundled Lovelace cards with the Home Assistant frontend."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN

FRONTEND_URL = "/motogp/motogp-cards.js"
_BUNDLE = Path(__file__).parent / "frontend" / "motogp-cards.js"
_REGISTERED_KEY = f"{DOMAIN}_frontend_registered"


async def async_register_frontend(hass: HomeAssistant) -> None:
    """Serve the card bundle and add it as an extra JS module (once per hass)."""
    if hass.data.get(_REGISTERED_KEY):
        return
    hass.data[_REGISTERED_KEY] = True
    await hass.http.async_register_static_paths(
        [StaticPathConfig(FRONTEND_URL, str(_BUNDLE), False)]
    )
    add_extra_js_url(hass, FRONTEND_URL)
```

- [ ] **Step 5: Run test to verify it passes**

Run: `python -m pytest tests/test_frontend_registration.py -q`
Expected: PASS.

- [ ] **Step 6: Wire into `custom_components/motogp/__init__.py`**

Add the import near the other local imports:

```python
from .frontend_registration import async_register_frontend
```

Call it at the start of `async_setup_entry` (before forwarding platforms), right after the function's docstring line:

```python
async def async_setup_entry(hass: HomeAssistant, entry: MotoGPConfigEntry) -> bool:
    """Set up MotoGP from a config entry."""
    await async_register_frontend(hass)
    session = async_get_clientsession(hass)
```

- [ ] **Step 7: Bump min HA in `hacs.json`**

Change `"homeassistant": "2024.6.0"` to `"homeassistant": "2024.7.0"`.

- [ ] **Step 8: Run the full Python suite**

Run: `python -m pytest -q`
Expected: PASS (existing 13 + new registration test).

- [ ] **Step 9: Commit**

```bash
git add custom_components/motogp/frontend/__init__.py \
  custom_components/motogp/frontend_registration.py \
  custom_components/motogp/__init__.py hacs.json \
  tests/test_frontend_registration.py
git commit -m "feat: auto-register bundled MotoGP cards with the frontend"
```

---

## Task 6: CI bundle-drift check

**Files:**
- Create: `.github/workflows/frontend.yml`

**Interfaces:** none (CI only).

- [ ] **Step 1: Create `.github/workflows/frontend.yml`**

```yaml
name: frontend
on:
  push:
    paths: ["frontend/**", "custom_components/motogp/frontend/**"]
  pull_request:
    paths: ["frontend/**", "custom_components/motogp/frontend/**"]
jobs:
  build-and-verify:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
      - name: Fail if committed bundle is stale
        run: git diff --exit-code ../custom_components/motogp/frontend/motogp-cards.js
```

- [ ] **Step 2: Verify locally that the bundle is current**

Run: `cd frontend && npm run build && cd .. && git diff --exit-code custom_components/motogp/frontend/motogp-cards.js`
Expected: no diff (exit 0).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/frontend.yml
git commit -m "ci: build frontend and verify committed bundle is not stale"
```

---

## Task 7: Release housekeeping + docs

**Files:**
- Modify: `custom_components/motogp/manifest.json` (version → 0.3.0)
- Modify: `CHANGELOG.md`
- Modify: `README.md` (add "Custom cards" section; note min HA 2024.7)

**Interfaces:** none.

- [ ] **Step 1: Bump `custom_components/motogp/manifest.json`**

Change `"version": "0.2.0"` to `"version": "0.3.0"`.

- [ ] **Step 2: Add `CHANGELOG.md` entry above the 0.2.0 section**

```markdown
## [0.3.0] - 2026-07-14

### Added
- Two custom Lovelace cards, bundled with the integration and auto-registered (no manual
  resource install): `motogp-next-event-card` (circuit data, live countdown and the full
  weekend schedule for all three classes) and `motogp-results-card` (per-class standings and
  the latest podium). Configurable via the dashboard GUI editor.

### Changed
- Minimum Home Assistant version is now 2024.7.0 (for `async_register_static_paths`).
```

- [ ] **Step 3: Add a "Custom cards" subsection to the `README.md` Dashboard section**

```markdown
### Custom cards (richer UI)

Installing the integration also registers two custom Lovelace cards automatically — no manual
resource setup:

- **MotoGP Next Event** (`motogp-next-event-card`) — circuit stats, a live countdown, and the
  weekend schedule with colored class chips.
- **MotoGP Results** (`motogp-results-card`) — per-class standings and the latest podium.

Add them from **Dashboard → Edit → + Add Card** (search "MotoGP") and configure in the visual
editor. Requires Home Assistant 2024.7+. The Markdown cards above remain available as a
zero-JavaScript alternative.
```

- [ ] **Step 4: Run the full Python suite once more**

Run: `python -m pytest -q`
Expected: PASS.

- [ ] **Step 5: Commit and tag**

```bash
git add custom_components/motogp/manifest.json CHANGELOG.md README.md
git commit -m "docs: document custom cards and release 0.3.0"
git tag -a v0.3.0 -m "v0.3.0"
```

---

## Self-Review Notes

- **Spec coverage:** two cards (Tasks 3–4), chronological-by-day schedule (Task 3 `groupScheduleByDay` + render), live countdown (Task 3 timer + `formatCountdown`), circuit pills (Task 3 `_circuit`), standings/podium with team colors (Task 4), GUI editors (Tasks 3–4), integration-bundled auto-registration (Task 5), theming via HA CSS vars (Task 3 `styles.ts`), graceful unavailable/empty states (Task 3/4 renders + tests), CI drift check (Task 6), release 0.3.0 + README + min-HA bump (Tasks 5, 7). No rider photos / track maps (out of scope) — not implemented, matching the spec.
- **Manual verification (post-implementation):** in a running HA (2024.7+), install/reload the integration, add both cards via the picker, confirm the countdown ticks, class chips are colored, the next session is highlighted, the results tabs switch classes, and both render correctly in light and dark themes and at mobile width.
- **Type consistency:** `ScheduleItem`/`DayGroup` defined in `format.ts` and imported by the card; `ClassAcronym`/`ClassKey` from `types.ts` used consistently; `FRONTEND_URL` shared between impl and test; config interfaces match editor `_emit` patches.
```
