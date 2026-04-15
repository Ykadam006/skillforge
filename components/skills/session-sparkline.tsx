"use client";

import { useMemo } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import type { SessionHistoryPoint } from "@/types/progress";

const PLACEHOLDER: { i: number; minutes: number; date: string }[] = [{ i: 0, minutes: 0, date: "" }];

export function SessionSparkline({ history }: { history: SessionHistoryPoint[] | undefined }) {
  const data = useMemo(() => {
    if (history?.length) return history.map((h, i) => ({ i, minutes: h.minutes, date: h.date }));
    return PLACEHOLDER;
  }, [history]);

  const maxM = useMemo(() => Math.max(30, ...data.map((d) => d.minutes)), [data]);

  return (
    <div className="w-full">
      <p className="sf-helper mb-2 text-center font-medium text-muted-foreground">Minutes on this skill (logged)</p>
      <div className="h-[72px] w-full min-w-0" role="img" aria-label="Minutes logged for this skill over recent days">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 200, height: 72 }}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <YAxis
              domain={[0, maxM]}
              width={32}
              tick={{ fontSize: 9 }}
              tickCount={3}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`${v} min`, "This skill"]}
              labelFormatter={(_, p) => {
                const rows = p as unknown as readonly { payload?: { date?: string } }[];
                const d = rows[0]?.payload?.date;
                return d ? String(d) : "Log time from this page";
              }}
              contentStyle={{ borderRadius: 8, fontSize: 11, border: "1px solid var(--border)" }}
            />
            <Line type="monotone" dataKey="minutes" stroke="var(--chart-3)" strokeWidth={2} dot={false} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {!history?.length ? (
        <p className="sf-helper mt-1 text-center text-muted-foreground">
          Use “Log study for this skill” below — optional skill link on Practice rows coming later.
        </p>
      ) : null}
    </div>
  );
}
