"""Tests for the MotoGP data update coordinator."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest
from homeassistant.core import HomeAssistant

from custom_components.motogp.const import (
    CONF_CLASSES,
    CONF_SCAN_INTERVAL_HOURS,
    DEFAULT_CLASSES,
)
from custom_components.motogp.coordinator import MotoGPDataUpdateCoordinator


def _make_entry(options=None) -> MagicMock:
    entry = MagicMock()
    entry.options = options or {
        CONF_CLASSES: DEFAULT_CLASSES,
        CONF_SCAN_INTERVAL_HOURS: 6,
    }
    entry.entry_id = "test-entry"
    return entry


async def test_update_builds_structured_data(hass: HomeAssistant, mock_client) -> None:
    """The coordinator should assemble season, events, standings and results."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    assert data["season"]["year"] == 2026
    assert data["events"], "expected at least one GP event"
    # Events are sorted and only GP rounds retained.
    assert all(e["status"] in ("FINISHED", "NOT-STARTED") for e in data["events"])


async def test_next_event_is_first_upcoming(hass: HomeAssistant, mock_client) -> None:
    """next_event should skip finished rounds."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    next_event = data["next_event"]
    assert next_event is not None
    assert next_event["status"] != "FINISHED"


async def test_next_event_circuit_enriched(hass: HomeAssistant, mock_client) -> None:
    """next_event circuit should carry rich track metrics from the API."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    circuit = data["next_event"]["circuit"]
    assert circuit["name"]
    assert circuit["country_code"]
    assert isinstance(circuit["length_m"], int) and circuit["length_m"] > 0
    assert isinstance(circuit["corners"], int) and circuit["corners"] > 0
    assert circuit["corners"] == circuit["left_corners"] + circuit["right_corners"]


def test_parse_circuit_defensive() -> None:
    """A partial or empty circuit object must not raise and yields None fields."""
    empty = MotoGPDataUpdateCoordinator._parse_circuit({})
    assert empty["name"] is None
    assert empty["length_m"] is None
    assert empty["corners"] is None

    blanks = MotoGPDataUpdateCoordinator._parse_circuit(
        {"name": "X", "track": {"left_corners": "", "lenght": "abc"}}
    )
    assert blanks["name"] == "X"
    assert blanks["length_m"] is None
    assert blanks["left_corners"] is None
    assert blanks["corners"] is None


async def test_standings_parsed_top_n(hass: HomeAssistant, mock_client) -> None:
    """Standings should be reduced to leader-first top rows."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    motogp = data["standings"]["motogp"]
    assert motogp[0]["position"] == 1
    assert motogp[0]["rider"]
    assert len(motogp) <= 5


async def test_latest_result_has_podium(hass: HomeAssistant, mock_client) -> None:
    """Latest result should return a three-rider podium."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    result = data["latest_result"]["motogp"]
    assert result is not None
    assert len(result["podium"]) == 3
    assert result["podium"][0]["position"] == 1


async def test_selected_classes_filtering(hass: HomeAssistant, mock_client) -> None:
    """Only configured classes should be queried."""
    entry = _make_entry({CONF_CLASSES: ["motogp"], CONF_SCAN_INTERVAL_HOURS: 6})
    coordinator = MotoGPDataUpdateCoordinator(hass, entry, mock_client)
    data = await coordinator._async_update_data()

    assert set(data["standings"].keys()) == {"motogp"}
