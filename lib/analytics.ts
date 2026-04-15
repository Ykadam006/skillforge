import type { GuideStatus } from "@/types/guide";
import type { PracticeEntry, SkillProgress } from "@/types/progress";
import { flattenSkills } from "@/lib/guide";

type SkillProgressMap = Record<string, SkillProgress>;

export function completionStats(skillProgress: SkillProgressMap) {
  const rows = flattenSkills();
  const total = rows.length;

  let done = 0;
  let inProgress = 0;

  for (const row of rows) {
    const p = skillProgress[row.key];
    if (!p) continue;
    if (p.learningStatus === "done") done += 1;
    if (p.learningStatus === "in-progress") inProgress += 1;
  }

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, inProgress, pct };
}

export function categoryCompletion(skillProgress: SkillProgressMap) {
  const rows = flattenSkills();
  const byCat = new Map<string, { total: number; done: number }>();

  for (const row of rows) {
    const cur = byCat.get(row.categoryLabel) ?? { total: 0, done: 0 };
    cur.total += 1;
    const p = skillProgress[row.key];
    if (p?.learningStatus === "done") cur.done += 1;
    byCat.set(row.categoryLabel, cur);
  }

  return Array.from(byCat.entries()).map(([name, v]) => ({
    name,
    done: v.done,
    total: v.total,
    pct: v.total === 0 ? 0 : Math.round((v.done / v.total) * 100),
  }));
}

export function guideStatusCounts() {
  const rows = flattenSkills();
  const counts: Record<GuideStatus, number> = { have: 0, need: 0, cert: 0 };
  for (const row of rows) counts[row.skill.status] += 1;
  return counts;
}

export function minutesByDayLastNDays(
  sessions: { date: string; minutes: number }[],
  days = 14,
) {
  const map = new Map<string, number>();

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    map.set(d.toISOString().slice(0, 10), 0);
  }

  for (const s of sessions) {
    if (!map.has(s.date)) continue;
    map.set(s.date, (map.get(s.date) ?? 0) + s.minutes);
  }

  return Array.from(map.entries()).map(([date, minutes]) => ({ date, minutes }));
}

/** Study sessions plus practice rows that recorded minutes (same calendar day sums together). */
export function activityMinuteEvents(
  studySessions: { date: string; minutes: number }[],
  practiceEntries: Pick<PracticeEntry, "date" | "minutes">[],
): { date: string; minutes: number }[] {
  const fromPractice = practiceEntries
    .filter((p) => (p.minutes ?? 0) > 0)
    .map((p) => ({ date: p.date, minutes: p.minutes ?? 0 }));
  return [...studySessions, ...fromPractice];
}

export function activityMinutesByDayLastNDays(
  studySessions: { date: string; minutes: number }[],
  practiceEntries: Pick<PracticeEntry, "date" | "minutes">[],
  days = 14,
) {
  return minutesByDayLastNDays(activityMinuteEvents(studySessions, practiceEntries), days);
}

/** Total minutes in the rolling window (same rule as dashboard “this week”). */
export function activityMinutesRollingDays(
  studySessions: { date: string; minutes: number }[],
  practiceEntries: Pick<PracticeEntry, "date" | "minutes">[],
  windowDays: number,
): number {
  return activityMinuteEvents(studySessions, practiceEntries)
    .filter((e) => {
      const d = new Date(`${e.date}T00:00:00`);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / 86400000;
      return diff >= 0 && diff <= windowDays;
    })
    .reduce((a, b) => a + b.minutes, 0);
}

export function radarSnapshot(skillProgress: SkillProgressMap) {
  const axes = [
    { key: "lang", label: "Languages" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "database", label: "Data" },
    { key: "devops", label: "Cloud" },
    { key: "dsa", label: "DSA" },
    { key: "design", label: "Design" },
    { key: "ai", label: "AI" },
  ] as const;

  return axes.map((axis) => {
    const rows = flattenSkills().filter((r) => r.categoryId === axis.key);
    if (rows.length === 0) return { axis: axis.label, value: 0 };

    let sum = 0;
    for (const row of rows) {
      const p = skillProgress[row.key];
      sum += p?.confidence ?? 0;
    }

    const avg = Math.round((sum / rows.length / 5) * 100);
    return { axis: axis.label, value: avg };
  });
}
