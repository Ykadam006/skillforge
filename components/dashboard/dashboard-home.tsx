"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { OnboardingStrip } from "@/components/dashboard/onboarding-strip";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  activityMinutesByDayLastNDays,
  activityMinutesRollingDays,
  categoryCompletion,
  completionStats,
} from "@/lib/analytics";
import { recentSkillsForDashboard } from "@/lib/recent-skills";
import { pickTodayFocus } from "@/lib/today-focus";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import { SkillCard } from "@/components/skills/skill-card";

const DashboardInsightCharts = dynamic(
  () => import("@/components/dashboard/dashboard-charts").then((m) => m.DashboardInsightCharts),
  {
    ssr: false,
    loading: () => (
      <div
        className="grid gap-8 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading dashboard charts"
      >
        <div className="space-y-8 lg:col-span-2">
          <div className="h-[320px] animate-pulse rounded-2xl bg-muted/40" />
          <div className="h-[300px] animate-pulse rounded-2xl bg-muted/40" />
        </div>
        <div className="space-y-8">
          <div className="h-[220px] animate-pulse rounded-2xl bg-muted/40" />
          <div className="h-[260px] animate-pulse rounded-2xl bg-muted/40" />
        </div>
      </div>
    ),
  },
);

export function DashboardHome() {
  const skillProgress = useSkillforgeStore((s) => s.skillProgress);
  const weeklyGoal = useSkillforgeStore((s) => s.weeklyGoal);
  const setWeeklyGoal = useSkillforgeStore((s) => s.setWeeklyGoal);
  const weeklyTargetMinutes = useSkillforgeStore((s) => s.weeklyTargetMinutes);
  const setWeeklyTargetMinutes = useSkillforgeStore((s) => s.setWeeklyTargetMinutes);
  const [weeklyTargetDraft, setWeeklyTargetDraft] = useState(String(weeklyTargetMinutes));
  useEffect(() => {
    setWeeklyTargetDraft(String(weeklyTargetMinutes));
  }, [weeklyTargetMinutes]);
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);
  const certifications = useSkillforgeStore((s) => s.certifications);

  const stats = completionStats(skillProgress);
  const focus = pickTodayFocus(skillProgress);
  const byDay = activityMinutesByDayLastNDays(studySessions, practiceEntries, 14);
  const byCat = categoryCompletion(skillProgress).filter((c) => c.total > 0);
  const recent = recentSkillsForDashboard(skillProgress, 6);

  const donut = [
    { name: "done", value: stats.done },
    { name: "rest", value: Math.max(0, stats.total - stats.done) },
  ];

  const weekMinutes = activityMinutesRollingDays(studySessions, practiceEntries, 7);

  const certActive = certifications.filter((c) => c.readiness > 0 && c.readiness < 100).length;
  const nextCert = certifications
    .filter((c) => c.readiness < 100)
    .sort((a, b) => b.readiness - a.readiness)[0];

  const weakest =
    byCat.length > 0
      ? [...byCat].sort((a, b) => a.pct - b.pct)[0]
      : null;

  const chartEmpty = byDay.every((d) => d.minutes === 0);
  const weekVsTargetPct = Math.min(100, Math.round((weekMinutes / Math.max(weeklyTargetMinutes, 1)) * 100));

  return (
    <div className="space-y-10">
      <OnboardingStrip />

      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
        <div className="flex flex-col justify-center rounded-[20px] border border-border/80 bg-card p-8 shadow-sm">
          <p className="sf-helper font-semibold uppercase tracking-wider text-muted-foreground">Welcome back</p>
          <h2 className="sf-hero-title mt-2 text-foreground">Your learning command center</h2>
          <p className="sf-body mt-4 max-w-xl text-muted-foreground">
            Stay focused: one clear stack for learn, practice, build, and measure — without LMS noise.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-border/60 bg-muted/20 p-5">
            <div className="sf-section-label text-foreground">Weekly goal</div>
            <Input
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(e.target.value)}
              placeholder="e.g. Docker basics + 10 NeetCode problems"
              className="bg-card"
            />
            <p className="sf-helper text-muted-foreground">Edit anytime. This is your north star for the week.</p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <label htmlFor="weekly-target" className="sf-helper text-muted-foreground">
                  Weekly minute target (for the bar below)
                </label>
                <Input
                  id="weekly-target"
                  type="text"
                  inputMode="numeric"
                  className="h-10 w-28 bg-card"
                  value={weeklyTargetDraft}
                  onChange={(e) => setWeeklyTargetDraft(e.target.value)}
                  onBlur={() => {
                    const n = Number(weeklyTargetDraft);
                    setWeeklyTargetMinutes(Number.isFinite(n) ? n : weeklyTargetMinutes);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title">Quick pulse</CardTitle>
            <CardDescription>One glance before you dive in.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
              <div className="sf-helper text-muted-foreground">Total progress</div>
              <div className="mt-1 text-2xl font-bold tabular-nums">{stats.pct}%</div>
              <div className="sf-helper mt-1 text-muted-foreground">
                {stats.done}/{stats.total} skills done
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
              <div className="sf-helper text-muted-foreground">Hours this week</div>
              <div className="mt-1 text-2xl font-bold tabular-nums">{weekMinutes}</div>
              <div className="sf-helper mt-1 text-muted-foreground">logged minutes (sessions + practice)</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/15 p-4 sm:col-span-2">
              <div className="sf-helper text-muted-foreground">Active focus</div>
              <div className="mt-1 text-[15px] font-semibold leading-snug text-foreground">
                {focus ? focus.skill.name : "Pick a skill to start"}
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/15 p-4 sm:col-span-2">
              <div className="sf-helper text-muted-foreground">Next certification</div>
              <div className="mt-1 text-[15px] font-semibold text-foreground">
                {nextCert ? nextCert.name : "Add tracks in Certifications"}
              </div>
              {nextCert ? (
                <div className="sf-helper mt-1 text-muted-foreground">
                  Readiness {nextCert.readiness}% · {certActive} active
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title">Activity heatmap</CardTitle>
            <CardDescription>Any logged minutes (study + practice) tint the grid.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityHeatmap studySessions={studySessions} practiceEntries={practiceEntries} />
          </CardContent>
        </Card>
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title">Goal vs actual</CardTitle>
            <CardDescription>Minutes logged this week vs your numeric target.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" data-testid="goal-vs-actual">
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold tabular-nums">{weekMinutes}</span>
                <span className="sf-helper text-muted-foreground">/ {weeklyTargetMinutes} min target</span>
              </div>
              <Progress value={weekVsTargetPct} className="h-2" />
              <p className="sf-helper mt-2 text-muted-foreground">
                Text goal: <span className="font-medium text-foreground">{weeklyGoal || "—"}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Stats row */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Skills completed" value={String(stats.done)} hint={`${stats.pct}% of your library`} />
        <StatCard title="Study hours (7d)" value={`${(weekMinutes / 60).toFixed(1)}h`} hint="From logged sessions" />
        <StatCard title="In motion" value={String(stats.inProgress)} hint="Marked in progress" />
        <StatCard title="Certifications" value={String(certActive)} hint="Under 100% readiness" />
      </section>

      <DashboardInsightCharts
        chartEmpty={chartEmpty}
        byDay={byDay}
        byCat={byCat}
        weakest={weakest}
        donut={donut}
        stats={stats}
        rightSlot={
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="sf-card-title">Today&apos;s focus</CardTitle>
              <CardDescription>Bookmarks, in-progress, gaps, and hot topics — auto-ranked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {focus ? (
                <>
                  <div>
                    <div className="text-[18px] font-semibold leading-snug">{focus.skill.name}</div>
                    <div className="sf-helper mt-1 text-muted-foreground">{focus.categoryLabel}</div>
                    <p className="sf-body mt-3 text-muted-foreground">{focus.skill.why}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link className={cn(buttonVariants(), "h-11 justify-center rounded-xl px-[18px] text-[14px]")} href={`/skills/${focus.slug}`}>
                      Continue path
                    </Link>
                    <Link className={cn(buttonVariants({ variant: "outline" }), "h-11 justify-center rounded-xl")} href="/practice">
                      Practice
                    </Link>
                  </div>
                </>
              ) : (
                <p className="sf-body text-muted-foreground">Your guide will populate focus once skills load.</p>
              )}
            </CardContent>
          </Card>
        }
      />

      {/* Recent skills */}
      <section className="space-y-5">
        <div>
          <h3 className="sf-section-label">Recently active</h3>
          <p className="sf-helper mt-1 max-w-2xl text-muted-foreground">
            Skills you are moving on right now — tap a card to open the full learning path.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recent.map(({ row }) => (
            <SkillCard
              key={row.key}
              skillKey={row.key}
              slug={row.slug}
              categoryLabel={row.categoryLabel}
              skill={row.skill}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
