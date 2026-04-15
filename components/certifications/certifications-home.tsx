"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useSkillforgeStore } from "@/stores/skillforge-store";

function checklistCompletionPct(checklist: { completed: boolean }[]) {
  if (checklist.length === 0) return 0;
  return Math.round((100 * checklist.filter((t) => t.completed).length) / checklist.length);
}

export function CertificationsHome() {
  const certifications = useSkillforgeStore((s) => s.certifications);
  const updateCertification = useSkillforgeStore((s) => s.updateCertification);

  return (
    <div className="space-y-6">
      {certifications.map((c) => (
        <Card key={c.id} id={`cert-${c.id}`}>
          <CardHeader>
            <CardTitle>{c.name}</CardTitle>
            <CardDescription>
              Checklist completion updates automatically. Readiness is your own exam estimate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Readiness %</div>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={c.readiness}
                  onChange={(e) => updateCertification(c.id, { readiness: Number(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Target exam date</div>
                <Input
                  type="date"
                  value={c.targetDate ?? ""}
                  onChange={(e) => updateCertification(c.id, { targetDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Notes</div>
              <textarea
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                value={c.notes}
                onChange={(e) => updateCertification(c.id, { notes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Exam readiness</div>
              <Progress value={c.readiness} />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium">Prep checklist</div>
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {checklistCompletionPct(c.checklist)}% done
                </span>
              </div>
              <Progress value={checklistCompletionPct(c.checklist)} />
              <ul className="space-y-2 pt-1">
                {c.checklist.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={(checked) => {
                        const checklist = c.checklist.map((x) =>
                          x.id === item.id ? { ...x, completed: Boolean(checked) } : x,
                        );
                        updateCertification(c.id, { checklist });
                      }}
                      className="mt-0.5"
                    />
                    <span className={item.completed ? "text-sm text-muted-foreground line-through" : "text-sm"}>
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
