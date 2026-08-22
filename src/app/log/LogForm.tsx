"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { allFoods, foodBySlug } from "../../../content/foods";
import type { AgeBand } from "@/content-schema/food";
import { BAND_LABELS, bandForAgeMonths, todayIso } from "@/lib/food-utils";
import { correctedAgeMonths } from "@/lib/age";
import { useHydrated } from "@/lib/hooks";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { AmountEaten, Enjoyment, SymptomId } from "@/lib/storage/types";
import { SYMPTOM_IDS, SYMPTOM_LABELS } from "@/lib/storage/types";
import { triage, type TriageResult } from "@/lib/triage";
import { EmergencyDialog } from "@/components/EmergencyDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AMOUNTS: { id: AmountEaten; label: string }[] = [
  { id: "none", label: "None" },
  { id: "taste", label: "A taste" },
  { id: "some", label: "Some" },
  { id: "lots", label: "Lots!" },
];
const ENJOYMENT: { id: Enjoyment; label: string }[] = [
  { id: "loved", label: "😍 Loved" },
  { id: "neutral", label: "😐 Neutral" },
  { id: "disliked", label: "😖 Disliked" },
  { id: "refused", label: "🙅 Refused" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-emerald-700 bg-emerald-700 text-white" : "hover:border-emerald-400",
      )}
    >
      {children}
    </button>
  );
}

