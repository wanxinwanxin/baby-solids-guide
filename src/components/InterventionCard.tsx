"use client";

import { useState } from "react";
import { correctedAgeMonths } from "@/lib/age";
import { useActiveBaby, useActiveCareLogs, useActiveSleepSessions, useHydrated } from "@/lib/hooks";
import { fmt, joinList } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { clockOrNull, deriveIntervention, planClockMin, type Observed } from "@/lib/plan/derive";
import { formatDuration } from "@/lib/sleep/model";
import { interventionSchema } from "@/lib/storage/schema";
import { useGuideStore } from "@/lib/storage/store";
import {
  INTERVENTION_GOALS,
  type FeedWindow,
  type Intervention,
  type InterventionGoal,
  type NapTarget,
} from "@/lib/storage/types";
import { localIsoDate } from "@/lib/food-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Intervention mode (2026-09-18, reworked the same day). Three states:
 * off → pick goals → on. The plan is derived from the baby's own logs and
 * the goals (lib/plan/derive), so the parent never authors a schedule the
 * app has already watched them live. What the plan contains is gated by
 * the goals; the summary reads "where he is now" against "this step"; the
 * editor is a fold for the one detail only the family knows (the stroller
 * walk). Per-baby and synced, so one switch reaches every member.
 */

const MAX_GOALS = 3;

const GOAL_KEY: Record<InterventionGoal, keyof typeof interventionMsgs> = {
  "consolidate-feeds": "goalConsolidate",
  "cap-day-sleep": "goalCapDay",
  "shift-bedtime": "goalBedtime",
  "night-wean": "goalNightWean",
  "self-settle": "goalSelfSettle",
};

