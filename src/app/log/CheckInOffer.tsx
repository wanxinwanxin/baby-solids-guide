"use client";

import { useState } from "react";
import type { Food } from "@/content-schema/food";
import {
  CHECKIN_PRESETS,
  dueAtForPreset,
  googleCalendarUrl,
  icsForCheckIns,
} from "@/lib/checkins";
import { useSession } from "@/lib/auth-client";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { BabyProfile, CheckInPreset } from "@/lib/storage/types";
import { allergenPrograms } from "../../../content/allergens";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Phase 8A — offered right after saving a log: schedule symptom check-ins,
 * delivered via the in-app Today card plus optional calendar links that work
 * even when the browser is closed.
 */
export function CheckInOffer({ food, baby, logId }: { food: Food; baby: BabyProfile; logId: string }) {
  const addCheckIns = useGuideStore((s) => s.addCheckIns);
  const { data: session } = useSession();
  const [selected, setSelected] = useState<Set<CheckInPreset>>(new Set(["2h"]));
  const [scheduled, setScheduled] = useState<{ dueAts: string[] } | null>(null);

  const reactionSigns = food.commonAllergen
    ? (allergenPrograms.find((p) => p.id === food.commonAllergen)?.reactionSigns ?? [])
    : ["hives or rash", "vomiting", "swelling", "unusual sleepiness"];

  function toggle(preset: CheckInPreset) {
    const next = new Set(selected);
    if (next.has(preset)) next.delete(preset);
    else next.add(preset);
    setSelected(next);
  }

  function schedule() {
    const now = new Date();
    const dueAts = CHECKIN_PRESETS.filter((p) => selected.has(p.id)).map((p) =>
      dueAtForPreset(p.id, now),
    );
    addCheckIns(
      dueAts.map((dueAt) => ({
        id: newId(),
        babyId: baby.id,
        foodSlug: food.slug,
        logId,
        createdAt: now.toISOString(),
        dueAt,
        status: "pending" as const,
      })),
    );
    // Signed-in users also get these as server-delivered push notifications.
    if (session?.user) {
      void fetch("/api/reminders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reminders: dueAts.map((dueAt) => ({
            kind: "check-in",
            title: `Check ${baby.nickname} — ${food.name}`,
            body: `Watch for: ${reactionSigns.slice(0, 3).join("; ")}. Tap to log what you see.`,
            url: "/today",
            dueAt,
          })),
        }),
      }).catch(() => {});
    }
    setScheduled({ dueAts });
  }

  function downloadIcs() {
    if (!scheduled) return;
    const ics = icsForCheckIns({
      foodName: food.name,
      babyNickname: baby.nickname,
      dueAts: scheduled.dueAts,
      reactionSigns,
      now: new Date(),
    });
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `check-ins-${food.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (scheduled) {
    return (
      <div className="space-y-3 rounded-lg border border-emerald-300 p-4 text-sm">
        <p className="font-medium">
          ✓ {scheduled.dueAts.length} check-in{scheduled.dueAts.length === 1 ? "" : "s"} scheduled —
          they&apos;ll wait for you on the Today screen.
        </p>
        <p className="text-muted-foreground">
          Closing the browser? Put them in your calendar so nothing slips:
        </p>
        <div className="flex flex-wrap gap-2">
          {scheduled.dueAts.map((dueAt) => (
            <a
              key={dueAt}
              href={googleCalendarUrl({
                foodName: food.name,
                babyNickname: baby.nickname,
                dueAt,
                reactionSigns,
                appUrl: typeof window !== "undefined" ? window.location.origin : "",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-3 py-1.5 text-xs hover:border-emerald-400"
            >
              📅 Google Calendar (
              {new Date(dueAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              )
            </a>
          ))}
          <button
            type="button"
            onClick={downloadIcs}
            className="rounded-md border px-3 py-1.5 text-xs hover:border-emerald-400"
          >
            ⬇ .ics for Apple/Outlook
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border p-4 text-sm">
      <p className="font-medium">
        {food.commonAllergen
          ? `${food.name} is a common allergen — want a reminder to check for symptoms?`
          : "Want a reminder to check on how this went down?"}
      </p>
      <div className="flex flex-wrap gap-2">
        {CHECKIN_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(p.id)}
            aria-pressed={selected.has(p.id)}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              selected.has(p.id) ? "border-emerald-700 bg-emerald-700 text-white" : "hover:border-emerald-400",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <Button
        size="sm"
        disabled={selected.size === 0}
        onClick={schedule}
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        Schedule check-in{selected.size === 1 ? "" : "s"}
      </Button>
    </div>
  );
}
