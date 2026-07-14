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

## Sample dashboard card

A ready-to-paste card that shows a **next-race countdown**, the **session schedule**, the
**MotoGP standings** and the **latest podium**. It uses only built-in cards (no custom
frontend resources required). Add it via **Dashboard → Edit → ⋮ → Raw configuration editor**,
or as a single card with **Add card → Manual**.

```yaml
type: vertical-stack
cards:
  # --- Next race + countdown ---
  - type: markdown
    content: >
      ## 🏁 {{ state_attr('sensor.motogp_next_event', 'name') }}

      **{{ state_attr('sensor.motogp_next_event', 'circuit') }}**,
      {{ state_attr('sensor.motogp_next_event', 'country') }}

      {% set start = states('sensor.motogp_next_event') %}
      {% if start not in ['unknown', 'unavailable'] %}
      🕒 Lights out
      <font color="#e2001a">**{{ (as_datetime(start) - now()).days }}
      days**</font> from now
      — {{ as_timestamp(start) | timestamp_custom('%a %d %b, %H:%M') }}
      {% endif %}

  # --- Session schedule (this weekend) ---
  - type: markdown
    content: >
      ### Schedule
      {% for s in state_attr('sensor.motogp_next_event', 'schedule') %}
      {% if s.class == 'MGP' %}
      - **{{ s.session }}** · {{ as_timestamp(s.start) | timestamp_custom('%a %H:%M') }}
      {% endif %}
      {% endfor %}

  # --- Championship standings (top 5) ---
  - type: markdown
    content: >
      ### 🏆 MotoGP standings
      {% for r in state_attr('sensor.motogp_motogp_standings', 'standings') %}
      {{ r.position }}. **{{ r.rider }}** — {{ r.points }} pts _({{ r.team }})_
      {% endfor %}

  # --- Latest race podium ---
  - type: markdown
    content: >
      ### 🥇 Latest result — {{ state_attr('sensor.motogp_motogp_latest_result', 'event') }}
      {% set medals = {1: '🥇', 2: '🥈', 3: '🥉'} %}
      {% for r in state_attr('sensor.motogp_motogp_latest_result', 'podium') %}
      {{ medals[r.position] }} **{{ r.rider }}** _({{ r.team }})_
      {% endfor %}

  # --- Full season calendar ---
  - type: calendar
    title: MotoGP calendar
    entities:
      - calendar.motogp_calendar
```

> Swap `motogp` for `moto2` / `moto3` in the standings and result entity ids (and the `MGP`
> filter in the schedule loop → `MT2` / `MT3`) to feature a different class.

## "Next event" card (circuit data + full weekend schedule)

A dedicated Markdown card that shows the upcoming round's **circuit data** (track length,
corners, longest straight, designer, …) and the **complete weekend schedule for all three
classes** in one chronological, day-by-day table. It reads the enriched `circuit_info`
attribute and the `schedule` list from `sensor.motogp_next_event`, and needs no custom
frontend resources.

The full YAML lives in [`dashboards/next_event_card.yaml`](dashboards/next_event_card.yaml).
Add it via **Dashboard → Edit → Add card → Manual** and paste the file's contents.

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
