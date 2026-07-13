"""Shared base entity for the MotoGP integration."""

from __future__ import annotations

from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import MotoGPDataUpdateCoordinator


class MotoGPEntity(CoordinatorEntity[MotoGPDataUpdateCoordinator]):
    """Base entity binding all MotoGP entities to one device."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: MotoGPDataUpdateCoordinator) -> None:
        """Initialise the shared device info."""
        super().__init__(coordinator)
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, coordinator.entry.entry_id)},
            name="MotoGP",
            manufacturer="Dorna Sports",
            model="MotoGP calendar",
            entry_type=None,
        )
