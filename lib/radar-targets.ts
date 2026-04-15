/** Default “target role” profile (0–100 per axis) — seeded into the store and editable in Analytics. */
export const RADAR_TARGET_BY_AXIS: Record<string, number> = {
  Languages: 72,
  Frontend: 78,
  Backend: 85,
  Data: 70,
  Cloud: 68,
  DSA: 80,
  Design: 55,
  AI: 65,
};

export function mergeRadarWithTargets(
  rows: { axis: string; value: number }[],
  targetsByAxis: Record<string, number>,
) {
  return rows.map((r) => ({
    axis: r.axis,
    You: r.value,
    Target: targetsByAxis[r.axis] ?? RADAR_TARGET_BY_AXIS[r.axis] ?? 70,
  }));
}
