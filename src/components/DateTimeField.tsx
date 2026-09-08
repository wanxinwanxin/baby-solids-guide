"use client";

import { useState } from "react";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";
import { formatTime } from "@/lib/sleep/model";
import { combineDateClock, localDateIso, parseClockText } from "@/lib/sleep/time";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * A date + typed-time pair. The native time picker makes people scroll a
 * wheel, so the time is a plain text field that accepts "7:35 pm", "19:35",
 * "735", "下午7:35", and friends (see lib/sleep/time). The parent gets a
 * combined local Date, or null while the time is empty or unparseable —
 * the field flags unparseable text itself.
 */
export function DateTimeField({
  id,
  label,
  initial,
  onChange,
}: {
  id: string;
  label: string;
  /** Prefill (edit flows); omit for an empty field defaulting to today. */
  initial?: Date | null;
  onChange: (d: Date | null) => void;
}) {
  const locale = useLocale();
  const t = useMsgs(datetimeMsgs);
  const [dateStr, setDateStr] = useState(() => localDateIso(initial ?? new Date()));
  const [timeText, setTimeText] = useState(() =>
    initial ? formatTime(initial.getTime(), locale) : "",
  );
  const invalid = timeText.trim() !== "" && parseClockText(timeText) === null;

  const emit = (ds: string, tt: string) => {
    const clock = parseClockText(tt);
    onChange(clock ? combineDateClock(ds, clock) : null);
  };

  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        <div className="space-y-0.5">
          <Label htmlFor={`${id}-date`} className="text-[11px] text-muted-foreground">
            {`${label} — ${t.dateLabel}`}
          </Label>
          <Input
            id={`${id}-date`}
            type="date"
            value={dateStr}
            onChange={(e) => {
              setDateStr(e.target.value);
              emit(e.target.value, timeText);
            }}
            className="w-auto"
          />
        </div>
        <div className="space-y-0.5">
          <Label htmlFor={`${id}-time`} className="text-[11px] text-muted-foreground">
            {`${label} — ${t.timeLabel}`}
          </Label>
          <Input
            id={`${id}-time`}
            type="text"
            inputMode="text"
            autoComplete="off"
            placeholder={t.timePlaceholder}
            value={timeText}
            aria-invalid={invalid || undefined}
            onChange={(e) => {
              setTimeText(e.target.value);
              emit(dateStr, e.target.value);
            }}
            className="w-28"
          />
        </div>
      </div>
      {invalid && <p className="text-xs text-destructive">{t.timeInvalid}</p>}
    </div>
  );
}
