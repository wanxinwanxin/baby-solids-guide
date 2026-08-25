"use client";

import Link from"next/link";
import { useMemo, useState } from"react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from"@dnd-kit/core";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useActivePlan, useHydrated } from"@/lib/hooks";
import { fmt } from"@/lib/i18n/config";
import { useL10nFoods } from"@/lib/i18n/content-client";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { planMsgs } from"@/lib/i18n/messages/plan";
import { generatePlan, PLAN_WEEKS, validatePlan, type PlanWarning } from"@/lib/planner";
import { planWeekIndex } from"@/lib/engine";
import { newId, useGuideStore } from"@/lib/storage/store";
import type { PlanEntry } from"@/lib/storage/types";
import { mondayOf } from"@/lib/planner";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { cn } from"@/lib/utils";

function PlannedChip({
  entry,
  label,
  warnings,
  onRemove,
}: {
  entry: PlanEntry;
  label: string;
  warnings: PlanWarning[];
  onRemove: () => void;
}) {
  const t = useMsgs(planMsgs);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: entry.id });
  const worst = warnings.find((w) => w.blocking) ?? warnings[0];
  return (
    <span
      ref={setNodeRef}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-background py-1 pl-3 pr-1 text-sm",
        isDragging && "opacity-40",
        worst && (worst.blocking ? "border-red-500" : "border-amber-400"),
      )}
      title={worst?.message}
    >
      <button
        type="button"
        {...listeners}
        {...attributes}
        className="cursor-grab touch-none"
        aria-label={
          worst
            ? fmt(t.moveChipWarning, { label, message: worst.message })
            : fmt(t.moveChip, { label })
        }
      >
        {label}
        {worst && <span aria-hidden> {worst.blocking ? "⛔" : "⚠️"}</span>}
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={fmt(t.removeFromPlan, { label })}
        className="rounded-full px-1.5 text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>
    </span>
  );
}

