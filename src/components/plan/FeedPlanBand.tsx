"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { fussyAdvice, nextFeed, planEvents, type FussyAdvice } from "@/lib/plan/engine";
import { formatDuration, formatTime } from "@/lib/sleep/model";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { CareLog, Intervention } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MIN = 60 * 1000;

/**
 * The plan band on /care: the one instruction a caregiver needs — next
 * bottle, when, how much, and what to do if he is fussy before then. The
 * ordinary bottle logger sits right under it, unchanged.
 */
export function FeedPlanBand({
  plan,
  careLogs,
  babyId,
  now,
  morningWakeMs = null,
}: {
  plan: Intervention;
  careLogs: CareLog[];
  babyId: string;
  now: Date;
  /** This morning's real wake, when known — the first bottle follows it. */
  morningWakeMs?: number | null;
}) {
  const t = useMsgs(interventionMsgs);
  const locale = useLocale();
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const [advice, setAdvice] = useState<FussyAdvice[] | null>(null);

  const nowMs = now.getTime();
  const dayKey = new Date(nowMs).toDateString();
  const offDay = planEvents(careLogs).some(
    (e) => e.event === "off_day" && new Date(e.at).toDateString() === dayKey,
  );
  const feed = nextFeed(plan, careLogs, now, morningWakeMs);
  // Before he has woken, the first bottle has no clock yet — it is "when he wakes".
  const firstOnWake = feed && feed.index === 0 && (plan.feedWindows[0]?.onWake ?? true) && morningWakeMs === null;

  const logEvent = (event: CareLog["event"]) =>
    addCareLog({ id: newId(), babyId, kind: "event", at: now.toISOString(), event });

  const adviceText: Record<FussyAdvice, string> = {
    "open-now": t.adviceOpenNow,
    "check-other-causes": t.adviceCheckOther,
    "probably-tired": t.adviceProbablyTired,
    "feed-if-crying": t.adviceFeedIfCrying,
  };

  return (
    <Card className="border-primary/40 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.nextBottle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {offDay ? (
          <p className="text-sm">{t.offDayNote}</p>
        ) : !feed ? null : feed.state === "done" ? (
          <>
            <p className="font-medium">{t.bottlesDone}</p>
            <p className="text-sm text-muted-foreground">
              {fmt(t.firstTomorrow, { time: formatTime(feed.windowAt, locale), ml: feed.targetMl })}
            </p>
          </>
        ) : (
          <>
            <p className="font-data text-3xl font-bold">
              {formatTime(feed.windowAt, locale)} · {feed.targetMl} ml
            </p>
            <p className="text-sm">
              {firstOnWake && fmt(t.onWakeLine, { time: formatTime(feed.windowAt, locale) })}
              {!firstOnWake && feed.state === "waiting" && (
                <>
                  {fmt(t.dontOfferBefore, { time: formatTime(feed.windowAt, locale) })}{" "}
                  <span className="text-muted-foreground">
                    {fmt(t.opensIn, { dur: formatDuration(feed.minutesUntil, locale) })}
                  </span>
                </>
              )}
              {feed.state === "open" && t.openNow}
              {feed.state === "late" && fmt(t.lateBy, { dur: formatDuration(-feed.minutesUntil, locale) })}
            </p>
            {feed.lastBottle && (
              <p className="text-sm text-muted-foreground">
                {fmt(t.lastBottleNoTarget, {
                  time: formatTime(feed.lastBottle.at, locale),
                  ml: Math.round(feed.lastBottle.ml),
                })}
                {" · "}
                {fmt(t.sinceLast, { dur: formatDuration((nowMs - feed.lastBottle.at) / MIN, locale) })}
              </p>
            )}
            {feed.gapCapped && (
              <p className="text-xs text-muted-foreground">
                {fmt(t.gapCappedNote, { clock: plan.feedWindows[feed.index]?.at ?? "" })}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {feed.state === "waiting" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setAdvice(fussyAdvice(feed, now));
                    logEvent("fussy");
                  }}
                >
                  {t.fussyBtn}
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => logEvent("off_day")}>
                {t.offDayBtn}
              </Button>
            </div>
            {advice && (
              <div className="space-y-1 rounded-lg border bg-card px-3 py-2 text-sm">
                <p className="font-medium">{t.fussyTitle}</p>
                {advice.map((a) => (
                  <p key={a} className="text-muted-foreground">
                    {adviceText[a]}
                  </p>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
