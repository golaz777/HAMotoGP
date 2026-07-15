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
from custom_components.motogp.api import MotoGPApiError
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
    # Track layout artwork is exposed for the card (may be None if absent).
    assert "track_map" in circuit
    assert "track_map_simple" in circuit


def test_parse_circuit_track_map() -> None:
    """Track layout asset URLs are pulled from track.assets."""
    circuit = MotoGPDataUpdateCoordinator._parse_circuit(
        {
            "name": "Chang International Circuit",
            "track": {
                "assets": {
                    "info": {"path": "https://photos.motogp.com/.../tha-info.svg"},
                    "simple": {"path": "https://photos.motogp.com/.../tha.png"},
                }
            },
        }
    )
    assert circuit["track_map"] == "https://photos.motogp.com/.../tha-info.svg"
    assert circuit["track_map_simple"] == "https://photos.motogp.com/.../tha.png"


def test_parse_circuit_defensive() -> None:
    """A partial or empty circuit object must not raise and yields None fields."""
    empty = MotoGPDataUpdateCoordinator._parse_circuit({})
    assert empty["name"] is None
    assert empty["length_m"] is None
    assert empty["corners"] is None
    assert empty["track_map"] is None
    assert empty["track_map_simple"] is None

    blanks = MotoGPDataUpdateCoordinator._parse_circuit(
        {"name": "X", "track": {"left_corners": "", "lenght": "abc"}}
    )
    assert blanks["name"] == "X"
    assert blanks["length_m"] is None
    assert blanks["left_corners"] is None
    assert blanks["corners"] is None


async def test_next_event_race_info(hass: HomeAssistant, mock_client) -> None:
    """next_event should expose race distance / lap counts per class."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    race_info = data["next_event"]["race_info"]
    assert isinstance(race_info, dict) and race_info
    # Keyed by class acronym; each class has laps and distance.
    some = next(iter(race_info.values()))
    assert isinstance(some["num_laps"], int) and some["num_laps"] > 0
    assert isinstance(some["distance_km"], float) and some["distance_km"] > 0


async def test_sessions_carry_live_flags(hass: HomeAssistant, mock_client) -> None:
    """Parsed sessions should carry lap count and live/on-demand flags."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    sessions = data["next_event"]["sessions"]
    assert sessions
    assert all("has_live" in s and "has_on_demand" in s for s in sessions)


async def test_standings_parsed_top_n(hass: HomeAssistant, mock_client) -> None:
    """Standings should be reduced to leader-first top rows."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    motogp = data["standings"]["motogp"]
    assert motogp[0]["position"] == 1
    assert motogp[0]["rider"]
    assert len(motogp) <= 5
    # Enrichment: rider number and (joined) portrait photo.
    assert motogp[0]["number"] is not None
    # Jorge Martin (leader) has a portrait in the riders fixture.
    assert motogp[0]["photo"].startswith("https://photos.motogp.com/")
    # Championship stats and nationality are surfaced.
    leader = motogp[0]
    assert leader["race_wins"] is not None
    assert leader["podiums"] is not None
    assert leader["country"]
    assert "position_change" in leader
    assert "last_positions" in leader


async def test_latest_result_has_podium(hass: HomeAssistant, mock_client) -> None:
    """Latest result should return an enriched podium and full field."""
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)
    data = await coordinator._async_update_data()

    result = data["latest_result"]["motogp"]
    assert result is not None
    assert len(result["podium"]) == 3
    winner = result["podium"][0]
    assert winner["position"] == 1
    # Richer result fields.
    assert winner["time"]
    assert winner["average_speed"] is not None
    assert winner["status"]
    assert "gap" in winner
    assert winner["constructor"] is not None
    # Nationality and laps-down are surfaced.
    assert winner["country"]
    assert "laps_down" in winner
    assert winner["total_laps"] is not None
    # Session records (fastest lap / pole) are reduced and exposed.
    records = result["records"]
    assert records and any(r["type"] == "poleLap" for r in records)
    pole = next(r for r in records if r["type"] == "poleLap")
    assert pole["rider"] and pole["time"]
    # Full field is exposed, not just the podium.
    assert len(result["results"]) > 3
    # Live weather from the race session.
    assert isinstance(result["weather"], dict)
    assert "weather" in result["weather"]
    # Photo join: Marc Marquez (winner) matched; Raul Fernandez has a null photo.
    assert winner["photo"].startswith("https://photos.motogp.com/")
    raul = next(r for r in result["results"] if r["rider"] == "Raul Fernandez")
    assert raul["photo"] is None


async def test_rider_photos_degrade_gracefully(
    hass: HomeAssistant, mock_client
) -> None:
    """A failing riders endpoint leaves photos None, not a crash."""
    mock_client.async_get_rider.side_effect = MotoGPApiError("boom")
    coordinator = MotoGPDataUpdateCoordinator(hass, _make_entry(), mock_client)

    # The whole update still succeeds; rows just carry no photo.
    data = await coordinator._async_update_data()
    assert data["standings"]["motogp"][0]["photo"] is None
    assert data["latest_result"]["motogp"]["podium"][0]["photo"] is None


async def test_selected_classes_filtering(hass: HomeAssistant, mock_client) -> None:
    """Only configured classes should be queried."""
    entry = _make_entry({CONF_CLASSES: ["motogp"], CONF_SCAN_INTERVAL_HOURS: 6})
    coordinator = MotoGPDataUpdateCoordinator(hass, entry, mock_client)
    data = await coordinator._async_update_data()

    assert set(data["standings"].keys()) == {"motogp"}
