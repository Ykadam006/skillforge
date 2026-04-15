"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { streakDays } from "@/lib/streak";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import type { PracticeType } from "@/types/progress";

export function PracticeHome() {
  const practiceEntries = useSkillforgeStore((s) => s.practiceEntries);
  const addPracticeEntry = useSkillforgeStore((s) => s.addPracticeEntry);
  const togglePracticeSolved = useSkillforgeStore((s) => s.togglePracticeSolved);
  const studySessions = useSkillforgeStore((s) => s.studySessions);
  const logStudySession = useSkillforgeStore((s) => s.logStudySession);

  const [type, setType] = useState<PracticeType>("DSA");
  const [topic, setTopic] = useState("Arrays / two pointers");
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [minutes, setMinutes] = useState(30);
  const [logMinutes, setLogMinutes] = useState(45);
  const [logCategory, setLogCategory] = useState("DSA");

  const solved = practiceEntries.filter((p) => p.solved).length;
  const streak = useMemo(
    () =>
      streakDays([
        ...practiceEntries.map((p) => ({ date: p.date })),
        ...studySessions.map((s) => ({ date: s.date })),
      ]),
    [practiceEntries, studySessions],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Solved</CardTitle>
            <CardDescription>Practice entries marked done.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{solved}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Queue</CardTitle>
            <CardDescription>Total logged items.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{practiceEntries.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Streak</CardTitle>
            <CardDescription>Consecutive days with practice or study logs.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{streak}d</CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log practice</CardTitle>
            <CardDescription>NeetCode / LeetCode / SQL — keep it lightweight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {(["DSA", "SQL", "SYSTEM_DESIGN", "TESTING"] as PracticeType[]).map((t) => (
                <Button
                  key={t}
                  type="button"
                  size="sm"
                  variant={type === t ? "default" : "outline"}
                  onClick={() => setType(t)}
                >
                  {t.replace("_", " ")}
                </Button>
              ))}
            </div>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic / pattern" />
            <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Problem name or link" />
            <div className="grid gap-2 sm:grid-cols-3">
              {(["easy", "medium", "hard"] as const).map((d) => (
                <Button
                  key={d}
                  type="button"
                  size="sm"
                  variant={difficulty === d ? "default" : "outline"}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              min={5}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value) || 0)}
              placeholder="Minutes"
            />
            <Button
              type="button"
              onClick={() => {
                if (!question.trim()) return;
                addPracticeEntry({
                  type,
                  topic,
                  question: question.trim(),
                  solved: false,
                  difficulty,
                  minutes,
                  date: new Date().toISOString().slice(0, 10),
                });
                setQuestion("");
              }}
            >
              Add to list
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log study time</CardTitle>
            <CardDescription>
              Adds a timed session for today. Dashboard totals and the 14-day chart also include minutes from
              practice items below when you set minutes there.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={logCategory} onChange={(e) => setLogCategory(e.target.value)} placeholder="Category" />
            <Input
              type="number"
              min={5}
              value={logMinutes}
              onChange={(e) => setLogMinutes(Number(e.target.value) || 0)}
            />
            <Button type="button" variant="secondary" onClick={() => logStudySession(logMinutes, logCategory)}>
              Log session
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem list</CardTitle>
          <CardDescription>Toggle solved as you go.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {practiceEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing logged yet — add your first item.</p>
          ) : null}
          {practiceEntries.map((p) => (
            <div key={p.id}>
              <div className="flex flex-wrap items-start gap-3">
                <Checkbox checked={p.solved} onCheckedChange={() => togglePracticeSolved(p.id)} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{p.question}</span>
                    <span className="text-xs text-muted-foreground">{p.type}</span>
                    {p.difficulty ? (
                      <span className="text-xs text-muted-foreground capitalize">{p.difficulty}</span>
                    ) : null}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {p.topic} · {p.date}
                    {p.minutes ? ` · ${p.minutes}m` : ""}
                  </div>
                </div>
              </div>
              <Separator className="mt-3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