export function LogForm() {
  const hydrated = useHydrated();
  const router = useRouter();
  const params = useSearchParams();
  const { baby, addLog } = useGuideStore();

  const [foodSlug, setFoodSlug] = useState(params.get("food") ?? "");
  const [foodQuery, setFoodQuery] = useState("");
  const [date, setDate] = useState(todayIso());
  const [band, setBand] = useState<AgeBand | null>(null);
  const [amount, setAmount] = useState<AmountEaten>("some");
  const [enjoyment, setEnjoyment] = useState<Enjoyment>("neutral");
  const [gagging, setGagging] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [emergency, setEmergency] = useState<TriageResult | null>(null);
  const [saved, setSaved] = useState<TriageResult | null>(null);

  const food = foodBySlug.get(foodSlug);
  const ageMonths = baby ? correctedAgeMonths(baby, new Date()) : 7;
  const defaultBand = food
    ? (food.prepSpecs.find((p) => p.band === bandForAgeMonths(ageMonths))?.band ??
      food.prepSpecs[0].band)
    : "6-8m";

  const matches = useMemo(() => {
    const q = foodQuery.trim().toLowerCase();
    if (!q) return [];
    return allFoods
      .filter((f) => f.name.toLowerCase().includes(q) || f.slug.includes(q))
      .slice(0, 8);
  }, [foodQuery]);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>Set up your baby&apos;s profile first</AlertTitle>
        <AlertDescription>
          Logging needs a profile so recommendations can adapt.{" "}
          <Link href="/onboarding" className="underline underline-offset-2">
            Start here →
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  function toggleSymptom(id: SymptomId) {
    const nextSymptoms = symptoms.includes(id)
      ? symptoms.filter((s) => s !== id)
      : [...symptoms, id];
    setSymptoms(nextSymptoms);
    // The emergency screen interrupts the moment a red-flag symptom is
    // selected — before the log is saved (ROADMAP §9.2).
    const t = triage(nextSymptoms);
    if (t.severity === "emergency") setEmergency(t);
  }

  function save() {
    if (!food || !baby) return;
    addLog({
      id: newId(),
      babyId: baby.id,
      foodSlug: food.slug,
      date,
      prepBandUsed: band ?? defaultBand,
      amountEaten: amount,
      enjoyment,
      gagging,
      symptoms,
    });
    const t = triage(symptoms);
    if (t.severity === "none") {
      router.push("/today?logged=1");
    } else {
      setSaved(t);
    }
  }

  if (saved) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Alert
          className={cn(
            saved.severity === "educate" ? "border-emerald-300" : "border-red-400",
          )}
        >
          <AlertTitle className="text-base">{saved.headline}</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-2">
              {saved.actions.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
        {saved.pausesAllergen && food?.commonAllergen && (
          <p className="text-sm text-muted-foreground">
            The {food.commonAllergen} group is now paused in your plan.{" "}
            <Link href={`/allergens/${food.commonAllergen}`} className="underline underline-offset-2">
              See the reaction playbook →
            </Link>
          </p>
        )}
        <div className="flex gap-3">
          <Button onClick={() => router.push("/today")}>Back to Today</Button>
          <Link href="/safety" className="self-center text-sm underline underline-offset-2">
            Emergency guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {emergency && <EmergencyDialog result={emergency} onAcknowledge={() => setEmergency(null)} />}

      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Log a food</h1>
        <Link href="/safety" className="text-xs text-red-700 underline underline-offset-2 dark:text-red-400">
          Worried right now? Emergency guide
        </Link>
      </div>

      {/* 1. Food */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Food</h2>
        {food ? (
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-emerald-700 bg-emerald-50 px-4 py-2 font-medium dark:bg-emerald-950">
              {food.name}
            </span>
            <button
              type="button"
              className="text-sm text-muted-foreground underline underline-offset-2"
              onClick={() => {
                setFoodSlug("");
                setBand(null);
              }}
            >
              change
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              autoFocus
              placeholder="Type to search (e.g. carrot)…"
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              aria-label="Search food to log"
            />
            <div className="flex flex-wrap gap-2">
              {matches.map((f) => (
                <Chip key={f.slug} active={false} onClick={() => setFoodSlug(f.slug)}>
                  {f.name}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </section>

      {food && (
        <>
          {/* 2. How was it served */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">Prep used</h2>
            <div className="flex flex-wrap gap-2">
              {food.prepSpecs.map((p) => (
                <Chip
                  key={p.band}
                  active={(band ?? defaultBand) === p.band}
                  onClick={() => setBand(p.band)}
                >
                  {BAND_LABELS[p.band]}
                </Chip>
              ))}
            </div>
          </section>

          {/* 3. Amount */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">How much went in?</h2>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <Chip key={a.id} active={amount === a.id} onClick={() => setAmount(a.id)}>
                  {a.label}
                </Chip>
              ))}
            </div>
          </section>

          {/* 4. Reaction */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">How did it go?</h2>
            <div className="flex flex-wrap gap-2">
              {ENJOYMENT.map((e) => (
                <Chip key={e.id} active={enjoyment === e.id} onClick={() => setEnjoyment(e.id)}>
                  {e.label}
                </Chip>
              ))}
            </div>
            <label className="flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={gagging}
                onChange={(e) => setGagging(e.target.checked)}
                className="size-4 accent-emerald-700"
              />
              Some gagging (normal reflex — see{" "}
              <Link href="/safety" className="underline underline-offset-2">
                gagging vs. choking
              </Link>
              )
            </label>
          </section>

          {/* Symptoms — opt-in expansion */}
          <section className="space-y-2">
            <button
              type="button"
              onClick={() => setShowSymptoms((s) => !s)}
              className="text-sm font-semibold underline-offset-2 hover:underline"
              aria-expanded={showSymptoms}
            >
              {showSymptoms ? "▾" : "▸"} Any symptoms? (rash, hives, vomiting…)
            </button>
            {showSymptoms && (
              <div className="space-y-1.5 rounded-lg border p-3">
                {SYMPTOM_IDS.map((id) => (
                  <label key={id} className="flex min-h-9 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={symptoms.includes(id)}
                      onChange={() => toggleSymptom(id)}
                      className="size-4 accent-red-700"
                    />
                    {SYMPTOM_LABELS[id]}
                  </label>
                ))}
              </div>
            )}
          </section>

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">
              Date{" "}
              <input
                type="date"
                value={date}
                max={todayIso()}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-md border px-2 py-1.5 text-sm"
              />
            </label>
            <Button
              onClick={save}
              size="lg"
              className="ml-auto bg-emerald-700 text-white hover:bg-emerald-800"
            >
              Save log
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
