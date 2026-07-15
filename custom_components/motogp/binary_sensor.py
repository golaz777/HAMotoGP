"""Binary sensor platform for the MotoGP integration."""

from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
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
    """Set up MotoGP binary sensors from a config entry."""
    coordinator = entry.runtime_data
    async_add_entities([MotoGPSessionLiveBinarySensor(coordinator)])


def _session_summary(session: dict[str, Any]) -> dict[str, Any]:
    """Reduce a parsed session to the fields exposed as attributes."""
    return {
        "class": session["class"],
        "class_name": session.get("class_name"),
        "session": session["name"] or session["shortname"],
        "kind": session["kind"],
        "start": session["start"],
        "end": session["end"],
        "num_laps": session.get("num_laps"),
    }


class MotoGPSessionLiveBinarySensor(MotoGPEntity, BinarySensorEntity):
    """On while a race-weekend session is currently running.

    Computed from the next round's session start/end windows rather than the
    API's ``is_live`` flag, which is stale between coordinator refreshes.
    """

    _attr_translation_key = "session_live"
    _attr_icon = "mdi:broadcast"
    _attr_device_class = BinarySensorDeviceClass.RUNNING

    def __init__(self, coordinator: MotoGPDataUpdateCoordinator) -> None:
        """Initialise the session-live binary sensor."""
        super().__init__(coordinator)
        self._attr_unique_id = f"{coordinator.entry.entry_id}_session_live"

    @property
    def _sessions(self) -> list[dict[str, Any]]:
        event = self.coordinator.data.get("next_event")
        return event["sessions"] if event else []

    @property
    def _live_session(self) -> dict[str, Any] | None:
        now = dt_util.utcnow()
        for session in self._sessions:
            start, end = session["start"], session["end"]
            if start and end and start <= now <= end:
                return session
        return None

    @property
    def is_on(self) -> bool:
        """Return whether a session is live right now."""
        return self._live_session is not None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Expose the live session (if any) and the next upcoming one."""
        now = dt_util.utcnow()
        live = self._live_session
        upcoming = next(
            (s for s in self._sessions if s["start"] and s["start"] > now), None
        )
        return {
            "live_session": _session_summary(live) if live else None,
            "next_session": _session_summary(upcoming) if upcoming else None,
        }
