"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { readMsgs } from "@/lib/i18n/messages/read";
import { cn } from "@/lib/utils";

/**
 * Text-size control for /read — grandparents read the Chinese poems and often
 * need bigger type. Sets data-read-scale on #reading-root (globals.css scales
 * the .read-* text off it) and remembers the choice on this device.
 */

const KEY = "os-read-scale";
type Scale = "m" | "l" | "xl";
const SCALES: Scale[] = ["m", "l", "xl"];

const neverChanges = () => () => {};

/** The stored choice, read through useSyncExternalStore so the server snapshot
 *  is always "m" and no hydration mismatch occurs. */
function readStored(): Scale {
  try {
    const v = localStorage.getItem(KEY);
    return v === "l" || v === "xl" ? v : "m";
  } catch {
    return "m";
  }
}

export function ReadingScaleControl() {
  const t = useMsgs(readMsgs);
  const stored = useSyncExternalStore(neverChanges, readStored, () => "m" as Scale);
  const [override, setOverride] = useState<Scale | null>(null);
  const scale = override ?? stored;

  // Apply to the reading container (a DOM write, not React state).
  useEffect(() => {
    const el = document.getElementById("reading-root");
    if (el) el.dataset.readScale = scale;
  }, [scale]);

  const choose = (v: Scale) => {
    setOverride(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* nothing to persist to */
    }
  };

  const label = { m: t.sizeStandard, l: t.sizeLarge, xl: t.sizeExtraLarge } as const;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t.textSize}</span>
      <div className="flex items-end gap-1">
        {SCALES.map((v, i) => (
          <button
            key={v}
            type="button"
            onClick={() => choose(v)}
            aria-pressed={scale === v}
            aria-label={label[v]}
            className={cn(
              "flex min-h-9 min-w-9 items-center justify-center rounded-lg border px-2 font-bold leading-none",
              scale === v
                ? "border-primary bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:border-primary/60",
            )}
            style={{ fontSize: 14 + i * 5 }}
          >
            A
          </button>
        ))}
      </div>
    </div>
  );
}
