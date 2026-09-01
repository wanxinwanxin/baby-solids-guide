"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import { cn } from "@/lib/utils";

/**
 * Mobile bottom tab bar (design sheet 08): Today · History · +Log FAB · Plan ·
 * Learn. Desktop keeps the top nav; this renders only below md. All targets
 * ≥ 44px per the acceptance criteria.
 *
 * Four tabs, two either side of the log button. Adding History made it five,
 * which pushed the FAB off centre and left the bar looking lopsided. Foods
 * came out instead of History because the food library is a reference people
 * look something up in, not a place they live — and it keeps a top-bar
 * shortcut on mobile (see AppNav) so it is still one tap away.
 */
type Tab = {
  href: string;
  msgKey: "navToday" | "navHistory" | "navPlan" | "navLearn" | "navFoods" | "navSafety";
  icon: React.ReactNode;
};

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
    href: "/learn",
    msgKey: "navLearn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M12 6c-2-1.5-4.5-2-8-2v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4c-3.5 0-6 .5-8 2Z" />
        <path d="M12 6v14" />
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

export function MobileTabBar() {
  const m = useMsgs(chromeMsgs);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const caregiver = useGuideStore((s) => s.caregiverMode) && hydrated;
  const tab = (t: Tab) => {
    const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
    return (
      <Link
        key={t.href}
        href={t.href}
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
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center px-2">
        {caregiver ? (
          CAREGIVER_TABS.map(tab)
        ) : (
          <>
            {TABS.slice(0, 2).map(tab)}
            <Link
              href="/log"
              aria-label={m.navLogAria}
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
