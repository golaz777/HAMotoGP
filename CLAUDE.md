# Repository guidance

MotoGP calendar/events **Home Assistant custom integration** (`custom_components/motogp`).
Installed via HACS, set up through a UI config flow. Not an add-on — it registers HA
entities via a `DataUpdateCoordinator`.

## Architecture

- `api.py` — `MotoGPApiClient`: thin async wrapper over the public MotoGP JSON API
  (`api.motogp.pulselive.com/motogp/v1`, GET-only, no auth). Uses HA's shared aiohttp session.
- `coordinator.py` — fetches the current season, broadcast events (calendar), standings and
  latest race results, and reduces them to tidy structures for the entities.
- `config_flow.py` — single-instance user flow + options flow (classes, refresh interval).
- `entity.py` — shared `MotoGPEntity` (one "MotoGP" device).
- `sensor.py` / `calendar.py` — the entities.

## API notes (verified July 2026)

- Real Grand Prix rounds have `kind == "GP"`; `status` is `FINISHED` or `NOT-STARTED`.
- Broadcast `type == "SESSION"` are sporting sessions; `type == "MEDIA"` are press/shows.
- Session class is in `broadcast.category.acronym` (`MGP`/`MT2`/`MT3`).
- Standings/results categories come from `/results/categories?seasonUuid=…`, matched by
  `legacy_id` (MotoGP 3, Moto2 2, Moto3 1).
- Latest results: newest non-`test` finished event → sessions → `type == "RAC"` →
  `/results/session/{id}/classification`.
- Datetimes come in two offset forms (`+01:00` and `+0100`); parse with `dt_util.parse_datetime`.

## Testing

```bash
pip install -r requirements-test.txt
pytest
```

Tests use recorded fixtures in `tests/fixtures/` and a stubbed `MotoGPApiClient`. To refresh
fixtures, re-capture from the live endpoints and trim large payloads.

## Release process

- Version lives only in `custom_components/motogp/manifest.json`.
- Bump it, add a `CHANGELOG.md` entry (`## [x.y.z] - YYYY-MM-DD`), commit with a conventional
  commit message, and tag the release.
