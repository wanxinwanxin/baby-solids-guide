"use client";

import Link from "next/link";
import { useState } from "react";
import { fmt, msg } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { symptomLabel } from "@/lib/i18n/labels";
import { AMOUNT_MSGS, BAND_ID_MSGS, historyMsgs } from "@/lib/i18n/messages/history";
import {
  ENJOYMENT_SHORT_MSGS,
  journalMsgs,
  MEAL_SLOT_MSGS,
  UNIT_MSGS,
  logDetailMsgs,
} from "@/lib/i18n/messages/journal";
import { AMOUNT_MSGS as AMOUNT_CHIP_MSGS, ENJOYMENT_MSGS, logFormMsgs } from "@/lib/i18n/messages/log";
import { formatClock, formatQuantity } from "@/lib/journal";
import { useGuideStore } from "@/lib/storage/store";
import type { AmountEaten, Enjoyment, ExposureLog } from "@/lib/storage/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  commitPhoto,
  LogDetailFields,
  type LogDetails,
  type PhotoState,
} from "./LogDetailFields";
import { PhotoThumb } from "./PhotoThumb";

const ENJOYMENT_EMOJI = { loved: "😍", neutral: "😐", disliked: "😖", refused: "🙅" } as const;
const AMOUNTS: AmountEaten[] = ["none", "taste", "some", "lots"];
const ENJOYMENTS: Enjoyment[] = ["loved", "neutral", "disliked", "refused"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-9 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
      )}
    >
      {children}
    </button>
  );
}

export function JournalEntry({
  log,
  foodName,
  isFirstTry,
}: {
  log: ExposureLog;
  foodName: string;
  isFirstTry: boolean;
}) {
  const locale = useLocale();
  const t = useMsgs(historyMsgs);
  const j = useMsgs(journalMsgs);
  const td = useMsgs(logDetailMsgs);
  const tf = useMsgs(logFormMsgs);
  const updateLog = useGuideStore((s) => s.updateLog);
  const deleteLog = useGuideStore((s) => s.deleteLog);

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [details, setDetails] = useState<LogDetails>({});
  const [photo, setPhoto] = useState<PhotoState>({ kind: "none" });
  const [amount, setAmount] = useState<AmountEaten>(log.amountEaten);
  const [enjoyment, setEnjoyment] = useState<Enjoyment>(log.enjoyment);
  const [photoFailed, setPhotoFailed] = useState(false);

  function startEditing() {
    setDetails({
      time: log.time,
      mealSlot: log.mealSlot,
      quantity: log.quantity,
      notes: log.notes,
    });
    setPhoto(log.photoId ? { kind: "existing", id: log.photoId } : { kind: "none" });
    setAmount(log.amountEaten);
    setEnjoyment(log.enjoyment);
    setPhotoFailed(false);
    setConfirmingDelete(false);
    setEditing(true);
  }

  async function saveEdits() {
    const { photoId, failed } = await commitPhoto(photo);
    setPhotoFailed(failed);
    updateLog(log.id, {
      time: details.time,
      mealSlot: details.mealSlot,
      quantity: details.quantity,
      notes: details.notes,
      photoId,
      amountEaten: amount,
      enjoyment,
    });
    setEditing(false);
  }

  const hasReaction = log.symptoms.length > 0 || log.gagging;

  // Built as parts so the separators land *between* items — a measured amount
  // is optional, and a hard-coded leading "·" left a dangling mark without it.
  const meta: React.ReactNode[] = [];
  if (log.quantity) {
    meta.push(
      <span className="font-data text-foreground">
        {formatQuantity(log.quantity, msg(UNIT_MSGS[log.quantity.unit], locale))}
      </span>,
    );
  }
  meta.push(<span>{fmt(j.ateAmount, { amount: msg(AMOUNT_MSGS[log.amountEaten], locale) })}</span>);
  meta.push(<span>{msg(BAND_ID_MSGS[log.prepBandUsed], locale)}</span>);
  meta.push(<span>{msg(ENJOYMENT_SHORT_MSGS[log.enjoyment], locale)}</span>);

  return (
    <li className="rounded-xl border bg-card p-3">
      <div className="flex items-start gap-3">
        {/* Time rail — the spine of the day, so entries scan vertically. */}
        <div className="w-16 shrink-0 pt-0.5">
          {log.time ? (
            <span className="font-data text-xs font-semibold text-foreground">
              {formatClock(log.time, locale)}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">{j.noTime}</span>
          )}
          {log.mealSlot && (
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              {msg(MEAL_SLOT_MSGS[log.mealSlot], locale)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span aria-hidden="true">{ENJOYMENT_EMOJI[log.enjoyment]}</span>
            <Link href={`/foods/${log.foodSlug}`} className="font-medium underline-offset-2 hover:underline">
              {foodName}
            </Link>
            {isFirstTry && (
              <Badge variant="outline" className="border-primary/50 text-primary">
                {j.firstTry}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
            {meta.map((part, i) => (
              <span key={i} className="flex items-center gap-x-1.5">
                {i > 0 && <span aria-hidden="true">·</span>}
                {part}
              </span>
            ))}
          </div>

          {hasReaction && (
            <div className="flex flex-wrap gap-1">
              {log.gagging && <Badge variant="outline">{t.gagging}</Badge>}
              {log.symptoms.map((s) => (
                <Badge key={s} variant="outline" className="border-red-300 text-red-700 dark:text-red-400">
                  {symptomLabel(s, locale)}
                </Badge>
              ))}
            </div>
          )}

          {log.notes && <p className="text-sm whitespace-pre-line">{log.notes}</p>}

          {log.photoId && (
            <PhotoThumb photoId={log.photoId} alt={fmt(j.photoAlt, { food: foodName })} />
          )}
        </div>

        {/* One action on the row. Delete lives inside the edit panel so two
            tiny targets never sit a thumb-width apart on a phone. */}
        <div className="flex shrink-0 items-start">
          <button
            type="button"
            onClick={editing ? () => setEditing(false) : startEditing}
            aria-expanded={editing}
            aria-label={fmt(j.editEntryAria, { food: foodName, date: log.date })}
            className="inline-flex min-h-9 items-center rounded-full border px-3 text-xs font-medium text-muted-foreground hover:border-primary/60 hover:text-foreground"
          >
            {editing ? j.cancel : j.editEntry}
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-3 space-y-3 border-t pt-3">
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold">{tf.howMuch}</h3>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <Chip key={a} active={amount === a} onClick={() => setAmount(a)}>
                  {msg(AMOUNT_CHIP_MSGS[a], locale)}
                </Chip>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold">{tf.howDidItGo}</h3>
            <div className="flex flex-wrap gap-2">
              {ENJOYMENTS.map((e) => (
                <Chip key={e} active={enjoyment === e} onClick={() => setEnjoyment(e)}>
                  {msg(ENJOYMENT_MSGS[e], locale)}
                </Chip>
              ))}
            </div>
          </div>
          <LogDetailFields
            value={details}
            onChange={setDetails}
            photo={photo}
            onPhotoChange={setPhoto}
          />
          {photoFailed && <p className="text-xs text-destructive">{td.photoFailed}</p>}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => void saveEdits()}>
              {j.saveChanges}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              {j.cancel}
            </Button>
            {confirmingDelete ? (
              <span className="ml-auto flex items-center gap-2 text-xs">
                <span>{t.deleteEntryConfirm}</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteLog(log.id)}
                  aria-label={fmt(t.deleteLogAria, { food: log.foodSlug, date: log.date })}
                >
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
