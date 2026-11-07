"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FOOD_CATEGORIES } from "@/content-schema/food";
import {
  ACHIEVEMENT_TIERS,
  achievementProgress,
  foodGallery,
  UNLOCK_EXPOSURES,
  type FoodUnlock,
} from "@/lib/gallery";
import { useActiveBaby, useActiveLogs, useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { fmt, msg } from "@/lib/i18n/config";
import { useL10nFoods } from "@/lib/i18n/content-client";
import { categoryLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { ACHIEVEMENT_NAME_MSGS, galleryMsgs } from "@/lib/i18n/messages/gallery";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Food gallery (user feedback, 2026-09-11): the catalog as a collectible
 * board. Unlock rules live in src/lib/gallery.ts; this page only renders.
 *
 * Mark mode (user feedback, 2026-10-25): a family can light up a food the
 * baby cleared with no log behind it (eaten before the app, or a missed day
 * nobody can date). Taps write BabyProfile.clearedFoods; no log is created.
 */

const STATE_ORDER: Record<FoodUnlock["state"], number> = {
  unlocked: 0,
  "in-progress": 1,
  reacted: 2,
  "not-tried": 3,
};

function ProgressPips({ eatenDays }: { eatenDays: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: UNLOCK_EXPOSURES }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < eatenDays ? "bg-primary" : "bg-border",
          )}
        />
      ))}
    </span>
  );
}

const TILE_CLASS = "flex h-full w-full flex-col items-center gap-1 rounded-xl border bg-card p-2 text-center transition-colors";

function MarkTile({
  food,
  label,
  onToggle,
}: {
  food: FoodUnlock;
  label: string;
  onToggle: (slug: string) => void;
}) {
  // A food cleared by its logs, or one with a logged reaction, is not the
  // family's to mark: the logs already say what happened.
  const locked = food.state === "reacted" || (food.state === "unlocked" && !food.marked);
  return (
    <li>
      <button
        type="button"
        disabled={locked}
        aria-pressed={locked ? undefined : food.marked}
        aria-label={label}
        onClick={() => onToggle(food.slug)}
        className={cn(
          TILE_CLASS,
          "relative",
          locked ? "cursor-default opacity-35" : "hover:border-primary",
          food.marked && "border-primary bg-primary/10",
          !locked && !food.marked && "border-dashed",
        )}
      >
        {food.marked && (
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none text-primary-foreground"
          >
            ✓
          </span>
        )}
        <span aria-hidden="true" className="text-2xl leading-none">
          {food.state === "reacted" ? "⚠️" : food.emoji ?? "🍽️"}
        </span>
        <span className="line-clamp-2 text-[10.5px] leading-tight text-foreground/80">
          {food.name}
        </span>
      </button>
    </li>
  );
}

function Tile({ food, stateLabel }: { food: FoodUnlock; stateLabel: string }) {
  return (
    <li>
      <Link
        href={`/foods/${food.slug}`}
        aria-label={`${food.name} — ${stateLabel}`}
        className={cn(
          TILE_CLASS,
          "hover:border-primary",
          food.state === "unlocked" && "border-primary/50 bg-primary/5",
          food.state === "not-tried" && "opacity-45 grayscale",
          food.state === "reacted" && "border-destructive/50 bg-destructive/5",
        )}
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          {food.state === "reacted" ? "⚠️" : food.emoji ?? "🍽️"}
        </span>
        <span className="line-clamp-2 text-[10.5px] leading-tight text-foreground/80">
          {food.name}
        </span>
        {food.state === "in-progress" && <ProgressPips eatenDays={food.eatenDays} />}
      </Link>
    </li>
  );
}

