import type { ClassAcronym } from "./types";

export const CLASS_COLORS: Record<ClassAcronym, string> = {
  MGP: "#e2001a",
  MT2: "#0090d4",
  MT3: "#00a651",
};

// Loose keyword → color. Matched by substring against the lowercased team name.
export const TEAM_COLORS: Record<string, string> = {
  ducati: "#cc0000",
  aprilia: "#0a0a5e",
  ktm: "#ff6600",
  gasgas: "#cc0000",
  honda: "#003da5",
  yamaha: "#0a3d91",
  vr46: "#ffcf00",
  gresini: "#00a0d6",
  trackhouse: "#1a1a1a",
  tech3: "#0091d0",
  pramac: "#6a1b9a",
  lcr: "#e30613",
};

const FALLBACK = "#8a8a8a";

export function colorForTeam(
  team: string | undefined,
  overrides?: Record<string, string>,
): string {
  if (!team) return FALLBACK;
  const name = team.toLowerCase();
  const maps = [overrides ?? {}, TEAM_COLORS];
  for (const map of maps) {
    for (const key of Object.keys(map)) {
      if (name.includes(key.toLowerCase())) return map[key];
    }
  }
  return FALLBACK;
}
