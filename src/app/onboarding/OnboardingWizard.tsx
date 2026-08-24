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

function StepSegments({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Step ${step + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i <= step ? "bg-primary" : "bg-border",
          )}
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
  center,
}: {
  value: T;
  current: T | null;
  onSelect: (v: T) => void;
  label: string;
  description?: string;
  /** Compact centered pill (segmented option rows) instead of a stacked card. */
  center?: boolean;
}) {
  const selected = current === value;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(value)}
      className={cn(
        "min-h-11 rounded-xl border-[1.5px] transition-colors",
        center ? "px-2 py-2.5 text-center" : "w-full p-3.5 text-left",
        selected
          ? "border-primary bg-secondary"
          : "border-input bg-background hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "text-sm",
          selected ? "font-bold text-secondary-foreground" : "font-semibold text-foreground",
        )}
      >
        {label}
        {selected && <span aria-hidden="true"> ✓</span>}
      </span>
      {description && (
        <span
          className={cn(
            "mt-0.5 block text-xs leading-relaxed",
            selected ? "text-secondary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </span>
      )}
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  children,
  alignTop,
  dashed,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  alignTop?: boolean;
  /** Dashed border while unchecked (the "optional path" affordance). */
  dashed?: boolean;
}) {
  return (
    <label
      className={cn(
        "relative flex min-h-12 cursor-pointer gap-3 rounded-xl border-[1.5px] p-3.5 text-sm transition-colors",
        alignTop ? "items-start" : "items-center",
        checked
          ? "border-primary bg-secondary"
          : cn("border-input bg-background hover:border-primary/40", dashed && "border-dashed"),
      )}
    >
      {/* Full-size invisible input (not sr-only): keeps the native checkbox
          clickable for pointer tools and Playwright's .check(). */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-5.5 shrink-0 items-center justify-center rounded-md text-xs transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          alignTop && "mt-0.5",
          checked ? "bg-primary text-primary-foreground" : "border-2 border-input bg-card",
        )}
      >
        {checked ? "✓" : null}
      </span>
      <span className="min-w-0">{children}</span>
    </label>
  );
}

/* One-time ~400ms confetti settle on the "It's time." verdict — pure CSS,
   guarded by prefers-reduced-motion (design/DESIGN-NOTES.md motion budget). */
const CONFETTI: Array<{
  left: string;
  top: string;
  size: number;
  honey?: boolean;
  square?: boolean;
  delay: number;
}> = [
  { left: "6%", top: "14%", size: 10, delay: 0 },
  { left: "20%", top: "6%", size: 7, honey: true, delay: 40 },
  { left: "36%", top: "9%", size: 8, square: true, delay: 90 },
  { left: "60%", top: "5%", size: 7, honey: true, square: true, delay: 170 },
  { left: "78%", top: "8%", size: 6, delay: 110 },
  { left: "90%", top: "17%", size: 8, honey: true, delay: 60 },
  { left: "94%", top: "40%", size: 6, delay: 150 },
  { left: "3%", top: "36%", size: 6, honey: true, delay: 130 },
];

