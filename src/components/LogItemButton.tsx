"use client";

import { useActiveActivityLogs, useActiveBaby, useHydrated } from "@/lib/hooks";
import { todayIso } from "@/lib/food-utils";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { ActivityId } from "@/lib/storage/types";
import { cn } from "@/lib/utils";

/**
 * Per-item activity logging: one tap adds an itemized activity log carrying
 * the item's slug and title, so the family sees WHICH poem was read or WHICH
 * movement was done, not just that reading or exercise happened. Tapping
 * again the same day undoes it.
 *
 * Renders nothing until a profile exists — the shelves stay plain reading
 * pages for a guest. The labels arrive already resolved, because the pages
 * that use this are server components and each one names the action
 * differently ("Read this to baby", "Did this today").
 */
export function LogItemButton({
  activity,
  itemId,
  itemTitle,
  markLabel,
  doneLabel,
}: {
  activity: ActivityId;
  itemId: string;
  itemTitle: string;
  markLabel: string;
  doneLabel: string;
}) {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const activityLogs = useActiveActivityLogs();
  const addActivityLog = useGuideStore((s) => s.addActivityLog);
  const deleteActivityLog = useGuideStore((s) => s.deleteActivityLog);

  if (!hydrated || !baby) return null;

  const today = todayIso();
  const existing = activityLogs.find(
    (a) => a.activity === activity && a.date === today && a.itemId === itemId,
  );

  return (
    <button
      type="button"
      onClick={() =>
        existing
          ? deleteActivityLog(existing.id)
          : addActivityLog({
              id: newId(),
              babyId: baby.id,
              activity,
              date: today,
              itemId,
              itemTitle,
            })
      }
      className={cn(
        "min-h-9 rounded-full border px-4 text-[13px] font-semibold transition-colors",
        existing
          ? "border-primary/50 bg-primary/10 text-primary"
          : "text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {existing ? doneLabel : markLabel}
    </button>
  );
}
