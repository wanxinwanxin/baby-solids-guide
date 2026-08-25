"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allFoods } from "../../../content/foods";
import { allRecipes } from "../../../content/recipes";
import { correctedAgeMonths } from "@/lib/age";
import { rankCombos } from "@/lib/combos";
import { deriveFoodStats } from "@/lib/engine";
import { ALLERGEN_LABELS, BAND_LABELS } from "@/lib/food-utils";
import {
  useActiveBaby,
  useActiveCheckIns,
  useActiveLogs,
  useActiveOverrides,
  useActivePlan,
  useHydrated,
} from "@/lib/hooks";
import { recommend } from "@/lib/engine";
import { shouldNudgeBackup, snoozeUntil } from "@/lib/backup-nudge";
import { pendingCheckIns } from "@/lib/checkins";
import { foodBySlug } from "../../../content/foods";
import { CutDiagram, isDiagramVariant } from "@/components/diagrams/CutDiagram";
import { PushOptIn } from "@/components/PushOptIn";
import { useAuthEnabled, useSyncStatus } from "@/components/SyncProvider";
import { useSession } from "@/lib/auth-client";
import { useGuideStore } from "@/lib/storage/store";
import { TEXTURE_STAGES } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** The 5 readiness signs shown in onboarding (OnboardingWizard.tsx) — we
 * don't store per-sign answers, so the gated state renders them as an
 * unchecked watch list, never as fabricated progress. */
const READINESS_SIGNS = [
  "Sits upright with little or no support",
  "Steady head control",
  "Brings hands and toys to the mouth",
  "Watches your food with real interest",
  "The tongue-thrust reflex has faded (food isn't automatically pushed back out)",
];

/** Warning kinds that carry safety semantics — the only place terracotta is allowed. */
const SAFETY_WARNING_KINDS = new Set(["symptom-hold", "hard-block"]);

function ProgressRing({ pct }: { pct: number }) {
  const c = 2 * Math.PI * 22;
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      role="img"
      aria-label={`${pct}% of foods tried`}
      className="hidden shrink-0 sm:block"
    >
      <circle cx="26" cy="26" r="22" fill="none" strokeWidth="6" className="stroke-border" />
      <circle
        cx="26"
        cy="26"
        r="22"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform="rotate(-90 26 26)"
        className="stroke-primary"
      />
      <text x="26" y="30" textAnchor="middle" fontSize="11" className="fill-foreground font-data">
        {pct}%
      </text>
    </svg>
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 78 64" className={className} aria-hidden="true">
      <circle cx="26" cy="32" r="23" strokeWidth="3" className="fill-secondary stroke-primary" />
      <line x1="26" y1="10" x2="26" y2="54" strokeWidth="2.5" strokeDasharray="6 5" className="stroke-primary" />
      <circle cx="26" cy="32" r="3.5" className="fill-honey" />
      <path d="M 50 32 L 50 10 A 22 22 0 0 1 72 32 Z" className="fill-primary" />
    </svg>
  );
}

