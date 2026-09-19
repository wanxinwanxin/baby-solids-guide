"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { wontSleepAdvice, type SleepAction } from "@/lib/plan/engine";
import { formatDuration, formatTime } from "@/lib/sleep/model";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { Intervention } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MIN = 60 * 1000;

/**
 * The plan band on /sleep. While he sleeps: the wake-by time — the half the
 * predictor never had. While he is awake: when his own rhythm says the next
 * nap falls, the cap the plan puts on it, and how much day sleep is left.
 * Early mornings are named as such, so a 04:50 wake never reads as "do not
 * put him down until 08:00".
 */
export function SleepPlanBand({
  plan,
  action,
  babyId,
  now,
}: {
  plan: Intervention;
  action: SleepAction;
  babyId: string;
  now: Date;
}) {
  const t = useMsgs(interventionMsgs);
  const locale = useLocale();
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const [showAdvice, setShowAdvice] = useState(false);

  if (action.kind === "none") return null;
  const nowMs = now.getTime();

  const title =
    action.kind === "night"
      ? t.stillNightTitle
      : action.kind === "early"
        ? t.earlyTitle
        : action.kind === "asleep"
          ? t.asleepTitle
          : action.kind === "nap"
            ? t.nextNapTitle
            : t.bedtimeTitle;

  const skipNap = () =>
    addCareLog({ id: newId(), babyId, kind: "event", at: now.toISOString(), event: "nap_skipped" });

  return (
    <Card
      className={cn(
        "border-primary/40 bg-primary/5",
        action.kind === "asleep" && action.overdueMin > 0 && "border-destructive/60 bg-destructive/5",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {action.kind === "night" && <p className="text-sm">{t.stillNightBody}</p>}

        {action.kind === "early" && (
          <p className="text-sm">
            {fmt(t.earlyBody, { time: formatTime(action.nightEnd, locale), usual: action.dayStartAt })}
          </p>
        )}

        {action.kind === "asleep" && (
          <>
            <p className="font-data text-3xl font-bold">
              {fmt(action.hardStop ? t.wakeByHard : t.wakeBy, { time: formatTime(action.wakeBy, locale) })}
            </p>
            {action.overdueMin > 0 ? (
              <p className="font-medium text-destructive">
                {fmt(t.overdue, { dur: formatDuration(action.overdueMin, locale) })}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {fmt(t.planWaiting, { dur: formatDuration(-action.overdueMin, locale) })}
                {" · "}
                {fmt(t.budgetLeft, { dur: formatDuration(action.budgetLeftMin, locale) })}
              </p>
            )}
          </>
        )}

        {action.kind === "nap" && (
          <>
            <p className="font-data text-3xl font-bold">
              {fmt(t.napWindow, { a: formatTime(action.windowStart, locale), b: formatTime(action.windowEnd, locale) })}
            </p>
            <p className="text-sm">
              {fmt(action.hardStop ? t.wakeByHard : t.wakeBy, { time: formatTime(action.wakeBy, locale) })}
              <span className="text-muted-foreground">
                {" · "}
                {action.state === "waiting" &&
                  fmt(t.planWaiting, { dur: formatDuration((action.windowStart - nowMs) / MIN, locale) })}
                {action.state === "open" && t.planOpen}
                {action.state === "late" &&
                  fmt(t.planLate, { dur: formatDuration((nowMs - action.windowStart) / MIN, locale) })}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {action.fromBand ? t.bandNote : t.rhythmNote} · {fmt(t.budgetLeft, { dur: formatDuration(action.budgetLeftMin, locale) })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAdvice((v) => !v)}>
                {t.wontSleepBtn}
              </Button>
              {action.state === "late" && (
                <Button size="sm" variant="outline" onClick={skipNap}>
                  {t.skipNapBtn}
                </Button>
              )}
            </div>
            {showAdvice && (
              <p className="rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground">
                {wontSleepAdvice(plan) === "graduated" ? t.adviceGraduated : t.adviceTwentyThenUp}
              </p>
            )}
          </>
        )}

        {action.kind === "bedtime" && (
          <>
            <p className="font-data text-3xl font-bold">{formatTime(action.at, locale)}</p>
            {action.why === "budget" && <p className="text-sm text-muted-foreground">{t.bedtimeWhyBudget}</p>}
            {action.why === "no-nap-after" && <p className="text-sm text-muted-foreground">{t.bedtimeWhyNoNap}</p>}
            {action.reason && (
              <p className="text-sm">
                {action.reason === "short-last-nap" ? t.bedtimeAdjustedShort : t.bedtimeAdjustedSkipped}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
