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
import { DateTimeField } from "./DateTimeField";

const MIN = 60 * 1000;

const localDateKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

/**
 * One logged sleep. Mirrors the journal rows: a single Edit action on the
 * row, and delete lives inside the edit panel (with a confirm step) so two
 * tiny targets never sit a thumb-width apart on a phone.
 */
function SessionRow({
  session,
  nowMs,
  onUpdate,
  onDelete,
}: {
  session: SleepSession;
  nowMs: number;
  onUpdate: (id: string, patch: Partial<Omit<SleepSession, "id" | "babyId">>) => void;
  onDelete: (id: string) => void;
}) {
  const locale = useLocale();
  const t = useMsgs(sleepMsgs);
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editStart, setEditStart] = useState<Date | null>(null);
  const [editEnd, setEditEnd] = useState<Date | null>(null);
  const [error, setError] = useState<"time" | "order" | null>(null);

  const startMs = new Date(session.start).getTime();
  const endMs = session.end ? new Date(session.end).getTime() : null;

  function startEditing() {
    setEditStart(new Date(session.start));
    setEditEnd(session.end ? new Date(session.end) : null);
    setConfirmingDelete(false);
    setError(null);
    setEditing(true);
  }

  function saveEdits() {
    if (!editStart) {
      setError("time");
      return;
    }
    if (editEnd && editEnd.getTime() <= editStart.getTime()) {
      setError("order");
      return;
    }
    onUpdate(session.id, {
      start: editStart.toISOString(),
      end: editEnd ? editEnd.toISOString() : undefined,
    });
    setEditing(false);
  }

  return (
    <li className="rounded-xl border px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-data text-sm">
          {formatTime(startMs, locale)} – {endMs === null ? t.ongoing : formatTime(endMs, locale)}
          <span className="ml-2 text-muted-foreground">
            {formatDuration(((endMs ?? nowMs) - startMs) / MIN, locale)}
          </span>
        </span>
        <button
          type="button"
          onClick={editing ? () => setEditing(false) : startEditing}
          aria-expanded={editing}
          aria-label={fmt(t.editAria, { time: formatTime(startMs, locale) })}
          className="inline-flex min-h-9 shrink-0 items-center rounded-full border px-3 text-xs font-medium text-muted-foreground hover:border-primary/60 hover:text-foreground"
        >
          {editing ? t.cancel : t.editEntry}
        </button>
      </div>

      {editing && (
        <div className="mt-3 space-y-3 border-t pt-3">
          <div className="flex flex-wrap gap-4">
            <DateTimeField
              id={`edit-${session.id}-start`}
              label={t.addStart}
              initial={editStart}
              onChange={setEditStart}
            />
            <DateTimeField
              id={`edit-${session.id}-end`}
              label={t.addEnd}
              initial={editEnd}
              onChange={setEditEnd}
            />
          </div>
          <p className="text-xs text-muted-foreground">{t.stillAsleepNote}</p>
          {error && (
            <p className="text-sm text-destructive">
              {error === "order" ? t.addInvalid : t.timeInvalid}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={saveEdits}>
              {t.saveChanges}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              {t.cancel}
            </Button>
            {confirmingDelete ? (
              <span className="ml-auto flex items-center gap-2 text-xs">
                <span>{t.deleteConfirm}</span>
                <Button size="sm" variant="destructive" onClick={() => onDelete(session.id)}>
                  {t.yesDelete}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setConfirmingDelete(false)}>
                  {t.keepEntry}
                </Button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="ml-auto inline-flex min-h-9 items-center text-xs text-destructive underline-offset-2 hover:underline"
              >
                {t.deleteEntry}
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

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
  const updateSession = useSleepStore((s) => s.updateSession);
  const deleteSession = useSleepStore((s) => s.deleteSession);
  const setWakeAnchor = useSleepStore((s) => s.setWakeAnchor);

  // The window card counts down, so the page re-reads the clock periodically.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const [wakeAt, setWakeAt] = useState<Date | null>(null);
  const [wakeError, setWakeError] = useState(false);
  const [addStart, setAddStart] = useState<Date | null>(null);
  const [addEnd, setAddEnd] = useState<Date | null>(null);
  const [addError, setAddError] = useState(false);
  // Remount key: clears the add fields after a successful add.
  const [addFormKey, setAddFormKey] = useState(0);

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

  const submitWakeAnchor = () => {
    if (!wakeAt) return;
    if (wakeAt.getTime() > nowMs) {
      setWakeError(true);
      return;
    }
    setWakeError(false);
    setWakeAnchor(baby.id, wakeAt.toISOString());
  };

  const submitManualAdd = () => {
    if (!addStart || !addEnd || addEnd.getTime() <= addStart.getTime()) {
      setAddError(true);
      return;
    }
    addSession({
      id: crypto.randomUUID(),
      babyId: baby.id,
      start: addStart.toISOString(),
      end: addEnd.toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setAddStart(null);
    setAddEnd(null);
    setAddError(false);
    setAddFormKey((k) => k + 1);
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
        <Button onClick={() => setWakeAnchor(baby.id, new Date().toISOString())}>
          {t.justWokeBtn}
        </Button>
        <div className="flex flex-wrap items-end gap-3">
          <DateTimeField id="wake-anchor" label={t.orPickTime} onChange={setWakeAt} />
          <Button variant="outline" disabled={!wakeAt} onClick={submitWakeAnchor}>
            {t.setWakeBtn}
          </Button>
        </div>
        {wakeError && <p className="text-sm text-destructive">{t.futureTime}</p>}
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
                {todaySessions.map((s) => (
                  <SessionRow
                    key={s.id}
                    session={s}
                    nowMs={nowMs}
                    onUpdate={updateSession}
                    onDelete={deleteSession}
                  />
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                {fmt(t.totalToday, { dur: formatDuration(totalTodayMin, locale) })}
              </p>
            </>
          )}

          <details className="pt-1">
            <summary className="cursor-pointer text-sm font-bold">{t.addTitle}</summary>
            <div key={addFormKey} className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-4">
                <DateTimeField id="add-start" label={t.addStart} onChange={setAddStart} />
                <DateTimeField id="add-end" label={t.addEnd} onChange={setAddEnd} />
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
