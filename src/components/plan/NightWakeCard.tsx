"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { nightAdvice, type NightAdvice } from "@/lib/plan/engine";
import { formatDuration } from "@/lib/sleep/model";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { Intervention } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MIN = 60 * 1000;

/**
 * The night card on /sleep, shown during the night sleep when the family is
 * night-weaning. One tap starts the clock at the wake; the step to take
 * updates with the minutes; the outcome — resettled alone, or fed — is
 * logged with how long it took. That minutes-to-resolution number is the
 * one the night stage steers by, so it is captured here and nowhere else.
 */
export function NightWakeCard({ plan, babyId, now }: { plan: Intervention; babyId: string; now: Date }) {
  const t = useMsgs(interventionMsgs);
  const locale = useLocale();
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const [wokeAt, setWokeAt] = useState<number | null>(null);

  const ml = plan.nightFeedMl ?? 120;
  const minutes = wokeAt === null ? 0 : Math.round((now.getTime() - wokeAt) / MIN);
  const advice = wokeAt === null ? null : nightAdvice(plan, now, minutes);
  const text: Record<NightAdvice, string> = {
    "not-in-plan": "",
    "wait-5": t.nightWait5,
    "comfort-2": t.nightComfort2,
    "repeat-once": t.nightRepeatOnce,
    feed: fmt(t.nightFeed, { ml }),
    "after-cutoff-feed": fmt(t.nightAfterCutoff, { ml }),
  };

  const resolve = (how: "resettled" | "fed") => {
    if (wokeAt === null) return;
    const settleMinutes = Math.max(0, minutes);
    if (how === "resettled") {
      addCareLog({ id: newId(), babyId, kind: "event", at: now.toISOString(), event: "night_resettled", settleMinutes });
    } else {
      addCareLog({
        id: newId(),
        babyId,
        kind: "formula",
        at: now.toISOString(),
        amount: { value: ml, unit: "ml" },
        settleMinutes,
      });
    }
    setWokeAt(null);
  };

  return (
    <Card className="border-primary/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.nightCardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{fmt(t.nightCardBody, { cutoff: plan.nightCutoffAt ?? "" })}</p>
        {wokeAt === null ? (
          <Button size="sm" onClick={() => setWokeAt(Date.now())}>
            {t.heWokeBtn}
          </Button>
        ) : (
          <>
            <p className="font-data text-2xl font-bold">
              {fmt(t.sinceWake, { dur: formatDuration(minutes, locale) })}
            </p>
            {advice && advice !== "not-in-plan" && (
              <p className="rounded-lg border bg-card px-3 py-2">{text[advice]}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => resolve("resettled")}>
                {t.resettledBtn}
              </Button>
              <Button size="sm" variant="outline" onClick={() => resolve("fed")}>
                {t.fedBtn} · {ml} ml
              </Button>
              <Button size="sm" variant="outline" onClick={() => setWokeAt(null)}>
                {t.cancel}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t.nightHardCry}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
