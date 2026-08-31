"use client";

import Link from "next/link";
import { fmt } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { planMsgs } from "@/lib/i18n/messages/plan";
import { todayMsgs } from "@/lib/i18n/messages/today";
import type { PlanProgress, PlanStep } from "@/lib/plan-progress";

type PlanCopy = ReturnType<typeof useMsgs<typeof planMsgs>>;

/** Short date, in the reader's language. Plan days are UTC day offsets. */
export function stepDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === "zh" ? "zh-CN" : undefined, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * When a step happens, in the words a parent uses. "In 4 days" is what tells
 * someone whether to buy it on this shop or the next one; the date follows
 * for anyone planning further out.
 */
export function stepWhen(step: PlanStep, t: PlanCopy, locale: Locale): string {
  if (step.projectedDate === undefined || step.daysAway === undefined) return t.stepOnHold;
  const date = stepDate(step.projectedDate, locale);
  if (step.status === "introduced") return `${t.stepIntroduced} · ${date}`;
  if (step.status === "offered") return `${t.stepOffered} · ${date}`;
  if (step.daysAway <= 0) return t.whenToday;
  const near = step.daysAway === 1 ? t.whenTomorrow : fmt(t.whenInDays, { n: step.daysAway });
  return `${near} · ${date}`;
}

/**
 * The same fact squeezed onto a plan chip, plus the long form for its
 * tooltip. When a food has moved off its written date the chip shows the
 * real one and the tooltip says where it came from — a date that silently
 * changed is how the board and Today drifted apart in the first place.
 */
export function stepChip(
  step: PlanStep,
  t: PlanCopy,
  locale: Locale,
): { text: string; title: string } {
  if (step.status === "blocked") {
    return { text: t.stepOnHold, title: `${t.stepOnHold} — ${step.blockedReason ?? ""}`.trim() };
  }
  const long = stepWhen(step, t, locale);
  const moved =
    step.projectedDay !== undefined && step.projectedDay !== step.scheduledDay
      ? ` (${fmt(t.originallyOn, { date: stepDate(step.scheduledDate, locale) })})`
      : "";
  const date = step.projectedDate ? stepDate(step.projectedDate, locale) : "";
  const text =
    step.status === "introduced"
      ? `✓ ${date}`
      : step.status === "offered"
        ? `↻ ${date}`
        : step.status === "now"
          ? t.stepNow
          : date;
  return { text, title: `${long}${moved}` };
}

function StepRow({ step, foodName, when }: { step: PlanStep; foodName: string; when: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 border-b border-border/60 py-2 last:border-b-0">
      <Link
        href={`/foods/${step.foodSlug}`}
        className="text-sm font-medium text-foreground/85 underline-offset-2 hover:underline"
      >
        {foodName}
      </Link>
      <span className="font-data shrink-0 text-[11.5px] uppercase tracking-[0.05em] text-muted-foreground">
        {when}
      </span>
    </li>
  );
}

/**
 * The plan read forward, on Today. Parents asked to see what is coming
 * without stepping through the day picker one tap at a time — the answer to
 * "what do I need to buy this weekend" should be on the page they already
 * open every morning.
 */
export function ComingUp({
  progress,
  babyName,
  foodName,
  locale,
  limit = 4,
}: {
  progress: PlanProgress | null;
  babyName: string;
  foodName: (slug: string) => string;
  locale: Locale;
  limit?: number;
}) {
  const t = useMsgs(todayMsgs);
  const p = useMsgs(planMsgs);

  if (!progress || progress.total === 0) {
    return (
      <section className="space-y-2.5 rounded-2xl border border-dashed border-primary/40 bg-secondary/20 p-5">
        <h2 className="font-sans text-lg font-bold">{t.noPlanTitle}</h2>
        <p className="max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
          {t.noPlanBody}
        </p>
        <Link
          href="/plan"
          className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-primary-deep"
        >
          {t.buildPlanLink}
        </Link>
      </section>
    );
  }

  const current = progress.now ?? progress.watching;
  const upcoming = progress.upcoming.slice(0, limit);

  return (
    <section className="flex flex-col gap-3.5 rounded-2xl bg-card p-5 ring-1 ring-border">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-sans text-lg font-bold">{t.comingUp}</h2>
        <span className="font-data text-[11px] uppercase tracking-[0.06em] text-foreground/70">
          {fmt(t.planProgressStat, {
            done: progress.introducedCount,
            total: progress.total,
          })}
        </span>
      </div>
      <p className="text-[13.5px] leading-relaxed text-muted-foreground">
        {fmt(t.comingUpLede, { name: babyName })}
      </p>

      {current ? (
        <div className="rounded-xl bg-secondary/50 px-4 py-3">
          <p className="font-data text-[10.5px] uppercase tracking-[0.09em] text-secondary-foreground/80">
            {t.comingUpNowLabel}
          </p>
          <Link
            href={`/foods/${current.foodSlug}`}
            className="font-heading text-lg font-bold underline-offset-2 hover:underline"
          >
            {foodName(current.foodSlug)}
          </Link>
        </div>
      ) : (
        <p className="rounded-xl bg-muted px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
          {t.comingUpNothingNew}
        </p>
      )}

      {upcoming.length > 0 ? (
        <ul className="flex flex-col">
          {upcoming.map((step) => (
            <StepRow
              key={step.entry.id}
              step={step}
              foodName={foodName(step.foodSlug)}
              when={stepWhen(step, p, locale)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-[13px] text-muted-foreground">{t.comingUpEmpty}</p>
      )}

      {progress.blocked.length > 0 && (
        <div className="space-y-1 rounded-xl bg-muted px-4 py-3">
          <p className="font-data text-[10.5px] uppercase tracking-[0.09em] text-muted-foreground">
            {t.comingUpOnHold}
          </p>
          {progress.blocked.map((step) => (
            <p key={step.entry.id} className="text-[13px] leading-relaxed text-foreground/75">
              <span className="font-semibold">{foodName(step.foodSlug)}</span> — {step.blockedReason}
            </p>
          ))}
          <Link
            href="/allergens"
            className="inline-flex min-h-11 items-center text-[13px] font-semibold text-primary hover:text-primary-deep"
          >
            {t.manageHolds}
          </Link>
        </div>
      )}

      <Link
        href="/plan"
        className="font-data self-start text-[11px] uppercase tracking-[0.06em] text-primary hover:text-primary-deep"
      >
        {t.wholePlanLink}
      </Link>
    </section>
  );
}
