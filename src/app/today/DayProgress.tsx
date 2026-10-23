"use client";

import Link from "next/link";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { fullDayMsgs } from "@/lib/i18n/messages/full-day";
import { cn } from "@/lib/utils";

/** Activities with the baby a day, the goal the progress bar counts toward. */
export const DAILY_ACTIVITY_GOAL = 5;

/**
 * The day as one bar: a segment for solids (the plan's food when there is
 * one) and one segment per activity up to the daily goal. Each log fills a
 * segment, so the home screen shows at a glance how much of the day is done.
 */
export function DayProgress({
  solidsDone,
  solidsLabel,
  activities,
}: {
  solidsDone: boolean;
  solidsLabel: string;
  /** Activity logs today; more than the goal still reads as the goal. */
  activities: number;
}) {
  const t = useMsgs(fullDayMsgs);
  const activityDone = Math.min(activities, DAILY_ACTIVITY_GOAL);
  const total = 1 + DAILY_ACTIVITY_GOAL;
  const done = (solidsDone ? 1 : 0) + activityDone;
  const complete = done === total;

  return (
    <section className="space-y-3 rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{t.progressTitle}</h2>
        <span className="font-data text-2xl font-bold">
          {done}
          <span className="text-base font-medium text-muted-foreground">/{total}</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={fmt(t.progressAria, { done, total })}
        className="flex gap-1.5"
      >
        <span
          className={cn("h-4 flex-[1.4] rounded-full transition-colors", solidsDone ? "bg-primary" : "bg-muted")}
        />
        {Array.from({ length: DAILY_ACTIVITY_GOAL }, (_, i) => (
          <span
            key={i}
            className={cn("h-4 flex-1 rounded-full transition-colors", i < activityDone ? "bg-honey" : "bg-muted")}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
        <span className={cn(solidsDone ? "text-foreground" : "text-muted-foreground")}>
          <span aria-hidden="true">🥄 </span>
          {solidsLabel}
          {solidsDone && <span aria-hidden="true"> ✓</span>}
        </span>
        <span className={cn(activityDone > 0 ? "text-foreground" : "text-muted-foreground")}>
          <span aria-hidden="true">🎈 </span>
          {fmt(t.progressActivities, { n: activities, goal: DAILY_ACTIVITY_GOAL })}
        </span>
      </div>
      {complete ? (
        <p className="text-sm font-medium text-primary">{t.progressAllDone}</p>
      ) : (
        activityDone < DAILY_ACTIVITY_GOAL && (
          <Link
            href="/activities"
            className="inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium hover:border-primary/60"
          >
            {t.logActivity}
          </Link>
        )
      )}
    </section>
  );
}
