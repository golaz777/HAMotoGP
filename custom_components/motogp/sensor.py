"""Sensor platform for the MotoGP integration."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import MotoGPConfigEntry
from .const import CLASSES
from .coordinator import MotoGPDataUpdateCoordinator
from .entity import MotoGPEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: MotoGPConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up MotoGP sensors from a config entry."""
    coordinator = entry.runtime_data
    entities: list[SensorEntity] = [MotoGPNextEventSensor(coordinator)]
    for class_key in coordinator.selected_classes:
        entities.append(MotoGPStandingsSensor(coordinator, class_key))
        entities.append(MotoGPLatestResultSensor(coordinator, class_key))
    async_add_entities(entities)


class MotoGPNextEventSensor(MotoGPEntity, SensorEntity):
    """The upcoming Grand Prix round, as a timestamp with rich attributes."""

    _attr_translation_key = "next_event"
    _attr_icon = "mdi:flag-checkered"
    _attr_device_class = SensorDeviceClass.TIMESTAMP

    def __init__(self, coordinator: MotoGPDataUpdateCoordinator) -> None:
        """Initialise the next-event sensor."""
        super().__init__(coordinator)
        self._attr_unique_id = f"{coordinator.entry.entry_id}_next_event"

    @property
    def _event(self) -> dict[str, Any] | None:
        return self.coordinator.data.get("next_event")

    @property
    def native_value(self) -> datetime | None:
        """Return the start time of the next round."""
        event = self._event
        return event["date_start"] if event else None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Expose circuit, schedule and countdown details."""
        event = self._event
        if not event:
            return None
        now = dt_util.utcnow()
        start = event["date_start"]
        days_until = (start - now).days if start else None
        circuit = event["circuit"]
        return {
            "name": event["name"],
            "shortname": event["shortname"],
            "country": event["country"],
            "circuit": circuit["name"],
            "city": circuit["city"],
            "circuit_info": {k: v for k, v in circuit.items() if k != "name"},
            "date_start": event["date_start"],
            "date_end": event["date_end"],
            "status": event["status"],
            "days_until": days_until,
            "schedule": [
                {
                    "class": s["class"],
                    "session": s["name"] or s["shortname"],
                    "kind": s["kind"],
                    "start": s["start"],
                    "end": s["end"],
                    "num_laps": s.get("num_laps"),
                    "has_live": s.get("has_live"),
                    "has_on_demand": s.get("has_on_demand"),
                }
                for s in event["sessions"]
            ],
            "race_info": event.get("race_info"),
        }


class MotoGPStandingsSensor(MotoGPEntity, SensorEntity):
    """Championship standings leader for a class, with top-N attribute."""

    _attr_icon = "mdi:trophy"

    def __init__(
        self, coordinator: MotoGPDataUpdateCoordinator, class_key: str
    ) -> None:
        """Initialise a standings sensor for a class."""
        super().__init__(coordinator)
        self._class_key = class_key
        class_name = CLASSES[class_key]["name"]
        self._attr_name = f"{class_name} standings"
        self._attr_unique_id = f"{coordinator.entry.entry_id}_{class_key}_standings"

    @property
    def _rows(self) -> list[dict[str, Any]]:
        return self.coordinator.data.get("standings", {}).get(self._class_key, [])

    @property
    def native_value(self) -> str | None:
        """Return the championship leader's name."""
        rows = self._rows
        return rows[0]["rider"] if rows else None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Expose the top-N standings."""
        rows = self._rows
        if not rows:
            return None
        leader = rows[0]
        return {
            "leader_points": leader["points"],
            "leader_team": leader["team"],
            "leader_wins": leader.get("race_wins"),
            "leader_podiums": leader.get("podiums"),
            "standings": rows,
        }


class MotoGPLatestResultSensor(MotoGPEntity, SensorEntity):
    """Winner of the most recent race for a class, with podium attribute."""

    _attr_icon = "mdi:podium-gold"

    def __init__(
        self, coordinator: MotoGPDataUpdateCoordinator, class_key: str
    ) -> None:
        """Initialise a latest-result sensor for a class."""
        super().__init__(coordinator)
        self._class_key = class_key
        class_name = CLASSES[class_key]["name"]
        self._attr_name = f"{class_name} latest result"
        self._attr_unique_id = (
            f"{coordinator.entry.entry_id}_{class_key}_latest_result"
        )

    @property
    def _result(self) -> dict[str, Any] | None:
        return self.coordinator.data.get("latest_result", {}).get(self._class_key)

    @property
    def native_value(self) -> str | None:
        """Return the race winner's name."""
        result = self._result
        if not result or not result["podium"]:
            return None
        return result["podium"][0]["rider"]

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Expose the event, date and podium."""
        result = self._result
        if not result:
            return None
        records = result.get("records") or []
        return {
            "event": result["event"],
            "date": result["date"],
            "circuit": result["circuit"],
            "weather": result.get("weather"),
            "podium": result["podium"],
            "results": result.get("results", result["podium"]),
            "records": records,
            "pole": next((r for r in records if r["type"] == "poleLap"), None),
            "fastest_lap": next(
                (r for r in records if r["type"] == "fastestLap"), None
            ),
        }
