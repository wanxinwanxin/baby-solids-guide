"use client";

import Link from"next/link";
import { useRouter, useSearchParams } from"next/navigation";
import { useMemo, useState } from"react";
import type { AgeBand } from"@/content-schema/food";
import { FOOD_SEARCH_TERMS } from"../../../content/foods/search-terms";
import { FOOD_CLASS_TERMS } from"../../../content/foods/search-classes";
import { rankMatches } from"@/lib/search/rank";
import { bandForAgeMonths, todayIso } from"@/lib/food-utils";
import { reportFoodRequest } from"@/lib/feedback";
import { correctedAgeMonths } from"@/lib/age";
import { onsetForElapsed } from"@/lib/checkins";
import { deriveAllergenStates } from"@/lib/engine";
import {
  addMealPick,
  bandForFood,
  buildMealLogs,
  contentFoods,
  foodsToWatch,
  mealBands,
  mealFoodKey,
  mealFoodName,
  type MealPick,
  newAllergensInMeal,
  removeMealPick,
  resolveMealPicks,
} from"@/lib/meal-log";
import {
  useActiveBaby,
  useActiveCheckIns,
  useActiveLogs,
  useActiveOverrides,
  useHydrated,
} from"@/lib/hooks";
import { newId, useGuideStore } from"@/lib/storage/store";
import { clockNow } from"@/lib/journal";
import {
  commitPhoto,
  LogDetailFields,
  PhotoField,
  type LogDetails,
  type PhotoState,
} from"@/components/journal/LogDetailFields";
import { logDetailMsgs } from"@/lib/i18n/messages/journal";
import { CheckInOffer } from"./CheckInOffer";
import type { AmountEaten, Enjoyment, SymptomId } from"@/lib/storage/types";
import { SYMPTOM_IDS } from"@/lib/storage/types";
import { triage, type TriageResult } from"@/lib/triage";
import { fmt, joinList, msg } from"@/lib/i18n/config";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { allergenLabel, bandLabel, symptomLabel } from"@/lib/i18n/labels";
import { useL10nFoods } from"@/lib/i18n/content-client";
import { AMOUNT_MSGS, ENJOYMENT_MSGS, logFormMsgs } from"@/lib/i18n/messages/log";
import { EmergencyDialog } from"@/components/EmergencyDialog";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { cn } from"@/lib/utils";

const AMOUNTS: AmountEaten[] = ["none", "taste", "some", "lots"];
const ENJOYMENT: Enjoyment[] = ["loved", "neutral", "disliked", "refused"];

