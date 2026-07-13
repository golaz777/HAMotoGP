"""Constants for the MotoGP integration."""

from __future__ import annotations

from datetime import timedelta
from typing import Final

DOMAIN: Final = "motogp"

# Public (unofficial) MotoGP JSON API. GET-only, no authentication required.
API_BASE_URL: Final = "https://api.motogp.pulselive.com/motogp/v1"

# Endpoint paths (relative to API_BASE_URL).
EP_SEASONS: Final = "/results/seasons"
EP_EVENTS: Final = "/events"  # ?seasonYear=YYYY  (broadcast events w/ sessions)
EP_CATEGORIES: Final = "/results/categories"  # ?seasonUuid=...
EP_STANDINGS: Final = "/results/standings"  # ?seasonUuid=...&categoryUuid=...
EP_RESULT_EVENTS: Final = "/results/events"  # ?seasonUuid=...&isFinished=true
EP_SESSIONS: Final = "/results/sessions"  # ?eventUuid=...&categoryUuid=...
EP_CLASSIFICATION: Final = "/results/session/{session_id}/classification"

# Config / options keys.
CONF_CLASSES: Final = "classes"
CONF_SCAN_INTERVAL_HOURS: Final = "scan_interval_hours"

DEFAULT_SCAN_INTERVAL_HOURS: Final = 6
MIN_SCAN_INTERVAL_HOURS: Final = 1
MAX_SCAN_INTERVAL_HOURS: Final = 24
DEFAULT_SCAN_INTERVAL: Final = timedelta(hours=DEFAULT_SCAN_INTERVAL_HOURS)

# Number of top rows to expose in standings / results attributes.
TOP_N: Final = 5

# Supported racing classes.
# ``legacy_id`` maps a class to its entry in the season categories endpoint;
# ``acronym`` maps to the per-session ``category.acronym`` in broadcast events.
CLASS_MOTOGP: Final = "motogp"
CLASS_MOTO2: Final = "moto2"
CLASS_MOTO3: Final = "moto3"

CLASSES: Final[dict[str, dict[str, object]]] = {
    CLASS_MOTOGP: {"name": "MotoGP", "legacy_id": 3, "acronym": "MGP"},
    CLASS_MOTO2: {"name": "Moto2", "legacy_id": 2, "acronym": "MT2"},
    CLASS_MOTO3: {"name": "Moto3", "legacy_id": 1, "acronym": "MT3"},
}

DEFAULT_CLASSES: Final = [CLASS_MOTOGP, CLASS_MOTO2, CLASS_MOTO3]

# Broadcast session ``kind``/``type`` values considered "real" race-weekend
# sessions worth listing in the next-event schedule.
SESSION_KINDS: Final = {"PRACTICE", "QUALIFYING", "RACE", "SPRINT"}

# Event ``kind`` for a real Grand Prix round (as opposed to TEST / MEDIA).
EVENT_KIND_GP: Final = "GP"
STATUS_FINISHED: Final = "FINISHED"
