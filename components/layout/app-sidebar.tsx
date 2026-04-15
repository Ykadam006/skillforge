"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Home,
  LayoutDashboard,
  Settings,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { completionStats } from "@/lib/analytics";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useSkillforgeStore } from "@/stores/skillforge-store";
import { Progress } from "@/components/ui/progress";

const SIDEBAR_COLLAPSE_KEY = "sf-sidebar-collapsed";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/skills", label: "Skills", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Target },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const skillProgress = useSkillforgeStore((s) => s.skillProgress);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setCollapsed(localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === "1");
      } catch {
        /* ignore */
      }
    });
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(SIDEBAR_COLLAPSE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  const { pct } = completionStats(skillProgress);

  return (
    <aside
      className={cn(
        "sticky top-0 z-20 hidden max-h-dvh shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out md:flex md:h-dvh",
        collapsed ? "w-[84px]" : "w-[260px]",
      )}
    >
      <div className="flex h-[72px] shrink-0 items-center gap-2 border-b border-sidebar-border px-3">
        <Link
          href="/"
          className={cn(
            "flex min-w-0 items-center gap-2.5 rounded-2xl border border-sidebar-border bg-card py-2 pl-2.5 pr-3 font-semibold tracking-tight text-foreground shadow-sm transition-colors hover:bg-muted/30",
            collapsed ? "size-10 shrink-0 justify-center p-0" : "flex-1",
          )}
          title={collapsed ? "Yogesh OS" : undefined}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            Y
          </span>
          {!collapsed ? <span className="truncate text-[15px]">Yogesh OS</span> : null}
        </Link>
        <button
          type="button"
          onClick={toggleCollapse}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                active
                  ? "bg-primary-light text-primary shadow-sm ring-1 ring-primary/25 dark:bg-primary-light/30 dark:text-primary dark:ring-primary/30"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon className={cn("size-[18px] shrink-0", active ? "text-primary" : "text-current")} />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-3">
        <div className="space-y-3 rounded-2xl border border-sidebar-border bg-card p-3 shadow-sm">
          {!collapsed ? (
            <div>
              <div className="sf-helper mb-2 text-muted-foreground">Library progress</div>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span className="text-lg font-semibold tabular-nums text-foreground">{pct}%</span>
                <span className="sf-helper text-muted-foreground">done</span>
              </div>
              <Progress value={pct} className="h-1.5" />
            </div>
          ) : (
            <div className="flex justify-center py-1" title={`${pct}% complete`}>
              <span className="text-xs font-semibold tabular-nums text-primary">{pct}%</span>
            </div>
          )}

          <div
            className={cn(
              "flex items-center gap-2 border-t border-border/60 pt-3",
              collapsed ? "flex-col justify-center" : "justify-between",
            )}
          >
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background transition-opacity hover:opacity-90"
              aria-label="Built with Next.js"
            >
              N
            </a>
            <div className={cn("flex items-center gap-1", collapsed ? "flex-col" : "flex-1 justify-end")}>
              <ThemeToggle collapsed={collapsed} />
              <button
                type="button"
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
                )}
                aria-label="Settings (coming soon)"
              >
                <Settings className="size-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
