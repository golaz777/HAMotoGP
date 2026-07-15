# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/) and the project uses semantic versioning.

## [0.6.3] - 2026-07-15

### Changed
- **Podium team-color bar.** The team-color swatch on podium rows now spans the full row height
  (44px), matching the medal icon and rider photo for a more consistent look.

## [0.6.2] - 2026-07-15

### Changed
- **Podium medal icon.** The medal emoji is now sized to match the rider photo height (44px) so
  it no longer looks tiny beside the portrait.

## [0.6.1] - 2026-07-15

### Fixed
- **Podium result rows.** Rider names no longer break mid-name — each row now stacks the name over
  the team/gap/speed description, and the podium rider photos are larger (44px).

## [0.6.0] - 2026-07-14

### Added
- **Live race weather.** The latest-result sensors now expose a `weather` attribute (track/air/
  ground/humidity/condition) captured from the most recent finished race session. The Results card
  shows it as a weather strip under the event title, toggled by a new `show_weather` option.
  (Note: this is the last race's weather — the API provides no forecast for upcoming events.)
- **Richer race results.** Each result row now carries `time`, `gap`, `average_speed`, `status`,
  `constructor` and rider `number`, and the latest-result sensors expose the full field as a new
  `results` attribute (not just the top-3 `podium`). The Results card shows the winner's time and
  each rider's gap and average speed.
- **Rider photos.** A new `/riders` endpoint is queried to build a portrait lookup; standings and
  podium rows now include a `photo` URL and the Results card renders round rider avatars. Rider
  photos are optional — a `/riders` failure degrades gracefully with no photos.

## [0.5.2] - 2026-07-14

### Added
- **Class selector on the "Next event" card.** A "Classes" dropdown in the
  `motogp-next-event-card` visual editor limits the weekend schedule to a single class — MotoGP,
  Moto2 or Moto3 — or shows all three. Backed by the existing `classes` config option, so
  multi-class YAML configs (e.g. `classes: [MGP, MT2]`) keep working.

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
