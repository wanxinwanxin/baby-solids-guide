"use client";

import { useState } from "react";
import { correctedAgeMonths } from "@/lib/age";
import { useActiveBaby, useHydrated } from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { interventionMsgs } from "@/lib/i18n/messages/intervention";
import { defaultIntervention } from "@/lib/plan/engine";
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
 * The intervention-mode switch and plan editor (2026-09-18). Lives on /more,
 * under the extras, on purpose: one family is trialing it, and the switch
 * should be findable without being prominent. Unlike the caregiver and
 * full-day switches this is per-baby and synced — turning it on here turns
 * it on for every member, because the whole point is that four caregivers
 * read one plan.
 */

const GOAL_KEY: Record<InterventionGoal, keyof typeof interventionMsgs> = {
  "consolidate-feeds": "goalConsolidate",
  "cap-day-sleep": "goalCapDay",
  "shift-bedtime": "goalBedtime",
  "night-wean": "goalNightWean",
  "self-settle": "goalSelfSettle",
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-9 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
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

export function InterventionCard() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const saveBaby = useGuideStore((s) => s.saveBaby);
  const t = useMsgs(interventionMsgs);

  const stored = baby?.intervention ?? null;
  const [draft, setDraft] = useState<Intervention | null>(stored);
  const [seen, setSeen] = useState<Intervention | null>(stored);
  const [savedNote, setSavedNote] = useState(false);
  const [invalid, setInvalid] = useState(false);
  // A plan that arrives from another device (or our own save) replaces the
  // local draft — derived-state reset during render, per the React docs.
  if (stored !== seen) {
    setSeen(stored);
    setDraft(stored);
  }

  if (!hydrated || !baby) return null;
  const ageMonths = correctedAgeMonths(baby, new Date());
  const ageLabel = (Math.round(ageMonths * 10) / 10).toFixed(1).replace(/\.0$/, "");

  const persist = (next: Intervention) => {
    const parsed = interventionSchema.safeParse(next);
    if (!parsed.success) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    saveBaby({ ...baby, intervention: parsed.data });
    setSavedNote(true);
  };

  const turnOn = () => {
    const next = stored ? { ...stored, enabled: true } : defaultIntervention(ageMonths, localIsoDate(new Date()));
    setDraft(next);
    persist(next);
  };
  const turnOff = () => {
    if (!stored) return;
    persist({ ...stored, enabled: false });
  };

  const on = !!stored?.enabled;
  const d = draft ?? stored;

  const edit = (patch: Partial<Intervention>) => {
    if (!d) return;
    setSavedNote(false);
    setDraft({ ...d, ...patch });
  };
  const editWindow = (i: number, patch: Partial<FeedWindow>) =>
    d && edit({ feedWindows: d.feedWindows.map((w, j) => (j === i ? { ...w, ...patch } : w)) });
  const editNap = (i: number, patch: Partial<NapTarget>) =>
    d && edit({ naps: d.naps.map((n, j) => (j === i ? { ...n, ...patch } : n)) });
  const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">{t.body}</p>
        {on && <p className="font-medium text-primary">{fmt(t.onNote, { name: baby.nickname })}</p>}
        <Button variant={on ? "outline" : "default"} size="sm" aria-pressed={on} onClick={on ? turnOff : turnOn}>
          {on ? t.toggleOff : fmt(t.toggleOn, { name: baby.nickname })}
        </Button>

        {on && d && (
          <div className="space-y-5 border-t pt-4">
            <section className="space-y-2">
              <p className="font-medium">{t.goalsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {INTERVENTION_GOALS.map((g) => {
                  const active = d.goals.includes(g);
                  return (
                    <Chip
                      key={g}
                      active={active}
                      onClick={() =>
                        edit({ goals: active ? d.goals.filter((x) => x !== g) : [...d.goals, g] })
                      }
                    >
                      {t[GOAL_KEY[g]]}
                    </Chip>
                  );
                })}
              </div>
            </section>

            <section className="space-y-2">
              <p className="font-medium">{t.bottlesTitle}</p>
              <p className="text-xs text-muted-foreground">{t.bottlesHint}</p>
              <ul className="space-y-2">
                {d.feedWindows.map((w, i) => (
                  <li key={i} className="flex flex-wrap items-end gap-2">
                    <Field id={`iv-fw-${i}-at`} label={t.timeLabel}>
                      <Input
                        id={`iv-fw-${i}-at`}
                        type="time"
                        value={w.at}
                        onChange={(e) => editWindow(i, { at: e.target.value })}
                        className="w-auto"
                      />
                    </Field>
                    <Field id={`iv-fw-${i}-ml`} label={t.mlLabel}>
                      <Input
                        id={`iv-fw-${i}-ml`}
                        type="number"
                        inputMode="numeric"
                        min={10}
                        max={500}
                        value={Number.isFinite(w.ml) ? w.ml : ""}
                        onChange={(e) => editWindow(i, { ml: num(e.target.value) })}
                        className="w-24"
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => edit({ feedWindows: d.feedWindows.filter((_, j) => j !== i) })}
                      className="min-h-9 text-xs text-destructive underline-offset-2 hover:underline"
                    >
                      {t.remove}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const last = d.feedWindows[d.feedWindows.length - 1];
                  edit({ feedWindows: [...d.feedWindows, { at: last?.at ?? "12:00", ml: last?.ml ?? 150 }] });
                }}
              >
                {t.addBottle}
              </Button>
              <Field id="iv-flex" label={t.flexLabel}>
                <Input
                  id="iv-flex"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={120}
                  value={Number.isFinite(d.flexMin) ? d.flexMin : ""}
                  onChange={(e) => edit({ flexMin: num(e.target.value) })}
                  className="w-24"
                />
              </Field>
            </section>

            <section className="space-y-2">
              <p className="font-medium">{t.napsTitle}</p>
              <p className="text-xs text-muted-foreground">{t.napsHint}</p>
              <ul className="space-y-2">
                {d.naps.map((n, i) => (
                  <li key={i} className="flex flex-wrap items-end gap-2">
                    <Field id={`iv-nap-${i}-start`} label={t.startLabel}>
                      <Input
                        id={`iv-nap-${i}-start`}
                        type="time"
                        value={n.startAt}
                        onChange={(e) => editNap(i, { startAt: e.target.value })}
                        className="w-auto"
                      />
                    </Field>
                    <Field id={`iv-nap-${i}-cap`} label={t.capLabel}>
                      <Input
                        id={`iv-nap-${i}-cap`}
                        type="number"
                        inputMode="numeric"
                        min={10}
                        max={240}
                        value={Number.isFinite(n.capMin) ? n.capMin : ""}
                        onChange={(e) => editNap(i, { capMin: num(e.target.value) })}
                        className="w-24"
                      />
                    </Field>
                    <Field id={`iv-nap-${i}-hard`} label={t.hardStopLabel}>
                      <Input
                        id={`iv-nap-${i}-hard`}
                        type="time"
                        value={n.hardStopAt ?? ""}
                        onChange={(e) => editNap(i, { hardStopAt: e.target.value || undefined })}
                        className="w-auto"
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => edit({ naps: d.naps.filter((_, j) => j !== i) })}
                      className="min-h-9 text-xs text-destructive underline-offset-2 hover:underline"
                    >
                      {t.remove}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                variant="outline"
                onClick={() => edit({ naps: [...d.naps, { startAt: "15:00", capMin: 60 }] })}
              >
                {t.addNap}
              </Button>
              <Field id="iv-bed" label={t.bedtimeLabel}>
                <Input
                  id="iv-bed"
                  type="time"
                  value={d.bedtimeAt ?? ""}
                  onChange={(e) => edit({ bedtimeAt: e.target.value || undefined })}
                  className="w-auto"
                />
              </Field>
            </section>

            {d.goals.includes("night-wean") && (
              <section className="space-y-2">
                <p className="font-medium">{t.nightTitle}</p>
                <div className="flex flex-wrap items-end gap-2">
                  <Field id="iv-cutoff" label={t.nightCutoffLabel}>
                    <Input
                      id="iv-cutoff"
                      type="time"
                      value={d.nightCutoffAt ?? ""}
                      onChange={(e) => edit({ nightCutoffAt: e.target.value || undefined })}
                      className="w-auto"
                    />
                  </Field>
                  <Field id="iv-night-ml" label={t.nightFeedLabel}>
                    <Input
                      id="iv-night-ml"
                      type="number"
                      inputMode="numeric"
                      min={10}
                      max={500}
                      value={d.nightFeedMl ?? ""}
                      onChange={(e) => edit({ nightFeedMl: e.target.value ? num(e.target.value) : undefined })}
                      className="w-24"
                    />
                  </Field>
                </div>
              </section>
            )}

            <div className="flex flex-wrap items-end gap-2">
              <Field id="iv-step" label={t.stepLabel}>
                <Input
                  id="iv-step"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={20}
                  value={Number.isFinite(d.step) ? d.step : ""}
                  onChange={(e) => edit({ step: num(e.target.value) })}
                  className="w-20"
                />
              </Field>
              <Button size="sm" onClick={() => persist(d)}>
                {t.save}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const next = { ...defaultIntervention(ageMonths, d.startedOn), goals: d.goals };
                  setDraft(next);
                  setSavedNote(false);
                }}
              >
                {fmt(t.resetDefaults, { age: ageLabel })}
              </Button>
            </div>
            {invalid && <p className="text-destructive">{t.invalid}</p>}
            {savedNote && !invalid && <p className="text-muted-foreground">{t.saved}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
