"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/today", label: "Today" },
  { href: "/plan", label: "Plan" },
  { href: "/foods", label: "Foods" },
  { href: "/learn", label: "Learn" },
  { href: "/allergens", label: "Allergens" },
  { href: "/log", label: "Log" },
  { href: "/history", label: "History" },
  { href: "/insights", label: "Insights" },
  { href: "/safety", label: "Safety" },
];

function BabySwitcher() {
  const hydrated = useHydrated();
  const babies = useGuideStore((s) => s.babies);
  const activeBabyId = useGuideStore((s) => s.activeBabyId);
  const setActiveBaby = useGuideStore((s) => s.setActiveBaby);
  if (!hydrated || babies.length < 2) return null;
  return (
    <select
      value={activeBabyId ?? babies[0].id}
      onChange={(e) => setActiveBaby(e.target.value)}
      aria-label="Switch baby"
      className="ml-auto shrink-0 rounded-md border bg-background px-2 py-1.5 text-sm"
    >
      {babies.map((b) => (
        <option key={b.id} value={b.id}>
          {b.nickname}
        </option>
      ))}
    </select>
  );
}

export function AppNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-1 overflow-x-auto px-3">
        <Link href="/" className="mr-2 shrink-0 text-base font-bold text-emerald-700 dark:text-emerald-400">
          {BRAND}
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
        <BabySwitcher />
      </div>
    </header>
  );
}
