import type { PracticeEntry } from "@/types/progress";
import { activityMinuteEvents } from "@/lib/analytics";

/** Chronological days oldest → newest, each with total minutes that calendar day. */
export function activityMinutesDaySeries(
  studySessions: { date: string; minutes: number }[],
  practiceEntries: Pick<PracticeEntry, "date" | "minutes">[],
  totalDays = 84,
) {
  const map = new Map<string, number>();
  for (const e of activityMinuteEvents(studySessions, practiceEntries)) {
    map.set(e.date, (map.get(e.date) ?? 0) + e.minutes);
  }
  const out: { date: string; minutes: number }[] = [];
  for (let i = totalDays - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, minutes: map.get(key) ?? 0 });
  }
  return out;
}

export function heatLevel(minutes: number): 0 | 1 | 2 | 3 | 4 {
  if (minutes <= 0) return 0;
  if (minutes < 25) return 1;
  if (minutes < 50) return 2;
  if (minutes < 90) return 3;
  return 4;
}
