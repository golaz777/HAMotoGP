# MotoGP for Home Assistant

A custom integration that brings the **MotoGP, Moto2 and Moto3** calendar, standings and
results into Home Assistant — as a native **calendar entity** plus **sensors** for the next
round, championship standings and the latest race podium.

Data comes from the public (unofficial) MotoGP JSON API
(`api.motogp.pulselive.com`). No account or API key is required.

## Features

- 📅 **Calendar entity** (`calendar.motogp_calendar`) — every Grand Prix round of the season,
  usable on the Calendar dashboard and in automations.
- 🏁 **Next event sensor** (`sensor.motogp_next_event`) — a timestamp of the next round with
  attributes for circuit, city, country, days-until and the full session schedule (FP,
  qualifying, sprint, race times).
- 🏆 **Standings sensors** (per class) — championship leader with the top-5 as an attribute.
- 🥇 **Latest result sensors** (per class) — the most recent race winner with the podium.

Requires **Home Assistant 2024.6 or newer**.

### HACS (recommended)

1. In HACS → **Integrations** → ⋮ → **Custom repositories**, add this repository as an
   *Integration*.
2. Install **MotoGP** and restart Home Assistant.

### Manual

1. Copy the **`motogp`** folder so it lands at exactly:

   ```
   config/custom_components/motogp/manifest.json
   ```

   ⚠️ Copy the `custom_components/motogp` folder itself — **not** the whole repository. A
   double-nested path like `config/custom_components/HAMotoGP/custom_components/motogp/` will
   **not** be detected.
2. **Fully restart** Home Assistant (Settings → System → Restart — not just "Quick reload").

### Where to find it after installing

This is an **integration**, so it appears under **Settings → Devices & Services →
+ Add Integration** (search "MotoGP"). It is **not** a Supervisor add-on, so it will **never**
show up under **Settings → Add-ons / local add-ons**.

## Configuration

Add the integration via **Settings → Devices & Services → Add Integration → MotoGP**.

In the setup (and later under the integration's **Configure** / options) you can choose:

| Option | Description | Default |
|--------|-------------|---------|
| **Racing classes** | Which of MotoGP / Moto2 / Moto3 to track | all three |
| **Refresh interval (hours)** | How often to poll the API (1–24) | 6 |

The calendar changes rarely, so a 6-hour refresh is plenty; lower it on race weekends if you
want fresher session data.

## Entities

| Entity | Example state | Key attributes |
|--------|---------------|----------------|
| `calendar.motogp_calendar` | on/off | current/next round summary, location |
| `sensor.motogp_next_event` | round start timestamp | `circuit`, `city`, `country`, `days_until`, `schedule`, `circuit_info` (length, corners, longest straight, designer, …) |
| `sensor.motogp_<class>_standings` | leader name | `leader_points`, `standings` (top 5) |
| `sensor.motogp_<class>_latest_result` | winner name | `event`, `date`, `podium` |

## Dashboard

Two ready-to-paste layouts are provided in [`dashboards/`](dashboards/), built with only
**built-in cards** (no custom frontend resources / HACS cards required):

- [`next_event_card.yaml`](dashboards/next_event_card.yaml) — the **"Next event" card**: the
  upcoming round's **circuit data** (track length, corners, longest straight, designer, …), the
  **track layout map** (`circuit_info.track_map`), and the **complete weekend schedule for all
  three classes** as a chronological, day-by-day table.
  Reads the `circuit_info` and `schedule` attributes of `sensor.motogp_next_event`.
- [`motogp_dashboard.yaml`](dashboards/motogp_dashboard.yaml) — a **complete single-view
  dashboard**: the next-event card plus per-class championship standings, the latest podium and
  the season calendar.

**Add the single card**

1. Open your dashboard → **✏️ Edit dashboard**.
2. **+ Add Card** → scroll down → **Manual**.
3. Paste the contents of [`dashboards/next_event_card.yaml`](dashboards/next_event_card.yaml)
   → **Save**.

**Or drop in the whole dashboard**

For a complete view (next event + standings + latest podium + calendar), open
**Settings → Dashboards → + Add Dashboard** (or an existing one) → **✏️ Edit** → **⋮ →
Raw configuration editor**, then paste
[`dashboards/motogp_dashboard.yaml`](dashboards/motogp_dashboard.yaml).

**Prerequisites**

The card reads `sensor.motogp_next_event`, including its `circuit_info` attribute added in
**v0.2.0** — make sure the integration is set up and updated (0.1.0 has no `circuit_info`).
Verify in **Developer Tools → States** (filter `sensor.motogp_next_event`), and use
**Developer Tools → Template** to dry-run the card's Jinja against your live data before saving.

### Custom cards (richer UI)

Installing the integration also registers two custom Lovelace cards automatically — no manual
resource setup:

- **MotoGP Next Event** (`motogp-next-event-card`) — circuit stats, the track layout map, a live
  countdown, and the weekend schedule with colored class chips.
- **MotoGP Results** (`motogp-results-card`) — per-class standings and the latest podium.

Add them from **Dashboard → Edit → + Add Card** (search "MotoGP") and configure in the visual
editor. Requires Home Assistant 2024.7+. The Markdown cards above remain available as a
zero-JavaScript alternative.

## Development

```bash
python -m venv .venv && . .venv/bin/activate
pip install -r requirements-test.txt
pytest
```

Tests use recorded API fixtures in `tests/fixtures/` and
`pytest-homeassistant-custom-component`.

## Troubleshooting

**"I don't see it in Home Assistant."**
It is an integration, not an add-on — look under **Settings → Devices & Services →
+ Add Integration**, not under Add-ons / local add-ons.

**"It's not in the Add Integration list."**
- Confirm the files are at `config/custom_components/motogp/manifest.json` (no extra nesting).
- **Fully restart** Home Assistant after copying the files.
- Confirm you're running **Home Assistant 2024.6 or newer**.

**"It appears but fails to set up."**
Open **Settings → System → Logs** and look for a `custom_components.motogp` entry — the traceback
there names the cause (most often an HA version below 2024.6).

## Disclaimer

This project is **not affiliated with Dorna Sports or MotoGP** in any way, and uses an
undocumented public API that may change without notice. MIT licensed.
