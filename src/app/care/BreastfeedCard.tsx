"use client";

import { useEffect, useRef, useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { careMsgs } from "@/lib/i18n/messages/care";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";
import {
  elapsed,
  feedStartSide,
  formatNursingSeconds,
  formatTimerClock,
  lastBreastFeed,
  minutesText,
  nursingTotals,
  pause,
  suggestedNextSide,
  tapSide,
} from "@/lib/care/nursing";
import { useNursingTimerStore } from "@/lib/care/nursing-store";
import { formatDuration } from "@/lib/sleep/model";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { BreastSide, CareLog } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DateTimeField } from "@/components/DateTimeField";
import { cn } from "@/lib/utils";
import { NursingFields, readNursingDraft, type NursingDraft, type NursingError } from "./NursingFields";

const MIN = 60 * 1000;
/** Matches careLogSchema.notes. */
const NOTE_MAX = 500;

type Review = { startedAt: Date; draft: NursingDraft; fromTimer: boolean };

function SideButton({
  label,
  clock,
  running,
  nextTag,
  runningText,
  onTap,
}: {
  label: string;
  clock: string;
  running: boolean;
  /** "Next" on the side to offer first, null on the other. */
  nextTag: string | null;
  runningText: string;
  /** Gets the tap's clock, read in the click handler. */
  onTap: (nowMs: number) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={running}
      onClick={() => onTap(Date.now())}
      className={cn(
        "relative flex min-h-20 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-3 py-3 transition-colors",
        running ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/60",
      )}
    >
      <span className="text-base font-bold">{label}</span>
      <span className="font-data text-sm">
        {clock}
        {running && <span className="sr-only"> {runningText}</span>}
      </span>
      {nextTag && (
        <span className="absolute right-2 top-1.5 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
          {nextTag}
        </span>
      )}
    </button>
  );
}

/**
 * Breastfeeding on /care: a two-side timer for the feed happening now, a
 * typed form for one that already happened, and the side to offer next.
 * Nothing saves until the parent confirms the start time and the minutes,
 * because the timer often starts a little after the baby latched.
 */
