"""Diagnostics support for the MotoGP integration."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from . import MotoGPConfigEntry


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: MotoGPConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    coordinator = entry.runtime_data
    data = coordinator.data or {}
    return {
        "options": dict(entry.options),
        "selected_classes": coordinator.selected_classes,
        "season": data.get("season"),
        "event_count": len(data.get("events", [])),
        "next_event": data.get("next_event"),
        "standings": data.get("standings"),
        "latest_result": data.get("latest_result"),
    }
