"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSkillforgeStore } from "@/stores/skillforge-store";

const PracticeVolumeCharts = dynamic(() => import("@/components/practice/practice-charts"), {
  ssr: false,
  loading: () => (
    <div
      className="grid gap-6 lg:grid-cols-2"
      aria-busy="true"
      aria-label="Loading practice charts"
    >
      <div className="h-[220px] animate-pulse rounded-2xl bg-muted/40" />
      <div className="h-[220px] animate-pulse rounded-2xl bg-muted/40" />
    </div>
  ),
});

export function PracticeVolumeAndDifficulty({ className }: { className?: string }) {
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);

  return (
    <div className={className}>
      {practiceEntries.length === 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Volume by type</CardTitle>
              <CardDescription>Count of logged practice rows per track.</CardDescription>
            </CardHeader>
            <CardContent className="h-[220px] min-h-[220px] min-w-0">
              <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 text-center">
                <p className="text-sm text-muted-foreground">Log a few problems to see volume by track.</p>
                <Link href="#log-practice" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "rounded-lg")}>
                  Add a practice row
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Difficulty mix</CardTitle>
              <CardDescription>Open vs solved by difficulty label.</CardDescription>
            </CardHeader>
            <CardContent className="h-[220px] min-h-[220px] min-w-0">
              <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 text-center">
                <p className="text-sm text-muted-foreground">Difficulty bars appear once you log items with easy / medium / hard.</p>
                <Link href="#log-practice" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "rounded-lg")}>
                  Log practice
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <PracticeVolumeCharts entries={practiceEntries} />
      )}
    </div>
  );
}

export function PracticeSessionTimer() {
  const logStudySession = useSkillforgeStore((s) => s.logStudySession);
  const [preset, setPreset] = useState(25);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [pausedRemain, setPausedRemain] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [category, setCategory] = useState("Focus");
  const [timerAnnounce, setTimerAnnounce] = useState("");

  const running = endAt !== null && pausedRemain === null;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNowMs(Date.now()), 500);
    return () => clearInterval(id);
  }, [running]);

  const secondsLeft =
    pausedRemain !== null
      ? pausedRemain
      : endAt !== null
        ? Math.max(0, Math.ceil((endAt - nowMs) / 1000))
        : preset * 60;

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const logElapsedMinutes = () => {
    if (!endAt && pausedRemain === null) return preset;
    const total = preset * 60;
    const left =
      pausedRemain ?? (endAt !== null ? Math.max(0, Math.ceil((endAt - Date.now()) / 1000)) : total);
    const used = Math.max(0, total - left);
    return Math.max(1, Math.round(used / 60));
  };

  useEffect(() => {
    if (!timerAnnounce) return;
    const t = window.setTimeout(() => setTimerAnnounce(""), 4000);
    return () => window.clearTimeout(t);
  }, [timerAnnounce]);

  return (
    <Card data-testid="session-timer">
      <CardHeader>
        <CardTitle>Session timer</CardTitle>
        <CardDescription>Optional Pomodoro-style focus. Log honest minutes when you stop.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="sr-only" aria-live="polite">
          {timerAnnounce}
        </div>
        <div className="flex flex-wrap gap-2">
          {[15, 25, 50].map((m) => (
            <Button
              key={m}
              type="button"
              size="sm"
              variant={preset === m ? "default" : "outline"}
              disabled={running || pausedRemain !== null}
              onClick={() => setPreset(m)}
            >
              {m} min
            </Button>
          ))}
        </div>
        <div className="rounded-xl border border-border/80 bg-muted/20 px-4 py-6 text-center">
          <div className="font-mono text-4xl font-semibold tabular-nums text-foreground" aria-label={`Time remaining ${fmt(secondsLeft)}`}>
            {fmt(secondsLeft)}
          </div>
          <p className="sf-helper mt-2 text-muted-foreground">
            {running ? "Focusing…" : pausedRemain !== null ? "Paused" : "Ready"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              setPausedRemain(null);
              setEndAt(Date.now() + preset * 60 * 1000);
              setTimerAnnounce(`Timer started for ${preset} minutes.`);
            }}
            disabled={running}
          >
            Start
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (endAt) {
                const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
                setPausedRemain(left);
                setEndAt(null);
                setTimerAnnounce(`Paused at ${fmt(left)} remaining.`);
              }
            }}
            disabled={!running}
          >
            Pause
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (pausedRemain !== null) {
                setEndAt(Date.now() + pausedRemain * 1000);
                setPausedRemain(null);
                setTimerAnnounce("Timer resumed.");
              }
            }}
            disabled={pausedRemain === null}
          >
            Resume
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const mins = logElapsedMinutes();
              logStudySession(mins, category);
              setEndAt(null);
              setPausedRemain(null);
              setTimerAnnounce(`Logged ${mins} minute study session. Timer reset.`);
            }}
          >
            Log &amp; reset
          </Button>
        </div>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category for this log" />
        <p className="text-xs text-muted-foreground">
          Log &amp; reset records elapsed time from the current preset (minimum 1 minute).
        </p>
      </CardContent>
    </Card>
  );
}
