"""Calendar platform for the MotoGP integration."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import MotoGPConfigEntry
from .coordinator import MotoGPDataUpdateCoordinator
from .entity import MotoGPEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: MotoGPConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the MotoGP calendar from a config entry."""
    async_add_entities([MotoGPCalendar(entry.runtime_data)])


def _to_calendar_event(event: dict[str, Any]) -> CalendarEvent | None:
    """Convert a parsed round into a CalendarEvent (skip if no start)."""
    start = event.get("date_start")
    if start is None:
        return None
    end = event.get("date_end") or start
    circuit = event["circuit"]
    location = ", ".join(
        part for part in (circuit.get("name"), circuit.get("country")) if part
    )
    description_lines = [
        f"{s['class']} {s['name'] or s['shortname']}: "
        f"{dt_util.as_local(s['start']).strftime('%a %H:%M') if s['start'] else 'TBC'}"
        for s in event["sessions"]
    ]
    return CalendarEvent(
        start=start,
        end=end,
        summary=event["name"] or "MotoGP round",
        location=location or None,
        description="\n".join(description_lines) or None,
    )


class MotoGPCalendar(MotoGPEntity, CalendarEntity):
    """A calendar of the MotoGP season's Grand Prix rounds."""

    _attr_translation_key = "calendar"
    _attr_icon = "mdi:calendar-star"

    def __init__(self, coordinator: MotoGPDataUpdateCoordinator) -> None:
        """Initialise the calendar entity."""
        super().__init__(coordinator)
        self._attr_unique_id = f"{coordinator.entry.entry_id}_calendar"

    @property
    def _events(self) -> list[dict[str, Any]]:
        return self.coordinator.data.get("events", [])

    @property
    def event(self) -> CalendarEvent | None:
        """Return the next (or currently running) round."""
        now = dt_util.utcnow()
        for parsed in self._events:
            end = parsed.get("date_end") or parsed.get("date_start")
            if end and end >= now:
                return _to_calendar_event(parsed)
        return None

    async def async_get_events(
        self, hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        """Return rounds overlapping the requested window."""
        results: list[CalendarEvent] = []
        for parsed in self._events:
            cal_event = _to_calendar_event(parsed)
            if cal_event is None:
                continue
            if cal_event.start < end_date and cal_event.end > start_date:
                results.append(cal_event)
        return results
