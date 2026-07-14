# MotoGP custom Lovelace cards — design

**Date:** 2026-07-14
**Status:** Approved (design), pending implementation plan

## Context

The MotoGP integration currently ships two Markdown-based dashboard cards
(`dashboards/next_event_card.yaml`, `dashboards/motogp_dashboard.yaml`). Markdown cards are
zero-install but limited to tables/lists/bold — no colored chips, team colors, live countdown,
or interactive per-class controls. This project adds **two custom Lit/TypeScript Lovelace
cards** for a richer, native-looking UI, bundled with and auto-registered by the integration so
users need no manual resource install. The existing Markdown cards remain as a no-install
fallback.

Scope was confirmed with the user:
- **Two cards**: a "Next event" card and a "Results" (standings + latest podium) card.
- **Build**: TypeScript + Lit, bundled to a single committed JS file.
- **Schedule layout**: chronological by day (all classes interleaved in run order).
- **Registration**: bundled in the integration, auto-registered as a Lovelace resource.
- **GUI config editor**: included.

## Data sources (existing entities — no integration data changes)

- `sensor.motogp_next_event`: state = start timestamp; attributes `name`, `shortname`,
  `country`, `circuit`, `city`, `circuit_info` (`length_km`, `length_m`, `corners`,
  `left_corners`, `right_corners`, `longest_straight_m`, `width_m`, `designer`, `constructed`,
  `country_code`, `lat`, `lng`), `date_start`, `date_end`, `status`, `days_until`, and
  `schedule` (flat list of `{class: MGP|MT2|MT3, session, kind: PRACTICE|QUALIFYING|SPRINT|RACE,
  start, end}`, chronological).
- `sensor.motogp_<class>_standings`: state = leader; attribute `standings` (list of
  `{position, rider, team, points}`), `leader_points`, `leader_team`.
- `sensor.motogp_<class>_latest_result`: state = winner; attributes `event`, `date`, `circuit`,
  `podium` (list of `{position, rider, team, points}`).

The API exposes **no rider photos or track-map images** in a readily usable form, so visuals are
built from: country flag (derived from `country_code`), class colors, a hardcoded team-colors
map, a live countdown, session-kind markers, and HA theme variables.

## Repository structure

```
frontend/                         # dev-only source; not needed by end users
  package.json
  tsconfig.json
  build.mjs                       # esbuild bundle script
  src/
    motogp-next-event-card.ts     # <motogp-next-event-card>
    motogp-results-card.ts        # <motogp-results-card>
    editors/
      next-event-card-editor.ts
      results-card-editor.ts
    shared/
      types.ts                    # HomeAssistant, LovelaceCard, config interfaces
      styles.ts                   # shared css`` (ha-card theming)
      format.ts                   # countdown, date/day grouping, schedule helpers
      team-colors.ts              # team + class color maps
  test/                           # vitest unit tests for shared/ helpers
custom_components/motogp/
  frontend/
    motogp-cards.js               # BUILT, minified, committed — shipped to users
```

Build: `cd frontend && npm ci && npm run build` runs esbuild → writes
`custom_components/motogp/frontend/motogp-cards.js` (IIFE/ESM, minified, `sourcemap` off for the
committed artifact). A CI job (`.github/workflows/frontend.yml`) runs the build and fails if the
committed bundle differs from a fresh build, preventing drift.

## Registration in the integration

In `custom_components/motogp/__init__.py` `async_setup_entry` (once per HA instance, guarded so
it registers only once):

1. `hass.http.register_static_path("/motogp/motogp-cards.js", <path to bundle>, cache_headers=...)`
   (use the async static-path registration API appropriate to the supported HA version).
2. `homeassistant.components.frontend.add_extra_js_url(hass, "/motogp/motogp-cards.js")`.

This makes `motogp-next-event-card` and `motogp-results-card` available in the dashboard card
picker after the integration is set up — no manual Lovelace resource entry, no separate HACS
frontend plugin. Registration must be idempotent across multiple config entries / reloads.

## Card 1 — `motogp-next-event-card`

Reads `sensor.motogp_next_event` (entity overridable via config).

- **Header**: event name; country flag from `country_code`; a **live countdown** to
  `date_start` that re-renders every second (`In 3d 04:12:57` → `Starts today` → `Under way`);
  formatted `date_start`–`date_end` range.
- **Circuit strip** (when `show_circuit`): stat pills for length (`length_km` km), corners
  (`corners`, with L/R), longest straight, width, designer, built — each omitted if null.
- **Schedule**: chronological, grouped under day headings (Friday/Saturday/Sunday). Each row:
  local time · class chip (colored per class) · session name, with 🏁 (Race) / ⚡ (Sprint)
  markers. The **next upcoming session** (first with `start >= now`) is visually highlighted.
  `classes` config filters which of MGP/MT2/MT3 appear.

## Card 2 — `motogp-results-card`

Reads `sensor.motogp_<class>_standings` and `sensor.motogp_<class>_latest_result`.

- **Standings** (when `show_standings`): a class selector (MotoGP/Moto2/Moto3); for the selected
  class, a rank/rider/points table with the leader emphasized.
- **Latest podium** (when `show_podium`): 🥇🥈🥉 rider rows for the selected class with
  team-color accents and the event name.
- `classes` limits available classes; `default_class` sets the initial selection.

## Configuration & GUI editors

Both cards implement `static getConfigElement()` and `static getStubConfig()`; editors are Lit
elements using `ha-form`/native inputs. All config keys optional with defaults:

- **next-event**: `entity` (default `sensor.motogp_next_event`), `title?`, `show_circuit`
  (true), `show_countdown` (true), `classes` (default `['MGP','MT2','MT3']`).
- **results**: `title?`, `classes` (default all), `show_standings` (true), `show_podium` (true),
  `default_class` (`'MGP'`), plus optional `team_colors` override map.

`getStubConfig` returns a working config so a freshly added card renders immediately.

## Theming & robustness

- Styles are scoped in each element and use HA CSS custom properties
  (`--ha-card-*`, `--card-background-color`, `--primary-text-color`, `--secondary-text-color`,
  `--divider-color`, `--primary-color`) so both cards inherit the active theme and match native
  cards in light and dark.
- Responsive: chips/pills wrap; the card is usable at narrow (mobile) widths.
- Graceful degradation: show a friendly message when the entity is `unavailable`/missing, when
  `schedule` is empty, and when `circuit_info` is absent (integration < 0.2.0).
- `getCardSize()` implemented for masonry layout.

## Testing & verification

- **vitest** unit tests for pure helpers in `shared/`: countdown formatting across boundaries
  (future / today / underway), day-grouping of the schedule, class filtering, team/class color
  lookup with fallback.
- **Python** test asserting the integration registers the static path and adds the extra JS URL
  (mock `hass.http` / `add_extra_js_url`).
- **CI** builds the bundle and checks it matches the committed artifact.
- **Manual**: `npm run build`; in a running HA add both cards via the picker; verify rendering,
  the live countdown, class chips/colors, the GUI editors, and light/dark + mobile widths.

## Release

Ship as **v0.3.0**: bump `manifest.json`, add a `CHANGELOG.md` entry (custom cards + integration
auto-registration), and add a "Custom cards" section to `README.md` (with a note that the
Markdown cards remain as a zero-install alternative). No AI attribution in commits.

## Out of scope / decisions

- Rider photos and track-map images: not available from the API; not attempted.
- A single tabbed mega-card: rejected in favor of two focused cards.
- Separate HACS frontend plugin / manual www install: rejected in favor of integration-bundled
  auto-registration.
- No changes to the coordinator or API client — cards consume existing entity data only.
