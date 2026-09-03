"use client";

import { startTour } from "@/components/Tour";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { tourMsgs } from "@/lib/i18n/messages/tour";
import { moreMsgs } from "@/lib/i18n/messages/more";

/** The one interactive row on /more: starts the walkthrough. */
export function TourButton() {
  const tour = useMsgs(tourMsgs);
  const t = useMsgs(moreMsgs);
  return (
    <button
      type="button"
      onClick={startTour}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border bg-card px-5 py-4 text-left hover:border-primary/60"
    >
      <span>
        <span className="block text-[15px] font-bold">{tour.showMeAround}</span>
        <span className="block text-sm text-muted-foreground">{t.descTour}</span>
      </span>
      <span aria-hidden="true" className="text-muted-foreground">
        ›
      </span>
    </button>
  );
}
