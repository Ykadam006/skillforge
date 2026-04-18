import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectById, getSkillById, now } from "@/lib/data";

export default function NowPage() {
  return (
    <PageShell title="Now" description={`Updated ${now.updated} · ${now.currentWeek}`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>This week</CardTitle>
            <CardDescription>{now.focus}</CardDescription>
          </CardHeader>
          {now.highlight ? (
            <CardContent>
              <p className="sf-body text-pretty text-muted-foreground">{now.highlight}</p>
            </CardContent>
          ) : null}
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Building</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {now.building.map((b, i) => {
                const proj = getProjectById(b.project);
                return (
                  <div key={i} className="rounded-xl border border-border/60 bg-muted/10 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {proj?.name ?? b.project}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{b.task}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {now.learning.map((l, i) => {
                const sk = getSkillById(l.skill);
                return (
                  <div key={i} className="rounded-xl border border-border/60 bg-muted/10 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {sk?.name ?? l.skill}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{l.task}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applying</CardTitle>
            <CardDescription>This week (public snapshot)</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground">Applications</p>
              <p className="text-2xl font-semibold tabular-nums">{now.applying.appsThisWeek}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Outreach</p>
              <p className="text-2xl font-semibold tabular-nums">{now.applying.outreachThisWeek}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone screens</p>
              <p className="text-2xl font-semibold tabular-nums">{now.applying.phoneScreens}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {now.reading.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-border/60 px-3 py-2 text-sm font-medium text-primary hover:bg-muted/30"
              >
                {r.title}
              </a>
            ))}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          To change this view, edit data/now.json in the repository and deploy.
        </p>
      </div>
    </PageShell>
  );
}
