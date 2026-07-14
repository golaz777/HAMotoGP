"""Tests for frontend bundle registration."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

from homeassistant.core import HomeAssistant

from custom_components.motogp.frontend_registration import (
    FRONTEND_URL,
    async_register_frontend,
)


async def test_registers_static_path_and_js_url_once(hass: HomeAssistant) -> None:
    """The bundle is registered as a static path and extra JS URL, only once."""
    hass.http = AsyncMock()
    with patch(
        "custom_components.motogp.frontend_registration.add_extra_js_url"
    ) as add_js:
        await async_register_frontend(hass)
        await async_register_frontend(hass)  # second call must be a no-op

    hass.http.async_register_static_paths.assert_awaited_once()
    paths = hass.http.async_register_static_paths.await_args.args[0]
    assert paths[0].url_path == FRONTEND_URL
    add_js.assert_called_once_with(hass, FRONTEND_URL)
