"use client";

import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { careMsgs } from "@/lib/i18n/messages/care";
import { secondsFromMinutesText } from "@/lib/care/nursing";
import { NURSING_SIDE_MAX_SEC } from "@/lib/storage/schema";
import type { BreastSide, CareLog } from "@/lib/storage/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** The minutes on each side and the first side, as the form holds them. */
export type NursingDraft = {
  leftText: string;
  rightText: string;
  /** The seconds the timer measured, kept while a field is unchanged. */
  leftSec: number;
  rightSec: number;
  startSide: BreastSide | null;
};

export type NursingError = "needsTime" | "tooLong";

/** Turn a draft into the stored shape, or name what is wrong with it. */
export function readNursingDraft(
  d: NursingDraft,
): { ok: true; nursing: NonNullable<CareLog["nursing"]> } | { ok: false; error: NursingError } {
  const leftSec = secondsFromMinutesText(d.leftText, d.leftSec);
  const rightSec = secondsFromMinutesText(d.rightText, d.rightSec);
  if (leftSec === null || rightSec === null || leftSec + rightSec <= 0) {
    return { ok: false, error: "needsTime" };
  }
  if (leftSec > NURSING_SIDE_MAX_SEC || rightSec > NURSING_SIDE_MAX_SEC) {
    return { ok: false, error: "tooLong" };
  }
  // A one-side feed began on that side, whatever the chips say.
  const startSide =
    leftSec > 0 && rightSec === 0 ? "left" : rightSec > 0 && leftSec === 0 ? "right" : d.startSide;
  return { ok: true, nursing: { leftSec, rightSec, ...(startSide ? { startSide } : {}) } };
}

function SideChip({
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
      aria-pressed={active}
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

/**
 * Minutes on each side plus, when both sides ran, which came first. Shared
 * by the review after the timer, a past feed typed in, and a row's edit panel.
 */
export function NursingFields({
  id,
  draft,
  onChange,
}: {
  id: string;
  draft: NursingDraft;
  onChange: (d: NursingDraft) => void;
}) {
  const t = useMsgs(careMsgs);
  const both = Number(draft.leftText) > 0 && Number(draft.rightText) > 0;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-0.5">
          <label htmlFor={`${id}-left`} className="block text-[11px] text-muted-foreground">
            {t.leftMinutes}
          </label>
          <Input
            id={`${id}-left`}
            type="number"
            inputMode="decimal"
            min={0}
            value={draft.leftText}
            onChange={(e) => onChange({ ...draft, leftText: e.target.value })}
            className="w-24"
          />
        </div>
        <div className="space-y-0.5">
          <label htmlFor={`${id}-right`} className="block text-[11px] text-muted-foreground">
            {t.rightMinutes}
          </label>
          <Input
            id={`${id}-right`}
            type="number"
            inputMode="decimal"
            min={0}
            value={draft.rightText}
            onChange={(e) => onChange({ ...draft, rightText: e.target.value })}
            className="w-24"
          />
        </div>
      </div>
      {both && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.startedOn}>
          <span className="text-sm font-medium">{t.startedOn}</span>
          {(["left", "right"] as const).map((s) => (
            <SideChip key={s} active={draft.startSide === s} onClick={() => onChange({ ...draft, startSide: s })}>
              {s === "left" ? t.sideLeft : t.sideRight}
            </SideChip>
          ))}
        </div>
      )}
    </div>
  );
}
