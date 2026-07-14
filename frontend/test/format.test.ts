import { describe, it, expect } from "vitest";
import {
  formatCountdown,
  classLabel,
  groupScheduleByDay,
  filterByClasses,
  nextSessionIndex,
} from "../src/shared/format";

const now = new Date("2026-08-14T09:00:00Z");

const schedule = [
  { class: "MGP", session: "Free Practice Nr. 1", kind: "PRACTICE", start: "2026-08-14T10:45:00Z", end: "2026-08-14T11:30:00Z" },
  { class: "MT3", session: "Qualifying Nr. 2", kind: "QUALIFYING", start: "2026-08-15T09:50:00Z", end: "2026-08-15T10:05:00Z" },
  { class: "MGP", session: "Sprint", kind: "SPRINT", start: "2026-08-15T13:00:00Z", end: "2026-08-15T13:30:00Z" },
  { class: "MGP", session: "Race", kind: "RACE", start: "2026-08-16T12:00:00Z", end: "2026-08-16T13:00:00Z" },
];

describe("classLabel", () => {
  it("maps acronyms to labels", () => {
    expect(classLabel("MGP")).toBe("MotoGP");
    expect(classLabel("MT2")).toBe("Moto2");
    expect(classLabel("MT3")).toBe("Moto3");
  });
});

describe("formatCountdown", () => {
  it("formats a future gap as days/hours", () => {
    expect(formatCountdown("2026-08-17T13:15:00Z", now)).toMatch(/^In 3d/);
  });
  it("shows an HH:MM:SS countdown for a same-day future start", () => {
    expect(formatCountdown("2026-08-14T18:00:00Z", now)).toMatch(/^In \d{2}:\d{2}:\d{2}$/);
  });
  it("says under way when start has passed", () => {
    expect(formatCountdown("2026-08-14T08:00:00Z", now).toLowerCase()).toContain("under way");
  });
});

describe("filterByClasses", () => {
  it("keeps only requested classes", () => {
    const out = filterByClasses(schedule as any, ["MGP"]);
    expect(out.every((s) => s.class === "MGP")).toBe(true);
    expect(out).toHaveLength(3);
  });
  it("returns all when classes omitted", () => {
    expect(filterByClasses(schedule as any, undefined)).toHaveLength(4);
  });
});

describe("groupScheduleByDay", () => {
  it("groups into three days preserving order", () => {
    const groups = groupScheduleByDay(schedule as any);
    expect(groups).toHaveLength(3);
    expect(groups[0].items).toHaveLength(1);
    expect(groups[1].items).toHaveLength(2);
    expect(groups[2].items).toHaveLength(1);
  });
});

describe("nextSessionIndex", () => {
  it("returns the first session starting at/after now", () => {
    expect(nextSessionIndex(schedule as any, now)).toBe(0);
    expect(nextSessionIndex(schedule as any, new Date("2026-08-15T12:00:00Z"))).toBe(2);
  });
  it("returns -1 when all are past", () => {
    expect(nextSessionIndex(schedule as any, new Date("2026-09-01T00:00:00Z"))).toBe(-1);
  });
});
