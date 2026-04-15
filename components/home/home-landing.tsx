import Link from "next/link";
import { ArrowRight, BookOpen, LayoutDashboard, LineChart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeLanding() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/80 bg-card/80 px-6 py-4 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">Skillforge</span>
          <Link
            href="/dashboard"
            className={cn(buttonVariants(), "h-10 rounded-xl px-5 text-[14px]")}
          >
            Go to dashboard
            <LayoutDashboard className="ml-2 size-4" aria-hidden />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24 md:text-center">
        <p className="sf-helper font-semibold uppercase tracking-wider text-muted-foreground">Yogesh OS</p>
        <h1 className="sf-hero-title mt-3 text-balance text-foreground">Learn with intent. Track what matters.</h1>
        <p className="sf-body mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground">
          Skillforge is your personal command center: skills, practice, projects, and a quiet view of progress. Start
          from the home page, then open the dashboard when you are ready to work.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 justify-center gap-2 rounded-xl px-8 text-[15px]",
            )}
          >
            Open dashboard
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/skills"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 justify-center gap-2 rounded-xl px-8 text-[15px]",
            )}
          >
            <BookOpen className="size-4" aria-hidden />
            Browse skills
          </Link>
        </div>

        <ul className="mt-16 grid gap-4 text-left sm:grid-cols-3 sm:text-center">
          <li className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm">
            <LineChart className="mx-auto mb-3 size-8 text-primary" aria-hidden />
            <p className="text-sm font-semibold text-foreground">Rhythm & heatmaps</p>
            <p className="sf-helper mt-1 text-muted-foreground">See streaks and study density without noise.</p>
          </li>
          <li className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm">
            <BookOpen className="mx-auto mb-3 size-8 text-primary" aria-hidden />
            <p className="text-sm font-semibold text-foreground">Paths & checklists</p>
            <p className="sf-helper mt-1 text-muted-foreground">Structured guides you can actually finish.</p>
          </li>
          <li className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm">
            <LayoutDashboard className="mx-auto mb-3 size-8 text-primary" aria-hidden />
            <p className="text-sm font-semibold text-foreground">One dashboard</p>
            <p className="sf-helper mt-1 text-muted-foreground">Goals, practice, and certs in one place.</p>
          </li>
        </ul>
      </main>
    </div>
  );
}
