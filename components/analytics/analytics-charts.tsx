"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

export type AnalyticsChartsProps = {
  radarWithTargets: { axis: string; You: number; Target: number }[];
  byCat: { name: string; pct: number; done: number; total: number }[];
};

export function AnalyticsCharts({ radarWithTargets, byCat }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2" data-testid="analytics-charts">
      <Card>
        <CardHeader>
          <CardTitle id="analytics-radar-title">Confidence radar</CardTitle>
          <CardDescription>Your average confidence vs your saved target profile.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 min-h-80 min-w-0 shrink-0">
          <div
            role="img"
            aria-labelledby="analytics-radar-title"
            aria-describedby="analytics-radar-desc"
            className="h-full w-full"
          >
            <span id="analytics-radar-desc" className="sr-only">
              Radar chart comparing your skills to target scores by category.
            </span>
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={280}
              initialDimension={{ width: 520, height: 320 }}
            >
              <RadarChart data={radarWithTargets} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
                <Radar
                  name="Target profile"
                  dataKey="Target"
                  stroke="var(--primary)"
                  strokeDasharray="5 5"
                  fill="var(--primary)"
                  fillOpacity={0.06}
                />
                <Radar name="You" dataKey="You" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.32} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id="analytics-bar-title">Category completion</CardTitle>
          <CardDescription>Percent of skills marked done per section.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 min-h-80 min-w-0 shrink-0">
          <div
            role="img"
            aria-labelledby="analytics-bar-title"
            aria-describedby="analytics-bar-desc"
            className="h-full w-full"
          >
            <span id="analytics-bar-desc" className="sr-only">
              Horizontal bars showing completion percentage per skill category.
            </span>
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={280}
              initialDimension={{ width: 520, height: 320 }}
            >
              <BarChart data={byCat} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`${Number(v ?? 0)}%`, "Done"]} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} fill="var(--chart-5)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
