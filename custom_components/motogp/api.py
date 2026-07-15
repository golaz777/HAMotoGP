"""Thin async client for the (unofficial) MotoGP JSON API."""

from __future__ import annotations

import asyncio
import logging
from typing import Any

import aiohttp

from .const import (
    API_BASE_URL,
    EP_CATEGORIES,
    EP_CLASSIFICATION,
    EP_EVENTS,
    EP_RESULT_EVENTS,
    EP_RIDERS,
    EP_SEASONS,
    EP_SESSIONS,
    EP_STANDINGS,
)

_LOGGER = logging.getLogger(__name__)

REQUEST_TIMEOUT = 30


class MotoGPApiError(Exception):
    """Raised when the MotoGP API cannot be reached or returns an error."""


class MotoGPApiClient:
    """Small wrapper around the MotoGP results/events endpoints."""

    def __init__(self, session: aiohttp.ClientSession) -> None:
        """Initialise with a shared aiohttp session."""
        self._session = session

    async def _get(self, path: str, params: dict[str, Any] | None = None) -> Any:
        """Perform a GET request and return the decoded JSON body."""
        url = f"{API_BASE_URL}{path}"
        try:
            async with asyncio.timeout(REQUEST_TIMEOUT):
                async with self._session.get(url, params=params) as resp:
                    resp.raise_for_status()
                    return await resp.json()
        except asyncio.TimeoutError as err:
            raise MotoGPApiError(f"Timeout requesting {url}") from err
        except aiohttp.ClientError as err:
            raise MotoGPApiError(f"Error requesting {url}: {err}") from err

    async def async_get_seasons(self) -> list[dict[str, Any]]:
        """Return the list of seasons (newest first)."""
        data = await self._get(EP_SEASONS)
        return data if isinstance(data, list) else []

    async def async_get_current_season(self) -> dict[str, Any] | None:
        """Return the season flagged as ``current`` (falls back to newest)."""
        seasons = await self.async_get_seasons()
        for season in seasons:
            if season.get("current"):
                return season
        return seasons[0] if seasons else None

    async def async_get_events(self, season_year: int) -> list[dict[str, Any]]:
        """Return the broadcast events (with nested sessions) for a season year."""
        data = await self._get(EP_EVENTS, {"seasonYear": season_year})
        return data if isinstance(data, list) else []

    async def async_get_rider(self, rider_uuid: str) -> dict[str, Any]:
        """Return a single rider profile (incl. portrait pictures).

        The bulk ``/riders`` list omits pictures, so photos must be fetched
        per rider from ``/riders/{uuid}``.
        """
        data = await self._get(f"{EP_RIDERS}/{rider_uuid}")
        return data if isinstance(data, dict) else {}

    async def async_get_categories(self, season_uuid: str) -> list[dict[str, Any]]:
        """Return the racing categories available for a season."""
        data = await self._get(EP_CATEGORIES, {"seasonUuid": season_uuid})
        return data if isinstance(data, list) else []

    async def async_get_standings(
        self, season_uuid: str, category_uuid: str
    ) -> list[dict[str, Any]]:
        """Return the championship standings for a season/category."""
        data = await self._get(
            EP_STANDINGS,
            {"seasonUuid": season_uuid, "categoryUuid": category_uuid},
        )
        if isinstance(data, dict):
            return data.get("classification") or []
        return []

    async def async_get_finished_events(
        self, season_uuid: str
    ) -> list[dict[str, Any]]:
        """Return finished events for a season (includes tests)."""
        data = await self._get(
            EP_RESULT_EVENTS, {"seasonUuid": season_uuid, "isFinished": "true"}
        )
        return data if isinstance(data, list) else []

    async def async_get_sessions(
        self, event_uuid: str, category_uuid: str
    ) -> list[dict[str, Any]]:
        """Return the sessions for an event/category."""
        data = await self._get(
            EP_SESSIONS,
            {"eventUuid": event_uuid, "categoryUuid": category_uuid},
        )
        return data if isinstance(data, list) else []

    async def async_get_classification(
        self, session_id: str
    ) -> dict[str, Any]:
        """Return the full classification payload for a session id.

        The payload holds both ``classification`` (the per-rider result rows)
        and ``records`` (fastest lap / pole / top-speed entries). Callers pick
        whichever they need.
        """
        path = EP_CLASSIFICATION.format(session_id=session_id)
        data = await self._get(path)
        if isinstance(data, dict):
            return data
        return {}
