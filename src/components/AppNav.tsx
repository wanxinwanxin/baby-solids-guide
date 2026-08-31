"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useSession } from "@/lib/auth-client";
import { useAuthEnabled } from "@/components/SyncProvider";
import { BRAND } from "@/lib/brand";
import { BrandMark } from "@/components/BrandMark";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import { cn } from "@/lib/utils";

/**
 * Consolidated nav (design sheet 03/04): five top-level items, everything
 * else under "More". On mobile the links live in the bottom tab bar; the
 * top bar keeps brand + Emergency + baby switcher.
 */
type NavMsgs = ReturnType<typeof useMsgs<typeof chromeMsgs>>;

/**
 * The daily loop, in the order a parent lives it: what to feed today, what
 * actually happened, the food reference, something to cook, what's scheduled.
 * History sits next to Today because the past is consulted as often as the
 * plan — reference material (Learn, Allergens, Safety) moved under "More" to
 * make room without widening the bar past its md breakpoint.
 */
const primaryLinks = (t: NavMsgs) => [
  { href: "/today", label: t.navToday },
  { href: "/history", label: t.navHistory },
  { href: "/foods", label: t.navFoods },
  { href: "/recipes", label: t.navRecipes },
  { href: "/plan", label: t.navPlan },
];

const moreLinks = (t: NavMsgs) => [
  { href: "/learn", label: t.navLearn },
  { href: "/allergens", label: t.navAllergens },
  { href: "/insights", label: t.navInsights },
  { href: "/safety", label: t.navSafety },
];

/**
 * The account entry lives where people expect it: the top-right corner of
 * every page. Signed out → "Sign in"; signed in → an initial-avatar chip.
 * Hidden entirely on deployments without auth configured.
 */
function AccountButton() {
  const t = useMsgs(chromeMsgs);
  const enabled = useAuthEnabled();
  const { data: session } = useSession();
  if (!enabled) return null;
  if (session?.user) {
    const initial = (session.user.name || session.user.email || "?").trim().charAt(0).toUpperCase();
    return (
      <Link
        href="/account"
        aria-label={t.navAccount}
        title={session.user.email ?? t.navAccount}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-secondary text-sm font-bold text-secondary-foreground"
      >
        {initial}
      </Link>
    );
  }
  return (
    <Link
      href="/account"
      className="shrink-0 rounded-full border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-primary/60 md:px-3.5 md:py-2"
    >
      {t.navSignIn}
    </Link>
  );
}

function BabySwitcher() {
  const t = useMsgs(chromeMsgs);
  const hydrated = useHydrated();
  const babies = useGuideStore((s) => s.babies);
  const activeBabyId = useGuideStore((s) => s.activeBabyId);
  const setActiveBaby = useGuideStore((s) => s.setActiveBaby);
  if (!hydrated || babies.length < 2) return null;
  return (
    <select
      value={activeBabyId ?? babies[0].id}
      onChange={(e) => setActiveBaby(e.target.value)}
      aria-label={t.navSwitchBaby}
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
  const t = useMsgs(chromeMsgs);
  const MORE = moreLinks(t);
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
        {t.navMore}
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
  const t = useMsgs(chromeMsgs);
  const PRIMARY = primaryLinks(t);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-1 px-3">
        <Link href="/" className="mr-2 flex shrink-0 items-center gap-2 text-base font-bold text-foreground">
          <BrandMark size={26} />
          {BRAND}
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label={t.navMain}>
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
          {/* The bottom tab bar has room for four tabs either side of the log
              button, so Foods lives here on mobile — a reference people look
              things up in, one tap from every page. */}
          <Link
            href="/foods"
            aria-label={t.navFoods}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border text-muted-foreground hover:border-primary/60 hover:text-foreground md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
              <path d="M15 3c2 0 4 2 4 5 0 6-4 13-7 13S5 14 5 8c0-3 2-5 4-5 1.2 0 2.2.5 3 1.5C12.8 3.5 13.8 3 15 3Z" />
              <path d="M12 4.5V2" />
            </svg>
          </Link>
          <Link
            href="/safety"
            className="rounded-full border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive md:hidden"
          >
            {t.navEmergency}
          </Link>
          <Link
            href="/log"
            className="hidden rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep md:inline-flex dark:hover:bg-primary/80"
          >
            {t.navLog}
          </Link>
          <LanguageToggle />
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
