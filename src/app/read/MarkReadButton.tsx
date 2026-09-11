"use client";

import { useActiveActivityLogs, useActiveBaby, useHydrated } from "@/lib/hooks";
import { todayIso } from "@/lib/food-utils";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { readMsgs } from "@/lib/i18n/messages/read";
import { newId, useGuideStore } from "@/lib/storage/store";
import { cn } from "@/lib/utils";

/**
 * Per-piece "read this to baby" logging (2026-09-11): one tap adds an
 * itemized activity log carrying the piece's slug and title, so the family
 * sees WHICH poem was read, not just that reading happened. Tapping again
 * the same day undoes it. Renders nothing until a profile exists — the
 * shelf stays a plain reading page for guests.
 */
export function MarkReadButton({ slug, title }: { slug: string; title: string }) {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const activityLogs = useActiveActivityLogs();
  const addActivityLog = useGuideStore((s) => s.addActivityLog);
  const deleteActivityLog = useGuideStore((s) => s.deleteActivityLog);
  const t = useMsgs(readMsgs);

  if (!hydrated || !baby) return null;

  const today = todayIso();
  const existing = activityLogs.find(
    (a) => a.activity === "read" && a.date === today && a.itemId === slug,
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
              activity: "read",
              date: today,
              itemId: slug,
              itemTitle: title,
            })
      }
      className={cn(
        "min-h-9 rounded-full border px-4 text-[13px] font-semibold transition-colors",
        existing
          ? "border-primary/50 bg-primary/10 text-primary"
          : "text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {existing ? t.readToday : t.markRead}
    </button>
  );
}