export default function GalleryPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const locale = useLocale();
  const t = useMsgs(galleryMsgs);
  const { foods } = useL10nFoods();
  const saveBaby = useGuideStore((s) => s.saveBaby);
  const [marking, setMarking] = useState(false);

  const cleared = baby?.clearedFoods;
  const gallery = useMemo(() => foodGallery(logs, foods, cleared), [logs, foods, cleared]);
  const progress = achievementProgress(gallery.unlockedCount);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <div className="mx-auto max-w-md pt-10">
        <Alert>
          <AlertTitle>{t.setupTitle}</AlertTitle>
          <AlertDescription>
            {t.setupBody}{" "}
            <Link href="/onboarding" className="underline underline-offset-2">
              {t.startOnboarding}
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const stateLabels: Record<FoodUnlock["state"], string> = {
    unlocked: t.legendUnlocked,
    "in-progress": t.legendInProgress,
    "not-tried": t.legendNotTried,
    reacted: t.legendReacted,
  };
  const reacted = gallery.foods.filter((f) => f.state === "reacted");
  const markedCount = gallery.foods.filter((f) => f.marked && f.state === "unlocked").length;
  const toggleMark = (slug: string) => {
    const current = baby.clearedFoods ?? [];
    saveBaby({
      ...baby,
      clearedFoods: current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    });
  };
  const markLabel = (f: FoodUnlock) =>
    fmt(
      f.state === "reacted"
        ? t.markReactedAria
        : f.marked
          ? t.markedAria
          : f.state === "unlocked"
            ? t.markLoggedAria
            : t.markTapAria,
      { name: f.name },
    );
  const barMax = progress.next?.threshold ?? gallery.totalFoods;
  const barPct = Math.min(100, Math.round((gallery.unlockedCount / Math.max(1, barMax)) * 100));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/70">{t.intro}</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t.achievementsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {progress.current ? (
              <Badge className="text-sm">
                🏅 {msg(ACHIEVEMENT_NAME_MSGS[progress.current.id], locale)}
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">{t.noTierYet}</span>
            )}
            <span className="font-data text-sm text-muted-foreground">
              {fmt(t.unlockedOfTotal, { n: gallery.unlockedCount, total: gallery.totalFoods })}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={t.progressAria}
            aria-valuemin={0}
            aria-valuemax={barMax}
            aria-valuenow={Math.min(gallery.unlockedCount, barMax)}
            className="h-2 overflow-hidden rounded-full bg-muted"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${barPct}%` }} />
          </div>
          <p className="text-sm text-muted-foreground">
            {progress.next
              ? fmt(t.nextTier, {
                  n: progress.next.threshold - gallery.unlockedCount,
                  name: msg(ACHIEVEMENT_NAME_MSGS[progress.next.id], locale),
                })
              : t.allTiersEarned}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {ACHIEVEMENT_TIERS.map((tier) => {
              const earned = gallery.unlockedCount >= tier.threshold;
              const name = msg(ACHIEVEMENT_NAME_MSGS[tier.id], locale);
              return (
                <li key={tier.id}>
                  <Badge
                    variant={earned ? "default" : "outline"}
                    className={cn(!earned && "text-muted-foreground")}
                    aria-label={
                      earned
                        ? fmt(t.tierEarnedAria, { name })
                        : fmt(t.tierLockedAria, { name, n: tier.threshold })
                    }
                  >
                    {name} · {tier.threshold}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {reacted.length > 0 && (
        <Card className="border-destructive/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.reactionsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{t.reactionsBody}</p>
            <ul className="flex flex-wrap gap-2">
              {reacted.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/foods/${f.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 px-3 py-1 hover:border-destructive"
                  >
                    <span aria-hidden="true">{f.emoji ?? "🍽️"}</span>
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {marking ? (
        <Card className="sticky top-2 z-10 border-primary/50 shadow-sm">
          <CardContent className="space-y-2 pt-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">{t.markTitle}</p>
              <Button size="sm" onClick={() => setMarking(false)}>
                {t.markDone}
              </Button>
            </div>
            <p className="text-muted-foreground">{t.markHint}</p>
            <p className="text-muted-foreground">{t.markAllergenNote}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setMarking(true)}>
            {t.markStart}
          </Button>
          {markedCount > 0 && (
            <span className="text-xs text-muted-foreground">{fmt(t.markCount, { n: markedCount })}</span>
          )}
        </div>
      )}

      {FOOD_CATEGORIES.map((category) => {
        const own = gallery.foods
          .filter((f) => f.category === category)
          .sort((a, b) => STATE_ORDER[a.state] - STATE_ORDER[b.state] || a.name.localeCompare(b.name));
        if (own.length === 0) return null;
        const done = own.filter((f) => f.state === "unlocked").length;
        return (
          <section key={category} className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-heading text-lg font-bold">{categoryLabel(category, locale)}</h2>
              <span className="font-data text-xs text-muted-foreground">
                {done}/{own.length}
              </span>
            </div>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
              {own.map((f) =>
                marking ? (
                  <MarkTile key={f.slug} food={f} label={markLabel(f)} onToggle={toggleMark} />
                ) : (
                  <Tile key={f.slug} food={f} stateLabel={stateLabels[f.state]} />
                ),
              )}
            </ul>
          </section>
        );
      })}

      <p className="text-sm">
        <Link href="/log" className="text-primary underline underline-offset-2">
          {t.logMore}
        </Link>
      </p>
    </div>
  );
}
