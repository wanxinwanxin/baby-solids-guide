"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { feedbackMsgs } from "@/lib/i18n/messages/feedback";
import type { FeedbackCategory } from "@/lib/feedback";

const FeedbackDialog = dynamic(() => import("@/components/FeedbackDialog"));

/** Detail for the `os:feedback` event, so any surface can open it prefilled. */
export type OpenFeedbackDetail = { category?: FeedbackCategory; message?: string };

/** Open the feedback dialog from anywhere (e.g. "request this food"). */
export function openFeedback(detail: OpenFeedbackDetail = {}) {
  window.dispatchEvent(new CustomEvent("os:feedback", { detail }));
}

/**
 * Always-visible feedback trigger in the top bar — one tap to send a note,
 * request a missing food, or report a bug. Prominent by design: this is how
 * a handful of families reach us while we iterate.
 */
export function FeedbackButton() {
  const t = useMsgs(feedbackMsgs);
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<OpenFeedbackDetail>({});

  useEffect(() => {
    const onOpen = (e: Event) => {
      setPrefill((e as CustomEvent<OpenFeedbackDetail>).detail ?? {});
      setOpen(true);
    };
    window.addEventListener("os:feedback", onOpen);
    return () => window.removeEventListener("os:feedback", onOpen);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={t.open}
        title={t.open}
        onClick={() => {
          setPrefill({});
          setOpen(true);
        }}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5 shrink-0" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden md:inline">{t.open}</span>
      </button>
      {open && (
        <FeedbackDialog
          onClose={() => setOpen(false)}
          initialCategory={prefill.category ?? "general"}
          initialMessage={prefill.message ?? ""}
        />
      )}
    </>
  );
}