function Chip({ active, disabled, onClick, children }: { active: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "min-h-9 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40",
        active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
      )}
    >
      {children}
    </button>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <label htmlFor={id} className="block text-[11px] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function GoalPicker({
  initial,
  name,
  onPrepare,
  onCancel,
}: {
  initial: InterventionGoal[];
  name: string;
  onPrepare: (goals: InterventionGoal[]) => void;
  onCancel: (() => void) | null;
}) {
  const t = useMsgs(interventionMsgs);
  const [goals, setGoals] = useState<InterventionGoal[]>(initial);
  return (
    <div className="space-y-3">
      <p className="font-medium">{t.goalsLabel}</p>
      <p className="text-xs text-muted-foreground">{fmt(t.goalsHint, { name })}</p>
      <div className="flex flex-wrap gap-2">
        {INTERVENTION_GOALS.map((g) => {
          const active = goals.includes(g);
          return (
            <Chip
              key={g}
              active={active}
              disabled={!active && goals.length >= MAX_GOALS}
              onClick={() => setGoals(active ? goals.filter((x) => x !== g) : [...goals, g])}
            >
              {t[GOAL_KEY[g]]}
            </Chip>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={goals.length === 0} onClick={() => onPrepare(goals)}>
          {t.prepareBtn}
        </Button>
        {onCancel && (
          <Button size="sm" variant="outline" onClick={onCancel}>
            {t.cancel2}
          </Button>
        )}
      </div>
    </div>
  );
}

/** The plan in sentences: where he is now, and what this step asks. */
function Summary({ plan, observed, usedDefaults, name }: { plan: Intervention; observed: Observed; usedDefaults: string[]; name: string }) {
  const t = useMsgs(interventionMsgs);
  const locale = useLocale();
  const g = plan.goals;
  const now: string[] = [];
  const step: string[] = [];

  if (g.includes("consolidate-feeds")) {
    if (observed.bottlesPerDay !== null && observed.dailyMl !== null) {
      now.push(fmt(t.nowBottles, { n: observed.bottlesPerDay, ml: Math.round(observed.dailyMl), med: Math.round(observed.medianBottleMl ?? 0) }));
    }
    if (plan.feedWindows.length > 0) {
      const w = plan.feedWindows;
      step.push(fmt(t.stepBottles, { n: w.length, times: w.map((x) => x.at).join(" · "), ml: w[0].ml, last: w[w.length - 1].ml }));
      if (w[0].onWake ?? true) step.push(fmt(t.stepFirstBottle, { time: w[0].at }));
    }
  }
  if (g.includes("cap-day-sleep") || g.includes("shift-bedtime")) {
    if (observed.napsPerDay !== null && observed.lastNapEndMin !== null) {
      now.push(fmt(t.nowNaps, { n: observed.napsPerDay, end: clockOrNull(observed.lastNapEndMin) ?? "—" }));
    }
    if (observed.bedtimeMin !== null) {
      now.push(fmt(t.nowBed, { time: clockOrNull(observed.bedtimeMin % (24 * 60)) ?? "—", wake: clockOrNull(observed.wakeMin) ?? "—" }));
    }
    const last = plan.naps[plan.naps.length - 1];
    if (plan.naps.length > 0 && last) {
      const total = plan.maxDaySleepMin ?? plan.naps.reduce((s, n) => s + n.capMin, 0);
      step.push(
        fmt(t.stepNaps, {
          caps: plan.naps.map((n) => n.capMin).join(" · "),
          hard: last.hardStopAt ?? "—",
          total: formatDuration(total, locale),
        }),
      );
      if (last.hardStopAt && observed.lastNapEndMin !== null) {
        const delta = observed.lastNapEndMin - planClockMin(last.hardStopAt);
        if (delta >= 15) step.push(fmt(t.stepNapsDelta, { dur: formatDuration(delta, locale) }));
      }
    }
    if (plan.bedtimeAt) step.push(fmt(t.stepBed, { time: plan.bedtimeAt }));
  }
  if (g.includes("night-wean")) {
    if (observed.nightFeedsPerNight !== null) {
      now.push(fmt(t.nowNight, { n: observed.nightFeedsPerNight, ml: Math.round(observed.nightFeedMl ?? 0) }));
    }
    if (plan.nightCutoffAt) step.push(fmt(t.stepNight, { cutoff: plan.nightCutoffAt, ml: plan.nightFeedMl ?? 0 }));
  }
  if (now.length === 0) now.push(t.nowNoData);

  const partLabel: Record<string, string> = { bottles: t.partBottles, naps: t.partNaps, night: t.partNight };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border bg-card p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{fmt(t.nowHeading, { name })}</p>
        <ul className="mt-1.5 space-y-1 text-sm">
          {now.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-primary/40 bg-primary/5 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">{t.stepBlockHeading}</p>
        <ul className="mt-1.5 space-y-1 text-sm">
          {step.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
      {usedDefaults.length > 0 && (
        <p className="text-xs text-muted-foreground sm:col-span-2">
          {fmt(t.defaultsNote, { parts: joinList(usedDefaults.map((p) => partLabel[p] ?? p), locale) })}
        </p>
      )}
    </div>
  );
}

/** Hand adjustments, folded away: only the family knows the stroller walk. */
function Editor({ plan, onSave }: { plan: Intervention; onSave: (p: Intervention) => boolean }) {
  const t = useMsgs(interventionMsgs);
  const [d, setD] = useState<Intervention>(plan);
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false);
  const edit = (patch: Partial<Intervention>) => {
    setSaved(false);
    setD({ ...d, ...patch });
  };
  const editWindow = (i: number, patch: Partial<FeedWindow>) =>
    edit({ feedWindows: d.feedWindows.map((w, j) => (j === i ? { ...w, ...patch } : w)) });
  const editNap = (i: number, patch: Partial<NapTarget>) => edit({ naps: d.naps.map((n, j) => (j === i ? { ...n, ...patch } : n)) });
  const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

  return (
    <div className="space-y-5 rounded-xl border p-3">
      <section className="space-y-2">
        <p className="font-medium">{t.bottlesTitle}</p>
        <p className="text-xs text-muted-foreground">{t.bottlesHint}</p>
        <ul className="space-y-2">
          {d.feedWindows.map((w, i) => (
            <li key={i} className="flex flex-wrap items-end gap-2">
              <Field id={`iv-fw-${i}-at`} label={i === 0 && (w.onWake ?? true) ? `${t.timeLabel} · ${t.onWakeLabel}` : t.timeLabel}>
                <Input id={`iv-fw-${i}-at`} type="time" value={w.at} onChange={(e) => editWindow(i, { at: e.target.value })} className="w-auto" />
              </Field>
              <Field id={`iv-fw-${i}-ml`} label={t.mlLabel}>
                <Input id={`iv-fw-${i}-ml`} type="number" inputMode="numeric" min={10} max={500} value={Number.isFinite(w.ml) ? w.ml : ""} onChange={(e) => editWindow(i, { ml: num(e.target.value) })} className="w-24" />
              </Field>
              <button type="button" onClick={() => edit({ feedWindows: d.feedWindows.filter((_, j) => j !== i) })} className="min-h-9 text-xs text-destructive underline-offset-2 hover:underline">
                {t.remove}
              </button>
            </li>
          ))}
        </ul>
        <Button size="sm" variant="outline" onClick={() => {
          const last = d.feedWindows[d.feedWindows.length - 1];
          edit({ feedWindows: [...d.feedWindows, { at: last?.at ?? "12:00", ml: last?.ml ?? 150 }] });
        }}>
          {t.addBottle}
        </Button>
        <Field id="iv-flex" label={t.flexLabel}>
          <Input id="iv-flex" type="number" inputMode="numeric" min={0} max={120} value={Number.isFinite(d.flexMin) ? d.flexMin : ""} onChange={(e) => edit({ flexMin: num(e.target.value) })} className="w-24" />
        </Field>
      </section>

      <section className="space-y-2">
        <p className="font-medium">{t.napsTitle}</p>
        <p className="text-xs text-muted-foreground">{t.napsHint}</p>
        <ul className="space-y-2">
          {d.naps.map((n, i) => (
            <li key={i} className="flex flex-wrap items-end gap-2">
              <Field id={`iv-nap-${i}-from`} label={t.fromLabel}>
                <Input id={`iv-nap-${i}-from`} type="time" value={n.from ?? n.startAt ?? ""} onChange={(e) => editNap(i, { from: e.target.value, startAt: undefined })} className="w-auto" />
              </Field>
              <Field id={`iv-nap-${i}-to`} label={t.toLabel}>
                <Input id={`iv-nap-${i}-to`} type="time" value={n.to ?? ""} onChange={(e) => editNap(i, { to: e.target.value })} className="w-auto" />
              </Field>
              <Field id={`iv-nap-${i}-cap`} label={t.capLabel}>
                <Input id={`iv-nap-${i}-cap`} type="number" inputMode="numeric" min={10} max={240} value={Number.isFinite(n.capMin) ? n.capMin : ""} onChange={(e) => editNap(i, { capMin: num(e.target.value) })} className="w-24" />
              </Field>
              <Field id={`iv-nap-${i}-hard`} label={t.hardStopLabel}>
                <Input id={`iv-nap-${i}-hard`} type="time" value={n.hardStopAt ?? ""} onChange={(e) => editNap(i, { hardStopAt: e.target.value || undefined })} className="w-auto" />
              </Field>
              <button type="button" onClick={() => edit({ naps: d.naps.filter((_, j) => j !== i) })} className="min-h-9 text-xs text-destructive underline-offset-2 hover:underline">
                {t.remove}
              </button>
            </li>
          ))}
        </ul>
        <Button size="sm" variant="outline" onClick={() => {
          const last = d.naps[d.naps.length - 1];
          edit({ naps: [...d.naps, { from: last?.to ?? "14:00", to: "19:00", capMin: 60 }] });
        }}>
          {t.addNap}
        </Button>
        <div className="flex flex-wrap items-end gap-2">
          <Field id="iv-budget" label={t.budgetLabel}>
            <Input id="iv-budget" type="number" inputMode="numeric" min={30} max={600} value={d.maxDaySleepMin ?? ""} onChange={(e) => edit({ maxDaySleepMin: e.target.value ? num(e.target.value) : undefined })} className="w-24" />
          </Field>
          <Field id="iv-daystart" label={t.dayStartLabel}>
            <Input id="iv-daystart" type="time" value={d.dayStartAt ?? ""} onChange={(e) => edit({ dayStartAt: e.target.value || undefined })} className="w-auto" />
          </Field>
          <Field id="iv-bed" label={t.bedtimeLabel}>
            <Input id="iv-bed" type="time" value={d.bedtimeAt ?? ""} onChange={(e) => edit({ bedtimeAt: e.target.value || undefined })} className="w-auto" />
          </Field>
        </div>
      </section>

      {d.goals.includes("night-wean") && (
        <section className="space-y-2">
          <p className="font-medium">{t.nightTitle}</p>
          <div className="flex flex-wrap items-end gap-2">
            <Field id="iv-cutoff" label={t.nightCutoffLabel}>
              <Input id="iv-cutoff" type="time" value={d.nightCutoffAt ?? ""} onChange={(e) => edit({ nightCutoffAt: e.target.value || undefined })} className="w-auto" />
            </Field>
            <Field id="iv-night-ml" label={t.nightFeedLabel}>
              <Input id="iv-night-ml" type="number" inputMode="numeric" min={10} max={500} value={d.nightFeedMl ?? ""} onChange={(e) => edit({ nightFeedMl: e.target.value ? num(e.target.value) : undefined })} className="w-24" />
            </Field>
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => {
          const ok = onSave(d);
          setInvalid(!ok);
          setSaved(ok);
        }}>
          {t.save}
        </Button>
        {invalid && <p className="text-sm text-destructive">{t.invalid}</p>}
        {saved && <p className="text-sm text-muted-foreground">{t.saved}</p>}
      </div>
    </div>
  );
}

export function InterventionCard() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const sessions = useActiveSleepSessions();
  const careLogs = useActiveCareLogs();
  const saveBaby = useGuideStore((s) => s.saveBaby);
  const t = useMsgs(interventionMsgs);
  const [picking, setPicking] = useState(false);
  const [adjusting, setAdjusting] = useState(false);

  if (!hydrated || !baby) return null;
  const stored = baby.intervention ?? null;
  const on = !!stored?.enabled;
  const now = new Date();
  const ageMonths = correctedAgeMonths(baby, now);

  const persist = (next: Intervention): boolean => {
    const parsed = interventionSchema.safeParse(next);
    if (!parsed.success) return false;
    saveBaby({ ...baby, intervention: parsed.data });
    return true;
  };

  const prepare = (goals: InterventionGoal[], step = 1) => {
    const { plan } = deriveIntervention({
      goals,
      ageMonths,
      sessions,
      careLogs,
      now,
      step,
      startedOn: step === 1 ? localIsoDate(now) : (stored?.startedOn ?? localIsoDate(now)),
    });
    persist(plan);
    setPicking(false);
    setAdjusting(false);
  };

  // The observed picture is independent of goals — re-read it live so the
  // "now" column moves as the family logs.
  const derived = on && stored ? deriveIntervention({ goals: stored.goals, ageMonths, sessions, careLogs, now, step: stored.step }) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {!on && !picking && (
          <>
            <p className="text-muted-foreground">{t.body}</p>
            <Button size="sm" onClick={() => setPicking(true)}>
              {fmt(t.toggleOn, { name: baby.nickname })}
            </Button>
          </>
        )}

        {picking && (
          <GoalPicker
            initial={stored?.goals ?? []}
            name={baby.nickname}
            onPrepare={(goals) => prepare(goals, 1)}
            onCancel={() => setPicking(false)}
          />
        )}

        {on && stored && derived && !picking && (
          <div className="space-y-4">
            <p className="font-medium text-primary">{fmt(t.onNote, { name: baby.nickname })}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {fmt(t.stepHeading, { n: stored.step })} · {stored.goals.map((g) => t[GOAL_KEY[g]]).join(" · ")}
            </p>
            <Summary plan={stored} observed={derived.observed} usedDefaults={derived.usedDefaults} name={baby.nickname} />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => prepare(stored.goals, stored.step + 1)}>
                {t.nextStepBtn}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPicking(true)}>
                {t.changeGoalsBtn}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAdjusting((v) => !v)}>
                {adjusting ? t.hideAdjust : t.adjustBtn}
              </Button>
              <Button size="sm" variant="outline" onClick={() => persist({ ...stored, enabled: false })}>
                {t.toggleOff}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t.nextStepHint}</p>
            {adjusting && <Editor key={stored.step + stored.goals.join()} plan={stored} onSave={persist} />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
