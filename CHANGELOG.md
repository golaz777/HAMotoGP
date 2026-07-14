# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/) and the project uses semantic versioning.

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