function ConfettiSettle() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <style>{`
        @keyframes os-confetti-settle {
          from { opacity: 0; transform: translateY(-12px) scale(0.5); }
          70% { opacity: 1; }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .os-confetti {
          opacity: 0;
          animation: os-confetti-settle 400ms ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .os-confetti { animation: none; opacity: 1; }
        }
      `}</style>
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className={cn(
            "os-confetti absolute",
            c.honey ? "bg-honey" : "bg-chart-3",
            c.square ? "rounded-[2px] rotate-12" : "rounded-full",
          )}
          style={{ left: c.left, top: c.top, width: c.size, height: c.size, animationDelay: `${c.delay}ms` }}
        />
      ))}
    </div>
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
  const signCount = signs.filter(Boolean).length;
  const signTotal = READINESS_SIGNS.length;
  const readyVerdict = allSigns || earlyStartApproved;
  const watchingFor = READINESS_SIGNS.filter((_, i) => !signs[i]);

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
    <section key="basics" className="space-y-5">
      <h2 className="text-2xl font-extrabold">About your baby</h2>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold">Name or nickname</span>
        <Input
          className="h-12 rounded-xl px-4 text-[15px]"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="e.g. Mango"
        />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold">Birth date</span>
        <Input
          className="font-data h-12 rounded-xl px-4 text-[15px]"
          type="date"
          value={birthDate}
          max={todayIso()}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>
      <CheckRow checked={wasPremature} onChange={setWasPremature}>
        Born more than 3 weeks early
      </CheckRow>
      {wasPremature && (
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold">Original due date</span>
          <Input
            className="font-data h-12 rounded-xl px-4 text-[15px]"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <span className="block text-xs leading-relaxed text-muted-foreground">
            We&apos;ll use corrected age for every recommendation — standard practice for babies
            born early.
          </span>
        </label>
      )}
      <div className="space-y-2">
        <span className="text-sm font-semibold">How do you want to feed?</span>
        <Choice value="purees" current={feedingStyle} onSelect={setFeedingStyle} label="Purées & mashes first" description="Spoon-led, moving to finger foods over time" />
        <Choice value="baby-led" current={feedingStyle} onSelect={setFeedingStyle} label="Baby-led (finger foods)" description="Soft graspable pieces from the start" />
        <Choice value="mixed" current={feedingStyle} onSelect={setFeedingStyle} label="A mix of both" description="We'll show both preps — most families land here" />
      </div>
      <Button
        className="h-12 w-full text-[15px] font-bold"
        disabled={!birthDate || !feedingStyle}
        onClick={() => setStep(1)}
      >
        Next: allergy questions<span aria-hidden="true"> →</span>
      </Button>
    </section>,

    // 1 — allergy risk quiz
    <section key="risk" className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold">Three quick allergy questions</h2>
        <p className="text-sm text-muted-foreground">
          These set the allergen introduction plan (based on the NIAID guidelines).
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">Does your baby have eczema?</span>
        <div className="grid grid-cols-3 gap-2">
          <Choice center value="none" current={eczema} onSelect={setEczema} label="No" />
          <Choice center value="mild-moderate" current={eczema} onSelect={setEczema} label="Mild to moderate" />
          <Choice center value="severe" current={eczema} onSelect={setEczema} label="Severe" />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Mild–moderate: occasional patches, managed with moisturizer or mild treatment. Severe:
          persistent or widespread, needs prescription treatment.
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">Any diagnosed food allergy already?</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice center value="no" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(false)} label="No" />
          <Choice center value="yes" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(true)} label="Yes" />
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">Parent or sibling with food allergy, eczema, or asthma?</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice center value="no" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(false)} label="No" />
          <Choice center value="yes" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(true)} label="Yes" />
        </div>
      </div>
      {(eczema === "severe" || existingFoodAllergy) && (
        <div className="flex items-start gap-2.5 rounded-xl border border-honey/40 bg-accent p-4">
          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-honey" />
          <p className="text-[13px] leading-relaxed text-accent-foreground">
            This puts your baby in the higher-risk group for peanut allergy. We&apos;ll hold peanut
            until you confirm your pediatrician or allergist has cleared it — worth asking about at
            the 4- or 6-month visit.
          </p>
        </div>
      )}
      <div className="flex gap-2.5">
        <Button variant="outline" className="h-12 px-6 text-[15px] font-semibold" onClick={() => setStep(0)}>
          <span aria-hidden="true">← </span>Back
        </Button>
        <Button
          className="h-12 flex-1 text-[15px] font-bold"
          disabled={eczema === null || existingFoodAllergy === null || familyHistoryAtopy === null}
          onClick={() => setStep(2)}
        >
          Next: readiness<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </section>,

    // 2 — readiness quiz
    <section key="readiness" className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold">Is {nickname || "your baby"} showing the readiness signs?</h2>
        <p className="text-sm text-muted-foreground">
          Most babies show all of these around 6 months. Check what you&apos;re seeing:
        </p>
      </div>
      <div className="space-y-2">
        {READINESS_SIGNS.map((sign, i) => (
          <CheckRow
            key={sign}
            checked={signs[i]}
            onChange={(v) => setSigns(signs.map((s, j) => (j === i ? v : s)))}
          >
            {sign}
          </CheckRow>
        ))}
      </div>
      {!allSigns && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Not all there yet? Totally normal — save the profile anyway and we&apos;ll show you what
          to watch for instead of food picks. Or, if your pediatrician told you to start, check the
          box below and the program unlocks today.
        </p>
      )}
      <CheckRow checked={earlyStartApproved} onChange={setEarlyStartApproved} alignTop dashed>
        <span className="font-semibold">We&apos;re starting on our pediatrician&apos;s specific advice.</span>{" "}
        <span className="text-muted-foreground">
          This unlocks the program from 4 months, even before every readiness sign appears —
          pediatrician-guided programs often start early.
        </span>
      </CheckRow>
      <div className="flex gap-2.5">
        <Button variant="outline" className="h-12 px-6 text-[15px] font-semibold" onClick={() => setStep(1)}>
          <span aria-hidden="true">← </span>Back
        </Button>
        <Button className="h-12 flex-1 text-[15px] font-bold" onClick={() => setStep(3)}>
          Next: one last thing<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </section>,

    // 3 — disclaimer + verdict + branch
    <section key="finish" className="space-y-5">
      <h2 className="text-2xl font-extrabold">One last thing</h2>
      <CheckRow checked={disclaimer} onChange={setDisclaimer} alignTop>
        I understand OpenSolids is a free educational guide, not medical advice, and that my
        pediatrician&apos;s guidance comes first. All data stays on this device unless I export
        it.
      </CheckRow>

      {disclaimer &&
        (readyVerdict ? (
          <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 shadow-xl shadow-foreground/25 sm:p-8 dark:border dark:border-border dark:bg-card">
            <ConfettiSettle />
            <div className="relative space-y-3">
              <p className="font-data text-[11px] tracking-[0.14em] text-secondary uppercase dark:text-secondary-foreground">
                Readiness verdict · {signCount} of {signTotal} signs
              </p>
              <h3 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-background dark:text-foreground">
                It&apos;s time<span className="text-chart-3">.</span>
              </h3>
              <p className="text-[15px] leading-relaxed text-background/80 dark:text-foreground/80">
                {allSigns ? (
                  <>
                    {nickname || "Your baby"} is showing all {signTotal} readiness signs. Tomorrow
                    morning is a perfectly good day one — your first week is built around
                    iron-rich, one-ingredient starts.
                  </>
                ) : (
                  <>
                    You&apos;re starting on your pediatrician&apos;s specific advice — the plan
                    unlocks today, and we&apos;ll keep picks to smooth, mashable first foods.
                  </>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-xl shadow-foreground/10 sm:p-8">
            <p className="font-data text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              Readiness verdict · {signCount} of {signTotal} signs
            </p>
            <h3 className="font-heading text-3xl leading-tight font-extrabold tracking-tight">
              Not yet — and that&apos;s normal<span className="text-primary">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {nickname || "Your baby"} isn&apos;t showing all the signs, so we won&apos;t suggest
              foods yet. We&apos;ll show you exactly what to watch for, and the plan flips on the
              day the signs line up.
            </p>
            <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4">
              <p className="font-data text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                Watching for
              </p>
              {watchingFor.map((sign) => (
                <p key={sign} className="text-sm text-foreground/75">
                  <span aria-hidden="true">○ </span>
                  {sign}
                </p>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={earlyStartApproved}
              onClick={() => setEarlyStartApproved(!earlyStartApproved)}
              className="flex w-full flex-col gap-1.5 rounded-xl border-[1.5px] border-primary bg-secondary p-4 text-left transition-colors hover:bg-secondary/70"
            >
              <span className="text-sm font-bold text-secondary-foreground">
                Starting on your pediatrician&apos;s advice?
              </span>
              <span className="block text-[13px] leading-relaxed text-foreground/80">
                That unlocks the program from 4 months — we&apos;ll keep picks to smooth, mashable
                first foods.
              </span>
              <span className="text-sm font-bold text-secondary-foreground">
                Begin today<span aria-hidden="true"> →</span>
              </span>
            </button>
          </div>
        ))}

      <div className="flex flex-col gap-2.5">
        <Button
          className="h-12 w-full text-[15px] font-bold"
          disabled={!disclaimer}
          onClick={() => finish("today")}
        >
          {editing || adding ? "Save profile" : "Start fresh → see today's plan"}
        </Button>
        {!editing && !adding && (
          <Button
            variant="outline"
            className="h-12 w-full text-[15px] font-semibold"
            disabled={!disclaimer}
            onClick={() => finish("import")}
          >
            We&apos;ve already started → import
          </Button>
        )}
        <Button
          variant="ghost"
          className="h-11 w-full text-sm text-muted-foreground"
          onClick={() => setStep(2)}
        >
          <span aria-hidden="true">← </span>Back
        </Button>
      </div>
    </section>,
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-3xl font-extrabold">
        {editing ? "Edit profile" : adding ? "Add another baby" : "Let's set up your plan"}
      </h1>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-foreground/10 sm:p-8">
        <div className="mb-5 space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-data text-[11px] tracking-[0.14em] text-muted-foreground">
              STEP {step + 1} OF {steps.length}
            </span>
            {step === 0 && (
              <span className="font-data text-[11px] tracking-[0.02em] text-muted-foreground">
                ~2 MIN TOTAL
              </span>
            )}
          </div>
          <StepSegments step={step} total={steps.length} />
        </div>
        {steps[step]}
      </div>
      <p className="text-xs text-muted-foreground">
        Prefer to look around first?{" "}
        <Link href="/foods" className="font-medium text-primary underline underline-offset-2">
          Browse the food library
        </Link>{" "}
        without a profile.
      </p>
    </div>
  );
}
