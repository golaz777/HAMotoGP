# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/) and the project uses semantic versioning.

## [0.1.0] - 2026-07-13

### Added
- Initial release of the MotoGP custom integration.
- Config flow (UI setup) with options for racing classes (MotoGP / Moto2 / Moto3) and
  refresh interval.
- `DataUpdateCoordinator` polling the public MotoGP JSON API.
- Calendar entity listing every Grand Prix round of the season.
- Next-event sensor (timestamp) with circuit, countdown and session schedule attributes.
- Per-class championship standings sensors (top 5).
- Per-class latest-result sensors (race podium).
- Diagnostics support and a test suite backed by recorded API fixtures.