export function BreastfeedCard({
  babyId,
  careLogs,
  todayLogs,
  now,
}: {
  babyId: string;
  careLogs: CareLog[];
  todayLogs: CareLog[];
  now: Date;
}) {
  const locale = useLocale();
  const t = useMsgs(careMsgs);
  const dt = useMsgs(datetimeMsgs);
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const timer = useNursingTimerStore((s) => s.timers[babyId] ?? null);
  const setTimer = useNursingTimerStore((s) => s.setTimer);

  const [review, setReview] = useState<Review | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<NursingError | "time" | "future" | null>(null);
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  // The running side counts up once a second. The page clock (`now`) only
  // moves every 30 s, which is too slow for a stopwatch.
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => {
    if (!timer?.running) return;
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [timer?.running]);

  // The review form can open below the fold on a phone; bring it up.
  useEffect(() => {
    if (!review || !reviewRef.current) return;
    reviewRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [review]);

  const clockMs = Math.max(tick, now.getTime());
  const sides = timer ? elapsed(timer, clockMs) : null;
  const next = timer ? null : suggestedNextSide(careLogs);
  const last = lastBreastFeed(careLogs);
  const today = nursingTotals(todayLogs);

  // A side tap while the review is open goes back to timing: the review
  // closes and the feed carries on, so the buttons never sit dead.
  const tap = (side: BreastSide, nowMs: number) => {
    setConfirmingDiscard(false);
    setReview(null);
    setError(null);
    setTimer(babyId, tapSide(timer, side, nowMs));
  };

  const openReview = (fromTimer: boolean) => {
    setError(null);
    setConfirmingDiscard(false);
    if (fromTimer && timer) {
      const paused = pause(timer, Date.now());
      setTimer(babyId, paused);
      setReview({
        startedAt: new Date(paused.startedAt),
        fromTimer: true,
        draft: {
          leftText: minutesText(paused.leftMs / 1000),
          rightText: minutesText(paused.rightMs / 1000),
          leftSec: Math.round(paused.leftMs / 1000),
          rightSec: Math.round(paused.rightMs / 1000),
          startSide: paused.startSide,
        },
      });
    } else {
      setReview({
        startedAt: new Date(),
        fromTimer: false,
        draft: { leftText: "", rightText: "", leftSec: 0, rightSec: 0, startSide: null },
      });
    }
  };

  const save = () => {
    if (!review) return;
    if (review.startedAt.getTime() > Date.now() + MIN) {
      setError("future");
      return;
    }
    const read = readNursingDraft(review.draft);
    if (!read.ok) {
      setError(read.error);
      return;
    }
    addCareLog({
      id: newId(),
      babyId,
      kind: "breast",
      at: review.startedAt.toISOString(),
      nursing: read.nursing,
      ...(note.trim() ? { notes: note.trim().slice(0, NOTE_MAX) } : {}),
    });
    if (review.fromTimer) setTimer(babyId, null);
    setReview(null);
    setNote("");
    setError(null);
  };

  const sideWord = (s: BreastSide) => (s === "left" ? t.sideWordLeft : t.sideWordRight);
  const lastStart = last ? feedStartSide(last) : null;
  const lastAgo = last
    ? formatDuration(Math.max(0, (now.getTime() - new Date(last.at).getTime()) / MIN), locale)
    : null;

  return (
    <Card id="breast" className="scroll-mt-20">
      <CardHeader>
        <CardTitle>{t.breastTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {last && lastAgo && !timer && (
          <p className="text-sm text-muted-foreground">
            {lastStart
              ? fmt(t.lastFeedLine, { side: sideWord(lastStart), ago: lastAgo })
              : fmt(t.lastFeedLineNoSide, { ago: lastAgo })}
          </p>
        )}

        <div className="flex gap-3">
          {(["left", "right"] as const).map((s) => (
            <SideButton
              key={s}
              label={s === "left" ? t.sideLeft : t.sideRight}
              clock={timer && sides ? formatTimerClock(s === "left" ? sides.leftMs : sides.rightMs) : "0:00"}
              running={timer?.running === s}
              nextTag={next === s ? t.nextSideTag : null}
              runningText={t.timerRunning}
              onTap={(nowMs) => tap(s, nowMs)}
            />
          ))}
        </div>

        {timer && sides ? (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-data font-medium">
                {fmt(t.timerTotal, { dur: formatTimerClock(sides.leftMs + sides.rightMs) })}
              </span>
              {!timer.running && <span className="ml-2 text-muted-foreground">· {t.timerPaused}</span>}
            </p>
            {!review && (
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={() => openReview(true)}>{t.finishFeed}</Button>
                {confirmingDiscard ? (
                  <span className="flex items-center gap-2 text-xs">
                    <span>{t.discardConfirm}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setTimer(babyId, null);
                        setConfirmingDiscard(false);
                      }}
                    >
                      {t.yesDiscard}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmingDiscard(false)}>
                      {t.keepTiming}
                    </Button>
                  </span>
                ) : (
                  <Button variant="outline" onClick={() => setConfirmingDiscard(true)}>
                    {t.discardFeed}
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{t.timerHint}</p>
        )}

        {review ? (
          <div ref={reviewRef} className="scroll-mt-24 space-y-3 rounded-xl border p-3">
            <DateTimeField
              id="breast-start"
              label={t.startedAt}
              initial={review.startedAt}
              onChange={(d) => {
                if (d) setReview({ ...review, startedAt: d });
                setError(d ? null : "time");
              }}
            />
            <NursingFields
              id="breast-new"
              draft={review.draft}
              onChange={(draft) => {
                setReview({ ...review, draft });
                setError(null);
              }}
            />
            <Textarea
              aria-label={t.noteLabel}
              rows={2}
              maxLength={NOTE_MAX}
              placeholder={t.breastNotePlaceholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {error && (
              <p className="text-sm text-destructive">
                {error === "needsTime"
                  ? t.feedNeedsTime
                  : error === "tooLong"
                    ? t.feedSideTooLong
                    : error === "future"
                      ? t.futureTime
                      : dt.timeInvalid}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button onClick={save}>{t.saveFeed}</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setReview(null);
                  setError(null);
                }}
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        ) : (
          !timer && (
            <button
              type="button"
              onClick={() => openReview(false)}
              className="inline-flex min-h-9 items-center text-sm font-medium text-primary underline underline-offset-2"
            >
              {t.addPastFeed}
            </button>
          )
        )}

        {today.count > 0 && (
          <p className="text-sm text-muted-foreground">
            {fmt(t.breastToday, {
              n: today.count,
              left: formatNursingSeconds(today.leftSec, locale),
              right: formatNursingSeconds(today.rightSec, locale),
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
