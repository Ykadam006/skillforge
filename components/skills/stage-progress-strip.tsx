"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GuideLevel, LearningStatus } from "@/types/guide";

function stageThresholds(n: number) {
  return Array.from({ length: n }, (_, i) => ((i + 1) / n) * 100);
}

export function StageProgressStrip({
  levels,
  checklistPct,
  learning,
}: {
  levels: GuideLevel[];
  checklistPct: number;
  learning: LearningStatus;
}) {
  const n = Math.max(1, levels.length);
  const thresholds = stageThresholds(n);
  const allDone = learning === "done";

  return (
    <div className="rounded-2xl border border-border/80 bg-muted/15 px-4 py-5" data-testid="stage-progress-strip">
      <p className="sf-helper mb-4 font-semibold uppercase tracking-wide text-muted-foreground">Stage progress</p>
      <div className="-mx-1 flex snap-x snap-mandatory items-start gap-1 overflow-x-auto pb-2 sm:mx-0 sm:gap-0 sm:overflow-visible sm:pb-0">
        {levels.map((lv, i) => {
          const threshold = thresholds[i] ?? 100;
          const prev = i > 0 ? thresholds[i - 1]! : 0;
          const complete = allDone || checklistPct >= threshold - 0.5;
          const current = !complete && checklistPct >= prev - 0.5 && checklistPct < threshold;

          return (
            <Fragment key={lv.label}>
              {i > 0 ? (
                <div
                  className={cn(
                    "mx-1 mt-4 hidden h-0.5 min-w-[8px] flex-1 sm:block",
                    checklistPct >= prev ? "bg-success/35" : "bg-border",
                  )}
                  aria-hidden
                />
              ) : null}
              <div className="flex min-w-[5.5rem] shrink-0 snap-center flex-col items-center gap-2 text-center sm:min-w-0 sm:flex-1">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-bold transition-colors",
                    complete && "border-success bg-success-light text-success-foreground",
                    current && !complete && "border-primary bg-primary-light text-primary ring-2 ring-primary/30",
                    !complete && !current && "border-border bg-card text-muted-foreground",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {complete ? <Check className="size-4" strokeWidth={2.5} aria-hidden /> : i + 1}
                </div>
                <span
                  className={cn(
                    "line-clamp-2 max-w-[6.5rem] text-[11px] font-semibold leading-tight sm:text-xs",
                    current && "text-primary",
                    complete && "text-success-foreground",
                    !complete && !current && "text-muted-foreground",
                  )}
                >
                  {lv.label}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
      <p className="sf-helper mt-3 text-muted-foreground">
        Checklist completion moves the ring; mark <strong className="text-foreground">Done</strong> when the skill is
        truly shipped.
      </p>
    </div>
  );
}
