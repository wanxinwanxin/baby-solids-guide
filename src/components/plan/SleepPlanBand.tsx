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
 * predictor never had. While he is awake: when to put him down, how that
 * differs from his own pattern, and what to do if he will not sleep. The
 * ordinary prediction card stays right under it as the reference.
 */
export function SleepPlanBand({
  plan,
  action,
  babyId,
  now,
  napCount,
}: {
  plan: Intervention;
  action: SleepAction;
  babyId: string;
  now: Date;
  napCount: number;
}) {
  const t = useMsgs(interventionMsgs);
  const locale = useLocale();
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const [showAdvice, setShowAdvice] = useState(false);

  if (action.kind === "none") return null;
  const nowMs = now.getTime();

  const deltaLine = (deltaMin: number | null) => {
    if (deltaMin === null) return null;
    const abs = Math.abs(Math.round(deltaMin));
    if (abs < 10) return t.deltaSame;
    return fmt(deltaMin < 0 ? t.deltaEarlier : t.deltaLater, { dur: formatDuration(abs, locale) });
  };

  const skipNap = () =>
    addCareLog({ id: newId(), babyId, kind: "event", at: now.toISOString(), event: "nap_skipped" });

  return (
    <Card className={cn("border-primary/40 bg-primary/5", action.kind === "asleep" && action.overdueMin > 0 && "border-destructive/60 bg-destructive/5")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {action.kind === "asleep"
            ? fmt(t.napState, { n: action.napIndex + 1, total: napCount })
            : action.kind === "nap"
              ? fmt(t.napState, { n: action.napIndex + 1, total: napCount })
              : t.bedtimeTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
              </p>
            )}
          </>
        )}

        {action.kind === "nap" && (
          <>
            <p className="font-data text-3xl font-bold">
              {t.putDownAt} {formatTime(action.startAt, locale)}
            </p>
            <p className="text-sm">
              {fmt(t.wakeBy, { time: formatTime(action.wakeBy, locale) })}
              {action.state !== "skip" && (
                <span className="text-muted-foreground">
                  {" · "}
                  {action.state === "waiting" &&
                    fmt(t.planWaiting, { dur: formatDuration((action.startAt - nowMs) / MIN, locale) })}
                  {action.state === "open" && t.planOpen}
                  {action.state === "late" &&
                    fmt(t.planLate, { dur: formatDuration((nowMs - action.startAt) / MIN, locale) })}
                </span>
              )}
            </p>
            {action.state === "skip" && <p className="text-sm font-medium">{t.planSkip}</p>}
            {deltaLine(action.deltaMin) && (
              <p className="inline-block rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                {deltaLine(action.deltaMin)}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {action.state !== "skip" && (
                <Button size="sm" variant="outline" onClick={() => setShowAdvice((v) => !v)}>
                  {t.wontSleepBtn}
                </Button>
              )}
              {(action.state === "skip" || action.state === "late") && (
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
            {action.reason && (
              <p className="text-sm">
                {action.reason === "short-last-nap" ? t.bedtimeAdjustedShort : t.bedtimeAdjustedSkipped}
              </p>
            )}
            {deltaLine(action.deltaMin) && (
              <p className="inline-block rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                {deltaLine(action.deltaMin)}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
