"use client";

import { useMemo } from "react";
import { useActiveActivityLogs, useActiveBaby, useHydrated } from "@/lib/hooks";
import { todayIso } from "@/lib/food-utils";
import { fmt, msg, type Locale } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import {
  ACTIVITY_EMOJI,
  ACTIVITY_MSGS,
  activitiesMsgs,
} from "@/lib/i18n/messages/activities";
import { useGuideStore } from "@/lib/storage/store";
import { type ActivityId, type ActivityLog } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Today's activity log and the previous days. Split out of the page
 * (2026-09-15) alongside ActivityQuickLog, so the page itself can render on
 * the server.
 */

function activityLabel(a: ActivityLog, locale: Locale): string {
  const base = ACTIVITY_MSGS[a.activity as ActivityId];
  const name = base ? msg(base, locale) : a.activity;
  return a.itemTitle ? `${name} · ${a.itemTitle}` : name;
}

export function ActivityHistory() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const activityLogs = useActiveActivityLogs();
  const deleteActivityLog = useGuideStore((s) => s.deleteActivityLog);
  const locale = useLocale();
  const t = useMsgs(activitiesMsgs);

  const today = todayIso();
  const todayLogs = useMemo(
    () =>
      activityLogs
        .filter((a) => a.date === today)
        .sort((a, b) => (a.updatedAt ?? "").localeCompare(b.updatedAt ?? "")),
    [activityLogs, today],
  );

  // Previous days, newest first — compact per-day counts like the care page.
  const recentDays = useMemo(() => {
    const byDay = new Map<string, ActivityLog[]>();
    for (const a of activityLogs) {
      if (a.date >= today) continue;
      byDay.set(a.date, [...(byDay.get(a.date) ?? []), a]);
    }
    return [...byDay.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 7);
  }, [activityLogs, today]);

  if (!hydrated || !baby) return null;

  const daySummary = (logs: ActivityLog[]): string => {
    const counts = new Map<string, number>();
    for (const a of logs) counts.set(a.activity, (counts.get(a.activity) ?? 0) + 1);
    return [...counts.entries()]
      .map(([activity, n]) => {
        const known = ACTIVITY_MSGS[activity as ActivityId];
        const name = known ? msg(known, locale) : activity;
        const emoji = ACTIVITY_EMOJI[activity as ActivityId] ?? "⭐";
        return `${emoji} ${name}${n > 1 ? ` ×${n}` : ""}`;
      })
      .join(" · ");
  };

  const dayLabel = (dateIso: string) => {
    const [y, m, d] = dateIso.split("-").map(Number);
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date(y, m - 1, d, 12));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t.todayTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {todayLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.todayEmpty}</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {todayLogs.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3">
                  <span>
                    <span aria-hidden="true">
                      {ACTIVITY_EMOJI[a.activity as ActivityId] ?? "⭐"}
                    </span>{" "}
                    {activityLabel(a, locale)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={fmt(t.deleteAria, { what: activityLabel(a, locale) })}
                    onClick={() => deleteActivityLog(a.id)}
                  >
                    ✕
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.recentTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {recentDays.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.recentEmpty}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recentDays.map(([dateIso, logs]) => (
                <li key={dateIso} className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                  <span className="font-data">{dayLabel(dateIso)}</span>
                  <span className="text-muted-foreground">{daySummary(logs)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">{t.syncNote}</p>
    </>
  );
}
