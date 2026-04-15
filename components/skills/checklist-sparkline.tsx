"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import type { ChecklistHistoryPoint } from "@/types/progress";

export function ChecklistSparkline({ history }: { history: ChecklistHistoryPoint[] | undefined }) {
  const data =
    history && history.length > 0
      ? history.map((h, i) => ({ i, pct: h.pct, date: h.date }))
      : [{ i: 0, pct: 0, date: "" }];

  return (
    <div className="w-full">
      <p className="sf-helper mb-2 text-center font-medium text-muted-foreground">Checklist over time</p>
      <div
        className="h-[72px] w-full min-w-0"
        role="img"
        aria-label="Checklist completion percentage over recent days"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 200, height: 72 }}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <YAxis domain={[0, 100]} width={32} tick={{ fontSize: 9 }} tickCount={3} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v) => [`${v}%`, "Checklist"]}
              labelFormatter={(_, p) => {
                const rows = p as unknown as readonly { payload?: { date?: string } }[];
                const d = rows[0]?.payload?.date;
                return d ? String(d) : "Start checking tasks";
              }}
              contentStyle={{ borderRadius: 8, fontSize: 11, border: "1px solid var(--border)" }}
            />
            <Line type="monotone" dataKey="pct" stroke="var(--chart-1)" strokeWidth={2} dot={false} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {!history?.length ? (
        <p className="sf-helper mt-1 text-center text-muted-foreground">Updates as you tick tasks below.</p>
      ) : null}
    </div>
  );
}
