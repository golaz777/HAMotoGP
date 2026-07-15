"""End-to-end entity tests: set up the entry with a stubbed client."""

from __future__ import annotations

from datetime import timedelta
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.motogp.const import (
    CONF_CLASSES,
    CONF_SCAN_INTERVAL_HOURS,
    DOMAIN,
)


async def _setup(hass: HomeAssistant, mock_client) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN,
        unique_id=DOMAIN,
        title="MotoGP",
        options={
            CONF_CLASSES: ["motogp", "moto2", "moto3"],
            CONF_SCAN_INTERVAL_HOURS: 6,
        },
    )
    entry.add_to_hass(hass)
    with patch(
        "custom_components.motogp.MotoGPApiClient", return_value=mock_client
    ):
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
    return entry


async def test_next_event_sensor(hass: HomeAssistant, mock_client) -> None:
    """The next-event sensor should be a timestamp with schedule attributes."""
    await _setup(hass, mock_client)
    state = hass.states.get("sensor.motogp_next_event")
    assert state is not None
    assert state.attributes.get("circuit")
    assert isinstance(state.attributes.get("schedule"), list)
    circuit_info = state.attributes.get("circuit_info")
    assert isinstance(circuit_info, dict)
    assert "length_km" in circuit_info
    assert "corners" in circuit_info


async def test_standings_and_result_sensors(hass: HomeAssistant, mock_client) -> None:
    """Standings and latest-result sensors should be created per class."""
    await _setup(hass, mock_client)
    standings = hass.states.get("sensor.motogp_motogp_standings")
    assert standings is not None
    assert standings.state  # leader name
    assert standings.attributes.get("standings")

    result = hass.states.get("sensor.motogp_motogp_latest_result")
    assert result is not None
    assert len(result.attributes.get("podium", [])) == 3


async def test_session_live_binary_sensor(hass: HomeAssistant, mock_client) -> None:
    """The session-live binary sensor should exist and be off outside sessions."""
    await _setup(hass, mock_client)
    state = hass.states.get("binary_sensor.motogp_session_live")
    assert state is not None
    # No fixture session is running "now", so it reports off with a next session.
    assert state.state == "off"
    assert "next_session" in state.attributes


async def test_session_live_when_window_active(
    hass: HomeAssistant, mock_client
) -> None:
    """The binary sensor turns on when now falls inside a session window."""
    entry = await _setup(hass, mock_client)
    coordinator = entry.runtime_data
    now = dt_util.utcnow()
    # Force the first session of the next round to be live right now.
    coordinator.data["next_event"]["sessions"][0].update(
        start=now - timedelta(minutes=5),
        end=now + timedelta(minutes=5),
    )
    coordinator.async_update_listeners()
    await hass.async_block_till_done()

    state = hass.states.get("binary_sensor.motogp_session_live")
    assert state.state == "on"
    live = state.attributes["live_session"]
    assert live is not None
    # Summary carries class name and lap count for the Live card.
    assert "class_name" in live
    assert "num_laps" in live


async def test_calendar_entity(hass: HomeAssistant, mock_client) -> None:
    """The calendar entity should exist and expose the next round."""
    await _setup(hass, mock_client)
    state = hass.states.get("calendar.motogp_calendar")
    assert state is not None
