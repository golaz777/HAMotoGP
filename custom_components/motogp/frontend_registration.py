"""Register the bundled Lovelace cards with the Home Assistant frontend."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN

FRONTEND_URL = "/motogp/motogp-cards.js"
_BUNDLE = Path(__file__).parent / "frontend" / "motogp-cards.js"
_REGISTERED_KEY = f"{DOMAIN}_frontend_registered"


async def async_register_frontend(hass: HomeAssistant) -> None:
    """Serve the card bundle and add it as an extra JS module (once per hass)."""
    if hass.data.get(_REGISTERED_KEY):
        return
    http = getattr(hass, "http", None)
    if http is None:
        return
    hass.data[_REGISTERED_KEY] = True
    await http.async_register_static_paths(
        [StaticPathConfig(FRONTEND_URL, str(_BUNDLE), False)]
    )
    add_extra_js_url(hass, FRONTEND_URL)
