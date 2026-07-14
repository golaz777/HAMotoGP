import { describe, it, expect, beforeAll } from "vitest";
import type { HomeAssistant } from "../src/shared/types";

beforeAll(async () => {
  await import("../src/entry");
});

function fakeHass(): HomeAssistant {
  return {
    states: {
      "sensor.motogp_next_event": {
        entity_id: "sensor.motogp_next_event",
        state: "2026-08-16T12:00:00Z",
        attributes: {
          name: "British GP",
          circuit: "Silverstone",
          city: "Silverstone",
          date_start: "2026-08-16T12:00:00Z",
          date_end: "2026-08-16T13:00:00Z",
          circuit_info: { country_code: "GB", length_km: 5.9, corners: 18, left_corners: 8, right_corners: 10, track_map: "https://photos.motogp.com/gbr-info.svg" },
          schedule: [
            { class: "MGP", session: "Race", kind: "RACE", start: "2026-08-16T12:00:00Z", end: "2026-08-16T13:00:00Z" },
            { class: "MT2", session: "Race", kind: "RACE", start: "2026-08-16T10:00:00Z", end: "2026-08-16T11:00:00Z" },
            { class: "MT3", session: "Race", kind: "RACE", start: "2026-08-16T08:00:00Z", end: "2026-08-16T09:00:00Z" },
          ],
        },
      },
    },
    locale: { language: "en" },
  };
}

describe("motogp-next-event-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("motogp-next-event-card")).toBeTypeOf("function");
  });

  it("renders event name and a schedule row", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card" });
    el.hass = fakeHass();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("British GP");
    expect(text).toContain("Race");
    const img = el.shadowRoot!.querySelector("img.track-map") as HTMLImageElement | null;
    expect(img?.getAttribute("src")).toBe("https://photos.motogp.com/gbr-info.svg");
    el.remove();
  });

  it("shows all classes by default", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card" });
    el.hass = fakeHass();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("MGP");
    expect(text).toContain("MT2");
    expect(text).toContain("MT3");
    el.remove();
  });

  it("limits the schedule to the selected class", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card", classes: ["MGP"] });
    el.hass = fakeHass();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("MGP");
    expect(text).not.toContain("MT2");
    expect(text).not.toContain("MT3");
    el.remove();
  });

  it("hides the track map when show_track_map is false", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card", show_track_map: false });
    el.hass = fakeHass();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("img.track-map")).toBeNull();
    el.remove();
  });

  it("shows an unavailable message when the entity is missing", async () => {
    const el = document.createElement("motogp-next-event-card") as any;
    el.setConfig({ type: "custom:motogp-next-event-card" });
    el.hass = { states: {}, locale: { language: "en" } };
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain("unavailable");
    el.remove();
  });
});

describe("motogp-results-card", () => {
  function hassWithResults(): HomeAssistant {
    return {
      states: {
        "sensor.motogp_motogp_standings": {
          entity_id: "sensor.motogp_motogp_standings",
          state: "Jorge Martin",
          attributes: { standings: [ { position: 1, rider: "Jorge Martin", team: "Aprilia Racing", points: 208, number: 89, photo: "https://photos.motogp.com/jm89.png" } ] },
        },
        "sensor.motogp_motogp_latest_result": {
          entity_id: "sensor.motogp_motogp_latest_result",
          state: "Marc Marquez",
          attributes: {
            event: "GERMAN GP",
            weather: { track: "Dry", air: "28º", ground: "42º", humidity: "40%", weather: "Partly-Cloudy" },
            podium: [
              { position: 1, rider: "Marc Marquez", team: "Ducati Lenovo", points: 25, time: "40:53.148", average_speed: 161.6, photo: "https://photos.motogp.com/mm93.png" },
              { position: 2, rider: "Ai Ogura", team: "Trackhouse", points: 20, gap: "2.868", average_speed: 161.2 },
            ],
          },
        },
      },
      locale: { language: "en" },
    };
  }

  it("registers the element", () => {
    expect(customElements.get("motogp-results-card")).toBeTypeOf("function");
  });

  it("renders standings and podium for the default class", async () => {
    const el = document.createElement("motogp-results-card") as any;
    el.setConfig({ type: "custom:motogp-results-card" });
    el.hass = hassWithResults();
    document.body.appendChild(el);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent as string;
    expect(text).toContain("Jorge Martin");
    expect(text).toContain("Marc Marquez");
    expect(text).toContain("GERMAN GP");
    // Rider photos rendered (standings leader + podium winner).
    const photos = el.shadowRoot!.querySelectorAll("img.rider-photo");
    expect(photos.length).toBeGreaterThanOrEqual(2);
    // Weather strip and result meta (gap / winner time).
    expect(text).toContain("Partly-Cloudy");
    expect(text).toContain("+2.868s");
    expect(text).toContain("40:53.148");
    el.remove();
  });

  it("hides the weather strip when show_weather is false", async () => {
    const el = document.createElement("motogp-results-card") as any;
    el.setConfig({ type: "custom:motogp-results-card", show_weather: false });
    el.hass = hassWithResults();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".weather")).toBeNull();
    el.remove();
  });
});
