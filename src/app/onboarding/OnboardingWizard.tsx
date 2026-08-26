"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { ALLERGEN_IDS, type AllergenId } from "@/content-schema/food";
import { correctedAgeMonths, dateAtCorrectedAge } from "@/lib/age";
import { EARLY_START_MONTHS, READY_MONTHS } from "@/lib/engine";
import { todayIso } from "@/lib/food-utils";
import { useActiveBaby, useHydrated } from "@/lib/hooks";
import { fmt, msg } from "@/lib/i18n/config";
import { allergenLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { onboardingMsgs, READINESS_SIGN_MSGS } from "@/lib/i18n/messages/onboarding";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { BabyProfile, EczemaSeverity, FeedingStyle } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function StepSegments({ step, total }: { step: number; total: number }) {
  const t = useMsgs(onboardingMsgs);
  return (
    <div className="flex gap-1.5" aria-label={fmt(t.stepAria, { step: step + 1, total })}>
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

/**
 * Multi-select grid of the 9 common allergens. Used twice on the allergy step:
 * once for confirmed diagnoses (→ BabyProfile.knownAllergies, a hard block)
 * and once for foods a family is holding off on without a diagnosis
 * (→ an "avoid-per-doctor" AllergenOverride, which is reversible and softer).
 */
function AllergenPicker({
  label,
  help,
  cmpaHint,
  options,
  selected,
  onToggle,
}: {
  /** Question text — also names the group, since both pickers can be on screen at once. */
  label: string;
  help: string;
  /** Both pickers can be open at once; the CMPA example only needs saying once. */
  cmpaHint: boolean;
  options: readonly AllergenId[];
  selected: AllergenId[];
  onToggle: (id: AllergenId) => void;
}) {
  const t = useMsgs(onboardingMsgs);
  const locale = useLocale();
  const labelId = useId();
  return (
    <div className="space-y-2" role="group" aria-labelledby={labelId}>
      <span id={labelId} className="text-sm font-semibold">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((id) => {
          const on = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(id)}
              className={cn(
                "min-h-11 rounded-xl border-[1.5px] px-2 py-2.5 text-center text-sm transition-colors",
                on
                  ? "border-primary bg-secondary font-bold text-secondary-foreground"
                  : "border-input bg-background font-semibold text-foreground hover:border-primary/40",
              )}
            >
              {allergenLabel(id, locale)}
              {on && <span aria-hidden="true"> ✓</span>}
            </button>
          );
        })}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {help}
        {cmpaHint && <> {t.cmpaHint}</>}
      </p>
    </div>
  );
}

/**
 * Why the button you just pressed didn't move. We render this instead of
 * disabling the control: a greyed-out button with no explanation is the one
 * thing a tired parent can't debug, and it was the first thing a real tester
 * hit (an incomplete date segment reads as "no date" to the browser).
 */
