"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, Camera, Circle, ExternalLink, Package } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  GuideStatusBadge,
  LearningStatusBadge,
  PriorityBadge,
} from "@/components/skills/skill-status-badge";
import { ChecklistSparkline } from "@/components/skills/checklist-sparkline";
import { resourceIconForType } from "@/components/skills/resource-type-icon";
import { SessionSparkline } from "@/components/skills/session-sparkline";
import { StageProgressStrip } from "@/components/skills/stage-progress-strip";
import { findCertificationForGuideCert } from "@/lib/cert-match";
import { getProjectById } from "@/lib/data";
import { findSkillBySlug } from "@/lib/guide";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import type { GuideResource, LearningStatus } from "@/types/guide";
import type { Project } from "@/types/progress";

/** Stable empty snapshot for useMemo — do not use inline `[]` in zustand selectors (breaks useSyncExternalStore). */
const EMPTY_PROJECTS: Project[] = [];

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
  const [flashTaskId, setFlashTaskId] = useState<string | null>(null);
  const [skillLogMinutes, setSkillLogMinutes] = useState(25);
  const row = useMemo(() => findSkillBySlug(slug), [slug]);
  const ensureSkill = useSkillforgeStore((s) => s.ensureSkill);
  const setLearningStatus = useSkillforgeStore((s) => s.setLearningStatus);
  const setConfidence = useSkillforgeStore((s) => s.setConfidence);
  const setNotes = useSkillforgeStore((s) => s.setNotes);
  const setTaskCompleted = useSkillforgeStore((s) => s.setTaskCompleted);
  const addTask = useSkillforgeStore((s) => s.addTask);
  const touchSkillOpened = useSkillforgeStore((s) => s.touchSkillOpened);
  const logStudySession = useSkillforgeStore((s) => s.logStudySession);
  const certifications = useSkillforgeStore((s) => s.certifications);
  const projects = useSkillforgeStore((s) => s.projects);
  const progress = useSkillforgeStore((s) => (row ? s.skillProgress[row.key] : undefined));

  useEffect(() => {
    if (!row) return;
    ensureSkill(row.key, row.skill.name);
    touchSkillOpened(row.key, row.skill.name);
  }, [ensureSkill, row, touchSkillOpened]);

  const relatedProjects = useMemo(
    () => (row ? projects.filter((proj) => proj.skillKeys.includes(row.key)) : EMPTY_PROJECTS),
    [projects, row],
  );

  const showcaseProjects = useMemo(() => {
    if (!row?.skill.projectIds?.length) return [];
    return row.skill.projectIds.map((id) => getProjectById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [row]);

  const tierProgressValues = useMemo(
    () => (row?.skill.levels ?? []).map((l) => l.progress).filter((n): n is number => typeof n === "number"),
    [row],
  );

  const overallMasteryFromJson = useMemo(() => {
    if (!tierProgressValues.length) return null;
    return Math.round(tierProgressValues.reduce((a, b) => a + b, 0) / tierProgressValues.length);
  }, [tierProgressValues]);

  const resourceStats = useMemo(() => {
    const list = row?.skill.resources ?? [];
    let completed = 0;
    let inProgress = 0;
    for (const r of list) {
      const s = r.resourceStatus ?? "";
      if (s === "completed" || s === "done") completed += 1;
      else if (s === "in-progress") inProgress += 1;
    }
    const total = list.length;
    const barPct =
      total === 0 ? 0 : Math.min(100, Math.round(((completed + inProgress * 0.55) / total) * 100));
    return { completed, inProgress, total, barPct };
  }, [row]);

  const combinedProjects = useMemo(() => {
    const seen = new Set<string>();
    const out: Array<
      | { kind: "showcase"; showcase: NonNullable<ReturnType<typeof getProjectById>> }
      | { kind: "store"; project: Project }
    > = [];
    for (const sc of showcaseProjects) {
      if (seen.has(sc.id)) continue;
      seen.add(sc.id);
      out.push({ kind: "showcase", showcase: sc });
    }
    for (const proj of relatedProjects) {
      if (seen.has(proj.id)) continue;
      seen.add(proj.id);
      out.push({ kind: "store", project: proj });
    }
    return out;
  }, [showcaseProjects, relatedProjects]);

  const matchedCert = useMemo(
    () => (row?.skill.cert ? findCertificationForGuideCert(certifications, row.skill.cert) : undefined),
    [certifications, row],
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
  const overallMastery = overallMasteryFromJson ?? checklistPct;
  const primaryShowcase = showcaseProjects[0];
  const primaryStore = relatedProjects[0];
  const primaryLabel = primaryStore?.title ?? primaryShowcase?.name;
  const primaryBody = primaryStore?.notes ?? primaryShowcase?.tagline;
  const primaryStatus = primaryStore?.status ?? primaryShowcase?.status;

  return (
    <div className="space-y-8">
      <Link
        href="/skills"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "inline-flex h-10 gap-2 rounded-xl px-2")}
      >
        <ArrowLeft className="size-4" />
        Back to library
      </Link>

      <nav aria-label="Breadcrumb" className="sf-helper -mt-4 text-[13px] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li>
            <Link href="/skills" className="hover:text-foreground">
              skills
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground/60">
            /
          </li>
          <li className="text-muted-foreground">{row.categoryId}</li>
          <li aria-hidden className="text-muted-foreground/60">
            /
          </li>
          <li className="font-medium text-foreground">{slug}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Main column — learning path */}
        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Overall mastery</CardDescription>
                <CardTitle className="sf-card-title text-3xl tabular-nums">{overallMastery}%</CardTitle>
                <p className="sf-helper text-muted-foreground">
                  {tierProgressValues.length > 0
                    ? `Average across ${tierProgressValues.length} tiers from your guide JSON.`
                    : "From your on-page checklist until tier scores exist in data."}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={overallMastery} className="h-2" />
              </CardContent>
            </Card>
            <Card className="border-border/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Resources</CardDescription>
                <CardTitle className="sf-card-title text-lg leading-snug">
                  {resourceStats.total === 0
                    ? "No resources listed"
                    : `${resourceStats.completed} of ${resourceStats.total} completed`}
                  {resourceStats.total > 0 && resourceStats.inProgress > 0
                    ? ` · ${resourceStats.inProgress} in progress`
                    : null}
                </CardTitle>
                <p className="sf-helper text-muted-foreground">Static status from data/skills.json.</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={resourceStats.barPct} className="h-2" />
              </CardContent>
            </Card>
          </div>

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

          {row.skill.levels.length > 0 ? (
            <StageProgressStrip levels={row.skill.levels} checklistPct={checklistPct} learning={learning} />
          ) : null}

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
                      {items.map((r) => {
                        const Icon = resourceIconForType(r.type);
                        return (
                          <Card key={r.url} size="sm" className="border-border/80 shadow-sm">
                            <CardHeader className="pb-2">
                              <div className="flex gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-primary-light text-primary">
                                  <Icon className="size-5" aria-hidden />
                                </div>
                                <div className="min-w-0 flex-1 space-y-1">
                                  <div className="flex flex-wrap items-start justify-between gap-2">
                                    <CardTitle className="text-base font-semibold leading-snug">{r.name}</CardTitle>
                                    <div className="flex flex-wrap justify-end gap-1.5">
                                      <span className="rounded-lg border border-border bg-muted/30 px-2 py-0.5 text-[12px] font-medium text-muted-foreground">
                                        {r.type}
                                      </span>
                                      {r.cost ? (
                                        <span className="rounded-lg border border-border bg-muted/20 px-2 py-0.5 text-[12px] text-muted-foreground">
                                          {r.cost}
                                        </span>
                                      ) : null}
                                      <span
                                        className={cn(
                                          "rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide",
                                          (r.resourceStatus ?? "") === "completed" || (r.resourceStatus ?? "") === "done"
                                            ? "bg-success-light text-success-foreground"
                                            : (r.resourceStatus ?? "") === "in-progress"
                                              ? "bg-primary-light text-primary"
                                              : "bg-muted text-muted-foreground",
                                        )}
                                      >
                                        {r.covers}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-[13px] font-medium leading-snug text-foreground">{r.desc}</p>
                                  <CardDescription className="text-[13px] leading-relaxed text-muted-foreground">
                                    {r.covers}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="flex flex-wrap justify-end gap-2 pt-0">
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
                        );
                      })}
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
                <ChecklistSparkline history={p?.checklistHistory} />
                <SessionSparkline history={p?.sessionHistory} />
                <div className="w-full space-y-2 rounded-xl border border-border/60 bg-muted/10 p-3">
                  <p className="sf-helper font-medium text-muted-foreground">Log study for this skill</p>
                  <div className="flex flex-wrap gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={480}
                      className="h-10 w-24"
                      value={skillLogMinutes}
                      onChange={(e) => setSkillLogMinutes(Number(e.target.value) || 0)}
                      aria-label="Minutes to log for this skill"
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-10 rounded-xl"
                      onClick={() => {
                        if (skillLogMinutes < 1) return;
                        logStudySession(skillLogMinutes, row.skill.name, row.key);
                      }}
                    >
                      Log to path
                    </Button>
                  </div>
                  <p className="sf-helper text-muted-foreground">Counts toward your streak and this skill&apos;s minutes chart.</p>
                </div>
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
                      className={cn(
                        "flex items-start gap-3 rounded-xl border border-border/60 bg-muted/10 px-3 py-2.5 transition-colors",
                        flashTaskId === t.id && "sf-task-row-done",
                      )}
                    >
                      <Checkbox
                        checked={t.completed}
                        onCheckedChange={(checked) => {
                          setTaskCompleted(row.key, row.skill.name, t.id, Boolean(checked));
                          if (checked) {
                            setFlashTaskId(t.id);
                            window.setTimeout(() => setFlashTaskId(null), 400);
                          }
                        }}
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

            <Card className="border-border/80 border-dashed border-primary/30 bg-primary-light/40 shadow-sm dark:bg-primary-light/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Package className="size-5 text-primary" aria-hidden />
                  <CardTitle className="sf-card-title">Ship your proof</CardTitle>
                </div>
                <CardDescription>Hiring managers trust artifacts — not intentions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-[14px]">
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Repo or demo that shows the skill in use</li>
                  <li>Practice log with reps at medium+ difficulty</li>
                  <li>Optional: cert score or mock exam screenshot</li>
                </ul>
                <div className="flex flex-col gap-2">
                  {combinedProjects.length > 0 ? (
                    combinedProjects.map((entry) =>
                      entry.kind === "store" ? (
                        <Link
                          key={entry.project.id}
                          href={`/projects#project-${entry.project.id}`}
                          className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "h-auto min-h-9 justify-start rounded-xl py-2 text-left",
                          )}
                        >
                          <Package className="mr-2 size-3.5 shrink-0" aria-hidden />
                          <span className="line-clamp-2">{entry.project.title}</span>
                        </Link>
                      ) : (
                        <div key={entry.showcase.id} className="flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/10 p-3">
                          <p className="text-sm font-semibold text-foreground">{entry.showcase.name}</p>
                          <div className="flex flex-wrap gap-2">
                            {entry.showcase.live ? (
                              <a
                                href={entry.showcase.live}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(buttonVariants({ variant: "default", size: "sm" }), "h-9 gap-1 rounded-xl")}
                              >
                                Live demo
                                <ExternalLink className="size-3.5" aria-hidden />
                              </a>
                            ) : null}
                            {entry.showcase.github ? (
                              <a
                                href={entry.showcase.github}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 gap-1 rounded-xl")}
                              >
                                GitHub
                                <ExternalLink className="size-3.5" aria-hidden />
                              </a>
                            ) : null}
                            <Link
                              href="/projects"
                              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}
                            >
                              Mirror in Projects
                            </Link>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}>
                      Create or link a project
                    </Link>
                  )}
                  <Link href="/practice" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}>
                    Practice log
                  </Link>
                  {matchedCert ? (
                    <Link
                      href={`/certifications#cert-${matchedCert.id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-auto min-h-9 justify-start gap-1 rounded-xl py-2")}
                    >
                      <Award className="size-3.5 shrink-0" aria-hidden />
                      <span className="line-clamp-2">{matchedCert.name}</span>
                    </Link>
                  ) : row.skill.cert ? (
                    <Link
                      href="/certifications"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 gap-1 rounded-xl")}
                    >
                      <Award className="size-3.5" aria-hidden />
                      Certs
                    </Link>
                  ) : null}
                </div>
                <p className="sf-helper flex items-start gap-2 text-muted-foreground">
                  <Camera className="mt-0.5 size-4 shrink-0" aria-hidden />
                  Drop a screenshot or link in Notes when you ship — future you will thank you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="sf-card-title">Related project</CardTitle>
                <CardDescription>Build to prove the skill.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-[14px]">
                {primaryLabel ? (
                  <>
                    <p className="font-semibold text-foreground">{primaryLabel}</p>
                    <p className="sf-helper capitalize text-muted-foreground">Status: {primaryStatus}</p>
                    {primaryBody ? <p className="text-muted-foreground">{primaryBody}</p> : null}
                    {combinedProjects.length > 1 ? (
                      <p className="text-xs text-muted-foreground">+{combinedProjects.length - 1} more linked below.</p>
                    ) : null}
                    {primaryStore ? (
                      <Link
                        href={`/projects#project-${primaryStore.id}`}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}
                      >
                        Jump to project
                      </Link>
                    ) : primaryShowcase?.live ? (
                      <a
                        href={primaryShowcase.live}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 gap-1 rounded-xl")}
                      >
                        Open live demo
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    ) : (
                      <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}>
                        Link a project
                      </Link>
                    )}
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
                  <div className="flex flex-wrap gap-2 pt-1">
                    {row.skill.cert.url ? (
                      <a
                        href={row.skill.cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 gap-1 rounded-xl")}
                      >
                        Official info
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    ) : null}
                    <Link
                      href={matchedCert ? `/certifications#cert-${matchedCert.id}` : "/certifications"}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 rounded-xl")}
                    >
                      Track readiness
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
