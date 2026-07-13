"""Config flow for the MotoGP integration."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    CLASSES,
    CONF_CLASSES,
    CONF_SCAN_INTERVAL_HOURS,
    DEFAULT_CLASSES,
    DEFAULT_SCAN_INTERVAL_HOURS,
    DOMAIN,
    MAX_SCAN_INTERVAL_HOURS,
    MIN_SCAN_INTERVAL_HOURS,
)

_CLASS_OPTIONS = [
    selector.SelectOptionDict(value=key, label=str(meta["name"]))
    for key, meta in CLASSES.items()
]


def _options_schema(defaults: dict[str, Any]) -> vol.Schema:
    """Build the options/reconfigure schema with the given defaults."""
    return vol.Schema(
        {
            vol.Required(
                CONF_CLASSES,
                default=defaults.get(CONF_CLASSES, DEFAULT_CLASSES),
            ): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=_CLASS_OPTIONS,
                    multiple=True,
                    mode=selector.SelectSelectorMode.LIST,
                )
            ),
            vol.Required(
                CONF_SCAN_INTERVAL_HOURS,
                default=defaults.get(
                    CONF_SCAN_INTERVAL_HOURS, DEFAULT_SCAN_INTERVAL_HOURS
                ),
            ): selector.NumberSelector(
                selector.NumberSelectorConfig(
                    min=MIN_SCAN_INTERVAL_HOURS,
                    max=MAX_SCAN_INTERVAL_HOURS,
                    step=1,
                    unit_of_measurement="hours",
                    mode=selector.NumberSelectorMode.BOX,
                )
            ),
        }
    )


class MotoGPConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the MotoGP config flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step (single instance, no credentials)."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(
                title="MotoGP",
                data={},
                options={
                    CONF_CLASSES: user_input[CONF_CLASSES],
                    CONF_SCAN_INTERVAL_HOURS: int(
                        user_input[CONF_SCAN_INTERVAL_HOURS]
                    ),
                },
            )

        return self.async_show_form(
            step_id="user",
            data_schema=_options_schema(
                {
                    CONF_CLASSES: DEFAULT_CLASSES,
                    CONF_SCAN_INTERVAL_HOURS: DEFAULT_SCAN_INTERVAL_HOURS,
                }
            ),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> MotoGPOptionsFlow:
        """Return the options flow handler."""
        return MotoGPOptionsFlow()


class MotoGPOptionsFlow(OptionsFlow):
    """Handle MotoGP options (classes and refresh interval)."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(
                data={
                    CONF_CLASSES: user_input[CONF_CLASSES],
                    CONF_SCAN_INTERVAL_HOURS: int(
                        user_input[CONF_SCAN_INTERVAL_HOURS]
                    ),
                }
            )

        return self.async_show_form(
            step_id="init",
            data_schema=_options_schema(dict(self.config_entry.options)),
        )
