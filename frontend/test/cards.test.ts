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
          circuit_info: { country_code: "GB", length_km: 5.9, corners: 18, left_corners: 8, right_corners: 10 },
          schedule: [
            { class: "MGP", session: "Race", kind: "RACE", start: "2026-08-16T12:00:00Z", end: "2026-08-16T13:00:00Z" },
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