function Chip({
  active,
  onClick,
  children,
  /** Set on a chip that toggles a choice, left off on one that adds a food. */
  pressed,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
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
  const baby = useActiveBaby();
  const locale = useLocale();
  const t = useMsgs(logFormMsgs);
  const td = useMsgs(logDetailMsgs);
  const { foods, foodBySlug } = useL10nFoods();
  const addLog = useGuideStore((s) => s.addLog);
  const resolveCheckIn = useGuideStore((s) => s.resolveCheckIn);
  const checkIns = useActiveCheckIns();
  const checkinId = params.get("checkin");
  const activeCheckIn = checkinId
    ? (checkIns.find((c) => c.id === checkinId && c.status === "pending") ?? null)
    : null;

  // The meal. A food is held as a reference (slug, or a typed name) and
  // resolved against the food index on every render, so a language switch
  // re-reads the names instead of freezing the ones picked first.
  const [ownPicks, setOwnPicks] = useState<MealPick[]>(() => {
    const slug = params.get("food");
    return slug ? [{ kind: "content", slug }] : [];
  });
  const [foodQuery, setFoodQuery] = useState("");
  const [date, setDate] = useState(todayIso());
  const [band, setBand] = useState<AgeBand | null>(null);
  const [amount, setAmount] = useState<AmountEaten>("some");
  const [enjoyment, setEnjoyment] = useState<Enjoyment>("neutral");
  const [gagging, setGagging] = useState(false);
  // Time is pre-filled with "now" because the overwhelmingly common case is
  // logging a feed that just happened; changing the date clears it (see below)
  // rather than stamping today's clock onto a back-dated entry.
  const [details, setDetails] = useState<LogDetails>({ time: clockNow() });
  const [photo, setPhoto] = useState<PhotoState>({ kind: "none" });
  const [showDetails, setShowDetails] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [emergency, setEmergency] = useState<TriageResult | null>(null);
  const [saved, setSaved] = useState<TriageResult | null>(null);
  const [savedClean, setSavedClean] = useState<{ logIdBySlug: Record<string, string> } | null>(
    null,
  );

  // A check-in asks about one named food, so that flow pins the meal to it.
  const picks = useMemo<MealPick[]>(
    () => (activeCheckIn ? [{ kind: "content", slug: activeCheckIn.foodSlug }] : ownPicks),
    [activeCheckIn, ownPicks],
  );
  const picked = useMemo(() => resolveMealPicks(picks, foodBySlug), [picks, foodBySlug]);
  const pickedFoods = contentFoods(picked);
  // One content food keeps its own prep list, where every option shows the
  // real prep. Several foods share one stage instead, because the prep text
  // differs per food — each food then records the stage it is served at.
  const soleFood = pickedFoods.length === 1 ? pickedFoods[0] : null;
  const ageMonths = baby ? correctedAgeMonths(baby, new Date()) : 7;
  const bands = mealBands(picked);
  const ageBand = bandForAgeMonths(ageMonths);
  const defaultBand: AgeBand = soleFood
    ? bandForFood(soleFood, null, ageMonths)
    : bands.includes(ageBand)
      ? ageBand
      : (bands[0] ?? ageBand);

  const matches = useMemo(
    () =>
      // Match any common name in either language (see content/foods/search-terms),
      // so 番茄 / 土豆 / 奇异果 find the food whatever the UI language is. Ranked,
      // never merely filtered: this list shows eight rows, and an unranked
      // filter once spent all eight on "pearl barley", "chickpea dip", and
      // "spearmint" while peas — the food the parent typed — sat at position
      // nine and never appeared.
      rankMatches(
        foods,
        foodQuery,
        (f) => ({
          name: f.name,
          alt: [...(FOOD_SEARCH_TERMS[f.slug] ?? f.aliases), f.slug],
          cls: FOOD_CLASS_TERMS[f.slug],
        }),
        8,
      ),
    [foodQuery, foods],
  );

  // Custom foods the family already logged (by name) — offered for reuse so a
  // one-off name does not become a new entry every time.
  const allLogs = useGuideStore((s) => s.logs);
  const knownCustomNames = useMemo(() => {
    const names = new Map<string, string>(); // lowercase → original display
    for (const l of allLogs) if (l.customFoodName) names.set(l.customFoodName.toLowerCase(), l.customFoodName);
    return names;
  }, [allLogs]);
  const customMatches = useMemo(() => {
    const q = foodQuery.trim().toLowerCase();
    if (!q) return [];
    return [...knownCustomNames.values()].filter((n) => n.toLowerCase().includes(q)).slice(0, 5);
  }, [foodQuery, knownCustomNames]);

  // Guidance is one new allergen at a time. A meal can now hold two, so the
  // form says so while the parent can still act on it.
  const babyLogs = useActiveLogs();
  const overrides = useActiveOverrides();
  const newAllergens = useMemo(() => {
    if (!baby || picked.length < 2) return [];
    const states = deriveAllergenStates({ baby, logs: babyLogs, overrides, foods });
    return newAllergensInMeal(picked, (id) => states.get(id)?.status !== "not-started");
  }, [baby, babyLogs, overrides, foods, picked]);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>{t.setupTitle}</AlertTitle>
        <AlertDescription>
          {t.setupBody}{" "}
          <Link href="/onboarding"className="underline underline-offset-2">
            {t.startHere}
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
    const result = triage(nextSymptoms, locale);
    if (result.severity === "emergency") setEmergency(result);
  }

  async function save() {
    if (!baby || picked.length === 0) return;
    const { photoId, failed } = await commitPhoto(photo);
    setPhotoFailed(failed);
    // A never-seen custom food is a signal that the food database is missing
    // something — tell the owner so it can be added (best-effort, guests too).
    for (const pick of picked) {
      if (pick.kind === "custom" && !knownCustomNames.has(pick.name.trim().toLowerCase())) {
        reportFoodRequest(pick.name.trim(), locale);
      }
    }
    const mealLogs = buildMealLogs({
      babyId: baby.id,
      foods: picked,
      date,
      band,
      ageMonths,
      amountEaten: amount,
      enjoyment,
      gagging,
      symptoms,
      symptomOnset:
        symptoms.length > 0 && activeCheckIn?.createdAt
          ? onsetForElapsed(new Date(activeCheckIn.createdAt), new Date())
          : undefined,
      time: details.time,
      mealSlot: details.mealSlot,
      quantity: details.quantity,
      notes: details.notes,
      photoId,
      newId,
    });
    for (const log of mealLogs) addLog(log);
    if (activeCheckIn) resolveCheckIn(activeCheckIn.id, "done");
    const result = triage(symptoms, locale);
    if (result.severity === "none") {
      setSavedClean({ logIdBySlug: Object.fromEntries(mealLogs.map((l) => [l.foodSlug, l.id])) });
    } else {
      setSaved(result);
    }
  }

  if (savedClean && baby && picked.length > 0) {
    const names = picked.map(mealFoodName);
    const watchFoods = foodsToWatch(picked);
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Alert className="border-primary/40">
          <AlertTitle className="text-base">{t.loggedNice}</AlertTitle>
          <AlertDescription>
            {names.length === 1
              ? fmt(t.inTheBook, { food: names[0], name: baby.nickname })
              : fmt(t.inTheBookMany, { foods: joinList(names, locale), name: baby.nickname })}
          </AlertDescription>
        </Alert>
        {photoFailed && (
          <Alert>
            <AlertDescription>{td.photoFailed}</AlertDescription>
          </Alert>
        )}
        {/* Check-in offers key off allergen metadata a custom food lacks. */}
        {!activeCheckIn && watchFoods.length > 0 && (
          <CheckInOffer
            foods={watchFoods}
            baby={baby}
            logIdBySlug={savedClean.logIdBySlug}
            mealSize={picked.length}
          />
        )}
        <div className="flex gap-3">
          <Button onClick={() => router.push("/today")} className="bg-primary text-primary-foreground hover:bg-primary/85">
            {t.backToToday}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSavedClean(null);
              setOwnPicks([]);
              setFoodQuery("");
              setSymptoms([]);
              setGagging(false);
              setBand(null);
              // The next meal is a different plate, so it starts without the
              // photo this one saved.
              setPhoto({ kind: "none" });
            }}
          >
            {t.logAnother}
          </Button>
        </div>
      </div>
    );
  }

  if (saved) {
    // With several foods on the plate, the paused group is the allergen among
    // them — a meal of familiar foods pauses nothing.
    const allergenFood = pickedFoods.find((f) => f.commonAllergen);
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Alert
          className={cn(
            saved.severity === "educate" ? "border-primary/40" : "border-red-400",
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
        {saved.pausesAllergen && allergenFood?.commonAllergen && (
          <p className="text-sm text-muted-foreground">
            {fmt(t.allergenPaused, {
              allergen:
                locale === "en"
                  ? allergenFood.commonAllergen
                  : allergenLabel(allergenFood.commonAllergen, locale),
            })}{" "}
            <Link
              href={`/allergens/${allergenFood.commonAllergen}`}
              className="underline underline-offset-2"
            >
              {t.reactionPlaybook}
            </Link>
          </p>
        )}
        <div className="flex gap-3">
          <Button onClick={() => router.push("/today")}>{t.backToToday}</Button>
          <Link href="/safety"className="self-center text-sm underline underline-offset-2">
            {t.emergencyGuide}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {emergency && <EmergencyDialog result={emergency} onAcknowledge={() => setEmergency(null)} />}

      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">{activeCheckIn ? t.checkInTitle : t.logAFood}</h1>
        <Link href="/safety"className="text-xs text-red-700 underline underline-offset-2 dark:text-red-400">
          {t.worriedNow}
        </Link>
      </div>

      {activeCheckIn && soleFood && (
        <Alert className="border-amber-400">
          <AlertTitle>{fmt(t.howLooks, { name: baby.nickname, food: soleFood.name })}</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-3">
            <span>{t.tickAnything}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                resolveCheckIn(activeCheckIn.id, "done");
                router.push("/today");
              }}
            >
              {t.allClear}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 1. Food — a meal, so the picker stays open after the first pick. */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t.foodSection}</h2>
        {picked.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {picked.map((pick) => (
              <li
                key={mealFoodKey(pick)}
                className="flex items-center gap-2 rounded-lg border border-primary bg-secondary px-4 py-2 font-medium"
              >
                <span>{mealFoodName(pick)}</span>
                {pick.kind === "custom" && (
                  <span className="font-data text-[11px] font-normal text-muted-foreground">
                    {t.customTag}
                  </span>
                )}
                {!activeCheckIn && (
                  <button
                    type="button"
                    aria-label={fmt(t.removeFood, { food: mealFoodName(pick) })}
                    onClick={() => setOwnPicks((p) => removeMealPick(p, mealFoodKey(pick)))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {!activeCheckIn && (
          <div className="space-y-2">
            <Input
              autoFocus
              placeholder={picked.length > 0 ? t.addMorePlaceholder : t.searchPlaceholder}
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              aria-label={t.searchAria}
            />
            <div className="flex flex-wrap gap-2">
              {matches.map((f) => (
                <Chip
                  key={f.slug}
                  active={false}
                  onClick={() => {
                    setOwnPicks((p) => addMealPick(p, { kind: "content", slug: f.slug }));
                    setFoodQuery("");
                  }}
                >
                  {f.name}
                </Chip>
              ))}
              {customMatches.map((n) => (
                <Chip
                  key={`c-${n}`}
                  active={false}
                  onClick={() => {
                    setOwnPicks((p) => addMealPick(p, { kind: "custom", name: n }));
                    setFoodQuery("");
                  }}
                >
                  {n}
                </Chip>
              ))}
            </div>
            {/* Nothing in the database matches — let the parent add it anyway. */}
            {foodQuery.trim() && matches.length === 0 && (
              <button
                type="button"
                onClick={() => {
                  setOwnPicks((p) => addMealPick(p, { kind: "custom", name: foodQuery.trim() }));
                  setFoodQuery("");
                }}
                className="flex w-full items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 text-left text-sm hover:border-primary/60"
              >
                <span aria-hidden="true" className="text-primary">＋</span>
                <span>{fmt(t.addCustom, { food: foodQuery.trim() })}</span>
              </button>
            )}
          </div>
        )}
        {picked.length > 1 && (
          <p className="text-xs text-muted-foreground">
            {fmt(t.mealCount, { n: picked.length })}
          </p>
        )}
      </section>

      {/* One new allergen at a time — said before the save, and never a block:
          the parent saw the plate, and we did not. */}
      {newAllergens.length > 1 && (
        <Alert className="border-honey/60 bg-accent/40">
          <AlertTitle>
            {fmt(t.newAllergensTitle, {
              allergens: joinList(
                newAllergens.map((a) => allergenLabel(a, locale)),
                locale,
              ),
            })}
          </AlertTitle>
          <AlertDescription>{t.newAllergensBody}</AlertDescription>
        </Alert>
      )}

      {picked.length > 0 && (
        <>
          {/* 2. How was it served — with one food, each option shows the
              actual prep, so the choice is legible at a glance. A custom food
              has no prep specs, so this list is content-foods only. */}
          {soleFood && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">{t.prepUsed}</h2>
            <div className="space-y-2" role="radiogroup" aria-label={t.prepUsed}>
              {soleFood.prepSpecs.map((p) => {
                const selected = (band ?? defaultBand) === p.band;
                return (
                  <button
                    key={p.band}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setBand(p.band)}
                    className={cn(
                      "w-full rounded-lg border px-4 py-2.5 text-left transition-colors",
                      selected
                        ? "border-primary bg-secondary/60 ring-1 ring-primary"
                        : "hover:border-primary/60",
                    )}
                  >
                    <span className="font-data block text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                      {bandLabel(p.band, locale)}
                    </span>
                    <span
                      className={cn(
                        "block text-sm leading-snug",
                        selected ? "font-medium" : "text-foreground/80",
                      )}
                    >
                      {p.form}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
          )}

          {/* Several foods: one stage for the plate, because the prep text
              differs per food. Each food still records the stage it is
              actually served at (see lib/meal-log). */}
          {pickedFoods.length > 1 && (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold">{t.prepUsed}</h2>
              <div className="flex flex-wrap gap-2">
                {bands.map((b) => (
                  <Chip
                    key={b}
                    active={(band ?? defaultBand) === b}
                    pressed={(band ?? defaultBand) === b}
                    onClick={() => setBand(b)}
                  >
                    {bandLabel(b, locale)}
                  </Chip>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t.mealPrepNote}</p>
            </section>
          )}

          {pickedFoods.length < picked.length && (
            <p className="rounded-lg border border-dashed px-4 py-2.5 text-sm text-muted-foreground">
              {t.customNoPrep}
            </p>
          )}

          {/* 3. Amount */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">{t.howMuch}</h2>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <Chip key={a} active={amount === a} onClick={() => setAmount(a)}>
                  {msg(AMOUNT_MSGS[a], locale)}
                </Chip>
              ))}
            </div>
          </section>

          {/* 4. Reaction */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">{t.howDidItGo}</h2>
            <div className="flex flex-wrap gap-2">
              {ENJOYMENT.map((e) => (
                <Chip key={e} active={enjoyment === e} onClick={() => setEnjoyment(e)}>
                  {msg(ENJOYMENT_MSGS[e], locale)}
                </Chip>
              ))}
            </div>
            <label className="flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={gagging}
                onChange={(e) => setGagging(e.target.checked)}
                className="size-4 accent-primary"
              />
              {t.gaggingBefore}
              <Link href="/safety"className="underline underline-offset-2">
                {t.gaggingLink}
              </Link>
              {t.gaggingAfter}
            </label>
          </section>

          {/* Symptoms — opt-in expansion */}
          <section className="space-y-2">
            <button
              type="button"
              onClick={() => setShowSymptoms((s) => !s)}
              className="text-sm font-semibold underline-offset-2 hover:underline"
              aria-expanded={showSymptoms || !!activeCheckIn}
            >
              {showSymptoms || activeCheckIn ? "▾" : "▸"} {t.anySymptoms}
            </button>
            {(showSymptoms || !!activeCheckIn) && (
              <div className="space-y-1.5 rounded-lg border p-3">
                {SYMPTOM_IDS.map((id) => (
                  <label key={id} className="flex min-h-9 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={symptoms.includes(id)}
                      onChange={() => toggleSymptom(id)}
                      className="size-4 accent-red-700"
                    />
                    {symptomLabel(id, locale)}
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Photo — surfaced on its own (not under "Details"), because a meal
              photo is a common, wanted action and was too easy to miss. */}
          <section className="space-y-2">
            <PhotoField photo={photo} onChange={setPhoto} />
          </section>

          {/* Details — opt-in expansion, mirroring the symptoms pattern */}
          <section className="space-y-2">
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="text-sm font-semibold underline-offset-2 hover:underline"
              aria-expanded={showDetails}
            >
              {showDetails ? "▾" : "▸"} {td.detailsToggle}
            </button>
            {showDetails && <LogDetailFields value={details} onChange={setDetails} />}
          </section>

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">
              {t.dateLabel}{" "}
              <input
                type="date"
                value={date}
                max={todayIso()}
                onChange={(e) => {
                  const next = e.target.value;
                  setDate(next);
                  // "Now" only means anything for today. Back-dating an entry
                  // drops the pre-filled clock instead of inventing a time the
                  // parent never chose.
                  if (next !== todayIso()) setDetails((d) => ({ ...d, time: undefined }));
                }}
                className="rounded-md border px-2 py-1.5 text-sm"
              />
            </label>
            <Button
              onClick={() => void save()}
              size="lg"
              className="ml-auto bg-primary text-primary-foreground hover:bg-primary/85"
            >
              {t.saveLog}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