function Blockers({ id, items, show }: { id: string; items: string[]; show: boolean }) {
  const t = useMsgs(onboardingMsgs);
  return (
    <div id={id} aria-live="polite">
      {show && items.length > 0 && (
        <div className="flex items-start gap-2.5 rounded-xl border border-honey/40 bg-accent p-4">
          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-honey" />
          <div className="space-y-1 text-[13px] leading-relaxed text-accent-foreground">
            <p className="font-semibold">{t.fixBeforeNext}</p>
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
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

/**
 * The persisted store rehydrates *after* the first client render (zustand
 * hands React the pre-hydration snapshot as its server snapshot), so the form
 * below is only mounted once `hydrated` is true — otherwise the "Edit profile"
 * path would start from a blank profile and save the blanks back.
 */
export function OnboardingWizard() {
  const hydrated = useHydrated();
  const params = useSearchParams();
  const adding = params.get("add") === "1";
  const activeBaby = useActiveBaby();

  if (!hydrated) return null;
  return (
    <WizardForm baby={adding ? null : activeBaby} editing={params.get("edit") === "1"} adding={adding} />
  );
}

function WizardForm({
  baby,
  editing,
  adding,
}: {
  baby: BabyProfile | null;
  editing: boolean;
  adding: boolean;
}) {
  const locale = useLocale();
  const t = useMsgs(onboardingMsgs);
  const router = useRouter();
  const { saveBaby, setActiveBaby, overrides, setOverride, clearOverride } = useGuideStore();

  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState(baby?.nickname ?? "");
  const [birthDate, setBirthDate] = useState(baby?.birthDate ?? "");
  const [wasPremature, setWasPremature] = useState(!!baby?.dueDate);
  const [dueDate, setDueDate] = useState(baby?.dueDate ?? "");
  const [feedingStyle, setFeedingStyle] = useState<FeedingStyle | null>(baby?.feedingStyle ?? null);
  const [eczema, setEczema] = useState<EczemaSeverity | null>(baby?.allergyRisk.eczema ?? null);
  const [existingFoodAllergy, setExistingFoodAllergy] = useState<boolean | null>(
    // A profile carrying known allergies has one, even if the flag predates this step.
    baby ? baby.allergyRisk.existingFoodAllergy || baby.knownAllergies.length > 0 : null,
  );
  const [knownAllergies, setKnownAllergies] = useState<AllergenId[]>(baby?.knownAllergies ?? []);
  // Foods held off on without a diagnosis — stored as "avoid-per-doctor" overrides.
  const [avoiding, setAvoiding] = useState<AllergenId[]>(() =>
    baby
      ? overrides
          .filter((o) => o.babyId === baby.id && o.status === "avoid-per-doctor")
          .map((o) => o.allergenId)
          .filter((id) => !baby.knownAllergies.includes(id))
      : [],
  );
  const [hasAvoiding, setHasAvoiding] = useState(() => avoiding.length > 0);
  const [familyHistoryAtopy, setFamilyHistoryAtopy] = useState<boolean | null>(
    baby?.allergyRisk.familyHistoryAtopy ?? null,
  );
  const [signs, setSigns] = useState<boolean[]>(
    READINESS_SIGN_MSGS.map(() => !!baby?.readiness.confirmedAt),
  );
  const [earlyStartApproved, setEarlyStartApproved] = useState(
    baby?.readiness.earlyStartApproved ?? false,
  );
  const [disclaimer, setDisclaimer] = useState(!!baby?.disclaimerAcknowledgedAt);

  /**
   * A native date input reports an empty string for a half-typed date, so
   * `birthDate` alone can't tell "haven't started" from "month and day but no
   * year" — `validity.badInput` can, and that distinction is the difference
   * between a useful message and a useless one.
   */
  const [birthDateIncomplete, setBirthDateIncomplete] = useState(false);
  /** Reasons are held back until the parent actually presses the button. */
  const [attempted, setAttempted] = useState(false);
  const blockerId = useId();

  const readinessSigns = READINESS_SIGN_MSGS.map((m) => msg(m, locale));
  const allSigns = signs.every(Boolean);
  const signCount = signs.filter(Boolean).length;
  const signTotal = readinessSigns.length;
  const readyVerdict = allSigns || earlyStartApproved;
  const watchingFor = readinessSigns.filter((_, i) => !signs[i]);
  const diagnosed = existingFoodAllergy ? knownAllergies : [];
  const avoidOptions = ALLERGEN_IDS.filter((id) => !diagnosed.includes(id));

  function toggle(list: AllergenId[], id: AllergenId): AllergenId[] {
    return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  }

  // ——— Birth-date feedback ———
  const now = useMemo(() => new Date(), []);
  const effectiveDueDate = wasPremature && dueDate ? dueDate : undefined;
  const ageMonths =
    birthDate && (!effectiveDueDate || effectiveDueDate >= birthDate)
      ? correctedAgeMonths({ birthDate, dueDate: effectiveDueDate }, now)
      : null;
  const readyOn =
    birthDate && ageMonths !== null
      ? dateAtCorrectedAge({ birthDate, dueDate: effectiveDueDate }, READY_MONTHS)
      : null;
  const readyOnLabel = readyOn
    ? readyOn.toLocaleDateString(locale === "zh" ? "zh-CN" : undefined, {
        month: "long",
        day: "numeric",
        timeZone: "UTC",
        ...(readyOn.getUTCFullYear() === now.getUTCFullYear() ? {} : { year: "numeric" }),
      })
    : "";

  /** Weeks read better than "0.9 months" for the newborns who land here by mistake. */
  function ageLabel(months: number): string {
    if (months < 3) {
      const weeks = Math.round((months * 30.4375) / 7);
      return fmt(effectiveDueDate ? t.ageWeeksCorrected : t.ageWeeks, { n: weeks });
    }
    return fmt(effectiveDueDate ? t.ageMonthsCorrected : t.ageMonths, { n: months.toFixed(1) });
  }

  /**
   * Only a date we genuinely cannot compute an age from stops the wizard. Being
   * too young is explained, never blocked — the profile is still worth having,
   * and Today already renders the wait with its reasons and the pediatrician
   * override.
   */
  const step0Blockers: string[] = [];
  if (!birthDate) step0Blockers.push(birthDateIncomplete ? t.needFullBirthDate : t.needBirthDate);
  else if (birthDate > todayIso()) step0Blockers.push(t.birthDateFuture);
  if (wasPremature && !dueDate) step0Blockers.push(t.needDueDate);
  else if (wasPremature && birthDate && dueDate && dueDate < birthDate) {
    step0Blockers.push(t.dueDateBeforeBirth);
  }
  if (!feedingStyle) step0Blockers.push(t.needFeedingStyle);

  const step1Blockers: string[] = [];
  if (eczema === null) step1Blockers.push(t.needEczema);
  if (existingFoodAllergy === null) step1Blockers.push(t.needAllergyAnswer);
  if (familyHistoryAtopy === null) step1Blockers.push(t.needFamilyAnswer);

  const step3Blockers = disclaimer ? [] : [t.needDisclaimer];

  /** Advance only when nothing is outstanding; otherwise reveal what is. */
  function go(next: number, blockers: string[]) {
    if (blockers.length > 0) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    setStep(next);
  }

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
      knownAllergies: diagnosed,
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

  /**
   * Reconcile the "holding off, not diagnosed" picks with stored overrides.
   * Only touches `avoid-per-doctor` rows, so a reaction pause or a status the
   * family set on the allergen tracker is never clobbered from here.
   */
  function saveAvoidOverrides(babyId: string) {
    const wanted = new Set(hasAvoiding ? avoiding.filter((id) => !diagnosed.includes(id)) : []);
    const setOn = todayIso();
    for (const id of ALLERGEN_IDS) {
      const current = overrides.find((o) => o.babyId === babyId && o.allergenId === id);
      if (wanted.has(id)) {
        if (current?.status !== "avoid-per-doctor") {
          setOverride({ babyId, allergenId: id, status: "avoid-per-doctor", setOn });
        }
      } else if (current?.status === "avoid-per-doctor") {
        clearOverride(babyId, id);
      }
    }
  }

  function finish(then: "today" | "import") {
    const profile = buildProfile();
    saveBaby(profile);
    saveAvoidOverrides(profile.id);
    setActiveBaby(profile.id);
    router.push(then === "today" ? "/today" : "/onboarding/import");
  }

  const steps = [
    // 0 — basics
    <section key="basics" className="space-y-5">
      <h2 className="text-2xl font-extrabold">{t.aboutTitle}</h2>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold">{t.nameLabel}</span>
        <Input
          className="h-12 rounded-xl px-4 text-[15px]"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t.namePlaceholder}
        />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold">{t.birthDateLabel}</span>
        <Input
          className="font-data h-12 rounded-xl px-4 text-[15px]"
          type="date"
          value={birthDate}
          max={todayIso()}
          onChange={(e) => {
            setBirthDate(e.target.value);
            setBirthDateIncomplete(!e.target.value && e.target.validity.badInput);
          }}
          onBlur={(e) => setBirthDateIncomplete(!e.target.value && e.target.validity.badInput)}
        />
        {ageMonths !== null && ageMonths >= 0 && (
          <span className="block text-xs font-semibold text-muted-foreground">
            {fmt(t.babyIsAge, { name: nickname.trim() || t.yourBabyCap, age: ageLabel(ageMonths) })}
          </span>
        )}
      </label>
      <CheckRow checked={wasPremature} onChange={setWasPremature}>
        {t.prematureCheck}
      </CheckRow>
      {wasPremature && (
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold">{t.dueDateLabel}</span>
          <Input
            className="font-data h-12 rounded-xl px-4 text-[15px]"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <span className="block text-xs leading-relaxed text-muted-foreground">
            {t.correctedAgeNote}
          </span>
        </label>
      )}
      {/* Age guidance, not an age gate. Under 4 months there is nothing to
          unlock and we say so; 4–6 months is the window where a pediatrician's
          say-so is the whole difference, so the override lives right here. */}
      {ageMonths !== null && ageMonths >= 0 && ageMonths < READY_MONTHS && (
        <div className="space-y-2.5 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm font-bold">
            {ageMonths < EARLY_START_MONTHS ? t.tooYoungTitle : t.earlyWindowTitle}
          </p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {fmt(ageMonths < EARLY_START_MONTHS ? t.tooYoungBody : t.earlyWindowBody, {
              name: nickname.trim() || t.yourBaby,
              date: readyOnLabel,
            })}
          </p>
          {ageMonths >= EARLY_START_MONTHS && (
            <CheckRow checked={earlyStartApproved} onChange={setEarlyStartApproved} alignTop dashed>
              <span className="font-semibold">{t.earlyStartTitle}</span>{" "}
              <span className="text-muted-foreground">{t.earlyStartDesc}</span>
            </CheckRow>
          )}
          <Link
            href="/learn/when-to-start"
            className="inline-block text-[13px] font-semibold text-primary underline underline-offset-2"
          >
            {t.whenToStartLink}
          </Link>
        </div>
      )}
      <div className="space-y-2">
        <span className="text-sm font-semibold">{t.feedHow}</span>
        <Choice value="purees" current={feedingStyle} onSelect={setFeedingStyle} label={t.pureesLabel} description={t.pureesDesc} />
        <Choice value="baby-led" current={feedingStyle} onSelect={setFeedingStyle} label={t.babyLedLabel} description={t.babyLedDesc} />
        <Choice value="mixed" current={feedingStyle} onSelect={setFeedingStyle} label={t.mixedLabel} description={t.mixedDesc} />
      </div>
      <Blockers id={blockerId} items={step0Blockers} show={attempted} />
      <Button
        className="h-12 w-full text-[15px] font-bold"
        aria-describedby={blockerId}
        onClick={() => go(1, step0Blockers)}
      >
        {t.nextAllergy}<span aria-hidden="true"> →</span>
      </Button>
    </section>,

    // 1 — allergy risk quiz
    <section key="risk" className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold">{t.riskTitle}</h2>
        <p className="text-sm text-muted-foreground">
          {t.riskLede}
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">{t.eczemaQ}</span>
        <div className="grid grid-cols-3 gap-2">
          <Choice center value="none" current={eczema} onSelect={setEczema} label={t.no} />
          <Choice center value="mild-moderate" current={eczema} onSelect={setEczema} label={t.mildModerate} />
          <Choice center value="severe" current={eczema} onSelect={setEczema} label={t.severe} />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.eczemaHelp}
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">{t.allergyQ}</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice center value="no" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(false)} label={t.no} />
          <Choice center value="yes" current={existingFoodAllergy === null ? null : existingFoodAllergy ? "yes" : "no"} onSelect={() => setExistingFoodAllergy(true)} label={t.yes} />
        </div>
        {existingFoodAllergy && (
          <div className="pt-1">
            <AllergenPicker
              label={t.knownWhichQ}
              help={t.knownWhichHelp}
              cmpaHint
              options={ALLERGEN_IDS}
              selected={knownAllergies}
              onToggle={(id) => setKnownAllergies(toggle(knownAllergies, id))}
            />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold">{t.familyQ}</span>
        <div className="grid grid-cols-2 gap-2">
          <Choice center value="no" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(false)} label={t.no} />
          <Choice center value="yes" current={familyHistoryAtopy === null ? null : familyHistoryAtopy ? "yes" : "no"} onSelect={() => setFamilyHistoryAtopy(true)} label={t.yes} />
        </div>
      </div>
      <div className="space-y-2">
        <CheckRow checked={hasAvoiding} onChange={setHasAvoiding} alignTop dashed>
          <span className="font-semibold">{t.avoidingTitle}</span>{" "}
          <span className="text-muted-foreground">{t.avoidingDesc}</span>
        </CheckRow>
        {hasAvoiding && (
          <div className="pt-1">
            <AllergenPicker
              label={t.avoidingWhichQ}
              help={t.avoidingWhichHelp}
              cmpaHint={!existingFoodAllergy}
              options={avoidOptions}
              selected={avoiding}
              onToggle={(id) => setAvoiding(toggle(avoiding, id))}
            />
          </div>
        )}
      </div>
      {(eczema === "severe" || existingFoodAllergy) && (
        <div className="flex items-start gap-2.5 rounded-xl border border-honey/40 bg-accent p-4">
          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-honey" />
          <p className="text-[13px] leading-relaxed text-accent-foreground">
            {t.highRiskNote}
          </p>
        </div>
      )}
      <Blockers id={blockerId} items={step1Blockers} show={attempted} />
      <div className="flex gap-2.5">
        <Button variant="outline" className="h-12 px-6 text-[15px] font-semibold" onClick={() => go(0, [])}>
          <span aria-hidden="true">← </span>{t.back}
        </Button>
        <Button
          className="h-12 flex-1 text-[15px] font-bold"
          aria-describedby={blockerId}
          onClick={() => go(2, step1Blockers)}
        >
          {t.nextReadiness}<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </section>,

    // 2 — readiness quiz
    <section key="readiness" className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold">{fmt(t.readinessTitle, { name: nickname || t.yourBaby })}</h2>
        <p className="text-sm text-muted-foreground">
          {t.readinessLede}
        </p>
      </div>
      <div className="space-y-2">
        {readinessSigns.map((sign, i) => (
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
          {t.notAllYet}
        </p>
      )}
      <CheckRow checked={earlyStartApproved} onChange={setEarlyStartApproved} alignTop dashed>
        <span className="font-semibold">{t.earlyStartTitle}</span>{" "}
        <span className="text-muted-foreground">
          {t.earlyStartDesc}
        </span>
      </CheckRow>
      <div className="flex gap-2.5">
        <Button variant="outline" className="h-12 px-6 text-[15px] font-semibold" onClick={() => go(1, [])}>
          <span aria-hidden="true">← </span>{t.back}
        </Button>
        <Button className="h-12 flex-1 text-[15px] font-bold" onClick={() => go(3, [])}>
          {t.nextLastThing}<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </section>,

    // 3 — disclaimer + verdict + branch
    <section key="finish" className="space-y-5">
      <h2 className="text-2xl font-extrabold">{t.finishTitle}</h2>
      <CheckRow checked={disclaimer} onChange={setDisclaimer} alignTop>
        {t.disclaimer}
      </CheckRow>

      {disclaimer &&
        (readyVerdict ? (
          <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 shadow-xl shadow-foreground/25 sm:p-8 dark:border dark:border-border dark:bg-card">
            <ConfettiSettle />
            <div className="relative space-y-3">
              <p className="font-data text-[11px] tracking-[0.14em] text-secondary uppercase dark:text-secondary-foreground">
                {fmt(t.verdictEyebrow, { count: signCount, total: signTotal })}
              </p>
              <h3 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-background dark:text-foreground">
                {t.itsTime}<span className="text-chart-3">{t.itsTimeDot}</span>
              </h3>
              <p className="text-[15px] leading-relaxed text-background/80 dark:text-foreground/80">
                {allSigns
                  ? fmt(t.allSignsBody, { name: nickname || t.yourBabyCap, total: signTotal })
                  : t.earlyStartBody}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-xl shadow-foreground/10 sm:p-8">
            <p className="font-data text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {fmt(t.verdictEyebrow, { count: signCount, total: signTotal })}
            </p>
            <h3 className="font-heading text-3xl leading-tight font-extrabold tracking-tight">
              {t.notYetTitle}<span className="text-primary">{t.notYetDot}</span>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {fmt(t.notYetBody, { name: nickname || t.yourBabyCap })}
            </p>
            <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4">
              <p className="font-data text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                {t.watchingFor}
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
                {t.pedAdviceQ}
              </span>
              <span className="block text-[13px] leading-relaxed text-foreground/80">
                {t.pedAdviceDesc}
              </span>
              <span className="text-sm font-bold text-secondary-foreground">
                {t.beginToday}<span aria-hidden="true"> →</span>
              </span>
            </button>
          </div>
        ))}

      <Blockers id={blockerId} items={step3Blockers} show={attempted} />
      <div className="flex flex-col gap-2.5">
        <Button
          className="h-12 w-full text-[15px] font-bold"
          aria-describedby={blockerId}
          onClick={() => (disclaimer ? finish("today") : setAttempted(true))}
        >
          {editing || adding ? t.saveProfile : t.startFresh}
        </Button>
        {!editing && !adding && (
          <Button
            variant="outline"
            className="h-12 w-full text-[15px] font-semibold"
            aria-describedby={blockerId}
            onClick={() => (disclaimer ? finish("import") : setAttempted(true))}
          >
            {t.alreadyStarted}
          </Button>
        )}
        <Button
          variant="ghost"
          className="h-11 w-full text-sm text-muted-foreground"
          onClick={() => go(2, [])}
        >
          <span aria-hidden="true">← </span>{t.back}
        </Button>
      </div>
    </section>,
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-3xl font-extrabold">
        {editing ? t.h1Edit : adding ? t.h1Add : t.h1Setup}
      </h1>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-foreground/10 sm:p-8">
        <div className="mb-5 space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-data text-[11px] tracking-[0.14em] text-muted-foreground">
              {fmt(t.stepOf, { step: step + 1, total: steps.length })}
            </span>
            {step === 0 && (
              <span className="font-data text-[11px] tracking-[0.02em] text-muted-foreground">
                {t.twoMin}
              </span>
            )}
          </div>
          <StepSegments step={step} total={steps.length} />
        </div>
        {steps[step]}
      </div>
      <p className="text-xs text-muted-foreground">
        {t.browseBefore}{" "}
        <Link href="/foods" className="font-medium text-primary underline underline-offset-2">
          {t.browseLink}
        </Link>{" "}
        {t.browseAfter}
      </p>
    </div>
  );
}
