"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Circle, ExternalLink } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  GuideStatusBadge,
  LearningStatusBadge,
  PriorityBadge,
} from "@/components/skills/skill-status-badge";
import { findSkillBySlug } from "@/lib/guide";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import type { GuideResource, LearningStatus } from "@/types/guide";

function RingProgress({ value }: { value: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90" aria-hidden>
        <circle cx="56" cy="56" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="text-center">
        <div className="text-2xl font-bold tabular-nums text-foreground">{value}%</div>
        <div className="sf-helper text-muted-foreground">Checklist</div>
      </div>
    </div>
  );
}

export function SkillLearningPanel({ slug }: { slug: string }) {
  const [draftTask, setDraftTask] = useState("");
  const row = useMemo(() => findSkillBySlug(slug), [slug]);
  const ensureSkill = useSkillforgeStore((s) => s.ensureSkill);
  const setLearningStatus = useSkillforgeStore((s) => s.setLearningStatus);
  const setConfidence = useSkillforgeStore((s) => s.setConfidence);
  const setNotes = useSkillforgeStore((s) => s.setNotes);
  const setTaskCompleted = useSkillforgeStore((s) => s.setTaskCompleted);
  const addTask = useSkillforgeStore((s) => s.addTask);
  const touchSkillOpened = useSkillforgeStore((s) => s.touchSkillOpened);
  const progress = useSkillforgeStore((s) => (row ? s.skillProgress[row.key] : undefined));

  useEffect(() => {
    if (!row) return;
    ensureSkill(row.key, row.skill.name);
    touchSkillOpened(row.key, row.skill.name);
  }, [ensureSkill, row, touchSkillOpened]);

  const relatedProject = useSkillforgeStore((s) =>
    row ? s.projects.find((proj) => proj.skillKeys.includes(row.key)) : undefined,
  );

  const resourcesByType = useMemo(() => {
    if (!row) return {} as Record<string, GuideResource[]>;
    const list = row.skill.resources ?? [];
    return list.reduce<Record<string, GuideResource[]>>((acc, r) => {
      const k = r.type || "Other";
      acc[k] = acc[k] ?? [];
      acc[k].push(r);
      return acc;
    }, {});
  }, [row]);

  if (!row) return null;

  const p = progress;
  const learning: LearningStatus = p?.learningStatus ?? "not-started";
  const confidence = p?.confidence ?? 3;
  const notes = p?.notes ?? "";
  const tasks = p?.tasks ?? [];
  const doneTasks = tasks.filter((t) => t.completed).length;
  const checklistPct = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <Link
        href="/skills"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "inline-flex h-10 gap-2 rounded-xl px-2")}
      >
        <ArrowLeft className="size-4" />
        Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Main column — learning path */}
        <div className="space-y-6 lg:col-span-8">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <GuideStatusBadge status={row.skill.status} />
                <LearningStatusBadge status={learning} />
                <PriorityBadge priority={row.skill.priority} />
                {row.skill.hot ? <span className="sf-pill-hot">Hot 2026</span> : null}
              </div>
              <div>
                <p className="sf-helper font-medium text-muted-foreground">{row.categoryLabel}</p>
                <h1 className="sf-hero-title mt-1 text-balance text-foreground">{row.skill.name}</h1>
              </div>
              <p className="sf-body max-w-[65ch] text-pretty text-muted-foreground">{row.skill.why}</p>
              <div className="flex flex-wrap gap-3 text-[13px] text-muted-foreground">
                <span>Est. depth: beginner → advanced</span>
                <span className="hidden sm:inline">·</span>
                <span>Keep lines short — notes live in the side panel.</span>
              </div>
            </CardHeader>
          </Card>

          <div>
            <h2 className="sf-section-label mb-4">Learning stages</h2>
            <div className="space-y-6">
              {row.skill.levels.map((lv) => (
                <Card key={lv.label} className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="sf-card-title">{lv.label}</CardTitle>
                    <CardDescription>Work top to bottom. Check items as you truly complete them.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {lv.topics.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 rounded-xl border border-transparent px-2 py-2.5 transition-colors hover:border-border/80 hover:bg-muted/20"
                      >
                        <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden />
                        <div
                          className="sf-body text-[15px] leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
                          dangerouslySetInnerHTML={{ __html: t }}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {row.skill.resources?.length ? (
            <div>
              <h2 className="sf-section-label mb-4">Resources</h2>
              <div className="space-y-8">
                {Object.entries(resourcesByType).map(([type, items]) => (
                  <div key={type}>
                    <h3 className="sf-helper mb-3 font-semibold uppercase tracking-wide text-muted-foreground">
                      {type}
                    </h3>
                    <div className="space-y-3">
                      {items.map((r) => (
                        <Card key={r.url} size="sm" className="border-border/80 shadow-sm">
                          <CardHeader className="pb-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <CardTitle className="text-base font-semibold leading-snug">{r.name}</CardTitle>
                              <span className="rounded-lg border border-border bg-muted/30 px-2 py-0.5 text-[12px] font-medium text-muted-foreground">
                                {r.type}
                              </span>
                            </div>
                            <CardDescription className="text-[14px] leading-relaxed">{r.desc}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-0">
                            <p className="sf-helper max-w-prose italic text-muted-foreground">{r.covers}</p>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noreferrer"
                              className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "h-9 shrink-0 gap-1 rounded-xl",
                              )}
                            >
                              Open
                              <ExternalLink className="size-3.5" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {row.skill.note ? (
            <div className="sf-callout-next">
              <h2 className="sf-callout-next-title">What to do next</h2>
              <p className="sf-callout-next-body">{row.skill.note}</p>
            </div>
          ) : null}
        </div>

        {/* Sticky action column */}
        <div className="lg:col-span-4">
          <div className="space-y-5 lg:sticky lg:top-28">
            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="sf-card-title">Progress</CardTitle>
                <CardDescription>Execution checklist for this skill.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <RingProgress value={checklistPct} />
                <div className="flex w-full flex-col gap-2">
                  <p className="sf-helper text-center font-medium text-muted-foreground">Status</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {(
                      [
                        ["not-started", "Not started"],
                        ["in-progress", "In progress"],
                        ["done", "Done"],
                      ] as const
                    ).map(([value, label]) => (
                      <Button
                        key={value}
                        type="button"
                        size="sm"
                        variant={learning === value ? "default" : "outline"}
                        className="h-9 rounded-xl px-3 text-[13px]"
                        onClick={() => setLearningStatus(row.key, row.skill.name, value)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="w-full space-y-2">
                  <div className="sf-helper font-medium text-muted-foreground">Confidence (1–5)</div>
                  <Slider
                    value={[confidence]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(v) => {
                      const next = Array.isArray(v) ? v[0] : v;
                      setConfidence(row.key, row.skill.name, Number(next ?? 3));
                    }}
                  />
                  <div className="sf-helper text-right text-muted-foreground">{confidence} / 5</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="sf-card-title">Notes</CardTitle>
                <CardDescription>Capture understanding, links, and blockers.</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring/40 flex min-h-[120px] w-full rounded-xl border px-3 py-2.5 text-[15px] leading-relaxed shadow-sm outline-none focus-visible:ring-[3px]"
                  value={notes}
                  onChange={(e) => setNotes(row.key, row.skill.name, e.target.value)}
                  placeholder="What you learned today…"
                />
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="sf-card-title">Your checklist</CardTitle>
                <CardDescription>Ship-oriented tasks — add your own.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={draftTask}
                    onChange={(e) => setDraftTask(e.target.value)}
                    placeholder="New task…"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 shrink-0 rounded-xl sm:w-auto"
                    onClick={() => {
                      const title = draftTask.trim();
                      if (!title) return;
                      addTask(row.key, row.skill.name, title);
                      setDraftTask("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                <ul className="space-y-2">
                  {tasks.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/10 px-3 py-2.5"
                    >
                      <Checkbox
                        checked={t.completed}
                        onCheckedChange={(checked) =>
                          setTaskCompleted(row.key, row.skill.name, t.id, Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                      <span
                        className={cn(
                          "text-[14px] leading-relaxed",
                          t.completed ? "text-muted-foreground line-through" : "text-foreground",
                        )}
                      >
                        {t.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="sf-card-title">Related project</CardTitle>
                <CardDescription>Build to prove the skill.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-[14px]">
                {relatedProject ? (
                  <>
                    <p className="font-semibold text-foreground">{relatedProject.title}</p>
                    <p className="sf-helper capitalize text-muted-foreground">Status: {relatedProject.status}</p>
                    <p className="text-muted-foreground">{relatedProject.notes}</p>
                    <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}>
                      Open projects
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">No linked project yet.</p>
                    <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}>
                      Link a project
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            {row.skill.cert ? (
              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="sf-card-title">Certification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-[14px]">
                  <p className="font-semibold">{row.skill.cert.name}</p>
                  <p className="text-muted-foreground">{row.skill.cert.desc}</p>
                  <Link
                    href="/certifications"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-2 inline-flex h-9 rounded-xl")}
                  >
                    Track readiness
                  </Link>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
