"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { sleepMsgs } from "@/lib/i18n/messages/sleep";
import { formatDuration, formatTime, type SleepSession } from "@/lib/sleep/model";
import { useGuideStore } from "@/lib/storage/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimeField } from "@/components/DateTimeField";

const MIN = 60 * 1000;

/** Matches sleepSessionSchema.notes. */
export const SLEEP_NOTE_MAX = 500;

/**
 * One logged sleep. Mirrors the journal rows: a single Edit action on the
 * row, and delete lives inside the edit panel (with a confirm step) so two
 * tiny targets never sit a thumb-width apart on a phone. The same row is
 * used for today on /sleep, for each day in the sleep history, and for the
 * past days on /care, so a sleep can be fixed wherever it shows.
 */
export function SleepSessionRow({
  session,
  nowMs,
  icon,
}: {
  session: SleepSession;
  nowMs: number;
  /** An optional leading glyph, for lists that mix sleep with other logs. */
  icon?: string;
}) {
  const locale = useLocale();
  const t = useMsgs(sleepMsgs);
  const iv = useMsgs(interventionMsgs);
  const dt = useMsgs(datetimeMsgs);
  const updateSleepSession = useGuideStore((s) => s.updateSleepSession);
  const deleteSleepSession = useGuideStore((s) => s.deleteSleepSession);
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editStart, setEditStart] = useState<Date | null>(null);
  const [editEnd, setEditEnd] = useState<Date | null>(null);
  const [editNote, setEditNote] = useState("");
  const [error, setError] = useState<"time" | "order" | null>(null);

  const startMs = new Date(session.start).getTime();
  const endMs = session.end ? new Date(session.end).getTime() : null;
  // Sleep latency: the number the predictor cannot see from `start` alone.
  const latencyMin = session.inBedAt ? (startMs - new Date(session.inBedAt).getTime()) / MIN : null;

  function startEditing() {
    setEditStart(new Date(session.start));
    setEditEnd(session.end ? new Date(session.end) : null);
    setEditNote(session.notes ?? "");
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
    updateSleepSession(session.id, {
      start: editStart.toISOString(),
      end: editEnd ? editEnd.toISOString() : undefined,
      notes: editNote.trim().slice(0, SLEEP_NOTE_MAX) || undefined,
    });
    setEditing(false);
  }

  return (
    <li className="rounded-xl border px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-data text-sm">
          {icon && (
            <span aria-hidden="true" className="mr-2">
              {icon}
            </span>
          )}
          {formatTime(startMs, locale)} – {endMs === null ? t.ongoing : formatTime(endMs, locale)}
          <span className="ml-2 text-muted-foreground">
            {formatDuration(((endMs ?? nowMs) - startMs) / MIN, locale)}
          </span>
          {latencyMin !== null && latencyMin > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              · {fmt(iv.latencyLine, { dur: formatDuration(latencyMin, locale) })}
            </span>
          )}
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

      {session.notes && !editing && (
        <p className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">{session.notes}</p>
      )}

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
          <div className="space-y-0.5">
            <label htmlFor={`edit-${session.id}-note`} className="block text-[11px] text-muted-foreground">
              {t.noteLabel}
            </label>
            <Textarea
              id={`edit-${session.id}-note`}
              rows={2}
              maxLength={SLEEP_NOTE_MAX}
              placeholder={t.notePlaceholder}
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">
              {error === "order" ? t.addInvalid : dt.timeInvalid}
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
                <Button size="sm" variant="destructive" onClick={() => deleteSleepSession(session.id)}>
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
