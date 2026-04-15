"use client";

import { Flame } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { PageShell } from "@/components/layout/page-shell";
import { cn } from "@/lib/utils";
import { streakDays } from "@/lib/streak";
import { useSkillforgeStore } from "@/stores/skillforge-store";

export function DashboardShell() {
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);

  const streak = streakDays([
    ...studySessions.map((s) => ({ date: s.date })),
    ...practiceEntries.map((p) => ({ date: p.date })),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const hasActivityToday =
    studySessions.some((s) => s.date === today) || practiceEntries.some((p) => p.date === today);

  const prevStreak = useRef<number | null>(null);
  const [streakPulse, setStreakPulse] = useState(false);
  useEffect(() => {
    if (prevStreak.current === null) {
      prevStreak.current = streak;
      return;
    }
    if (streak > prevStreak.current) {
      prevStreak.current = streak;
      if (hasActivityToday) {
        const pulseOnId = window.setTimeout(() => setStreakPulse(true), 0);
        const pulseOffId = window.setTimeout(() => setStreakPulse(false), 2000);
        return () => {
          window.clearTimeout(pulseOnId);
          window.clearTimeout(pulseOffId);
        };
      }
      return;
    }
    prevStreak.current = streak;
  }, [streak, hasActivityToday]);

  return (
    <PageShell
      title="Dashboard"
      description="Your learning command center — where you are, how you are doing, what is next."
      headerBadge={
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm",
            streakPulse && "sf-streak-pulse",
          )}
        >
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
