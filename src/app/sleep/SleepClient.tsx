"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { correctedAgeMonths } from "@/lib/age";
import { useActiveBaby, useHydrated } from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { sleepMsgs } from "@/lib/i18n/messages/sleep";
import {
  PERSONALIZED_AT,
  formatDuration,
  formatTime,
  openSession,
  predictNextSleep,
  type SleepSession,
} from "@/lib/sleep/model";
import { useSleepStore } from "@/lib/sleep/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MIN = 60 * 1000;

/** "YYYY-MM-DDTHH:MM" on the device clock, for datetime-local inputs. */
function toInputValue(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

const localDateKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export function SleepClient() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const locale = useLocale();
  const t = useMsgs(sleepMsgs);

  const sessions = useSleepStore((s) => s.sessions);
  const wakeAnchors = useSleepStore((s) => s.wakeAnchors);
  const fellAsleep = useSleepStore((s) => s.fellAsleep);
  const wokeUp = useSleepStore((s) => s.wokeUp);
  const addSession = useSleepStore((s) => s.addSession);
  const deleteSession = useSleepStore((s) => s.deleteSession);
  const setWakeAnchor = useSleepStore((s) => s.setWakeAnchor);

  // The window card counts down, so the page re-reads the clock periodically.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const [wakeInput, setWakeInput] = useState("");
  const [addStart, setAddStart] = useState("");
  const [addEnd, setAddEnd] = useState("");
  const [addError, setAddError] = useState(false);

  const babySessions = useMemo(
    () => (baby ? sessions.filter((s) => s.babyId === baby.id) : []),
    [sessions, baby],
  );
  const open = useMemo(() => openSession(babySessions), [babySessions]);
  const ageMonths = baby ? correctedAgeMonths(baby, now) : 0;
  const prediction = useMemo(
    () =>
      baby && !open
        ? predictNextSleep({
            sessions: babySessions,
            ageMonths,
            now,
            wakeAnchor: wakeAnchors[baby.id],
          })
        : null,
    [baby, open, babySessions, ageMonths, now, wakeAnchors],
  );

  if (!hydrated) return null;

  if (!baby) {
    return (
      <div className="mx-auto max-w-md pt-10">
        <Alert>
          <AlertTitle>{t.setupTitle}</AlertTitle>
          <AlertDescription>
            {t.setupBody}{" "}
            <Link href="/onboarding" className="underline underline-offset-2">
              {t.startOnboarding}
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const nowMs = now.getTime();
  const todayKey = localDateKey(now.toISOString());
  const todaySessions = babySessions
    .filter((s) => localDateKey(s.start) === todayKey || (s.end && localDateKey(s.end) === todayKey))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  const totalTodayMin = todaySessions.reduce((sum, s) => {
    const end = s.end ? new Date(s.end).getTime() : nowMs;
    return sum + Math.max(0, end - new Date(s.start).getTime()) / MIN;
  }, 0);

  const submitManualAdd = () => {
    if (!addStart || !addEnd || new Date(addEnd) <= new Date(addStart)) {
      setAddError(true);
      return;
    }
    const session: SleepSession = {
      id: crypto.randomUUID(),
      babyId: baby.id,
      start: new Date(addStart).toISOString(),
      end: new Date(addEnd).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addSession(session);
    setAddStart("");
    setAddEnd("");
    setAddError(false);
  };

  const statusCard = open ? (
    <Card>
      <CardHeader>
        <CardTitle>{t.asleepTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">
          {fmt(t.asleepFor, {
            dur: formatDuration((nowMs - new Date(open.start).getTime()) / MIN, locale),
          })}{" "}
          <span className="text-muted-foreground">
            ({fmt(t.asleepSince, { time: formatTime(new Date(open.start).getTime(), locale) })})
          </span>
        </p>
        <Button onClick={() => wokeUp(baby.id, new Date().toISOString())}>{t.wokeUpBtn}</Button>
      </CardContent>
    </Card>
  ) : prediction ? (
    <Card>
      <CardHeader>
        <CardTitle>{prediction.kind === "bedtime" ? t.bedtimeTitle : t.nextNapTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-data text-3xl font-bold">
          {formatTime(prediction.windowStart, locale)} – {formatTime(prediction.windowEnd, locale)}
        </p>
        <p className="text-muted-foreground">
          {fmt(t.awakeFor, {
            dur: formatDuration((nowMs - prediction.lastWake) / MIN, locale),
            time: formatTime(prediction.lastWake, locale),
          })}{" "}
          {nowMs < prediction.windowStart
            ? fmt(t.stateBefore, {
                dur: formatDuration((prediction.windowStart - nowMs) / MIN, locale),
              })
            : nowMs <= prediction.windowEnd
              ? t.stateOpen
              : t.statePast}
        </p>
        <Button onClick={() => fellAsleep(baby.id, new Date().toISOString())}>
          {t.fellAsleepBtn}
        </Button>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>{t.askLastWake}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <Button onClick={() => setWakeAnchor(baby.id, new Date().toISOString())}>
            {t.justWokeBtn}
          </Button>
          <div className="space-y-1">
            <Label htmlFor="sleep-wake-at">{t.orPickTime}</Label>
            <div className="flex gap-2">
              <Input
                id="sleep-wake-at"
                type="datetime-local"
                value={wakeInput}
                max={toInputValue(now)}
                onChange={(e) => setWakeInput(e.target.value)}
                className="w-auto"
              />
              <Button
                variant="outline"
                disabled={!wakeInput}
                onClick={() => {
                  if (wakeInput) setWakeAnchor(baby.id, new Date(wakeInput).toISOString());
                }}
              >
                {t.setWakeBtn}
              </Button>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => fellAsleep(baby.id, new Date().toISOString())}>
          {t.fellAsleepBtn}
        </Button>
      </CardContent>
    </Card>
  );

  const basis = prediction?.basis;
  const ageLabel = (Math.round(ageMonths * 10) / 10).toFixed(1).replace(/\.0$/, "");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="text-muted-foreground">{t.intro}</p>
      </div>

      {statusCard}

      {basis && (
        <Card>
          <CardHeader>
            <CardTitle>{t.whyTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>
                {fmt(t.whyAgePrior, {
                  age: ageLabel,
                  min: formatDuration(basis.prior.min, locale),
                  max: formatDuration(basis.prior.max, locale),
                })}
              </li>
              <li>
                {basis.personalized && basis.personalMedian !== null
                  ? fmt(t.whyPersonal, {
                      dur: formatDuration(basis.personalMedian, locale),
                      n: basis.observedCount,
                    })
                  : fmt(t.whyCollecting, { n: basis.observedCount, need: PERSONALIZED_AT })}
              </li>
              {basis.lastNapAdjust && basis.lastNapMinutes !== null && (
                <li>
                  {fmt(basis.lastNapAdjust === "shorter" ? t.whyShortNap : t.whyLongNap, {
                    dur: formatDuration(basis.lastNapMinutes, locale),
                  })}
                </li>
              )}
              <li>
                {fmt(basis.bedtimePersonalized ? t.whyBedtimeLogs : t.whyBedtimeDefault, {
                  time: formatTime(basis.bedtimeEstimate, locale),
                })}
              </li>
            </ul>
            {basis.newborn && (
              <p className="mt-3 text-sm text-muted-foreground">{t.newbornNote}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t.todayTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.todayEmpty}</p>
          ) : (
            <>
              <ul className="space-y-2">
                {todaySessions.map((s) => {
                  const endMs = s.end ? new Date(s.end).getTime() : null;
                  return (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5"
                    >
                      <span className="font-data text-sm">
                        {formatTime(new Date(s.start).getTime(), locale)} –{" "}
                        {endMs === null ? t.ongoing : formatTime(endMs, locale)}
                        <span className="ml-2 text-muted-foreground">
                          {formatDuration(
                            ((endMs ?? nowMs) - new Date(s.start).getTime()) / MIN,
                            locale,
                          )}
                        </span>
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => deleteSession(s.id)}>
                        {t.deleteBtn}
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <p className="text-sm text-muted-foreground">
                {fmt(t.totalToday, { dur: formatDuration(totalTodayMin, locale) })}
              </p>
            </>
          )}

          <details className="pt-1">
            <summary className="cursor-pointer text-sm font-bold">{t.addTitle}</summary>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <Label htmlFor="sleep-add-start">{t.addStart}</Label>
                <Input
                  id="sleep-add-start"
                  type="datetime-local"
                  value={addStart}
                  onChange={(e) => setAddStart(e.target.value)}
                  className="w-auto"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sleep-add-end">{t.addEnd}</Label>
                <Input
                  id="sleep-add-end"
                  type="datetime-local"
                  value={addEnd}
                  onChange={(e) => setAddEnd(e.target.value)}
                  className="w-auto"
                />
              </div>
              <Button variant="outline" onClick={submitManualAdd}>
                {t.addBtn}
              </Button>
            </div>
            {addError && <p className="mt-2 text-sm text-destructive">{t.addInvalid}</p>}
          </details>
        </CardContent>
      </Card>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p>{t.localNote}</p>
        <p>{t.medicalNote}</p>
      </div>
    </div>
  );
}
