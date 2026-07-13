"""Shared test fixtures for the MotoGP integration."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any
from unittest.mock import AsyncMock

import pytest

FIXTURES = Path(__file__).parent / "fixtures"

pytest_plugins = ["pytest_homeassistant_custom_component"]


def load_fixture(name: str) -> Any:
    """Load a JSON fixture by filename."""
    return json.loads((FIXTURES / name).read_text())


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable loading of the custom integration in every test."""
    yield


@pytest.fixture
def mock_client() -> AsyncMock:
    """A MotoGPApiClient stubbed with recorded fixture responses."""
    seasons = load_fixture("seasons.json")
    categories = load_fixture("categories.json")
    events = load_fixture("events.json")
    standings = load_fixture("standings_mgp.json")["classification"]
    finished = load_fixture("finished_events.json")
    sessions = load_fixture("sessions.json")
    classification = load_fixture("classification.json")["classification"]

    client = AsyncMock()
    client.async_get_seasons.return_value = seasons
    client.async_get_current_season.return_value = next(
        s for s in seasons if s.get("current")
    )
    client.async_get_events.return_value = events
    client.async_get_categories.return_value = categories
    client.async_get_standings.return_value = standings
    client.async_get_finished_events.return_value = finished
    client.async_get_sessions.return_value = sessions
    client.async_get_classification.return_value = classification
    return client
