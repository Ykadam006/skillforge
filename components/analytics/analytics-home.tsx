"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activityMinutesRollingDays,
  categoryCompletion,
  completionStats,
  guideStatusCounts,
  radarSnapshot,
} from "@/lib/analytics";
import { useSkillforgeStore } from "@/stores/skillforge-store";

export function AnalyticsHome() {
  const skillProgress = useSkillforgeStore((s) => s.skillProgress);
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);
  const stats = completionStats(skillProgress);
  const byCat = categoryCompletion(skillProgress);
  const radar = radarSnapshot(skillProgress);
  const resume = guideStatusCounts();
  const minutes7d = activityMinutesRollingDays(studySessions, practiceEntries, 7);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall completion</CardTitle>
            <CardDescription>Skills marked done.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{stats.pct}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resume shape</CardTitle>
            <CardDescription>Have vs gap vs cert rows.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Have {resume.have} · Gaps {resume.need} · Cert {resume.cert}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In progress</CardTitle>
            <CardDescription>Active execution.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{stats.inProgress}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Minutes (7d)</CardTitle>
            <CardDescription>Sessions + practice minutes, same as dashboard week.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold tabular-nums">{minutes7d}</CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Confidence radar</CardTitle>
            <CardDescription>Average self-rated confidence by area (normalized).</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
                <Radar
                  name="Strength"
                  dataKey="value"
                  stroke="var(--chart-4)"
                  fill="var(--chart-4)"
                  fillOpacity={0.35}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category completion</CardTitle>
            <CardDescription>Percent of skills marked done per section.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCat} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`${Number(v ?? 0)}%`, "Done"]} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} fill="var(--chart-5)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
