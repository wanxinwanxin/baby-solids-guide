"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import { fullDayMsgs } from "@/lib/i18n/messages/full-day";
import { cn } from "@/lib/utils";

/**
 * Mobile bottom tab bar (design sheet 08): Today · History · +Log FAB · Plan ·
 * More. Desktop keeps the top nav; this renders only below md. All targets
 * ≥ 44px per the acceptance criteria.
 *
 * Four tabs, two either side of the log button. Adding History made it five,
 * which pushed the FAB off centre and left the bar looking lopsided. Foods
 * came out instead of History because the food library is a reference people
 * look something up in, not a place they live — and it keeps a top-bar
 * shortcut on mobile (see AppNav) so it is still one tap away. Learn later
 * gave its slot to More (/more): phones had no path to Allergens, Insights,
 * or the extras, and Learn sits first on the More page.
 */
type Tab = {
  href: string;
  msgKey: "navToday" | "navHistory" | "navPlan" | "navMore" | "navFoods" | "navSafety" | "navSleepShort" | "navCareShort";
  icon: React.ReactNode;
};

const SLEEP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

const CARE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M10 3h4M9 8h6l.7 9.5a3 3 0 0 1-3 3.2h-1.4a3 3 0 0 1-3-3.2L9 8Z" />
    <path d="M9.3 12h5.4" />
  </svg>
);

/** Routes that live behind the More tab — they light it up while open. */
const MORE_PREFIXES = ["/more", "/learn", "/allergens", "/insights", "/read", "/safety", "/sleep", "/care"];

const TABS: Tab[] = [
  {
    href: "/today",
    msgKey: "navToday",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      </svg>
    ),
  },
  {
    href: "/history",
    msgKey: "navHistory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    href: "/plan",
    msgKey: "navPlan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    href: "/more",
    msgKey: "navMore",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="size-5" aria-hidden="true">
        <circle cx="5" cy="12" r="1.8" />
        <circle cx="12" cy="12" r="1.8" />
        <circle cx="19" cy="12" r="1.8" />
      </svg>
    ),
  },
];

/**
 * Caregiver mode strips the bar to what a helper needs: today's foods, the
 * food reference, and the emergency guide. No log FAB — the planner logs.
 */
const CAREGIVER_TABS: Tab[] = [
  TABS[0], // Today
  {
    href: "/foods",
    msgKey: "navFoods",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M15 3c2 0 4 2 4 5 0 6-4 13-7 13S5 14 5 8c0-3 2-5 4-5 1.2 0 2.2.5 3 1.5C12.8 3.5 13.8 3 15 3Z" />
        <path d="M12 4.5V2" />
      </svg>
    ),
  },
  {
    href: "/safety",
    msgKey: "navSafety",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
        <path d="M12 8v5M9.5 10.5h5" />
      </svg>
    ),
  },
];

/** Full day view: solids Today, sleep, and care get first-class tabs. */
const FULL_DAY_TABS: Tab[] = [
  TABS[0], // Today
  { href: "/sleep", msgKey: "navSleepShort", icon: SLEEP_ICON },
  { href: "/care", msgKey: "navCareShort", icon: CARE_ICON },
  TABS[3], // More
];

export function MobileTabBar() {
  const m = useMsgs(chromeMsgs);
  const q = useMsgs(fullDayMsgs);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const caregiver = useGuideStore((s) => s.caregiverMode) && hydrated;
  const fullDay = useGuideStore((s) => s.fullDayMode) && hydrated;
  const [logOpen, setLogOpen] = useState(false);
  // In Full day view, Sleep and Care are dedicated tabs, so they no longer
  // belong to the "More" tab's active set.
  const morePrefixes = fullDay
    ? MORE_PREFIXES.filter((p) => p !== "/sleep" && p !== "/care")
    : MORE_PREFIXES;
  const tab = (t: Tab) => {
    const active =
      t.href === "/more" && !caregiver
        ? morePrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
        : pathname === t.href || pathname.startsWith(`${t.href}/`);
    return (
      <Link
        key={t.href}
        href={t.href}
        {...(t.href === "/more" ? { "data-tour": "more" } : {})}
        className={cn(
          "flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium",
          active ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={active ? "page" : undefined}
      >
        {t.icon}
        {m[t.msgKey]}
      </Link>
    );
  };
  return (
    <nav
      aria-label={m.navPrimary}
      data-tour="tabbar"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="relative mx-auto flex max-w-md items-center pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
        {caregiver ? (
          CAREGIVER_TABS.map(tab)
        ) : fullDay ? (
          <>
            {FULL_DAY_TABS.slice(0, 2).map(tab)}
            {/* Full day: one log button across domains, not just food. */}
            <button
              type="button"
              aria-label={m.navLogAria}
              aria-expanded={logOpen}
              data-tour="log"
              onClick={() => setLogOpen((v) => !v)}
              className="mx-1 -mt-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={cn("size-6 transition-transform", logOpen && "rotate-45")} aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {FULL_DAY_TABS.slice(2).map(tab)}
            {logOpen && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  onClick={() => setLogOpen(false)}
                  className="fixed inset-0 z-0 cursor-default"
                />
                <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-2xl border bg-popover p-2 shadow-xl">
                  {[
                    { href: "/log", label: q.logFood },
                    { href: "/care", label: q.logBottle },
                    { href: "/care", label: q.logDiaper },
                    { href: "/sleep", label: q.logSleep },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setLogOpen(false)}
                      className="rounded-xl border px-3 py-2 text-xs font-medium hover:border-primary/60"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {TABS.slice(0, 2).map(tab)}
            <Link
              href="/log"
              aria-label={m.navLogAria}
              data-tour="log"
              className="mx-1 -mt-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-6" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
            {TABS.slice(2).map(tab)}
          </>
        )}
      </div>
    </nav>
  );
}
