"""Data update coordinator for the MotoGP integration."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .api import MotoGPApiClient, MotoGPApiError
from .const import (
    CLASSES,
    CONF_CLASSES,
    CONF_SCAN_INTERVAL_HOURS,
    DEFAULT_CLASSES,
    DEFAULT_SCAN_INTERVAL_HOURS,
    DOMAIN,
    EVENT_KIND_GP,
    STATUS_FINISHED,
    TOP_N,
)

_LOGGER = logging.getLogger(__name__)


def _parse_dt(value: str | None) -> datetime | None:
    """Parse an API datetime (handles both ``+01:00`` and ``+0100`` offsets)."""
    if not value:
        return None
    return dt_util.parse_datetime(value)


def _to_int(value: Any) -> int | None:
    """Coerce an API value (often a string) to int, or ``None`` if not possible."""
    try:
        return int(str(value).strip())
    except (TypeError, ValueError):
        return None


def _to_float(value: Any) -> float | None:
    """Coerce an API value (often a string) to float, or ``None`` if not possible."""
    try:
        return float(str(value).strip())
    except (TypeError, ValueError):
        return None


class MotoGPDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Fetch and structure MotoGP calendar, standings and results data."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        client: MotoGPApiClient,
    ) -> None:
        """Initialise the coordinator from a config entry."""
        self.entry = entry
        self.client = client
        hours = entry.options.get(
            CONF_SCAN_INTERVAL_HOURS, DEFAULT_SCAN_INTERVAL_HOURS
        )
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(hours=hours),
        )

    @property
    def selected_classes(self) -> list[str]:
        """Return the configured classes, filtered to known ones."""
        classes = self.entry.options.get(CONF_CLASSES, DEFAULT_CLASSES)
        return [c for c in classes if c in CLASSES]

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch everything needed by the entities."""
        try:
            season = await self.client.async_get_current_season()
            if not season:
                raise UpdateFailed("No current MotoGP season returned by the API")

            season_uuid = season["id"]
            season_year = season["year"]

            raw_events = await self.client.async_get_events(season_year)
            events = self._parse_events(raw_events)
            next_event = self._find_next_event(events)

            category_map = await self._build_category_map(season_uuid)
            standings = await self._fetch_standings(season_uuid, category_map)
            latest_result = await self._fetch_latest_results(
                season_uuid, category_map
            )
        except MotoGPApiError as err:
            raise UpdateFailed(str(err)) from err

        return {
            "season": season,
            "events": events,
            "next_event": next_event,
            "standings": standings,
            "latest_result": latest_result,
        }

    # -- Events / calendar -------------------------------------------------

    def _parse_events(self, raw_events: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Reduce broadcast events to Grand Prix rounds with tidy fields."""
        selected_acronyms = {
            CLASSES[c]["acronym"] for c in self.selected_classes
        }
        parsed: list[dict[str, Any]] = []
        for event in raw_events:
            if event.get("kind") != EVENT_KIND_GP:
                continue
            date_start = _parse_dt(event.get("date_start"))
            date_end = _parse_dt(event.get("date_end"))
            if date_start is None:
                continue
            parsed.append(
                {
                    "id": event.get("id"),
                    "name": (event.get("name") or "").strip(),
                    "shortname": event.get("shortname"),
                    "country": event.get("country"),
                    "status": event.get("status"),
                    "date_start": date_start,
                    "date_end": date_end,
                    "circuit": self._parse_circuit(event.get("circuit") or {}),
                    "sessions": self._parse_sessions(
                        event.get("broadcasts") or [], selected_acronyms
                    ),
                }
            )
        parsed.sort(key=lambda e: e["date_start"])
        return parsed

    @staticmethod
    def _parse_circuit(circuit: dict[str, Any]) -> dict[str, Any]:
        """Reduce the API circuit object to the fields the entities expose.

        Includes rich track metrics (length, corners, longest straight) when the
        API provides them. Every field is optional and may be ``None``.
        """
        track = circuit.get("track") or {}
        length_units = track.get("lenght_units") or {}
        width_units = track.get("width_units") or {}
        straight_units = track.get("longest_straight_units") or {}

        assets = track.get("assets") or {}
        info = assets.get("info") or {}
        simple = assets.get("simple") or {}

        left = _to_int(track.get("left_corners"))
        right = _to_int(track.get("right_corners"))
        corners = left + right if left is not None and right is not None else None

        # The API misspells "length" as "lenght"; prefer the parsed unit values.
        length_m = _to_int(length_units.get("meters")) or _to_int(track.get("lenght"))
        length_km = _to_float(length_units.get("kiloMeters"))

        return {
            "name": circuit.get("name"),
            "city": circuit.get("city"),
            "country": circuit.get("country"),
            "country_code": circuit.get("iso_code"),
            "designer": circuit.get("designer"),
            "constructed": circuit.get("constructed"),
            "lat": _to_float(circuit.get("lat")),
            "lng": _to_float(circuit.get("lng")),
            "length_m": length_m,
            "length_km": length_km,
            "width_m": _to_int(width_units.get("meters")) or _to_int(track.get("width")),
            "longest_straight_m": _to_int(straight_units.get("meters"))
            or _to_int(track.get("longest_straight")),
            "left_corners": left,
            "right_corners": right,
            "corners": corners,
            # Track layout artwork from the API (both optional).
            "track_map": info.get("path"),  # detailed SVG (numbered corners/sectors)
            "track_map_simple": simple.get("path"),  # plain PNG silhouette
        }

    @staticmethod
    def _parse_sessions(
        broadcasts: list[dict[str, Any]], selected_acronyms: set[str]
    ) -> list[dict[str, Any]]:
        """Extract the sporting sessions (skip press/media) for a round."""
        sessions: list[dict[str, Any]] = []
        for bc in broadcasts:
            if bc.get("type") != "SESSION":
                continue
            category = bc.get("category") or {}
            if selected_acronyms and category.get("acronym") not in selected_acronyms:
                continue
            start = _parse_dt(bc.get("date_start"))
            sessions.append(
                {
                    "class": category.get("acronym"),
                    "class_name": category.get("name"),
                    "kind": bc.get("kind"),
                    "shortname": bc.get("shortname"),
                    "name": (bc.get("name") or "").strip(),
                    "start": start,
                    "end": _parse_dt(bc.get("date_end")),
                }
            )
        sessions.sort(key=lambda s: s["start"] or dt_util.utcnow())
        return sessions

    @staticmethod
    def _find_next_event(events: list[dict[str, Any]]) -> dict[str, Any] | None:
        """Return the first upcoming (not finished) round."""
        now = dt_util.utcnow()
        for event in events:
            if event["status"] == STATUS_FINISHED:
                continue
            end = event["date_end"] or event["date_start"]
            if end and end >= now:
                return event
        return None

    # -- Categories / standings / results ----------------------------------

    async def _build_category_map(self, season_uuid: str) -> dict[str, str]:
        """Map each selected class key to its category UUID for this season."""
        categories = await self.client.async_get_categories(season_uuid)
        by_legacy = {c.get("legacy_id"): c.get("id") for c in categories}
        mapping: dict[str, str] = {}
        for class_key in self.selected_classes:
            legacy_id = CLASSES[class_key]["legacy_id"]
            category_id = by_legacy.get(legacy_id)
            if category_id:
                mapping[class_key] = category_id
        return mapping

    async def _fetch_standings(
        self, season_uuid: str, category_map: dict[str, str]
    ) -> dict[str, list[dict[str, Any]]]:
        """Fetch top-N championship standings per selected class."""
        result: dict[str, list[dict[str, Any]]] = {}
        for class_key, category_uuid in category_map.items():
            rows = await self.client.async_get_standings(season_uuid, category_uuid)
            result[class_key] = [
                {
                    "position": r.get("position"),
                    "rider": (r.get("rider") or {}).get("full_name"),
                    "team": (r.get("team") or {}).get("name"),
                    "points": r.get("points"),
                }
                for r in rows[:TOP_N]
            ]
        return result

    async def _fetch_latest_results(
        self, season_uuid: str, category_map: dict[str, str]
    ) -> dict[str, dict[str, Any] | None]:
        """Fetch the latest race podium per selected class."""
        finished = await self.client.async_get_finished_events(season_uuid)
        # Newest real (non-test) round first.
        races = [e for e in finished if not e.get("test")]
        races.sort(key=lambda e: e.get("date_end") or "", reverse=True)

        result: dict[str, dict[str, Any] | None] = {}
        for class_key, category_uuid in category_map.items():
            result[class_key] = await self._latest_result_for_class(
                races, category_uuid
            )
        return result

    async def _latest_result_for_class(
        self, races: list[dict[str, Any]], category_uuid: str
    ) -> dict[str, Any] | None:
        """Walk finished rounds until a race classification is found."""
        for event in races:
            sessions = await self.client.async_get_sessions(
                event["id"], category_uuid
            )
            race_session = next(
                (s for s in sessions if s.get("type") == "RAC"), None
            )
            if not race_session:
                continue
            rows = await self.client.async_get_classification(race_session["id"])
            if not rows:
                continue
            podium = [
                {
                    "position": r.get("position"),
                    "rider": (r.get("rider") or {}).get("full_name"),
                    "team": (r.get("team") or {}).get("name"),
                    "points": r.get("points"),
                }
                for r in rows[:3]
            ]
            return {
                "event": (event.get("name") or "").strip(),
                "date": event.get("date_end"),
                "circuit": (event.get("circuit") or {}).get("name"),
                "podium": podium,
            }
        return None
