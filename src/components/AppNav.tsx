"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/today", label: "Today" },
  { href: "/foods", label: "Foods" },
  { href: "/allergens", label: "Allergens" },
  { href: "/log", label: "Log" },
  { href: "/history", label: "History" },
  { href: "/safety", label: "Safety" },
];

export function AppNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-1 overflow-x-auto px-3">
        <Link href="/" className="mr-2 shrink-0 text-base font-bold text-emerald-700 dark:text-emerald-400">
          OpenSolids
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                (pathname === l.href || pathname.startsWith(`${l.href}/`)) &&
                  "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
