"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Food } from "@/content-schema/food";
import { correctedAgeMonths } from "@/lib/age";
import type { ScoredFood } from "@/lib/engine";
import {
  useActiveActivityLogs,
  useActiveCareLogs,
  useActiveLogs,
  useActiveSleepSessions,
} from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { ACTIVITY_EMOJI } from "@/lib/i18n/messages/activities";
import { fullDayMsgs } from "@/lib/i18n/messages/full-day";
import { dailySleep } from "@/lib/sleep/history";
import { formatDuration, formatTime, openSession, predictNextSleep } from "@/lib/sleep/model";
import { useSleepStore } from "@/lib/sleep/store";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { ActivityId, BabyProfile, FormulaUnit } from "@/lib/storage/types";
import { localIsoDate, todayIso } from "@/lib/food-utils";
import { Card, CardContent } from "@/components/ui/card";
import { SwipeToComplete } from "@/components/SwipeToComplete";

/**
 * The Today screen in Full day view: one whole-day dashboard where solids,
 * formula, diapers, sleep, and reading sit side by side. The "to do today"
 * list is swipe-to-complete — swiping a food logs it eaten, swiping the
 * reading habit marks it done. Everything else is composed from data the app
 * already keeps, so nothing new is stored except the device-local habit.
 */

function StatCard({
  title,
  value,
  sub,
  href,
  linkLabel,
}: {
  title: string;
  value: string;
  sub?: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-1 p-4">
        <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {title}
        </p>
        <p className="text-lg font-bold">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        <Link
          href={href}
          className="inline-block pt-1 text-xs text-primary underline underline-offset-2"
        >
          {linkLabel}
        </Link>
      </CardContent>
    </Card>
  );
}

