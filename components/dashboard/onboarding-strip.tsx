"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Timer } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KEY = "sf-onboarding-dismissed";

export function OnboardingStrip() {
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setOpen(localStorage.getItem(KEY) !== "1");
      } catch {
        setOpen(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <section
      data-testid="onboarding-strip"
      className="rounded-2xl border border-primary/25 bg-primary-light/60 p-6 dark:bg-primary-light/15"
      aria-labelledby="sf-onboarding-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="sf-onboarding-title" className="sf-section-label text-primary">
            Welcome — start in three steps
          </h2>
          <p className="sf-body mt-2 max-w-2xl text-foreground/90">
            No noise: pick a gap, log time, prove progress. Dismiss this strip anytime.
          </p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            <li className="flex gap-3 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <BookOpen className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Pick a gap skill</p>
                <p className="sf-helper mt-1 text-muted-foreground">Skills → filter Gaps → open a path.</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <Timer className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Log 25 minutes</p>
                <p className="sf-helper mt-1 text-muted-foreground">Practice → Log study time or a rep.</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Mark one task done</p>
                <p className="sf-helper mt-1 text-muted-foreground">On the skill path, tick your checklist.</p>
              </div>
            </li>
          </ol>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Link href="/skills" className={cn(buttonVariants(), "h-10 justify-center rounded-xl")}>
            Open skills
          </Link>
          <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" onClick={dismiss}>
            Dismiss
          </Button>
          <p className="text-center text-[11px] text-muted-foreground sm:text-right">Press Escape to dismiss.</p>
        </div>
      </div>
    </section>
  );
}
