"use client";

import { useMemo, useState } from "react";
import { flattenSkills } from "@/lib/guide";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import type { Project, ProjectStatus } from "@/types/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
function statusButtons(current: ProjectStatus, onPick: (s: ProjectStatus) => void) {
  const options: ProjectStatus[] = ["idea", "building", "done"];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((s) => (
        <Button key={s} type="button" size="sm" variant={current === s ? "default" : "outline"} onClick={() => onPick(s)}>
          {s}
        </Button>
      ))}
    </div>
  );
}

export function ProjectsHome() {
  const projects = useSkillforgeStore((s) => s.projects);
  const upsertProject = useSkillforgeStore((s) => s.upsertProject);
  const skillLabelByKey = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of flattenSkills()) m.set(r.key, r.skill.name);
    return m;
  }, []);

  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <ProjectEditor
          key={p.id}
          project={p}
          skillLabel={(key) => skillLabelByKey.get(key) ?? key}
          onSave={upsertProject}
        />
      ))}
    </div>
  );
}

function ProjectEditor({
  project,
  skillLabel,
  onSave,
}: {
  project: Project;
  skillLabel: (key: string) => string;
  onSave: (p: Project) => void;
}) {
  const [title, setTitle] = useState(project.title);
  const [notes, setNotes] = useState(project.notes);
  const [githubUrl, setGithubUrl] = useState(project.githubUrl ?? "");
  const [demoUrl, setDemoUrl] = useState(project.demoUrl ?? "");
  const [status, setStatus] = useState<ProjectStatus>(project.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Linked skills: {project.skillKeys.map(skillLabel).join(" · ")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Status</div>
          {statusButtons(status, setStatus)}
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Title</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">GitHub</div>
            <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/…" />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Demo</div>
            <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://…" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Notes</div>
          <textarea
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={() =>
            onSave({
              ...project,
              title,
              notes,
              githubUrl: githubUrl || undefined,
              demoUrl: demoUrl || undefined,
              status,
            })
          }
        >
          Save project
        </Button>
      </CardContent>
    </Card>
  );
}
