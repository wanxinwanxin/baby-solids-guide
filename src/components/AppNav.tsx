"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { BRAND } from "@/lib/brand";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

/**
 * Consolidated nav (design sheet 03/04): five top-level items, everything
 * else under "More". On mobile the links live in the bottom tab bar; the
 * top bar keeps brand + Emergency + baby switcher.
 */
const PRIMARY = [
  { href: "/today", label: "Today" },
  { href: "/foods", label: "Foods" },
  { href: "/plan", label: "Plan" },
  { href: "/learn", label: "Learn" },
];

const MORE = [
  { href: "/allergens", label: "Allergens" },
  { href: "/history", label: "History" },
  { href: "/insights", label: "Insights" },
  { href: "/safety", label: "Safety" },
  { href: "/account", label: "Account" },
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
      className="shrink-0 rounded-full border bg-card px-2.5 py-1.5 text-sm"
    >
      {babies.map((b) => (
        <option key={b.id} value={b.id}>
          {b.nickname}
        </option>
      ))}
    </select>
  );
}

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const activeInMore = MORE.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          (open || activeInMore) && "bg-secondary text-secondary-foreground",
        )}
      >
        More
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border bg-popover p-1.5 shadow-lg"
        >
          {MORE.map((l) => (
            <Link
              key={l.href}
              role="menuitem"
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted",
                (pathname === l.href || pathname.startsWith(`${l.href}/`)) &&
                  "bg-secondary text-secondary-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-1 px-3">
        <Link href="/" className="mr-2 flex shrink-0 items-center gap-2 text-base font-bold text-foreground">
          <BrandMark size={26} />
          {BRAND}
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {PRIMARY.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                (pathname === l.href || pathname.startsWith(`${l.href}/`)) &&
                  "bg-secondary text-secondary-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <MoreMenu pathname={pathname} />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <BabySwitcher />
          <Link
            href="/safety"
            className="rounded-full border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive md:hidden"
          >
            Emergency
          </Link>
          <Link
            href="/log"
            className="hidden rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep md:inline-flex dark:hover:bg-primary/80"
          >
            + Log
          </Link>
        </div>
      </div>
    </header>
  );
}
