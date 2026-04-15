"use client";

import type { ReactNode } from "react";
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

const DONUT = ["var(--chart-1)", "var(--chart-5)"];
const BAR = "var(--chart-5)";

export type DashboardInsightChartsProps = {
  chartEmpty: boolean;
  byDay: { date: string; minutes: number }[];
  byCat: { name: string; pct: number }[];
  weakest: { name: string; pct: number } | null;
  donut: { name: string; value: number }[];
  stats: { done: number; total: number };
  rightSlot: ReactNode;
};

export function DashboardInsightCharts({
  chartEmpty,
  byDay,
  byCat,
  weakest,
  donut,
  stats,
  rightSlot,
}: DashboardInsightChartsProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-3" aria-label="Dashboard charts">
      <div className="space-y-8 lg:col-span-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title" id="dash-chart-rhythm-title">
              Study rhythm
            </CardTitle>
            <CardDescription>
              Minutes per day (last 14 days): study sessions plus practice rows where you entered minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="sf-chart-card px-2 pb-2">
            {chartEmpty ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-6 py-10 text-center">
                <p className="sf-body max-w-md text-muted-foreground">
                  No minutes in the last 14 days yet. Log a short session to see your rhythm line.
                </p>
                <Link className={cn(buttonVariants(), "h-11 rounded-xl")} href="/practice">
                  Log a session on Practice
                </Link>
              </div>
            ) : (
              <div
                role="img"
                aria-labelledby="dash-chart-rhythm-title"
                aria-describedby="dash-chart-rhythm-desc"
              >
                <span id="dash-chart-rhythm-desc" className="sr-only">
                  Line chart of minutes studied per day for the past two weeks.
                </span>
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
              </div>
            )}
          </CardContent>
          <CardContent className="border-t border-border/50 pt-4">
            <p className="sf-helper text-muted-foreground">
              Tip: log short sessions after deep work — the trend line keeps you honest.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title" id="dash-chart-cat-title">
              Progress by category
            </CardTitle>
            <CardDescription>Share of skills marked complete in each section.</CardDescription>
          </CardHeader>
          <CardContent className="sf-chart-card px-2 pb-2">
            <div
              role="img"
              aria-labelledby="dash-chart-cat-title"
              aria-describedby="dash-chart-cat-desc"
            >
              <span id="dash-chart-cat-desc" className="sr-only">
                Horizontal bar chart showing percent complete per category.
              </span>
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
            </div>
          </CardContent>
          {weakest ? (
            <CardContent className="border-t border-border/50 pt-4">
              <p className="sf-body text-muted-foreground">
                <span className="font-semibold text-foreground">{weakest.name}</span> has the lowest completion right now (
                {weakest.pct}%). That is a good place to schedule your next block.
              </p>
            </CardContent>
          ) : null}
        </Card>
      </div>

      <div className="space-y-8">
        {rightSlot}

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="sf-card-title" id="dash-chart-donut-title">
              Overall completion
            </CardTitle>
            <CardDescription>Honest marks only — done means done.</CardDescription>
          </CardHeader>
          <CardContent className="sf-chart-card flex flex-col items-center justify-center px-2 pb-4">
            <div
              role="img"
              aria-labelledby="dash-chart-donut-title"
              aria-describedby="dash-chart-donut-desc"
            >
              <span id="dash-chart-donut-desc" className="sr-only">
                Donut chart showing done versus remaining skills out of {stats.total} total.
              </span>
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
            </div>
            <p className="sf-helper -mt-2 text-muted-foreground">
              {stats.done} done · {stats.total} total
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