export default function TodayPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const plan = useActivePlan();
  const checkIns = useActiveCheckIns();
  const saveBaby = useGuideStore((s) => s.saveBaby);
  const setTextureStage = useGuideStore((s) => s.setTextureStage);
  const resolveCheckIn = useGuideStore((s) => s.resolveCheckIn);
  const snoozeBackupNudge = useGuideStore((s) => s.snoozeBackupNudge);
  const lastExportAt = useGuideStore((s) => s.lastExportAt);
  const backupNudgeSnoozedUntil = useGuideStore((s) => s.backupNudgeSnoozedUntil);

  const authEnabled = useAuthEnabled();
  const { data: session } = useSession();
  const syncState = useSyncStatus((s) => s.state);
  const now = useMemo(() => new Date(), []);
  /** Day preview: 0 = today, up to 12 weeks out. The engine is pure — feeding
   * it a future date shows that day's picks, plan week, and allergen queue
   * (assuming today's logs, since the future ones don't exist yet). */
  const MAX_PREVIEW_DAYS = 84;
  const [offsetDays, setOffsetDays] = useState(0);
  const previewing = offsetDays > 0;
  const viewDate = useMemo(
    () => new Date(now.getTime() + offsetDays * 86400000),
    [now, offsetDays],
  );
  const rec = useMemo(() => {
    if (!baby) return null;
    return recommend({ baby, logs, overrides, foods: allFoods, today: viewDate, plan });
  }, [baby, logs, overrides, plan, viewDate]);
  const { due: dueCheckIns, upcoming: upcomingCheckIns } = useMemo(
    () => pendingCheckIns(checkIns, now),
    [checkIns, now],
  );
  /** Distinct foods actually eaten (amountEaten !== "none") — the honest progress stat. */
  const triedSlugs = useMemo(() => {
    const s = new Set<string>();
    for (const l of logs) if (l.amountEaten !== "none") s.add(l.foodSlug);
    return s;
  }, [logs]);
  /** Attempts per food (all logs) — powers the "n tries" retry chips. */
  const attemptCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const l of logs) m.set(l.foodSlug, (m.get(l.foodSlug) ?? 0) + 1);
    return m;
  }, [logs]);
  /** Established safe: eaten at least once, never with allergen-pausing
   * symptoms — the baby's growing pantry. */
  const safeFoods = useMemo(() => {
    const stats = deriveFoodStats(logs);
    return [...triedSlugs]
      .filter((slug) => !stats.get(slug)?.hasPausingSymptoms)
      .map((slug) => foodBySlug.get(slug))
      .filter((f): f is NonNullable<typeof f> => !!f)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [logs, triedSlugs]);
  /** D3 — top meal combos from the pantry + today's picks. The blocked set
   * mirrors the engine's exclusions so a combo never smuggles in a food the
   * engine would refuse. */
  const combos = useMemo(() => {
    if (!baby || !rec || rec.gate !== "ready") return [];
    const stats = deriveFoodStats(logs);
    const pausedAllergens = new Set(
      rec.allergenStates
        .filter((s) => s.status === "reacted-paused" || s.status === "avoid-per-doctor")
        .map((s) => s.allergenId),
    );
    const blockedSlugs = new Set<string>(baby.doctorAvoidList);
    for (const f of allFoods) {
      if (f.commonAllergen && baby.knownAllergies.includes(f.commonAllergen)) blockedSlugs.add(f.slug);
      if (f.commonAllergen && pausedAllergens.has(f.commonAllergen)) blockedSlugs.add(f.slug);
      if (stats.get(f.slug)?.hasPausingSymptoms) blockedSlugs.add(f.slug);
    }
    return rankCombos({
      recipes: allRecipes,
      foods: foodBySlug,
      safeSlugs: new Set(safeFoods.map((f) => f.slug)),
      todaysPickSlugs: rec.todaysPicks.map((p) => p.slug),
      ageMonths: correctedAgeMonths(baby, viewDate),
      blockedSlugs,
    }).slice(0, 2);
  }, [baby, rec, logs, safeFoods, viewDate]);

  const showAccountCard = authEnabled && !session && logs.length >= 5;
  const showBackupNudge =
    !showAccountCard &&
    !session &&
    shouldNudgeBackup({
      logCount: logs.length,
      lastExportAt,
      snoozedUntil: backupNudgeSnoozedUntil,
      today: now,
    });

  if (!hydrated) return null;

  // ——— State C: no profile yet ———
  if (!baby || !rec) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 pt-12 text-center">
        <BrandMark className="w-14" />
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Let&apos;s meet your baby<span className="text-primary">.</span>
        </h1>
        <p className="max-w-md text-base leading-relaxed text-foreground/70">
          Two minutes of setup and we&apos;ll build a day-by-day plan — whether you&apos;re
          starting from scratch or already mid-journey.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/onboarding"
            className={cn(buttonVariants(), "min-h-12 px-7 text-base font-semibold")}
          >
            We&apos;re starting fresh
          </Link>
          <Link
            href="/onboarding/import"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "min-h-12 border-foreground/50 px-7 text-base font-semibold text-foreground",
            )}
          >
            We&apos;ve already started
          </Link>
        </div>
        <p className="text-[13px] text-muted-foreground">
          Prefer to look around first?{" "}
          <Link
            href="/foods"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Browse all {allFoods.length} foods
          </Link>{" "}
          without a profile.
        </p>
      </div>
    );
  }

  const age = correctedAgeMonths(baby, new Date());

  // ——— State B: gated (not quite solids time) ———
  if (rec.gate === "not-ready") {
    const canSelfSelect = age >= 4 && !baby.readiness.earlyStartApproved;
    return (
      <div className="mx-auto max-w-lg space-y-5">
        <div className="space-y-2">
          <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {baby.nickname} · {age.toFixed(1)} mo corrected
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Almost there<span className="text-primary">.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-foreground/70">
            Not quite solids time yet — and that&apos;s exactly what today is for. Here&apos;s
            what to watch for; we&apos;ll flip to food picks the moment the signs line up.
          </p>
        </div>

        <div className="rounded-2xl bg-muted px-4 py-3.5">
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {rec.gateReasons.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold tracking-tight">Readiness watch list</h2>
            <span className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              5 signs
            </span>
          </div>
          {READINESS_SIGNS.map((sign) => (
            <div
              key={sign}
              className="flex items-center gap-3 rounded-xl border border-dashed border-border px-3.5 py-3"
            >
              <span
                className="size-[22px] shrink-0 rounded-full border-2 border-border"
                aria-hidden="true"
              />
              <span className="text-sm text-foreground/80">{sign}</span>
            </div>
          ))}
          <p className="text-[13px] text-muted-foreground">
            Not all there yet? Totally normal — most babies show all five around 6 months.
          </p>
        </div>

        {canSelfSelect && (
          <div className="space-y-3 rounded-2xl bg-secondary p-5 ring-[1.5px] ring-primary/60">
            <h2 className="text-xl font-bold tracking-tight text-secondary-foreground">
              Starting on your pediatrician&apos;s advice?
            </h2>
            <p className="text-sm leading-relaxed text-secondary-foreground/90">
              Plenty of families start solids between 4 and 6 months on their pediatrician&apos;s
              specific guidance — sometimes before every readiness sign has appeared. If that&apos;s
              you, start the program today: we&apos;ll keep suggestions to smooth, mashable first
              foods, and your pediatrician&apos;s advice always comes first.
            </p>
            <Button
              className="min-h-12 w-full text-[15px] font-bold"
              onClick={() =>
                saveBaby({
                  ...baby,
                  readiness: { ...baby.readiness, earlyStartApproved: true },
                })
              }
            >
              Our pediatrician advised us to start — begin today
            </Button>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Meanwhile, browse the{" "}
          <Link
            href="/foods"
            className="font-semibold text-primary underline underline-offset-2"
          >
            food library
          </Link>{" "}
          or update the{" "}
          <Link
            href="/onboarding?edit=1"
            className="font-semibold text-primary underline underline-offset-2"
          >
            readiness checklist
          </Link>
          .
        </p>
      </div>
    );
  }

  // ——— State A: ready ———
  const currentStage = TEXTURE_STAGES.find((s) => s.id === rec.textureStage.current);
  const nextStage =
    TEXTURE_STAGES[TEXTURE_STAGES.findIndex((s) => s.id === rec.textureStage.current) + 1];
  const allergensUnderway = rec.allergenStates.filter((s) => s.status !== "not-started").length;
  const foodsPct = Math.round((triedSlugs.size / allFoods.length) * 100);
  const viewAge = correctedAgeMonths(baby, viewDate);
  const dateLabel = viewDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const dayWord =
    offsetDays === 0
      ? "Today"
      : offsetDays === 1
        ? "Tomorrow"
        : viewDate.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {dateLabel} · {viewAge.toFixed(1)} mo{baby.dueDate ? " corrected" : ""} · stage{" "}
              {rec.textureStage.current}
            </p>
            <span className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Previous day"
                disabled={offsetDays === 0}
                onClick={() => setOffsetDays((d) => Math.max(0, d - 1))}
                className="flex size-7 items-center justify-center rounded-full border text-sm text-foreground/70 hover:border-primary/60 disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next day"
                disabled={offsetDays >= MAX_PREVIEW_DAYS}
                onClick={() => setOffsetDays((d) => Math.min(MAX_PREVIEW_DAYS, d + 1))}
                className="flex size-7 items-center justify-center rounded-full border text-sm text-foreground/70 hover:border-primary/60 disabled:opacity-30"
              >
                ›
              </button>
              {previewing && (
                <button
                  type="button"
                  onClick={() => setOffsetDays(0)}
                  className="font-data ml-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10.5px] uppercase tracking-[0.06em] text-secondary-foreground hover:bg-secondary/70"
                >
                  ← back to today
                </button>
              )}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {dayWord} for {baby.nickname}
          </h1>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            {session && (
              <span className="font-data rounded-full bg-secondary px-3 py-1 text-[10.5px] uppercase tracking-[0.08em] text-secondary-foreground">
                {syncState === "syncing"
                  ? "syncing…"
                  : syncState === "error"
                    ? "sync retrying"
                    : "synced ✓"}
              </span>
            )}
            <span className="font-data text-[11px] uppercase tracking-[0.04em] text-foreground/70">
              {triedSlugs.size} / {allFoods.length} foods · {allergensUnderway} / 9 allergens
            </span>
            <span className="relative block h-2 w-40 overflow-hidden rounded-full bg-border">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${foodsPct}%` }}
              />
            </span>
          </div>
          <ProgressRing pct={foodsPct} />
        </div>
      </div>

      {previewing && (
        <Alert className="border-primary/40 bg-secondary/40">
          <AlertTitle>Previewing {dayWord.toLowerCase() === "tomorrow" ? "tomorrow" : dayWord}</AlertTitle>
          <AlertDescription>
            Suggestions assume the history you have today — each food you actually log sharpens
            the days after it. Changes on the{" "}
            <Link href="/plan" className="font-semibold text-primary underline underline-offset-2">
              plan board
            </Link>{" "}
            show up here instantly.
          </AlertDescription>
        </Alert>
      )}

      {!previewing && showAccountCard && (
        <Alert className="border-primary/50 bg-secondary/50">
          <AlertTitle>Save {baby.nickname}&apos;s data</AlertTitle>
          <AlertDescription>
            {logs.length} logs live only on this device. Sign in once and everything follows you
            to any phone or laptop — free, no tracking.{" "}
            <Link href="/account" className="font-semibold text-primary underline underline-offset-2">
              Sign in with Google or email →
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {!previewing && showBackupNudge && (
        <Alert className="border-honey/50 bg-accent">
          <AlertTitle className="text-accent-foreground">
            Back up {baby.nickname}&apos;s history
          </AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-3 text-accent-foreground/90">
            <span>
              {logs.length} logs live only on this device. A one-tap export keeps them safe if the
              browser clears its storage.
            </span>
            <Link
              href="/history"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-2"
            >
              Export now →
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 items-center text-xs underline underline-offset-2"
              onClick={() => snoozeBackupNudge(snoozeUntil(new Date()))}
            >
              remind me next week
            </button>
          </AlertDescription>
        </Alert>
      )}

      {!previewing && (dueCheckIns.length > 0 || upcomingCheckIns.length > 0) && (
        <Card className={cn(dueCheckIns.length > 0 && "bg-accent/40 ring-honey/50")}>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 font-sans text-base font-bold">
              {dueCheckIns.length > 0 && (
                <span className="size-2.5 rounded-full bg-honey" aria-hidden="true" />
              )}
              Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {dueCheckIns.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-honey/50 bg-card p-3"
              >
                <span className="font-semibold">
                  Check for a reaction to {foodBySlug.get(c.foodSlug)?.name ?? c.foodSlug}
                </span>
                <span className="font-data text-xs text-muted-foreground">
                  due{" "}
                  {new Date(c.dueAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                <span className="ml-auto flex flex-wrap gap-2">
                  <Link
                    href={`/log?checkin=${c.id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-foreground px-4 text-[13px] font-semibold text-background hover:bg-foreground/90"
                  >
                    Log what you see
                  </Link>
                  <button
                    type="button"
                    onClick={() => resolveCheckIn(c.id, "done")}
                    className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-foreground/60 px-4 text-[13px] font-semibold hover:border-primary hover:text-primary-deep"
                  >
                    All clear ✓
                  </button>
                </span>
              </div>
            ))}
            <PushOptIn />
            {upcomingCheckIns.slice(0, 3).map((c) => (
              <p key={c.id} className="text-xs text-muted-foreground">
                Upcoming: {foodBySlug.get(c.foodSlug)?.name ?? c.foodSlug} check at{" "}
                {new Date(c.dueAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
                <button
                  type="button"
                  onClick={() => resolveCheckIn(c.id, "dismissed")}
                  className="ml-2 inline-flex min-h-11 items-center underline underline-offset-2"
                >
                  dismiss
                </button>
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      {rec.warnings.length > 0 && (
        <div className="space-y-2">
          {rec.warnings.map((w) => {
            const safety = SAFETY_WARNING_KINDS.has(w.kind);
            return (
              <Alert
                key={`${w.kind}-${w.allergenId ?? w.foodSlug}`}
                className={cn(
                  safety
                    ? "border-destructive/50 bg-destructive-tint/60"
                    : "border-honey/50 bg-accent",
                )}
              >
                <AlertDescription
                  className={cn(safety ? "text-foreground/85" : "text-accent-foreground/90")}
                >
                  {w.message}{" "}
                  {w.allergenId && (
                    <Link
                      href={`/allergens/${w.allergenId}`}
                      className="font-semibold underline underline-offset-2"
                    >
                      Playbook →
                    </Link>
                  )}
                </AlertDescription>
              </Alert>
            );
          })}
        </div>
      )}

      <section className="space-y-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Today&apos;s picks</h2>
          <span className="font-data text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Iron · allergen pace · variety · texture
          </span>
        </div>
        {attemptCounts.size < 3 && (
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Starting gently: one new food at a time, kept going for 2–3 days while you watch —
            more picks unlock as foods are introduced.
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rec.todaysPicks.map((p) => {
            const food = foodBySlug.get(p.slug);
            const diagram = food?.prepSpecs[0]?.cutDiagram;
            const allergenId = food?.commonAllergen ?? null;
            const isAllergenPick = allergenId !== null;
            return (
              <div
                key={p.slug}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl bg-card p-5 ring-1",
                  isAllergenPick ? "shadow-md shadow-primary/10 ring-primary/70" : "ring-border",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/foods/${p.slug}`}
                    className="font-heading text-xl font-bold underline-offset-2 hover:underline"
                  >
                    {p.name}
                  </Link>
                  {allergenId ? (
                    <span className="font-data shrink-0 rounded-full bg-accent px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-accent-foreground">
                      Allergen: {ALLERGEN_LABELS[allergenId]}
                    </span>
                  ) : triedSlugs.has(p.slug) ? (
                    <span className="font-data shrink-0 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      Familiar
                    </span>
                  ) : food?.firstFoodPick ? (
                    <span className="font-data shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-secondary-foreground">
                      Great first food
                    </span>
                  ) : (
                    <span className="font-data shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-secondary-foreground">
                      New food
                    </span>
                  )}
                </div>
                {isDiagramVariant(diagram) && (
                  <div className="flex h-28 items-center justify-center rounded-xl bg-muted">
                    <CutDiagram
                      variant={diagram}
                      showCaption={false}
                      className="mx-auto w-full max-w-[170px]"
                    />
                  </div>
                )}
                <p className="flex-1 text-[13.5px] leading-relaxed text-foreground/70">
                  {p.reason}
                </p>
                <span className="font-data self-start rounded-full bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-secondary-foreground">
                  {BAND_LABELS[p.suggestedBand]}
                  {food?.ironRich ? " · iron-rich" : ""}
                </span>
                <div className="flex items-center justify-between gap-2 border-t border-border pt-1.5">
                  <Link
                    href={`/foods/${p.slug}`}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:text-primary-deep"
                  >
                    How to serve →
                  </Link>
                  <Link
                    href={`/log?food=${p.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/70"
                  >
                    Log it
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3.5 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold">Allergen plan</h3>
            <span className="font-data text-[11px] uppercase tracking-[0.06em] text-foreground/70">
              {allergensUnderway} of 9 underway
            </span>
          </div>
          <div className="flex gap-1.5" aria-label={`${allergensUnderway} of 9 allergens underway`}>
            {rec.allergenStates.map((s) => (
              <span
                key={s.allergenId}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  s.status !== "not-started" ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
          {rec.allergenRail.next ? (
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold">
                Next up: {ALLERGEN_LABELS[rec.allergenRail.next.allergenId]}
                {rec.allergenRail.next.gated && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-honey/60 bg-accent text-accent-foreground"
                  >
                    on hold
                  </Badge>
                )}
              </p>
              <p className="leading-relaxed text-muted-foreground">
                {rec.allergenRail.next.gated
                  ? rec.allergenRail.next.gateReason
                  : rec.allergenRail.next.guidance}
              </p>
              {!rec.allergenRail.next.gated &&
                rec.allergenRail.next.foodSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/foods/${slug}`}
                    className="mr-4 inline-flex min-h-11 items-center font-semibold text-primary hover:text-primary-deep"
                  >
                    How to serve →
                  </Link>
                ))}
              {rec.allergenRail.next.gated && (
                <Link
                  href="/allergens"
                  className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2"
                >
                  Manage in the allergen tracker →
                </Link>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              All nine common allergens are underway or done — keep them in rotation.
            </p>
          )}
          {rec.allergenRail.maintenance.map((m) => (
            <p
              key={m.allergenId}
              className={cn(
                "rounded-xl bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-muted-foreground",
                m.urgent && "bg-accent text-accent-foreground",
              )}
            >
              {m.message}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-3.5 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold">Texture stage</h3>
            <span className="font-data text-[11px] uppercase tracking-[0.06em] text-foreground/70">
              {currentStage?.typicalAge}
            </span>
          </div>
          <p className="text-sm text-foreground/80">
            <span className="font-data font-medium">{rec.textureStage.current}</span> ·{" "}
            {currentStage?.label}
          </p>
          {rec.textureStage.nudge ? (
            <div className="space-y-3 rounded-xl border border-primary/50 bg-secondary/40 p-3.5 text-sm leading-relaxed">
              <p>{rec.textureStage.nudge}</p>
              {nextStage && (
                <Button
                  variant="outline"
                  className="min-h-11 border-primary px-5 font-bold text-primary-deep hover:bg-secondary"
                  onClick={() => setTextureStage(nextStage.id)}
                >
                  Move to {nextStage.id} →
                </Button>
              )}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep practicing at this stage — the app will suggest moving up when the logs show
              consistent, confident eating.
            </p>
          )}
        </div>
      </section>

      {combos.length === 0 && (
        <p className="text-[13px] text-muted-foreground">
          Meal ideas appear here once a few foods are logged safe — in the meantime, browse all{" "}
          <Link href="/recipes" className="font-semibold text-primary underline underline-offset-2">
            {allRecipes.length} blender-simple recipes
          </Link>
          .
        </p>
      )}

      {combos.length > 0 && (
        <section className="flex flex-col gap-3.5 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-sans text-lg font-bold">Make it a meal</h2>
            <Link
              href="/recipes"
              className="font-data text-[11px] uppercase tracking-[0.06em] text-primary hover:text-primary-deep"
            >
              All recipes →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {combos.map(({ recipe, usesPicks }) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="flex flex-col gap-2 rounded-xl border p-3.5 transition-colors hover:border-primary"
              >
                <span className="font-heading text-base leading-tight font-bold">{recipe.name}</span>
                <span className="flex flex-wrap gap-1.5">
                  {recipe.foods.map((slug) => (
                    <Badge
                      key={slug}
                      variant={usesPicks.includes(slug) ? "secondary" : "outline"}
                    >
                      {foodBySlug.get(slug)?.name ?? slug}
                      {usesPicks.includes(slug) && " · today"}
                    </Badge>
                  ))}
                </span>
                <span className="line-clamp-2 text-[13px] leading-snug text-muted-foreground">
                  {recipe.whyItWorks}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-[12.5px] text-muted-foreground">
            Only foods {baby.nickname} has already handled safely (plus today&apos;s picks) make
            this list.
          </p>
        </section>
      )}

      {safeFoods.length > 0 && (
        <section className="flex flex-col gap-3.5 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-sans text-lg font-bold">Safe so far</h2>
            <span className="font-data text-[11px] uppercase tracking-[0.06em] text-foreground/70">
              {safeFoods.length} {safeFoods.length === 1 ? "food" : "foods"}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Eaten at least once with no reaction logged — {baby.nickname}&apos;s growing pantry.
            Keep favorites in rotation while the new ones arrive.
          </p>
          <div className="flex flex-wrap gap-2">
            {safeFoods.slice(0, 24).map((f) => (
              <Link
                key={f.slug}
                href={`/foods/${f.slug}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-primary/30 bg-secondary/40 px-3.5 text-sm font-medium text-foreground/85 hover:border-primary"
              >
                <span aria-hidden="true">{f.emoji}</span>
                {f.name}
              </Link>
            ))}
            {safeFoods.length > 24 && (
              <Link
                href="/foods"
                className="inline-flex min-h-9 items-center rounded-full border px-3.5 text-sm font-semibold text-primary hover:border-primary/60"
              >
                +{safeFoods.length - 24} more →
              </Link>
            )}
          </div>
        </section>
      )}

      {rec.retryQueue.length > 0 && (
        <section className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="font-data text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground">
            Worth another try →
          </h2>
          {rec.retryQueue.map((r) => {
            const n = attemptCounts.get(r.slug) ?? 0;
            return (
              <Link
                key={r.slug}
                href={`/foods/${r.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground/80 hover:border-primary hover:text-primary-deep"
              >
                {r.name} · <span className="font-data ml-1">{n}</span>&nbsp;
                {n === 1 ? "try" : "tries"}
              </Link>
            );
          })}
          <span className="text-[13px] text-muted-foreground">
            Refusals are normal — it can take 8–15 relaxed offers before a food clicks.
          </span>
        </section>
      )}

      <div className="flex justify-center pt-2">
        <Link
          href="/log"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-14 px-9 text-base font-bold shadow-lg shadow-primary/30",
          )}
        >
          + Quick log
        </Link>
      </div>
    </div>
  );
}
