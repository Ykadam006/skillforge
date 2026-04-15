/** Consecutive calendar days (ending today) that have at least one activity date. */
export function streakDays(sessions: { date: string }[]) {
  const days = new Set(sessions.map((s) => s.date));
  let streak = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (!days.has(key)) break;
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
