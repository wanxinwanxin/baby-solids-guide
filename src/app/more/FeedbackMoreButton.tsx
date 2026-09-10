"use client";

import { openFeedback } from "@/components/FeedbackButton";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { feedbackMsgs } from "@/lib/i18n/messages/feedback";

/** A prominent /more row that opens the feedback composer. */
export function FeedbackMoreButton() {
  const t = useMsgs(feedbackMsgs);
  return (
    <button
      type="button"
      onClick={() => openFeedback()}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border bg-card px-5 py-4 text-left hover:border-primary/60"
    >
      <span>
        <span className="block text-[15px] font-bold">{t.moreLabel}</span>
        <span className="block text-sm text-muted-foreground">{t.moreDesc}</span>
      </span>
      <span aria-hidden="true" className="text-muted-foreground">
        ›
      </span>
    </button>
  );
}
