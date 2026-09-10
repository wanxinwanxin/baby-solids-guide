"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { feedbackMsgs } from "@/lib/i18n/messages/feedback";
import { submitFeedback, type FeedbackCategory } from "@/lib/feedback";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: FeedbackCategory; key: "catGeneral" | "catFood" | "catIdea" | "catBug" }[] = [
  { id: "general", key: "catGeneral" },
  { id: "food-request", key: "catFood" },
  { id: "idea", key: "catIdea" },
  { id: "bug", key: "catBug" },
];

/**
 * The feedback composer. Opens from the always-visible top-bar button (and
 * from the log picker's "request this food"). A plain textarea, so the
 * phone's own keyboard dictation covers "just say it". Works for guests.
 */
export default function FeedbackDialog({
  onClose,
  initialCategory = "general",
  initialMessage = "",
}: {
  onClose: () => void;
  initialCategory?: FeedbackCategory;
  initialMessage?: string;
}) {
  const t = useMsgs(feedbackMsgs);
  const locale = useLocale();
  const [category, setCategory] = useState<FeedbackCategory>(initialCategory);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"editing" | "sending" | "sent" | "error">("editing");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const send = async () => {
    if (!message.trim()) return;
    setState("sending");
    const ok = await submitFeedback({
      category,
      message: message.trim(),
      email: email.trim() || undefined,
      locale,
    });
    setState(ok ? "sent" : "error");
  };

  return (
    <div
      className="fixed inset-0 z-[95] bg-foreground/30 p-4 backdrop-blur-[2px]"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className="mx-auto mt-[8vh] flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border bg-popover shadow-xl"
      >
        {state === "sent" ? (
          <div className="space-y-4 p-6">
            <h2 className="text-lg font-bold">{t.thanksTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.thanksBody}</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/85"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <div className="flex min-h-0 flex-col">
            <div className="space-y-1 border-b px-5 py-4">
              <h2 className="text-lg font-bold">{t.title}</h2>
              <p className="text-sm text-muted-foreground">{t.intro}</p>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      category === c.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:border-primary/60",
                    )}
                  >
                    {t[c.key]}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="feedback-message" className="text-sm font-medium">
                  {t.messageLabel}
                </label>
                <textarea
                  id="feedback-message"
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder={category === "food-request" ? t.foodPlaceholder : t.messagePlaceholder}
                  className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-[15px] outline-none focus-visible:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="feedback-email" className="text-sm font-medium">
                  {t.emailLabel}
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-[15px] outline-none focus-visible:border-primary"
                />
              </div>
              {state === "error" && <p className="text-sm text-destructive">{t.errorBody}</p>}
            </div>
            <div className="flex items-center justify-end gap-2 border-t px-5 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => void send()}
                disabled={!message.trim() || state === "sending"}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
              >
                {state === "sending" ? t.sending : t.send}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
