"use client";

import Link from "next/link";
import type { Food } from "@/content-schema/food";
import type { ScoredFood } from "@/lib/engine";
import type { BabyProfile, CheckIn } from "@/lib/storage/types";
import { fmt } from "@/lib/i18n/config";
import { bandLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { caregiverMsgs, todayMsgs } from "@/lib/i18n/messages/today";
import { useGuideStore } from "@/lib/storage/store";
import { CutDiagram, isDiagramVariant } from "@/components/diagrams/CutDiagram";

/**
 * The Today screen a caregiver sees on their own device (Phase 16): the
 * day's foods with the exact prep, the safe-texture check, and any due
 * reaction check-ins. Planning, stats, and nudges stay out — the person
 * holding this phone feeds, and someone else plans.
 */
export function CaregiverToday({
  baby,
  picks,
  foodBySlug,
  dueCheckIns,
}: {
  baby: BabyProfile;
  picks: ScoredFood[];
  foodBySlug: Map<string, Food>;
  dueCheckIns: CheckIn[];
}) {
  const locale = useLocale();
  const t = useMsgs(todayMsgs);
  const c = useMsgs(caregiverMsgs);
  const resolveCheckIn = useGuideStore((s) => s.resolveCheckIn);
  const setCaregiverMode = useGuideStore((s) => s.setCaregiverMode);
  const dateLocale = locale === "zh" ? "zh-CN" : undefined;
  const dateLabel = new Date().toLocaleDateString(dateLocale, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {dateLabel}
          </p>
          <Link
            href="/safety"
            className="text-xs text-red-700 underline underline-offset-2 dark:text-red-400"
          >
            {c.emergencyLink}
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {fmt(t.todayFor, { name: baby.nickname })}
        </h1>
        <p className="text-[15px] leading-relaxed text-foreground/70">
          {fmt(c.serveLede, { name: baby.nickname })}
        </p>
      </div>

      {dueCheckIns.length > 0 && (
        <div className="space-y-2">
          {dueCheckIns.map((ci) => (
            <div
              key={ci.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-honey/50 bg-accent/40 p-3 text-sm"
            >
              <span className="font-semibold">
                {fmt(t.checkReaction, {
                  food: foodBySlug.get(ci.foodSlug)?.name ?? ci.foodSlug,
                })}
              </span>
              <span className="ml-auto flex flex-wrap gap-2">
                <Link
                  href={`/log?checkin=${ci.id}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-foreground px-4 text-[13px] font-semibold text-background hover:bg-foreground/90"
                >
                  {t.logWhatYouSee}
                </Link>
                <button
                  type="button"
                  onClick={() => resolveCheckIn(ci.id, "done")}
                  className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-foreground/60 px-4 text-[13px] font-semibold hover:border-primary hover:text-primary-deep"
                >
                  {t.allClear}
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {picks.length === 0 && (
        <p className="rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {c.nothingPlanned}
        </p>
      )}

      {picks.map((p) => {
        const food = foodBySlug.get(p.slug);
        if (!food) return null;
        const spec =
          food.prepSpecs.find((s) => s.band === p.suggestedBand) ?? food.prepSpecs[0];
        const serving = food.servingGuidance?.find((s) => s.band === spec.band);
        return (
          <section key={p.slug} className="space-y-4 rounded-2xl bg-card p-5 ring-1 ring-border">
            <div className="flex items-center gap-3">
              {food.emoji && (
                <span className="text-4xl" aria-hidden="true">
                  {food.emoji}
                </span>
              )}
              <div>
                <h2 className="font-heading text-2xl font-bold">{food.name}</h2>
                <span className="font-data text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {bandLabel(spec.band, locale)}
                </span>
              </div>
            </div>

            {isDiagramVariant(spec.cutDiagram) && (
              <div className="flex items-center justify-center rounded-xl bg-muted p-4">
                <CutDiagram
                  variant={spec.cutDiagram}
                  locale={locale}
                  className="mx-auto w-full max-w-[260px]"
                />
              </div>
            )}

            <p className="text-base font-medium leading-relaxed">{spec.form}</p>

            <div>
              <h3 className="text-sm font-semibold">{c.howToPrepare}</h3>
              <ol className="mt-1.5 list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed">
                {spec.prepSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <p className="rounded-xl bg-secondary/50 px-3.5 py-2.5 text-sm leading-relaxed">
              <span className="font-semibold">{c.textureCheck}</span> {spec.passFailTest}
            </p>

            {food.chokingRisk !== "low" && food.chokingNotes && (
              <p className="rounded-xl bg-accent px-3.5 py-2.5 text-sm leading-relaxed text-accent-foreground">
                ⚠️ {food.chokingNotes}
              </p>
            )}

            {serving && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{c.typicalAmount}</span>{" "}
                {serving.typicalAmount}
              </p>
            )}

            <Link
              href={`/foods/${p.slug}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:text-primary-deep"
            >
              {c.fullGuide}
            </Link>
          </section>
        );
      })}

      <p className="border-t pt-4 text-[13px] leading-relaxed text-muted-foreground">
        {c.caregiverNote}{" "}
        <button
          type="button"
          onClick={() => setCaregiverMode(false)}
          className="font-semibold underline underline-offset-2 hover:text-foreground"
        >
          {c.showFullApp}
        </button>
      </p>
    </div>
  );
}
