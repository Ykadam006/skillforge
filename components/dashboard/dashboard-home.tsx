"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const DONUT = ["var(--chart-1)", "var(--chart-5)"];
const BAR = "var(--chart-5)";

export function DashboardHome() {
  const skillProgress = useSkillforgeStore((s) => s.skillProgress);
  const weeklyGoal = useSkillforgeStore((s) => s.weeklyGoal);
  const setWeeklyGoal = useSkillforgeStore((s) => s.setWeeklyGoal);
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

  return (
    <div className="space-y-10">
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

      {/* Stats row */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Skills completed" value={String(stats.done)} hint={`${stats.pct}% of your library`} />
        <StatCard title="Study hours (7d)" value={`${(weekMinutes / 60).toFixed(1)}h`} hint="From logged sessions" />
        <StatCard title="In motion" value={String(stats.inProgress)} hint="Marked in progress" />
        <StatCard title="Certifications" value={String(certActive)} hint="Under 100% readiness" />
      </section>

      {/* Main grid: charts + focus */}
      <section className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="sf-card-title">Study rhythm</CardTitle>
              <CardDescription>
                Minutes per day (last 14 days): study sessions plus practice rows where you entered minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="sf-chart-card px-2 pb-2">
              <ResponsiveContainer
                width="100%"
                height={260}
                minWidth={0}
                initialDimension={{ width: 640, height: 260 }}
              >
                <LineChart data={byDay} margin={{ left: 4, right: 12, top: 12, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickMargin={8}
                    axisLine={false}
                  />
                  <YAxis
                    width={36}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      fontSize: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                    }}
                    labelFormatter={(v) => String(v)}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardContent className="border-t border-border/50 pt-4">
              <p className="sf-helper text-muted-foreground">
                Tip: log short sessions after deep work — the trend line keeps you honest.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="sf-card-title">Progress by category</CardTitle>
              <CardDescription>Share of skills marked complete in each section.</CardDescription>
            </CardHeader>
            <CardContent className="sf-chart-card px-2 pb-2">
              <ResponsiveContainer
                width="100%"
                height={280}
                minWidth={0}
                initialDimension={{ width: 640, height: 280 }}
              >
                <BarChart data={byCat} layout="vertical" margin={{ left: 4, right: 16, top: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} />
                  <YAxis type="category" dataKey="name" width={118} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`${Number(v ?? 0)}%`, "Done"]} />
                  <Bar dataKey="pct" radius={[0, 8, 8, 0]} fill={BAR} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            {weakest ? (
              <CardContent className="border-t border-border/50 pt-4">
                <p className="sf-body text-muted-foreground">
                  <span className="font-semibold text-foreground">{weakest.name}</span> has the lowest completion
                  right now ({weakest.pct}%). That is a good place to schedule your next block.
                </p>
              </CardContent>
            ) : null}
          </Card>
        </div>

        <div className="space-y-8">
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

          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="sf-card-title">Overall completion</CardTitle>
              <CardDescription>Honest marks only — done means done.</CardDescription>
            </CardHeader>
            <CardContent className="sf-chart-card flex flex-col items-center justify-center px-2 pb-4">
              <ResponsiveContainer
                width="100%"
                height={240}
                minWidth={0}
                initialDimension={{ width: 360, height: 240 }}
              >
                <PieChart>
                  <Pie
                    data={donut}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={2}
                  >
                    {donut.map((entry, index) => (
                      <Cell key={entry.name} fill={DONUT[index % DONUT.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${Number(v ?? 0)} skills`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <p className="sf-helper -mt-2 text-muted-foreground">
                {stats.done} done · {stats.total} total
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

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
