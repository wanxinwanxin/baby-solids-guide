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
import { fmt, joinList, msg } from"@/lib/i18n/config";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { useL10nAllergens } from"@/lib/i18n/content-client";
import { checkInOfferMsgs, FALLBACK_REACTION_SIGNS } from"@/lib/i18n/messages/log";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

/**
 * Phase 8A — offered right after saving a log: schedule symptom check-ins,
 * delivered via the in-app Today card plus optional calendar links that work
 * even when the browser is closed.
 *
 * A meal can hold several foods (see lib/meal-log). `foods` are the ones the
 * check-ins follow — every common allergen on the plate, or the first food of
 * a familiar meal — and `logIdBySlug` ties each one to the row it just wrote.
 * `mealSize` is the whole plate, which is what decides whether the offer says
 * which food it follows.
 */
export function CheckInOffer({
  foods,
  baby,
  logIdBySlug,
  mealSize,
}: {
  foods: Food[];
  baby: BabyProfile;
  logIdBySlug: Record<string, string>;
  mealSize: number;
}) {
  const addCheckIns = useGuideStore((s) => s.addCheckIns);
  const { data: session } = useSession();
  const locale = useLocale();
  const t = useMsgs(checkInOfferMsgs);
  const allergens = useL10nAllergens();
  const [selected, setSelected] = useState<Set<CheckInPreset>>(new Set(["2h"]));
  const [scheduled, setScheduled] = useState<{ dueAts: string[]; count: number } | null>(null);

  const allergenFoods = foods.filter((f) => f.commonAllergen);
  const foodNames = joinList(
    foods.map((f) => f.name),
    locale,
  );
  // The signs to watch for: those of the allergens on the plate, else the
  // general list. Deduplicated, because two allergens share several signs.
  const reactionSigns =
    allergenFoods.length > 0
      ? [
          ...new Set(
            allergenFoods.flatMap(
              (f) => allergens.find((p) => p.id === f.commonAllergen)?.reactionSigns ?? [],
            ),
          ),
        ]
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
    // A check-in row names one food, because that is the food its symptoms
    // land on. Two allergens in one meal therefore get one row each.
    const pairs = foods.flatMap((f) => dueAts.map((dueAt) => ({ food: f, dueAt })));
    addCheckIns(
      pairs.map(({ food, dueAt }) => ({
        id: newId(),
        babyId: baby.id,
        foodSlug: food.slug,
        logId: logIdBySlug[food.slug] ?? "",
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
          reminders: pairs.map(({ food, dueAt }) => ({
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
    setScheduled({ dueAts, count: pairs.length });
  }

  function downloadIcs() {
    if (!scheduled) return;
    const ics = icsForCheckIns(
      {
        foodName: foodNames,
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
    a.download = `check-ins-${foods.map((f) => f.slug).join("-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (scheduled) {
    return (
      <div className="space-y-3 rounded-lg border border-primary/40 p-4 text-sm">
        <p className="font-medium">
          {fmt(scheduled.count === 1 ? t.scheduledOne : t.scheduledMany, {
            n: scheduled.count,
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
                  foodName: foodNames,
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
  const allergen = allergenFoods.length > 0;
  const allergenPrompt =
    allergenFoods.length === 1
      ? fmt(t.allergenPrompt, { food: foodNames })
      : fmt(t.allergenPromptMany, { foods: foodNames });
  return (
    <div
      className={cn(
        "space-y-3 rounded-xl border p-4 text-sm",
        allergen ? "border-honey/60 bg-accent/40" : "border-primary/30 bg-secondary/30",
      )}
    >
      <p className={cn("font-semibold", allergen && "text-base")}>
        {allergen ? allergenPrompt : t.genericPrompt}
      </p>
      {/* A plate of several foods says which of them the check-ins follow, so
          the offer never looks as if it forgot the rest of the meal. */}
      {mealSize > foods.length && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {fmt(allergen ? t.watchAllergens : t.watchFirstFood, { foods: foodNames })}
        </p>
      )}
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
