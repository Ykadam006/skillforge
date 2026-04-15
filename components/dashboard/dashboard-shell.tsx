"use client";

import { Flame } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { streakDays } from "@/lib/streak";
import { useSkillforgeStore } from "@/stores/skillforge-store";

export function DashboardShell() {
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);

  const streak = streakDays([
    ...studySessions.map((s) => ({ date: s.date })),
    ...practiceEntries.map((p) => ({ date: p.date })),
  ]);

  return (
    <PageShell
      title="Dashboard"
      description="Your learning command center — where you are, how you are doing, what is next."
      headerBadge={
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
          <Flame className="size-4 text-orange-500" aria-hidden />
          <span className="text-[13px] font-semibold tabular-nums text-foreground">{streak}d</span>
          <span className="hidden text-[12px] text-muted-foreground sm:inline">streak</span>
        </div>
      }
    >
      <DashboardHome />
    </PageShell>
  );
}
