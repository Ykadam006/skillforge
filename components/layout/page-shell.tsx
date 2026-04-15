import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export function PageShell({
  title,
  description,
  children,
  actions,
  headerBadge,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  /** e.g. streak pill in the sticky header */
  headerBadge?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <MobileNav />
      <div className="flex min-h-[calc(100dvh-72px)] items-start md:min-h-screen">
        <AppSidebar />
        <div
          id="main-content"
          tabIndex={-1}
          className={cn(
            "sf-main-surface flex min-w-0 flex-1 flex-col outline-none",
            "min-h-[calc(100dvh-72px)] md:min-h-screen",
          )}
        >
          <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between gap-6 border-b border-border/80 bg-card/85 px-6 backdrop-blur-md supports-[backdrop-filter]:bg-card/70 md:px-8">
            <div className="min-w-0 flex-1">
              <h1 className="sf-page-heading truncate">{title}</h1>
              {description ? (
                <p className="sf-helper mt-1 max-w-2xl truncate text-muted-foreground">{description}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {headerBadge}
              {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            </div>
          </header>
          <div className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-10 pt-6 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
