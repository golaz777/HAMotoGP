import type { ClassAcronym } from "./types";

export interface ScheduleItem {
  class: ClassAcronym;
  session: string;
  kind: string;
  start: string;
  end: string;
  num_laps?: number | null;
  has_live?: boolean | null;
  has_on_demand?: boolean | null;
}

/** Convert a 2-letter ISO country code to a flag emoji ("" if invalid). */
export function flagEmoji(code?: string): string {
  if (!code || code.length !== 2) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => A + c.charCodeAt(0) - 65),
  );
}

export interface DayGroup {
  label: string;
  items: ScheduleItem[];
}

const LABELS: Record<ClassAcronym, string> = {
  MGP: "MotoGP",
  MT2: "Moto2",
  MT3: "Moto3",
};

export function classLabel(acronym: ClassAcronym): string {
  return LABELS[acronym] ?? acronym;
}

export function formatCountdown(startIso: string, now: Date = new Date()): string {
  const start = new Date(startIso).getTime();
  if (Number.isNaN(start)) return "";
  const diff = start - now.getTime();
  if (diff <= 0) return "Race weekend under way";
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (days > 0) return `In ${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `In ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function filterByClasses(
  schedule: ScheduleItem[],
  classes?: ClassAcronym[],
): ScheduleItem[] {
  if (!classes || classes.length === 0) return schedule.slice();
  const set = new Set(classes);
  return schedule.filter((s) => set.has(s.class));
}

export function groupScheduleByDay(
  schedule: ScheduleItem[],
  locale = "en",
  timeZone?: string,
): DayGroup[] {
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(timeZone ? { timeZone } : {}),
  });
  const groups: DayGroup[] = [];
  let current: DayGroup | undefined;
  for (const item of schedule) {
    const label = fmt.format(new Date(item.start));
    if (!current || current.label !== label) {
      current = { label, items: [] };
      groups.push(current);
    }
    current.items.push(item);
  }
  return groups;
}

export function nextSessionIndex(
  schedule: ScheduleItem[],
  now: Date = new Date(),
): number {
  const t = now.getTime();
  return schedule.findIndex((s) => new Date(s.start).getTime() >= t);
}
