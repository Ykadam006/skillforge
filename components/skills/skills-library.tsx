"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skills/skill-card";
import { getGuide } from "@/lib/guide";
import { skillKey, skillSlug } from "@/lib/slug";
import type { GuideSkill } from "@/types/guide";
import { cn } from "@/lib/utils";

type ResumeView = "all" | "have" | "need" | "cert";

function skillMatches(
  skill: GuideSkill,
  view: ResumeView,
  onlyHigh: boolean,
  onlyHot: boolean,
  q: string,
) {
  if (onlyHigh && skill.priority !== 1) return false;
  if (onlyHot && !skill.hot) return false;
  if (view !== "all" && skill.status !== view) return false;
  if (q.trim() && !skill.name.toLowerCase().includes(q.trim().toLowerCase())) return false;
  return true;
}

export function SkillsLibrary() {
  const guide = useMemo(() => getGuide(), []);
  const [q, setQ] = useState("");
  const [view, setView] = useState<ResumeView>("all");
  const [onlyHigh, setOnlyHigh] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);

  const resumeChips: { id: ResumeView; label: string }[] = [
    { id: "all", label: "All" },
    { id: "have", label: "Have" },
    { id: "need", label: "Gaps" },
    { id: "cert", label: "Certifications" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search skills by name…"
          className="h-11 max-w-2xl rounded-xl bg-card"
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="sr-only">Resume filters</span>
            {resumeChips.map((chip) => (
              <Button
                key={chip.id}
                type="button"
                size="sm"
                variant={view === chip.id ? "default" : "outline"}
                className={cn(
                  "h-9 rounded-xl px-3 text-[13px] font-medium",
                  view === chip.id && "shadow-sm",
                )}
                onClick={() => setView(chip.id)}
              >
                {chip.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={onlyHigh ? "default" : "outline"}
              className="h-9 rounded-xl px-3 text-[13px] font-medium"
              onClick={() => setOnlyHigh((v) => !v)}
            >
              High priority
            </Button>
            <Button
              type="button"
              size="sm"
              variant={onlyHot ? "default" : "outline"}
              className="h-9 rounded-xl px-3 text-[13px] font-medium"
              onClick={() => setOnlyHot((v) => !v)}
            >
              Hot 2026
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue={guide.cats[0]?.id}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-muted/40 p-1">
          {guide.cats.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className="rounded-xl px-3 py-2 text-[13px] font-medium data-[state=active]:shadow-sm"
            >
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {guide.cats.map((c) => (
          <TabsContent key={c.id} value={c.id} className="mt-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {c.skills
                .filter((s) => skillMatches(s, view, onlyHigh, onlyHot, q))
                .map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skillKey={skillKey(c.id, skill.name)}
                    slug={skillSlug(c.id, skill.name)}
                    categoryLabel={c.label}
                    skill={skill}
                  />
                ))}
            </div>
            {c.skills.filter((s) => skillMatches(s, view, onlyHigh, onlyHot, q)).length === 0 ? (
              <p className="sf-body py-12 text-center text-muted-foreground">
                No skills match these filters in this category.
              </p>
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
