"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useActiveBaby,
  useActiveCareLogs,
  useActiveSleepSessions,
  useHydrated,
} from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { careMsgs } from "@/lib/i18n/messages/care";
import { datetimeMsgs } from "@/lib/i18n/messages/datetime";
import { localIsoDate } from "@/lib/food-utils";
import { dailySleep } from "@/lib/sleep/history";
import { formatDuration, formatTime } from "@/lib/sleep/model";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { CareLog, DiaperKind, FormulaUnit } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DateTimeField } from "@/components/DateTimeField";
import { TimeConfirm } from "@/components/TimeConfirm";
import { cn } from "@/lib/utils";

const MIN = 60 * 1000;
const ML_PRESETS = [60, 90, 120, 150, 180];
const OZ_PRESETS = [2, 3, 4, 5, 6];
const DIAPER_KINDS: DiaperKind[] = ["wet", "dirty", "mixed", "dry"];
const DIAPER_EMOJI: Record<DiaperKind, string> = {
  wet: "💧",
  dirty: "💩",
  mixed: "💧💩",
  dry: "✨",
};

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
        "min-h-9 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
      )}
    >
      {children}
    </button>
  );
}

const localDateKey = (iso: string) => localIsoDate(new Date(iso));

/** "360 ml" / "360 ml + 4 oz" — totals never mix units silently. */
function formatBottleTotal(logs: CareLog[]): string {
  const totals = new Map<FormulaUnit, number>();
  for (const l of logs) {
    if (l.kind !== "formula" || !l.amount) continue;
    totals.set(l.amount.unit, (totals.get(l.amount.unit) ?? 0) + l.amount.value);
  }
  return [...totals.entries()].map(([unit, v]) => `${Math.round(v * 10) / 10} ${unit}`).join(" + ");
}

