import { describe, it, expect } from "vitest";
import { CLASS_COLORS, colorForTeam } from "../src/shared/team-colors";

describe("CLASS_COLORS", () => {
  it("defines a color per class acronym", () => {
    expect(CLASS_COLORS.MGP).toMatch(/^#/);
    expect(CLASS_COLORS.MT2).toMatch(/^#/);
    expect(CLASS_COLORS.MT3).toMatch(/^#/);
  });
});

describe("colorForTeam", () => {
  it("matches known teams case-insensitively and loosely", () => {
    expect(colorForTeam("Ducati Lenovo Team")).toMatch(/^#/);
    expect(colorForTeam("aprilia racing")).toBe(colorForTeam("Aprilia Racing"));
  });
  it("falls back to a neutral color for unknown teams", () => {
    expect(colorForTeam("Some Unknown Squad")).toMatch(/^#/);
  });
  it("prefers an override map when provided", () => {
    expect(colorForTeam("Ducati Lenovo Team", { ducati: "#000000" })).toBe("#000000");
  });
});
