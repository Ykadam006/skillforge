import type { ChecklistHistoryPoint, SessionHistoryPoint, SkillTask } from "@/types/progress";

export function appendChecklistHistory(
  prev: { checklistHistory?: ChecklistHistoryPoint[] },
  tasks: SkillTask[],
): ChecklistHistoryPoint[] {
  const pct = tasks.length === 0 ? 0 : Math.round((100 * tasks.filter((t) => t.completed).length) / tasks.length);
  const day = new Date().toISOString().slice(0, 10);
  const hist = [...(prev.checklistHistory ?? [])];
  const last = hist[hist.length - 1];
  if (last?.date === day && last.pct === pct) return hist;
  hist.push({ date: day, pct });
  return hist.slice(-40);
}

/** Daily minutes logged against a skill (study / practice with skillKey). */
export function appendSessionMinutesHistory(
  prev: { sessionHistory?: SessionHistoryPoint[] },
  date: string,
  minutes: number,
): SessionHistoryPoint[] {
  if (minutes <= 0) return prev.sessionHistory ?? [];
  const hist = [...(prev.sessionHistory ?? [])];
  const idx = hist.findIndex((h) => h.date === date);
  if (idx >= 0) {
    hist[idx] = { date, minutes: hist[idx].minutes + minutes };
  } else {
    hist.push({ date, minutes });
  }
  return hist.slice(-40);
}