/** One logged bottle or diaper — journal row pattern (Edit pill, delete inside). */
function CareRow({
  log,
  kindLabels,
  onUpdate,
  onDelete,
}: {
  log: CareLog;
  kindLabels: Record<DiaperKind, string>;
  onUpdate: (id: string, patch: Partial<Omit<CareLog, "id" | "babyId">>) => void;
  onDelete: (id: string) => void;
}) {
  const locale = useLocale();
  const t = useMsgs(careMsgs);
  const dt = useMsgs(datetimeMsgs);
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editAt, setEditAt] = useState<Date | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editUnit, setEditUnit] = useState<FormulaUnit>("ml");
  const [editKind, setEditKind] = useState<DiaperKind>("wet");
  const [error, setError] = useState<"time" | "amount" | null>(null);

  const atMs = new Date(log.at).getTime();
  const label =
    log.kind === "formula"
      ? fmt(t.formulaEntry, { amount: log.amount ? `${log.amount.value} ${log.amount.unit}` : "—" })
      : fmt(t.diaperEntry, { kind: kindLabels[log.diaper ?? "wet"] });
  const emoji = log.kind === "formula" ? "🍼" : DIAPER_EMOJI[log.diaper ?? "wet"];

  function startEditing() {
    setEditAt(new Date(log.at));
    setEditAmount(log.amount ? String(log.amount.value) : "");
    setEditUnit(log.amount?.unit ?? "ml");
    setEditKind(log.diaper ?? "wet");
    setConfirmingDelete(false);
    setError(null);
    setEditing(true);
  }

  function saveEdits() {
    if (!editAt) {
      setError("time");
      return;
    }
    if (log.kind === "formula") {
      const value = Number(editAmount);
      if (!Number.isFinite(value) || value <= 0 || value > 2000) {
        setError("amount");
        return;
      }
      onUpdate(log.id, { at: editAt.toISOString(), amount: { value, unit: editUnit } });
    } else {
      onUpdate(log.id, { at: editAt.toISOString(), diaper: editKind });
    }
    setEditing(false);
  }

  return (
    <li className="rounded-xl border px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm">
          <span className="font-data">{formatTime(atMs, locale)}</span>
          <span aria-hidden="true" className="mx-2">
            {emoji}
          </span>
          {label}
        </span>
        <button
          type="button"
          onClick={editing ? () => setEditing(false) : startEditing}
          aria-expanded={editing}
          aria-label={fmt(t.editAria, {
            what: log.kind === "formula" ? t.formulaTitle : t.diaperTitle,
            time: formatTime(atMs, locale),
          })}
          className="inline-flex min-h-9 shrink-0 items-center rounded-full border px-3 text-xs font-medium text-muted-foreground hover:border-primary/60 hover:text-foreground"
        >
          {editing ? t.cancel : t.editEntry}
        </button>
      </div>

      {editing && (
        <div className="mt-3 space-y-3 border-t pt-3">
          <div className="flex flex-wrap items-end gap-4">
            <DateTimeField
              id={`edit-${log.id}-at`}
              label={log.kind === "formula" ? t.fedAt : t.changedAt}
              initial={editAt}
              onChange={setEditAt}
            />
            {log.kind === "formula" ? (
              <div className="flex items-end gap-2">
                <div className="space-y-0.5">
                  <label
                    htmlFor={`edit-${log.id}-amount`}
                    className="block text-[11px] text-muted-foreground"
                  >
                    {t.amountLabel}
                  </label>
                  <Input
                    id={`edit-${log.id}-amount`}
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-24"
                  />
                </div>
                {(["ml", "oz"] as const).map((u) => (
                  <Chip key={u} active={editUnit === u} onClick={() => setEditUnit(u)}>
                    {u}
                  </Chip>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {DIAPER_KINDS.map((k) => (
                  <Chip key={k} active={editKind === k} onClick={() => setEditKind(k)}>
                    {kindLabels[k]}
                  </Chip>
                ))}
              </div>
            )}
          </div>
          {error && (
            <p className="text-sm text-destructive">
              {error === "amount" ? t.amountInvalid : dt.timeInvalid}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={saveEdits}>
              {t.saveChanges}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              {t.cancel}
            </Button>
            {confirmingDelete ? (
              <span className="ml-auto flex items-center gap-2 text-xs">
                <span>{t.deleteConfirm}</span>
                <Button size="sm" variant="destructive" onClick={() => onDelete(log.id)}>
                  {t.yesDelete}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setConfirmingDelete(false)}>
                  {t.keepEntry}
                </Button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="ml-auto inline-flex min-h-9 items-center text-xs text-destructive underline-offset-2 hover:underline"
              >
                {t.deleteEntry}
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export function CareClient() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const locale = useLocale();
  const t = useMsgs(careMsgs);

  const careLogs = useActiveCareLogs();
  const sleepSessions = useActiveSleepSessions();
  const addCareLog = useGuideStore((s) => s.addCareLog);
  const updateCareLog = useGuideStore((s) => s.updateCareLog);
  const deleteCareLog = useGuideStore((s) => s.deleteCareLog);

  const [unit, setUnit] = useState<FormulaUnit>("ml");
  const [amount, setAmount] = useState<number | null>(null);
  const [customText, setCustomText] = useState("");
  const [diaperKind, setDiaperKind] = useState<DiaperKind | null>(null);

  const kindLabels: Record<DiaperKind, string> = useMemo(
    () => ({ wet: t.kindWet, dirty: t.kindDirty, mixed: t.kindMixed, dry: t.kindDry }),
    [t],
  );

  const now = new Date();
  const todayKey = localDateKey(now.toISOString());
  const todayLogs = careLogs
    .filter((l) => localDateKey(l.at) === todayKey)
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());

  // Previous days, newest first — bottles, diapers, and sleep in one line
  // per day, which is the "one place" a grandparent actually wants. Sleep
  // minutes come from dailySleep, which clips a midnight-crossing session to
  // each day it touches — the same math as /sleep history, so the two pages
  // report the same daily totals.
  const recentDays = useMemo(() => {
    const byDay = new Map<string, { at: number; logs: CareLog[]; sleepMin: number }>();
    const dayOf = (key: string) => {
      if (!byDay.has(key)) {
        const [y, m, d] = key.split("-").map(Number);
        byDay.set(key, { at: new Date(y, m - 1, d, 12).getTime(), logs: [], sleepMin: 0 });
      }
      return byDay.get(key)!;
    };
    for (const l of careLogs) dayOf(localDateKey(l.at)).logs.push(l);
    for (const d of dailySleep(sleepSessions, new Date(), 30)) {
      dayOf(d.dateIso).sleepMin = d.totalMinutes;
    }
    return [...byDay.entries()]
      .filter(([key]) => key !== todayKey)
      .sort((a, b) => b[1].at - a[1].at)
      .slice(0, 7);
  }, [careLogs, sleepSessions, todayKey]);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <div className="mx-auto max-w-md pt-10">
        <Alert>
          <AlertTitle>{t.setupTitle}</AlertTitle>
          <AlertDescription>
            {t.setupBody}{" "}
            <Link href="/onboarding" className="underline underline-offset-2">
              {t.startOnboarding}
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const presets = unit === "ml" ? ML_PRESETS : OZ_PRESETS;
  const notFuture = (d: Date) => (d.getTime() > Date.now() + MIN ? t.futureTime : null);

  const dayLabel = (at: number) =>
    new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date(at));

  const daySummary = (logs: CareLog[], sleepMin: number): string => {
    const parts: string[] = [];
    const bottles = logs.filter((l) => l.kind === "formula");
    const diapers = logs.filter((l) => l.kind === "diaper");
    if (bottles.length > 0) {
      parts.push(fmt(t.bottleSummary, { n: bottles.length, total: formatBottleTotal(bottles) }));
    }
    if (diapers.length > 0) parts.push(fmt(t.diaperSummary, { n: diapers.length }));
    if (sleepMin > 0) parts.push(fmt(t.sleepSummary, { dur: formatDuration(sleepMin, locale) }));
    return parts.join(" · ");
  };

  const todayBottles = todayLogs.filter((l) => l.kind === "formula");
  const todayDiapers = todayLogs.filter((l) => l.kind === "diaper");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="text-muted-foreground">{t.intro}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.formulaTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">{t.amountLabel}</span>
            {(["ml", "oz"] as const).map((u) => (
              <Chip
                key={u}
                active={unit === u}
                onClick={() => {
                  setUnit(u);
                  setAmount(null);
                  setCustomText("");
                }}
              >
                {u}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((v) => (
              <Chip
                key={v}
                active={amount === v && customText === ""}
                onClick={() => {
                  setAmount(v);
                  setCustomText("");
                }}
              >
                {v} {unit}
              </Chip>
            ))}
            <Input
              type="number"
              inputMode="decimal"
              min={1}
              aria-label={t.customAmount}
              placeholder={t.customAmount}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                const v = Number(e.target.value);
                setAmount(Number.isFinite(v) && v > 0 && v <= 2000 ? v : null);
              }}
              className="w-28"
            />
          </div>
          <TimeConfirm
            id="log-bottle"
            buttonLabel={t.logBottleBtn}
            fieldLabel={t.fedAt}
            confirmLabel={t.saveChanges}
            disabled={amount === null}
            validate={notFuture}
            onConfirm={(d) => {
              if (amount === null) return;
              addCareLog({
                id: newId(),
                babyId: baby.id,
                kind: "formula",
                at: d.toISOString(),
                amount: { value: amount, unit },
              });
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.diaperTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {DIAPER_KINDS.map((k) => (
              <Chip key={k} active={diaperKind === k} onClick={() => setDiaperKind(k)}>
                <span aria-hidden="true" className="mr-1">
                  {DIAPER_EMOJI[k]}
                </span>
                {kindLabels[k]}
              </Chip>
            ))}
          </div>
          <TimeConfirm
            id="log-diaper"
            buttonLabel={t.logDiaperBtn}
            fieldLabel={t.changedAt}
            confirmLabel={t.saveChanges}
            disabled={diaperKind === null}
            validate={notFuture}
            onConfirm={(d) => {
              if (!diaperKind) return;
              addCareLog({
                id: newId(),
                babyId: baby.id,
                kind: "diaper",
                at: d.toISOString(),
                diaper: diaperKind,
              });
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.todayTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.todayEmpty}</p>
          ) : (
            <>
              <ul className="space-y-2">
                {todayLogs.map((l) => (
                  <CareRow
                    key={l.id}
                    log={l}
                    kindLabels={kindLabels}
                    onUpdate={updateCareLog}
                    onDelete={deleteCareLog}
                  />
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                {[
                  todayBottles.length > 0
                    ? fmt(t.bottleSummary, {
                        n: todayBottles.length,
                        total: formatBottleTotal(todayBottles),
                      })
                    : null,
                  todayDiapers.length > 0
                    ? fmt(t.diaperSummary, { n: todayDiapers.length })
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.recentTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {recentDays.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.recentEmpty}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recentDays.map(([key, day]) => (
                <li key={key} className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                  <span className="font-data">{dayLabel(day.at)}</span>
                  <span className="text-muted-foreground">{daySummary(day.logs, day.sleepMin)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">{t.syncNote}</p>
    </div>
  );
}