function WeekLane({
  weekIndex,
  label,
  isCurrent,
  entries,
  warningsByEntry,
  chipLabel,
  onRemove,
}: {
  weekIndex: number;
  label: string;
  isCurrent: boolean;
  entries: PlanEntry[];
  warningsByEntry: Map<string, PlanWarning[]>;
  chipLabel: (slug: string) => string;
  onRemove: (entryId: string) => void;
}) {
  const t = useMsgs(planMsgs);
  const { setNodeRef, isOver } = useDroppable({ id: `week-${weekIndex}` });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg border p-3",
        isCurrent && "border-primary bg-secondary/50",
        isOver && "border-primary/60 ring-2 ring-primary/30",
      )}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold">{label}</span>
        {isCurrent && <span className="text-xs text-primary">{t.thisWeekBadge}</span>}
      </div>
      <div className="flex min-h-9 flex-wrap gap-1.5">
        {entries.length === 0 && <span className="text-xs text-muted-foreground">{t.dropFoodsHere}</span>}
        {entries.map((e) => (
          <PlannedChip
            key={e.id}
            entry={e}
            label={chipLabel(e.foodSlug)}
            warnings={warningsByEntry.get(e.id) ?? []}
            onRemove={() => onRemove(e.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function PlanBoard() {
  const t = useMsgs(planMsgs);
  const locale = useLocale();
  const { foods, foodBySlug } = useL10nFoods();
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const plan = useActivePlan();
  const { setPlan, clearPlan } = useGuideStore();

  const [query, setQuery] = useState("");
  const [targetWeek, setTargetWeek] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const today = useMemo(() => new Date(), []);

  const warnings = useMemo(
    () => (baby && plan ? validatePlan({ plan, baby, foods, logs, overrides, today }, locale) : []),
    [baby, plan, foods, logs, overrides, today, locale],
  );
  const warningsByEntry = useMemo(() => {
    const map = new Map<string, PlanWarning[]>();
    for (const w of warnings) map.set(w.entryId, [...(map.get(w.entryId) ?? []), w]);
    return map;
  }, [warnings]);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>{t.setupTitle}</AlertTitle>
        <AlertDescription>
          {t.setupBody}{" "}
          <Link href="/onboarding"className="underline underline-offset-2">
            {t.setupLink}
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const currentWeek = plan ? planWeekIndex(plan, today) : 0;
  const effectiveTargetWeek = targetWeek ?? Math.min(Math.max(currentWeek, 0), PLAN_WEEKS - 1);
  const plannedSlugs = new Set(plan?.entries.map((e) => e.foodSlug) ?? []);
  const chipLabel = (slug: string): string => {
    const food = foodBySlug.get(slug);
    return `${food?.emoji ? `${food.emoji} ` : ""}${food?.name ?? slug}`;
  };
  const trayFoods = foods
    .filter((f) => !plannedSlugs.has(f.slug))
    .filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  function persist(entries: PlanEntry[]) {
    setPlan({
      babyId: baby!.id,
      anchorMonday: plan?.anchorMonday ?? mondayOf(today),
      entries,
    });
  }

  function addFood(slug: string, weekIndex: number) {
    if (plannedSlugs.has(slug)) return;
    persist([...(plan?.entries ?? []), { id: newId(), foodSlug: slug, weekIndex }]);
  }

  function moveEntry(entryId: string, weekIndex: number) {
    persist((plan?.entries ?? []).map((e) => (e.id === entryId ? { ...e, weekIndex } : e)));
  }

  function removeEntry(entryId: string) {
    persist((plan?.entries ?? []).filter((e) => e.id !== entryId));
  }

  function onDragStart(event: DragStartEvent) {
    setDragging(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    setDragging(null);
    const overId = event.over?.id?.toString();
    const activeId = event.active.id.toString();
    if (!overId) return;
    if (overId.startsWith("week-")) {
      const week = Number(overId.slice(5));
      if (activeId.startsWith("tray-")) addFood(activeId.slice(5), week);
      else moveEntry(activeId, week);
    } else if (overId === "tray" && !activeId.startsWith("tray-")) {
      removeEntry(activeId);
    }
  }

  function suggest() {
    const suggested = generatePlan({ baby: baby!, foods, logs, overrides, today });
    setPlan(suggested);
  }

  const weekLabel = (i: number) => {
    if (!plan) return fmt(t.weekN, { n: i + 1 });
    const start = new Date(new Date(`${plan.anchorMonday}T00:00:00Z`).getTime() + i * 7 * 86400000);
    return i === currentWeek
      ? t.thisWeek
      : start.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
  };

  const draggingLabel = dragging
    ? dragging.startsWith("tray-")
      ? chipLabel(dragging.slice(5))
      : chipLabel(plan?.entries.find((e) => e.id === dragging)?.foodSlug ?? "")
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline"onClick={suggest}>
            {plan?.entries.length ? t.resuggestPlan : t.suggestPlan}
          </Button>
          {plan &&
            (confirmClear ? (
              <span className="flex items-center gap-2 text-sm">
                {t.clearConfirm}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    clearPlan(baby.id);
                    setConfirmClear(false);
                  }}
                >
                  {t.yes}
                </Button>
                <Button variant="outline"size="sm"onClick={() => setConfirmClear(false)}>
                  {t.no}
                </Button>
              </span>
            ) : (
              <Button variant="ghost"onClick={() => setConfirmClear(true)}>
                {t.clearPlan}
              </Button>
            ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground">
        {t.intro}{" "}
        <Link href="/learn/ordering"className="underline underline-offset-2">
          {t.introLink}
        </Link>
      </p>

      {!plan && (
        <Alert className="border-primary/40">
          <AlertTitle>{t.noPlanTitle}</AlertTitle>
          <AlertDescription>{fmt(t.noPlanBody, { name: baby.nickname })}</AlertDescription>
        </Alert>
      )}

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {plan && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PLAN_WEEKS }, (_, i) => (
              <WeekLane
                key={i}
                weekIndex={i}
                label={weekLabel(i)}
                isCurrent={i === currentWeek}
                entries={plan.entries.filter((e) => e.weekIndex === i)}
                warningsByEntry={warningsByEntry}
                chipLabel={chipLabel}
                onRemove={removeEntry}
              />
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <Alert className="border-amber-400">
            <AlertTitle>{t.worthALook}</AlertTitle>
            <AlertDescription>
              <ul className="mt-1 space-y-1">
                {warnings.map((w) => (
                  <li key={`${w.entryId}-${w.kind}`}>
                    {w.blocking ? "⛔" : "⚠️"} {w.message}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <TrayArea
          trayFoods={trayFoods.map((f) => f.slug)}
          chipLabel={chipLabel}
          query={query}
          setQuery={setQuery}
          effectiveTargetWeek={effectiveTargetWeek}
          setTargetWeek={setTargetWeek}
          weekLabel={weekLabel}
          onAdd={(slug) => addFood(slug, effectiveTargetWeek)}
          planExists={!!plan}
          onStartEmpty={() => persist([])}
        />

        <DragOverlay>
          {draggingLabel && (
            <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm shadow-lg">
              {draggingLabel}
            </span>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function TrayChip({ slug, label, onAdd }: { slug: string; label: string; onAdd: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `tray-${slug}` });
  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      onClick={onAdd}
      className={cn(
        "min-h-9 cursor-grab touch-none rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-primary/60",
        isDragging && "opacity-40",
      )}
    >
      {label}
    </button>
  );
}

function TrayArea({
  trayFoods,
  chipLabel,
  query,
  setQuery,
  effectiveTargetWeek,
  setTargetWeek,
  weekLabel,
  onAdd,
  planExists,
  onStartEmpty,
}: {
  trayFoods: string[];
  chipLabel: (slug: string) => string;
  query: string;
  setQuery: (q: string) => void;
  effectiveTargetWeek: number;
  setTargetWeek: (w: number) => void;
  weekLabel: (i: number) => string;
  onAdd: (slug: string) => void;
  planExists: boolean;
  onStartEmpty: () => void;
}) {
  const t = useMsgs(planMsgs);
  const { setNodeRef, isOver } = useDroppable({ id: "tray" });
  return (
    <section
      ref={setNodeRef}
      className={cn("space-y-3 rounded-lg border p-4", isOver && "border-red-300 ring-2 ring-red-100")}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-semibold">{t.unplannedFoods}</h2>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchAria}
          className="h-8 max-w-45"
        />
        {planExists ? (
          <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            {t.tapAddsTo}
            <select
              value={effectiveTargetWeek}
              onChange={(e) => setTargetWeek(Number(e.target.value))}
              className="rounded-md border bg-background px-2 py-1 text-xs"
              aria-label={t.weekSelectAria}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {weekLabel(i)}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <button type="button"onClick={onStartEmpty} className="ml-auto text-xs underline underline-offset-2">
            {t.startEmpty}
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{t.trayHint}</p>
      <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
        {trayFoods.map((slug) => (
          <TrayChip key={slug} slug={slug} label={chipLabel(slug)} onAdd={() => onAdd(slug)} />
        ))}
      </div>
    </section>
  );
}
