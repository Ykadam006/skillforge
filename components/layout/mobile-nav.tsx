"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/now", label: "Now" },
  { href: "/skills", label: "Skills" },
  { href: "/practice", label: "Practice" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/analytics", label: "Analytics" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-[72px] items-center border-b border-border/80 bg-card/95 backdrop-blur-md md:hidden">
      <Sheet>
        <SheetTrigger
          className={cn(
            "m-1 inline-flex size-9 items-center justify-center rounded-md hover:bg-muted",
          )}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Yogesh OS</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    active ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center px-3 text-[15px] font-semibold tracking-tight">Yogesh OS</div>
    </div>
  );
}