export function FullDayToday({
  baby,
  picks,
  foodBySlug,
}: {
  baby: BabyProfile;
  picks: ScoredFood[];
  foodBySlug: Map<string, Food>;
}) {
  const locale = useLocale();
  const t = useMsgs(fullDayMsgs);
  const logs = useActiveLogs();
  const careLogs = useActiveCareLogs();
  const sleepSessions = useActiveSleepSessions();
  const addLog = useGuideStore((s) => s.addLog);
  const wakeAnchors = useSleepStore((s) => s.wakeAnchors);
  const activityLogs = useActiveActivityLogs();
  const setActivityDone = useGuideStore((s) => s.setActivityDone);

  const now = useMemo(() => new Date(), []);
  const today = todayIso();
  const dateLocale = locale === "zh" ? "zh-CN" : undefined;
  const dateLabel = now.toLocaleDateString(dateLocale, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const eatenToday = useMemo(() => {
    const s = new Set<string>();
    for (const l of logs) if (l.date === today) s.add(l.foodSlug);
    return s;
  }, [logs, today]);

  // The actual foods fed today, in the order logged — so the Solids card
  // shows what was eaten, not just a count.
  const eatenNames = useMemo(() => {
    const seen = new Set<string>();
    const names: string[] = [];
    for (const l of logs) {
      if (l.date !== today || seen.has(l.foodSlug)) continue;
      seen.add(l.foodSlug);
      names.push(l.customFoodName ?? foodBySlug.get(l.foodSlug)?.name ?? l.foodSlug);
    }
    return names;
  }, [logs, today, foodBySlug]);

  const toTry = useMemo(
    () => picks.filter((p) => !eatenToday.has(p.slug)).slice(0, 4),
    [picks, eatenToday],
  );
  const readDone = activityLogs.some((a) => a.activity === "read" && a.date === today);
  // Itemized reads (specific pieces from /read) and other logged activities.
  const readTitlesToday = activityLogs
    .filter((a) => a.activity === "read" && a.date === today && a.itemTitle)
    .map((a) => a.itemTitle as string);
  const otherActivitiesToday = activityLogs.filter(
    (a) => a.date === today && a.activity !== "read",
  );

  // Sleep today + next window (mirrors the /sleep page logic).
  const open = useMemo(() => openSession(sleepSessions), [sleepSessions]);
  const ageMonths = correctedAgeMonths(baby, now);
  const sleepMinToday = useMemo(() => {
    const row = dailySleep(sleepSessions, now, 2).find((d) => d.dateIso === today);
    return row?.totalMinutes ?? 0;
  }, [sleepSessions, now, today]);
  const prediction = useMemo(
    () =>
      open
        ? null
        : predictNextSleep({ sessions: sleepSessions, ageMonths, now, wakeAnchor: wakeAnchors[baby.id] }),
    [open, sleepSessions, ageMonths, now, wakeAnchors, baby.id],
  );

  // Care tallies for today. `at` is a UTC ISO datetime, so compare LOCAL
  // calendar dates — a UTC slice drops evening logs in western timezones.
  const careToday = useMemo(
    () => careLogs.filter((c) => localIsoDate(new Date(c.at)) === today),
    [careLogs, today],
  );
  const bottles = useMemo(() => careToday.filter((c) => c.kind === "formula"), [careToday]);
  const diapers = useMemo(() => careToday.filter((c) => c.kind === "diaper"), [careToday]);
  const bottleTotals = useMemo(() => {
    const m = new Map<FormulaUnit, number>();
    for (const b of bottles) if (b.amount) m.set(b.amount.unit, (m.get(b.amount.unit) ?? 0) + b.amount.value);
    return [...m.entries()].map(([unit, v]) => `${Math.round(v * 10) / 10} ${unit}`).join(" + ");
  }, [bottles]);

  const logEaten = (pick: ScoredFood) => {
    addLog({
      id: newId(),
      babyId: baby.id,
      foodSlug: pick.slug,
      date: today,
      prepBandUsed: pick.suggestedBand,
      amountEaten: "some",
      enjoyment: "neutral",
      gagging: false,
      symptoms: [],
    });
  };

  const eatenCount = eatenToday.size;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">{fmt(t.greeting, { name: baby.nickname })}</h1>
          <p className="text-sm text-muted-foreground">{dateLabel}</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/history" className="text-primary underline underline-offset-2">
            {t.history}
          </Link>
          <Link href="/plan" className="text-primary underline underline-offset-2">
            {t.plan}
          </Link>
        </div>
      </div>

      {/* To do today — swipe to complete. */}
      <section className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">{t.toDoTitle}</h2>
          <span className="text-xs text-muted-foreground">{t.toDoHint}</span>
        </div>
        {toTry.length === 0 && readDone ? (
          <p className="rounded-xl border bg-card px-4 py-3 text-sm text-muted-foreground">
            {t.allCaughtUp}
          </p>
        ) : (
          <div className="space-y-2">
            {toTry.map((p) => (
              <SwipeToComplete
                key={p.slug}
                onComplete={() => logEaten(p)}
                completeLabel={t.markEaten}
              >
                <div className="px-4 py-3">
                  <span className="text-[15px] font-medium">
                    {fmt(t.tryFood, { food: foodBySlug.get(p.slug)?.name ?? p.name })}
                  </span>
                  <span className="block text-xs text-muted-foreground">{p.reason}</span>
                </div>
              </SwipeToComplete>
            ))}
            {!readDone && (
              <SwipeToComplete
                onComplete={() => setActivityDone(baby.id, "read", today, true)}
                completeLabel={t.markRead}
              >
                <div className="px-4 py-3">
                  <span className="text-[15px] font-medium">{t.readHabit}</span>
                </div>
              </SwipeToComplete>
            )}
          </div>
        )}
      </section>

      {/* Done today — the whole day at a glance. */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t.doneTitle}</h2>
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            title={t.solidsTitle}
            value={eatenCount > 0 ? eatenNames.join(" · ") : t.noneYet}
            sub={eatenCount > 0 ? fmt(t.solidsEaten, { n: eatenCount }) : undefined}
            href="/log"
            linkLabel={t.logFood}
          />
          <StatCard
            title={t.sleepTitle}
            value={sleepMinToday > 0 ? fmt(t.sleepSoFar, { dur: formatDuration(sleepMinToday, locale) }) : t.noneYet}
            sub={
              prediction
                ? fmt(t.nextWindow, {
                    a: formatTime(prediction.windowStart, locale),
                    b: formatTime(prediction.windowEnd, locale),
                  })
                : undefined
            }
            href="/sleep"
            linkLabel={t.logSleep}
          />
          <StatCard
            title={t.formulaTitle}
            value={
              bottles.length > 0
                ? fmt(t.bottlesToday, { n: bottles.length, total: bottleTotals })
                : t.noneYet
            }
            href="/care"
            linkLabel={t.logBottle}
          />
          <StatCard
            title={t.diapersTitle}
            value={diapers.length > 0 ? fmt(t.diapersCount, { n: diapers.length }) : t.noneYet}
            href="/care"
            linkLabel={t.logDiaper}
          />
          <StatCard
            title={t.readingTitle}
            value={readDone ? t.readDone : t.noneYet}
            sub={
              readTitlesToday.length > 0
                ? readTitlesToday.slice(0, 2).join(" · ") +
                  (readTitlesToday.length > 2 ? ` +${readTitlesToday.length - 2}` : "")
                : undefined
            }
            href="/read"
            linkLabel={t.open}
          />
          <StatCard
            title={t.activitiesTitle}
            value={
              otherActivitiesToday.length > 0
                ? fmt(t.activitiesCount, { n: otherActivitiesToday.length })
                : t.noneYet
            }
            sub={
              otherActivitiesToday.length > 0
                ? [
                    ...new Set(
                      otherActivitiesToday.map(
                        (a) => ACTIVITY_EMOJI[a.activity as ActivityId] ?? "⭐",
                      ),
                    ),
                  ].join(" ")
                : undefined
            }
            href="/activities"
            linkLabel={t.logActivity}
          />
        </div>
      </section>
    </div>
  );
}
