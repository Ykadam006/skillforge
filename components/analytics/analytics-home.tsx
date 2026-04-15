"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  activityMinutesRollingDays,
  categoryCompletion,
  completionStats,
  guideStatusCounts,
  radarSnapshot,
} from "@/lib/analytics";
import { mergeRadarWithTargets } from "@/lib/radar-targets";
import { useSkillforgeStore } from "@/stores/skillforge-store";

const AnalyticsCharts = dynamic(
  () => import("@/components/analytics/analytics-charts").then((m) => m.AnalyticsCharts),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Loading analytics charts">
        <div className="h-80 animate-pulse rounded-2xl bg-muted/40" />
        <div className="h-80 animate-pulse rounded-2xl bg-muted/40" />
      </div>
    ),
  },
);

export function AnalyticsHome() {
  const skillProgress = useSkillforgeStore((s) => s.skillProgress);
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);
  const radarTargetsByAxis = useSkillforgeStore((s) => s.radarTargetsByAxis);
  const setRadarTarget = useSkillforgeStore((s) => s.setRadarTarget);
  const stats = completionStats(skillProgress);
  const byCat = categoryCompletion(skillProgress);
  const radar = radarSnapshot(skillProgress);
  const radarWithTargets = useMemo(
    () => mergeRadarWithTargets(radar, radarTargetsByAxis),
    [radar, radarTargetsByAxis],
  );
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

      <Card>
        <CardHeader>
          <CardTitle>Radar target profile</CardTitle>
          <CardDescription>
            Set a 0–100 target per axis (e.g. from a job description). The dashed overlay on the radar uses these values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {radar.map((r) => (
              <div key={r.axis} className="space-y-1">
                <label htmlFor={`radar-target-${r.axis}`} className="text-xs font-medium text-muted-foreground">
                  {r.axis}
                </label>
                <Input
                  id={`radar-target-${r.axis}`}
                  type="number"
                  min={0}
                  max={100}
                  className="h-9"
                  value={radarTargetsByAxis[r.axis] ?? 70}
                  onChange={(e) => setRadarTarget(r.axis, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AnalyticsCharts radarWithTargets={radarWithTargets} byCat={byCat} />
    </div>
  );
}
