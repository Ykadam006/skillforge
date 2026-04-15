"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Bookmark, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  GuideStatusBadge,
  LearningStatusBadge,
  PriorityBadge,
} from "@/components/skills/skill-status-badge";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import type { GuideSkill } from "@/types/guide";

export function SkillCard({
  skillKey,
  slug,
  categoryLabel,
  skill,
}: {
  skillKey: string;
  slug: string;
  categoryLabel: string;
  skill: GuideSkill;
}) {
  const ensureSkill = useSkillforgeStore((s) => s.ensureSkill);
  const progress = useSkillforgeStore((s) => s.skillProgress[skillKey]);
  const toggleBookmark = useSkillforgeStore((s) => s.toggleBookmark);

  useEffect(() => {
    ensureSkill(skillKey, skill.name);
  }, [ensureSkill, skill.name, skillKey]);

  const p = progress;
  const learning = p?.learningStatus ?? "not-started";
  const confidence = p?.confidence ?? 3;
  const bookmarked = p?.bookmarked ?? false;

  const doneTasks = p?.tasks.filter((t) => t.completed).length ?? 0;
  const totalTasks = p?.tasks.length ?? 1;
  const checklistPct = Math.round((doneTasks / totalTasks) * 100);

  const nextLesson =
    learning === "done"
      ? "Ship proof (repo, demo, write-up)"
      : learning === "in-progress"
        ? "Finish the next checklist item"
        : "Start with intro + notes";

  return (
    <Card className="flex min-h-[240px] flex-col border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[18px] font-semibold leading-snug tracking-tight text-foreground">{skill.name}</h2>
          <Button
            type="button"
            size="icon"
            variant={bookmarked ? "default" : "ghost"}
            className="size-9 shrink-0 rounded-xl"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            onClick={() => toggleBookmark(skillKey, skill.name)}
          >
            <Bookmark className="size-4" />
          </Button>
        </div>
        <PriorityBadge priority={skill.priority} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="sf-helper text-muted-foreground">{categoryLabel}</span>
          <span className="text-muted-foreground/50">·</span>
          <GuideStatusBadge status={skill.status} />
          <LearningStatusBadge status={learning} />
          {skill.hot ? <span className="sf-pill-hot">Hot 2026</span> : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        <p className="line-clamp-3 text-[14px] leading-relaxed text-muted-foreground">{skill.why}</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[12px] font-medium text-muted-foreground">
            <span>Path progress</span>
            <span className="tabular-nums">{checklistPct}%</span>
          </div>
          <Progress value={checklistPct} className="h-1.5" />
        </div>
        <div className="flex items-center justify-between gap-2 text-[12px] font-medium text-muted-foreground">
          <span>Confidence</span>
          <span className="tabular-nums text-foreground">
            {confidence}
            /5
          </span>
        </div>
        <p className="sf-helper text-muted-foreground">
          Next: <span className="font-medium text-foreground/90">{nextLesson}</span>
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={`/skills/${slug}`}
          className={cn(
            buttonVariants(),
            "inline-flex h-11 w-full items-center justify-center gap-1 rounded-xl px-[18px] text-[14px] font-medium",
          )}
        >
          Open path
          <ChevronRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
