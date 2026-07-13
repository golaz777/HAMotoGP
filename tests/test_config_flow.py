"""Tests for the MotoGP config and options flows."""

from __future__ import annotations

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.motogp.const import (
    CONF_CLASSES,
    CONF_SCAN_INTERVAL_HOURS,
    DOMAIN,
)


async def test_user_flow_creates_entry(hass: HomeAssistant) -> None:
    """A user flow should create a single MotoGP entry with options."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == FlowResultType.FORM

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_CLASSES: ["motogp", "moto2"], CONF_SCAN_INTERVAL_HOURS: 3},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["title"] == "MotoGP"
    assert result["options"][CONF_CLASSES] == ["motogp", "moto2"]
    assert result["options"][CONF_SCAN_INTERVAL_HOURS] == 3


async def test_single_instance_only(hass: HomeAssistant) -> None:
    """A second config flow should abort."""
    MockConfigEntry(domain=DOMAIN, unique_id=DOMAIN).add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "already_configured"


async def test_options_flow(hass: HomeAssistant) -> None:
    """The options flow should update classes and interval."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        unique_id=DOMAIN,
        options={CONF_CLASSES: ["motogp"], CONF_SCAN_INTERVAL_HOURS: 6},
    )
    entry.add_to_hass(hass)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {CONF_CLASSES: ["motogp", "moto3"], CONF_SCAN_INTERVAL_HOURS: 12},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["data"][CONF_CLASSES] == ["motogp", "moto3"]
    assert result["data"][CONF_SCAN_INTERVAL_HOURS] == 12
