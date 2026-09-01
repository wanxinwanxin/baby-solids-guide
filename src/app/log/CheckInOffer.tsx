"use client";

import { useState } from"react";
import type { Food } from"@/content-schema/food";
import {
  CHECKIN_PRESETS,
  checkinPresetLabel,
  dueAtForPreset,
  googleCalendarUrl,
  icsForCheckIns,
} from"@/lib/checkins";
import { useSession } from"@/lib/auth-client";
import { newId, useGuideStore } from"@/lib/storage/store";
import type { BabyProfile, CheckInPreset } from"@/lib/storage/types";
import { fmt, msg } from"@/lib/i18n/config";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { useL10nAllergens } from"@/lib/i18n/content-client";
import { checkInOfferMsgs, FALLBACK_REACTION_SIGNS } from"@/lib/i18n/messages/log";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

/**
 * Phase 8A — offered right after saving a log: schedule symptom check-ins,
 * delivered via the in-app Today card plus optional calendar links that work
 * even when the browser is closed.
 */
export function CheckInOffer({ food, baby, logId }: { food: Food; baby: BabyProfile; logId: string }) {
  const addCheckIns = useGuideStore((s) => s.addCheckIns);
  const { data: session } = useSession();
  const locale = useLocale();
  const t = useMsgs(checkInOfferMsgs);
  const allergens = useL10nAllergens();
  const [selected, setSelected] = useState<Set<CheckInPreset>>(new Set(["2h"]));
  const [scheduled, setScheduled] = useState<{ dueAts: string[] } | null>(null);

  const reactionSigns = food.commonAllergen
    ? (allergens.find((p) => p.id === food.commonAllergen)?.reactionSigns ?? [])
    : FALLBACK_REACTION_SIGNS.map((m) => msg(m, locale));

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
        status: "pending"as const,
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
            title: fmt(t.pushTitle, { nickname: baby.nickname, food: food.name }),
            body: fmt(t.pushBody, {
              signs: reactionSigns.slice(0, 3).join(locale === "en" ? "; " : "；"),
            }),
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
    const ics = icsForCheckIns(
      {
        foodName: food.name,
        babyNickname: baby.nickname,
        dueAts: scheduled.dueAts,
        reactionSigns,
        now: new Date(),
      },
      locale,
    );
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
      <div className="space-y-3 rounded-lg border border-primary/40 p-4 text-sm">
        <p className="font-medium">
          {fmt(scheduled.dueAts.length === 1 ? t.scheduledOne : t.scheduledMany, {
            n: scheduled.dueAts.length,
          })}
        </p>
        <p className="text-muted-foreground">
          {t.putInCalendar}
        </p>
        <div className="flex flex-wrap gap-2">
          {scheduled.dueAts.map((dueAt) => (
            <a
              key={dueAt}
              href={googleCalendarUrl(
                {
                  foodName: food.name,
                  babyNickname: baby.nickname,
                  dueAt,
                  reactionSigns,
                  appUrl: typeof window !== "undefined" ? window.location.origin : "",
                },
                locale,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-3 py-1.5 text-xs hover:border-primary/60"
            >
              📅 {t.googleCalendar} (
              {new Date(dueAt).toLocaleString(locale === "zh" ? "zh-CN" : undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              )
            </a>
          ))}
          <button
            type="button"
            onClick={downloadIcs}
            className="rounded-md border px-3 py-1.5 text-xs hover:border-primary/60"
          >
            {t.icsButton}
          </button>
        </div>
      </div>
    );
  }

  // An allergen exposure is exactly when a check-in matters most, so that
  // variant gets the honey warning treatment instead of a quiet grey box.
  const allergen = !!food.commonAllergen;
  return (
    <div
      className={cn(
        "space-y-3 rounded-xl border p-4 text-sm",
        allergen ? "border-honey/60 bg-accent/40" : "border-primary/30 bg-secondary/30",
      )}
    >
      <p className={cn("font-semibold", allergen && "text-base")}>
        {allergen ? fmt(t.allergenPrompt, { food: food.name }) : t.genericPrompt}
      </p>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{t.remindersWhere}</p>
      <div className="flex flex-wrap gap-2">
        {CHECKIN_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(p.id)}
            aria-pressed={selected.has(p.id)}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              selected.has(p.id)
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:border-primary/60",
            )}
          >
            {checkinPresetLabel(p.id, locale)}
          </button>
        ))}
      </div>
      {selected.size === 0 && (
        <p className="text-xs text-muted-foreground">{t.schedulePickFirst}</p>
      )}
      <Button
        disabled={selected.size === 0}
        onClick={schedule}
        className="min-h-11 w-full bg-primary font-bold text-primary-foreground shadow-sm hover:bg-primary/85 sm:w-auto sm:px-6"
      >
        {selected.size === 1 ? t.scheduleOne : t.scheduleMany}
      </Button>
    </div>
  );
}
