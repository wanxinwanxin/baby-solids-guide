"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";

/** How many days a history list shows before the parent asks for more. */
export const RECENT_DAYS = 7;

/**
 * A history list that opens on the latest week. Two weeks of day rows on
 * every visit made the page scroll "forever"; older days are one tap away.
 * `days` is newest first.
 */
export function useRecentDays<T>(days: T[]): {
  visible: T[];
  toggle: React.ReactNode;
} {
  const t = useMsgs(datetimeMsgs);
  const [all, setAll] = useState(false);
  const hidden = Math.max(0, days.length - RECENT_DAYS);
  const visible = all ? days : days.slice(0, RECENT_DAYS);
  const toggle =
    hidden > 0 ? (
      <button
        type="button"
        aria-expanded={all}
        onClick={() => setAll((v) => !v)}
        className="inline-flex min-h-9 items-center text-sm font-medium text-primary underline underline-offset-2"
      >
        {all ? t.showFewerDays : fmt(t.showOlderDays, { n: hidden })}
      </button>
    ) : null;
  return { visible, toggle };
}
