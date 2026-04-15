"use client";

import { activityMinutesDaySeries, heatLevel } from "@/lib/activity-heatmap";
import type { PracticeEntry } from "@/types/progress";
import { cn } from "@/lib/utils";

const HEAT = [
  "bg-muted/40",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
] as const;

export function ActivityHeatmap({
  studySessions,
  practiceEntries,
}: {
  studySessions: { date: string; minutes: number }[];
  practiceEntries: Pick<PracticeEntry, "date" | "minutes">[];
}) {
  const days = activityMinutesDaySeries(studySessions, practiceEntries, 84);
  const cols = 12;
  const rows = 7;
  const cells: { date: string; minutes: number }[][] = [];
  for (let c = 0; c < cols; c += 1) {
    const col: { date: string; minutes: number }[] = [];
    for (let r = 0; r < rows; r += 1) {
      const idx = c * rows + r;
      col.push(days[idx] ?? { date: "", minutes: 0 });
    }
    cells.push(col);
  }

  return (
    <div className="overflow-x-auto pb-1" data-testid="activity-heatmap">
      <p className="sf-helper mb-3 font-semibold uppercase tracking-wide text-muted-foreground">Last 12 weeks · minutes</p>
      <div
        className="flex snap-x snap-mandatory gap-1 pb-1"
        role="img"
        aria-label="Activity by day: each square is one day; color intensity follows minutes logged (0, 1 to 24, 25 to 49, 50 to 89, 90 or more)"
      >
        {cells.map((col, ci) => (
          <div key={ci} className="flex shrink-0 snap-start flex-col gap-1">
            {col.map((d) => {
              const lv = heatLevel(d.minutes);
              return (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.minutes} min`}
                  className={cn("size-3 rounded-sm sm:size-3.5", HEAT[lv])}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="sf-helper mt-3 flex flex-col gap-2 text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span>Less</span>
          <div className="flex gap-0.5" aria-hidden>
            {HEAT.map((c, i) => (
              <div key={i} className={cn("size-3 rounded-sm sm:size-3.5", c)} />
            ))}
          </div>
          <span>More</span>
        </div>
        <span className="text-[11px] text-muted-foreground/90">
          Scale: 0m · 1–24m · 25–49m · 50–89m · 90m+
        </span>
      </div>
    </div>
  );
}
