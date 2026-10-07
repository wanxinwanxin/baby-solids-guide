"use client";

import { useEffect, useRef, useState } from "react";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";
import { Button } from "@/components/ui/button";
import { DateTimeField } from "@/components/DateTimeField";

/**
 * A logging action that never assumes "now": the button opens a typed time
 * field prefilled with the current clock, because caregivers usually get
 * their hands free a few minutes after the thing actually happened.
 *
 * When the field opens it scrolls itself into view and takes focus. On a
 * phone the button often sits at the bottom of the screen, so the form it
 * reveals appeared below the fold and the tap looked like it did nothing.
 */
export function TimeConfirm({
  id,
  buttonLabel,
  buttonVariant = "default",
  fieldLabel,
  confirmLabel,
  disabled = false,
  validate,
  onConfirm,
}: {
  id: string;
  buttonLabel: string;
  buttonVariant?: "default" | "outline";
  fieldLabel: string;
  confirmLabel: string;
  /** Disable the trigger while a required choice (amount, kind) is missing. */
  disabled?: boolean;
  /** Returns an error message to show, or null to accept. */
  validate?: (d: Date) => string | null;
  onConfirm: (d: Date) => void;
}) {
  const t = useMsgs(datetimeMsgs);
  const [openedAt, setOpenedAt] = useState<Date | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openedAt || !formRef.current) return;
    const el = formRef.current;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    const first = el.querySelector<HTMLElement>("input, select, textarea");
    // Focus after the scroll starts; focusing first would jump the page.
    const handle = window.setTimeout(() => first?.focus({ preventScroll: true }), 250);
    return () => window.clearTimeout(handle);
  }, [openedAt]);

  if (!openedAt) {
    return (
      <Button
        variant={buttonVariant}
        disabled={disabled}
        onClick={() => {
          const at = new Date();
          setOpenedAt(at);
          setValue(at);
          setError(null);
        }}
      >
        {buttonLabel}
      </Button>
    );
  }

  return (
    <div ref={formRef} className="scroll-mt-24 space-y-2">
      <div className="flex flex-wrap items-end gap-3">
        <DateTimeField
          key={openedAt.getTime()}
          id={id}
          label={fieldLabel}
          initial={openedAt}
          onChange={setValue}
        />
        <Button
          disabled={!value}
          onClick={() => {
            if (!value) return;
            const err = validate?.(value) ?? null;
            if (err) {
              setError(err);
              return;
            }
            onConfirm(value);
            setOpenedAt(null);
            setError(null);
          }}
        >
          {confirmLabel}
        </Button>
        <Button variant="outline" onClick={() => setOpenedAt(null)}>
          {t.cancel}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
