"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { todayIso } from "@/lib/food-utils";
import { useActiveBaby, useHydrated } from "@/lib/hooks";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { BabyProfile, EczemaSeverity, FeedingStyle } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const READINESS_SIGNS = [
  "Sits upright with little or no support",
  "Steady head control",
  "Brings hands and toys to the mouth",
  "Watches your food with real interest",
  "The tongue-thrust reflex has faded (food isn't automatically pushed back out)",
];

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Step ${step + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("h-1.5 w-8 rounded-full", i <= step ? "bg-emerald-700" : "bg-muted")}
        />
      ))}
    </div>
  );
}

function Choice<T extends string>({
  value,
  current,
  onSelect,
  label,
  description,
}: {
  value: T;
  current: T | null;
  onSelect: (v: T) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "w-full rounded-lg border p-3 text-left transition-colors",
        current === value ? "border-emerald-700 bg-emerald-50 dark:bg-emerald-950" : "hover:border-emerald-400",
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
    </button>
  );
}

export function OnboardingWizard() {
  const hydrated = useHydrated();
  const router = useRouter();
  const params = useSearchParams();
  const editing = params.get("edit") === "1";
  const adding = params.get("add") === "1";
  const activeBaby = useActiveBaby();
  const baby = adding ? null : activeBaby;
  const { saveBaby, setActiveBaby } = useGuideStore();

  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState(baby?.nickname ?? "");
  const [birthDate, setBirthDate] = useState(baby?.birthDate ?? "");
  const [wasPremature, setWasPremature] = useState(!!baby?.dueDate);
  const [dueDate, setDueDate] = useState(baby?.dueDate ?? "");
  const [feedingStyle, setFeedingStyle] = useState<FeedingStyle | null>(baby?.feedingStyle ?? null);
  const [eczema, setEczema] = useState<EczemaSeverity | null>(baby?.allergyRisk.eczema ?? null);
  const [existingFoodAllergy, setExistingFoodAllergy] = useState<boolean | null>(
    baby?.allergyRisk.existingFoodAllergy ?? null,
  );
  const [familyHistoryAtopy, setFamilyHistoryAtopy] = useState<boolean | null>(
    baby?.allergyRisk.familyHistoryAtopy ?? null,
  );
  const [signs, setSigns] = useState<boolean[]>(
    READINESS_SIGNS.map(() => !!baby?.readiness.confirmedAt),
  );
  const [earlyStartApproved, setEarlyStartApproved] = useState(
    baby?.readiness.earlyStartApproved ?? false,
  );
  const [disclaimer, setDisclaimer] = useState(!!baby?.disclaimerAcknowledgedAt);

  if (!hydrated) return null;

  const allSigns = signs.every(Boolean);

  function buildProfile(): BabyProfile {
    return {
      id: baby?.id ?? newId(),
      nickname: nickname.trim() || "Baby",
      birthDate,
      dueDate: wasPremature && dueDate ? dueDate : undefined,
      feedingStyle: feedingStyle ?? "mixed",
      allergyRisk: {
        eczema: eczema ?? "none",
        existingFoodAllergy: existingFoodAllergy ?? false,
        familyHistoryAtopy: familyHistoryAtopy ?? false,
      },
      knownAllergies: baby?.knownAllergies ?? [],
      doctorAvoidList: baby?.doctorAvoidList ?? [],
      doctorClearances: baby?.doctorClearances ?? [],
      conditions: baby?.conditions ?? [],
      startedSolidsOn: baby?.startedSolidsOn,
      textureStage: baby?.textureStage ?? "S1",
      readiness: {
        confirmedAt: allSigns ? (baby?.readiness.confirmedAt ?? todayIso()) : undefined,
        earlyStartApproved,
      },
      disclaimerAcknowledgedAt: disclaimer ? (baby?.disclaimerAcknowledgedAt ?? new Date().toISOString()) : undefined,
    };
  }

  function finish(then: "today" | "import") {
    const profile = buildProfile();
    saveBaby(profile);
    setActiveBaby(profile.id);
    router.push(then === "today" ? "/today" : "/onboarding/import");
  }

  const steps = [
    // 0 — basics
    <section key="basics" className="space-y-4">
      <h2 className="text-xl font-semibold">About your baby</h2>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Name or nickname</span>
        <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="e.g. Mango" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Birth date</span>
        <Input type="date" value={birthDate} max={todayIso()} onChange={(e) => setBirthDate(e.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={wasPremature}
          onChange={(e) => setWasPremature(e.target.checked)}
          className="size-4 accent-emerald-700"
        />
        Born more than 3 weeks early
      </label>
      {wasPremature && (
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Original due date</span>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <span className="text-xs text-muted-foreground">
            We&apos;ll use corrected age for every recommendation — standard practice for babies
            born early.
          </span>
        </label>
      )}
      <div className="space-y-2">
        <span className="text-sm font-medium">How do you want to feed?</span>
        <Choice value="purees" current={feedingStyle} onSelect={setFeedingStyle} label="Purées & mashes first" description="Spoon-led, moving to finger foods over time" />
        <Choice value="baby-led" current={feedingStyle} onSelect={setFeedingStyle} label="Baby-led (finger foods)" description="Soft graspable pieces from the start" />
        <Choice value="mixed" current={feedingStyle} onSelect={setFeedingStyle} label="A mix of both" description="We'll show both preps — most families land here" />
      </div>
      <Button
        className="bg-emerald-700 text-white hover:bg-emerald-800"
        disabled={!birthDate || !feedingStyle}
        onClick={() => setStep(1)}
      >
        Next: allergy questions
      </Button>
    </section>,

    // 1 — allergy risk quiz
    <section key="risk" className="space-y-4">
      <h2 className="text-xl font-semibold">Three quick allergy questions</h2>
      <p className="text-sm text-muted-foreground">
        These set the allergen introduction plan (based on the NIAID guidelines).
      </p>
      <div className="space-y-2">
        <span className="text-sm font-medium">Does your baby have eczema?</span>
        <Choice value="none" current={eczema} onSelect={setEczema} label="No" />
        <Choice value="mild-moderate" current={eczema} onSelect={setEczema} label="Mild to moderate" description="Occasional patches, managed with moisturizer or mild treatment" />
        <Choice value="severe" current={eczema} onSelect={setEczema} label="Severe" description="Persistent or widespread, needs prescription treatment" />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Any diagnosed food allergy already?</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice value="no" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(false)} label="No" />
          <Choice value="yes" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(true)} label="Yes" />
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Parent or sibling with food allergy, eczema, or asthma?</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice value="no" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(false)} label="No" />
          <Choice value="yes" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(true)} label="Yes" />
        </div>
      </div>
      {(eczema === "severe" || existingFoodAllergy) && (
        <p className="rounded-md border border-amber-400 p-3 text-sm">
          This puts your baby in the higher-risk group for peanut allergy. We&apos;ll hold peanut
          until you confirm your pediatrician or allergist has cleared it — worth asking about at
          the 4- or 6-month visit.
        </p>
      )}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
        <Button
          className="bg-emerald-700 text-white hover:bg-emerald-800"
          disabled={eczema === null || existingFoodAllergy === null || familyHistoryAtopy === null}
          onClick={() => setStep(2)}
        >
          Next: readiness
        </Button>
      </div>
    </section>,

    // 2 — readiness quiz
    <section key="readiness" className="space-y-4">
      <h2 className="text-xl font-semibold">Is {nickname || "your baby"} showing the readiness signs?</h2>
      <p className="text-sm text-muted-foreground">
        Most babies show all of these around 6 months. Check what you&apos;re seeing:
      </p>
      <div className="space-y-2">
        {READINESS_SIGNS.map((sign, i) => (
          <label key={sign} className="flex min-h-11 items-center gap-3 rounded-lg border p-3 text-sm">
            <input
              type="checkbox"
              checked={signs[i]}
              onChange={(e) => setSigns(signs.map((s, j) => (j === i ? e.target.checked : s)))}
              className="size-4 accent-emerald-700"
            />
            {sign}
          </label>
        ))}
      </div>
      {!allSigns && (
        <p className="text-sm text-muted-foreground">
          Not all there yet? Totally normal — save the profile anyway and we&apos;ll show you what
          to watch for instead of food picks.
        </p>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={earlyStartApproved}
          onChange={(e) => setEarlyStartApproved(e.target.checked)}
          className="size-4 accent-emerald-700"
        />
        Our pediatrician specifically advised starting between 4 and 6 months
      </label>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
        <Button className="bg-emerald-700 text-white hover:bg-emerald-800" onClick={() => setStep(3)}>
          Next: one last thing
        </Button>
      </div>
    </section>,

    // 3 — disclaimer + branch
    <section key="finish" className="space-y-4">
      <h2 className="text-xl font-semibold">One last thing</h2>
      <label className="flex items-start gap-3 rounded-lg border p-4 text-sm">
        <input
          type="checkbox"
          checked={disclaimer}
          onChange={(e) => setDisclaimer(e.target.checked)}
          className="mt-0.5 size-4 accent-emerald-700"
        />
        <span>
          I understand OpenSolids is a free educational guide, not medical advice, and that my
          pediatrician&apos;s guidance comes first. All data stays on this device unless I export
          it.
        </span>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
        <Button
          className="bg-emerald-700 text-white hover:bg-emerald-800"
          disabled={!disclaimer}
          onClick={() => finish("today")}
        >
          {editing ? "Save profile" : "Start fresh → see today's plan"}
        </Button>
        {!editing && (
          <Button variant="outline" disabled={!disclaimer} onClick={() => finish("import")}>
            We&apos;ve already started → import
          </Button>
        )}
      </div>
    </section>,
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">
          {editing ? "Edit profile" : adding ? "Add another baby" : "Let's set up your plan"}
        </h1>
        <StepDots step={step} total={steps.length} />
      </div>
      {steps[step]}
      <p className="text-xs text-muted-foreground">
        Prefer to look around first?{" "}
        <Link href="/foods" className="underline underline-offset-2">
          Browse the food library
        </Link>{" "}
        without a profile.
      </p>
    </div>
  );
}
