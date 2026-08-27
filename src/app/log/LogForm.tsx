"use client";

import Link from"next/link";
import { useRouter, useSearchParams } from"next/navigation";
import { useMemo, useState } from"react";
import type { AgeBand } from"@/content-schema/food";
import { bandForAgeMonths, todayIso } from"@/lib/food-utils";
import { correctedAgeMonths } from"@/lib/age";
import { onsetForElapsed } from"@/lib/checkins";
import { useActiveBaby, useActiveCheckIns, useHydrated } from"@/lib/hooks";
import { newId, useGuideStore } from"@/lib/storage/store";
import { clockNow } from"@/lib/journal";
import {
  commitPhoto,
  LogDetailFields,
  type LogDetails,
  type PhotoState,
} from"@/components/journal/LogDetailFields";
import { logDetailMsgs } from"@/lib/i18n/messages/journal";
import { CheckInOffer } from"./CheckInOffer";
import type { AmountEaten, Enjoyment, SymptomId } from"@/lib/storage/types";
import { SYMPTOM_IDS } from"@/lib/storage/types";
import { triage, type TriageResult } from"@/lib/triage";
import { fmt, msg } from"@/lib/i18n/config";
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

  const [foodSlug, setFoodSlug] = useState(params.get("food") ?? "");
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
  const [savedClean, setSavedClean] = useState<{ logId: string } | null>(null);

  const food = foodBySlug.get(activeCheckIn?.foodSlug ?? foodSlug);
  const ageMonths = baby ? correctedAgeMonths(baby, new Date()) : 7;
  const defaultBand = food
    ? (food.prepSpecs.find((p) => p.band === bandForAgeMonths(ageMonths))?.band ??
      food.prepSpecs[0].band)
    : "6-8m";

  const matches = useMemo(() => {
    const q = foodQuery.trim().toLowerCase();
    if (!q) return [];
    return foods
      .filter((f) => f.name.toLowerCase().includes(q) || f.slug.includes(q))
      .slice(0, 8);
  }, [foodQuery, foods]);

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
    if (!food || !baby) return;
    const id = newId();
    const { photoId, failed } = await commitPhoto(photo);
    setPhotoFailed(failed);
    addLog({
      id,
      babyId: baby.id,
      foodSlug: food.slug,
      date,
      time: details.time,
      mealSlot: details.mealSlot,
      quantity: details.quantity,
      notes: details.notes,
      photoId,
      prepBandUsed: band ?? defaultBand,
      amountEaten: amount,
      enjoyment,
      gagging,
      symptoms,
      symptomOnset:
        symptoms.length > 0 && activeCheckIn?.createdAt
          ? onsetForElapsed(new Date(activeCheckIn.createdAt), new Date())
          : undefined,
    });
    if (activeCheckIn) resolveCheckIn(activeCheckIn.id, "done");
    const result = triage(symptoms, locale);
    if (result.severity === "none") {
      setSavedClean({ logId: id });
    } else {
      setSaved(result);
    }
  }

  if (savedClean && food && baby) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Alert className="border-primary/40">
          <AlertTitle className="text-base">{t.loggedNice}</AlertTitle>
          <AlertDescription>
            {fmt(t.inTheBook, { food: food.name, name: baby.nickname })}
          </AlertDescription>
        </Alert>
        {photoFailed && (
          <Alert>
            <AlertDescription>{td.photoFailed}</AlertDescription>
          </Alert>
        )}
        {!activeCheckIn && <CheckInOffer food={food} baby={baby} logId={savedClean.logId} />}
        <div className="flex gap-3">
          <Button onClick={() => router.push("/today")} className="bg-primary text-primary-foreground hover:bg-primary/85">
            {t.backToToday}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSavedClean(null);
              setFoodSlug("");
              setFoodQuery("");
              setSymptoms([]);
              setGagging(false);
            }}
          >
            {t.logAnother}
          </Button>
        </div>
      </div>
    );
  }

  if (saved) {
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
        {saved.pausesAllergen && food?.commonAllergen && (
          <p className="text-sm text-muted-foreground">
            {fmt(t.allergenPaused, {
              allergen:
                locale === "en" ? food.commonAllergen : allergenLabel(food.commonAllergen, locale),
            })}{" "}
            <Link href={`/allergens/${food.commonAllergen}`} className="underline underline-offset-2">
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

      {activeCheckIn && food && (
        <Alert className="border-amber-400">
          <AlertTitle>{fmt(t.howLooks, { name: baby.nickname, food: food.name })}</AlertTitle>
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

      {/* 1. Food */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t.foodSection}</h2>
        {food ? (
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-primary bg-secondary px-4 py-2 font-medium">
              {food.name}
            </span>
            {!activeCheckIn && (
              <button
                type="button"
                className="text-sm text-muted-foreground underline underline-offset-2"
                onClick={() => {
                  setFoodSlug("");
                  setBand(null);
                }}
              >
                {t.change}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              autoFocus
              placeholder={t.searchPlaceholder}
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              aria-label={t.searchAria}
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
            <h2 className="text-sm font-semibold">{t.prepUsed}</h2>
            <div className="flex flex-wrap gap-2">
              {food.prepSpecs.map((p) => (
                <Chip
                  key={p.band}
                  active={(band ?? defaultBand) === p.band}
                  onClick={() => setBand(p.band)}
                >
                  {bandLabel(p.band, locale)}
                </Chip>
              ))}
            </div>
          </section>

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
            {showDetails && (
              <LogDetailFields
                value={details}
                onChange={setDetails}
                photo={photo}
                onPhotoChange={setPhoto}
              />
            )}
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
