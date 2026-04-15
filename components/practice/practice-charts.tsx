"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PracticeEntry, PracticeType } from "@/types/progress";

const TYPE_COLORS: Record<PracticeType, string> = {
  DSA: "var(--chart-1)",
  SQL: "var(--chart-4)",
  SYSTEM_DESIGN: "var(--chart-3)",
  TESTING: "var(--chart-2)",
};

function buildVolumeByType(entries: { type: PracticeType }[]) {
  const map = new Map<PracticeType, number>();
  (["DSA", "SQL", "SYSTEM_DESIGN", "TESTING"] as PracticeType[]).forEach((t) => map.set(t, 0));
  for (const e of entries) map.set(e.type, (map.get(e.type) ?? 0) + 1);
  return Array.from(map.entries()).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
    fill: TYPE_COLORS[name],
  }));
}

function buildDifficultyMix(entries: { difficulty?: string; solved: boolean }[]) {
  type K = "easy" | "medium" | "hard";
  const counts: Record<K, { open: number; done: number }> = {
    easy: { open: 0, done: 0 },
    medium: { open: 0, done: 0 },
    hard: { open: 0, done: 0 },
  };
  for (const e of entries) {
    const d = (e.difficulty ?? "medium") as K;
    if (!counts[d]) continue;
    if (e.solved) counts[d].done += 1;
    else counts[d].open += 1;
  }
  return (["easy", "medium", "hard"] as const).map((k) => ({
    name: k,
    open: counts[k].open,
    done: counts[k].done,
  }));
}

export default function PracticeVolumeCharts({ entries }: { entries: PracticeEntry[] }) {
  const volume = useMemo(() => buildVolumeByType(entries), [entries]);
  const diff = useMemo(() => buildDifficultyMix(entries), [entries]);

  return (
    <div className="grid gap-6 lg:grid-cols-2" data-testid="practice-volume-charts">
      <Card>
        <CardHeader>
          <CardTitle id="practice-pie-title">Volume by type</CardTitle>
          <CardDescription>Count of logged practice rows per track.</CardDescription>
        </CardHeader>
        <CardContent className="h-[220px] min-h-[220px] min-w-0">
          <div
            role="img"
            aria-labelledby="practice-pie-title"
            aria-describedby="practice-pie-desc"
            className="h-full w-full"
          >
            <span id="practice-pie-desc" className="sr-only">
              Donut chart of practice problem counts by type: DSA, SQL, system design, and testing.
            </span>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 320, height: 220 }}>
              <PieChart>
                <Pie data={volume} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={2}>
                  {volume.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle id="practice-bar-title">Difficulty mix</CardTitle>
          <CardDescription>Open vs solved by difficulty label.</CardDescription>
        </CardHeader>
        <CardContent className="h-[220px] min-h-[220px] min-w-0">
          <div
            role="img"
            aria-labelledby="practice-bar-title"
            aria-describedby="practice-bar-desc"
            className="h-full w-full"
          >
            <span id="practice-bar-desc" className="sr-only">
              Stacked horizontal bars for easy, medium, and hard showing open versus solved counts.
            </span>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 320, height: 220 }}>
              <BarChart data={diff} layout="vertical" margin={{ left: 4, right: 12, top: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={64} tickFormatter={(v) => String(v)} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="open" stackId="a" fill="var(--chart-5)" radius={[0, 0, 0, 0]} name="Open" />
                <Bar dataKey="done" stackId="a" fill="var(--chart-2)" radius={[0, 6, 6, 0]} name="Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
