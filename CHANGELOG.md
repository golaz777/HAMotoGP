# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/) and the project uses semantic versioning.

## [0.5.1] - 2026-07-14

### Added
- Track layout image on the "Next event" card. The integration now exposes the circuit's
  official artwork (`circuit_info.track_map`, the detailed SVG with numbered corners and
  sectors, plus `circuit_info.track_map_simple`, the plain PNG silhouette) from the MotoGP API.
  The custom `motogp-next-event-card` renders the detailed map below the circuit stats, toggled
  by a new `show_track_map` option (default on) in the visual editor. The Markdown fallback
  cards (`dashboards/next_event_card.yaml` and the copy in `dashboards/motogp_dashboard.yaml`)
  show it too.

## [0.4.0] - 2026-07-14

### Changed
- Redesigned the "Next event" card with a MotoGP-branded look. The custom
  `motogp-next-event-card` now leads with a red gradient hero (country flag, GP name and a
  translucent live-countdown pill over a checkered speed strip), rounder class-coloured chips,
  red-underlined day headers, and a highlighted "NEXT" session (accent left-border + tint).
- Refreshed the Markdown fallback card (`dashboards/next_event_card.yaml` and the copy in
  `dashboards/motogp_dashboard.yaml`) to match: a country-flag header, upper-cased Grand Prix
  name, a tighter meta line, and cleaner weekend-schedule tables.

## [0.3.0] - 2026-07-14

### Added
- Two custom Lovelace cards, bundled with the integration and auto-registered (no manual
  resource install): `motogp-next-event-card` (circuit data, live countdown and the full
  weekend schedule for all three classes) and `motogp-results-card` (per-class standings and
  the latest podium). Configurable via the dashboard GUI editor.

### Changed
- Minimum Home Assistant version is now 2024.7.0 (for `async_register_static_paths`).

## [0.2.0] - 2026-07-14

### Added
- Enriched circuit data on the next-event sensor: a new `circuit_info` attribute exposing
  track length, corner counts (left/right/total), longest straight, width, designer,
  construction year, country code and coordinates.
- A dedicated "Next event" Markdown dashboard card (`dashboards/next_event_card.yaml`) showing
  the circuit data and the full weekend schedule for all three classes as a day-by-day table.

## [0.1.0] - 2026-07-13

### Added
- Initial release of the MotoGP custom integration. Requires Home Assistant 2024.6 or newer.
- Config flow (UI setup) with options for racing classes (MotoGP / Moto2 / Moto3) and
  refresh interval.
- `DataUpdateCoordinator` polling the public MotoGP JSON API.
- Calendar entity listing every Grand Prix round of the season.
- Next-event sensor (timestamp) with circuit, countdown and session schedule attributes.
- Per-class championship standings sensors (top 5).
- Per-class latest-result sensors (race podium).
- Diagnostics support and a test suite backed by recorded API fixtures.
