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
import { allFoods, foodBySlug } from"../../../content/foods";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useActivePlan, useHydrated } from"@/lib/hooks";
import { generatePlan, PLAN_WEEKS, validatePlan, type PlanWarning } from"@/lib/planner";
import { planWeekIndex } from"@/lib/engine";
import { newId, useGuideStore } from"@/lib/storage/store";
import type { PlanEntry } from"@/lib/storage/types";
import { mondayOf } from"@/lib/planner";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { cn } from"@/lib/utils";

function chipLabel(slug: string): string {
  const food = foodBySlug.get(slug);
  return `${food?.emoji ? `${food.emoji} ` : ""}${food?.name ?? slug}`;
}

function PlannedChip({
  entry,
  warnings,
  onRemove,
}: {
  entry: PlanEntry;
  warnings: PlanWarning[];
  onRemove: () => void;
}) {
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
        aria-label={`Move ${chipLabel(entry.foodSlug)}${worst ? ` — warning: ${worst.message}` : ""}`}
      >
        {chipLabel(entry.foodSlug)}
        {worst && <span aria-hidden> {worst.blocking ? "⛔" : "⚠️"}</span>}
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${chipLabel(entry.foodSlug)} from plan`}
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
  onRemove,
}: {
  weekIndex: number;
  label: string;
  isCurrent: boolean;
  entries: PlanEntry[];
  warningsByEntry: Map<string, PlanWarning[]>;
  onRemove: (entryId: string) => void;
}) {
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
        {isCurrent && <span className="text-xs text-primary">this week</span>}
      </div>
      <div className="flex min-h-9 flex-wrap gap-1.5">
        {entries.length === 0 && <span className="text-xs text-muted-foreground">drop foods here</span>}
        {entries.map((e) => (
          <PlannedChip
            key={e.id}
            entry={e}
            warnings={warningsByEntry.get(e.id) ?? []}
            onRemove={() => onRemove(e.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function PlanBoard() {
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
    () => (baby && plan ? validatePlan({ plan, baby, foods: allFoods, logs, overrides, today }) : []),
    [baby, plan, logs, overrides, today],
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
        <AlertTitle>Set up a profile to plan</AlertTitle>
        <AlertDescription>
          The planner uses your baby&apos;s age and allergy profile to sanity-check every week.{" "}
          <Link href="/onboarding"className="underline underline-offset-2">
            Start here →
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const currentWeek = plan ? planWeekIndex(plan, today) : 0;
  const effectiveTargetWeek = targetWeek ?? Math.min(Math.max(currentWeek, 0), PLAN_WEEKS - 1);
  const plannedSlugs = new Set(plan?.entries.map((e) => e.foodSlug) ?? []);
  const trayFoods = allFoods
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
    const suggested = generatePlan({ baby: baby!, foods: allFoods, logs, overrides, today });
    setPlan(suggested);
  }

  const weekLabel = (i: number) => {
    if (!plan) return `Week ${i + 1}`;
    const start = new Date(new Date(`${plan.anchorMonday}T00:00:00Z`).getTime() + i * 7 * 86400000);
    return i === currentWeek
      ? "This week"
      : start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  };

  const draggingLabel = dragging
    ? dragging.startsWith("tray-")
      ? chipLabel(dragging.slice(5))
      : chipLabel(plan?.entries.find((e) => e.id === dragging)?.foodSlug ?? "")
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Introduction plan</h1>
        <div className="flex gap-2">
          <Button variant="outline"onClick={suggest}>
            {plan?.entries.length ? "Re-suggest plan" : "Suggest a plan"}
          </Button>
          {plan &&
            (confirmClear ? (
              <span className="flex items-center gap-2 text-sm">
                Clear everything?
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    clearPlan(baby.id);
                    setConfirmClear(false);
                  }}
                >
                  Yes
                </Button>
                <Button variant="outline"size="sm"onClick={() => setConfirmClear(false)}>
                  No
                </Button>
              </span>
            ) : (
              <Button variant="ghost"onClick={() => setConfirmClear(true)}>
                Clear plan
              </Button>
            ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground">
        Two rules are science: iron-rich foods early, and common allergens one at a time (then kept
        in rotation). Beyond that, the order is genuinely yours — drag foods around, or tap a food
        below to add it to the selected week. The board warns, it never dictates.{" "}
        <Link href="/learn/ordering"className="underline underline-offset-2">
          Does order matter? →
        </Link>
      </p>

      {!plan && (
        <Alert className="border-primary/40">
          <AlertTitle>No plan yet</AlertTitle>
          <AlertDescription>
            &quot;Suggest a plan&quot; builds a 12-week starting point from {baby.nickname}&apos;s
            age, allergy profile, and what you&apos;ve already logged — every bit of it editable.
          </AlertDescription>
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
                onRemove={removeEntry}
              />
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <Alert className="border-amber-400">
            <AlertTitle>Worth a look</AlertTitle>
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

function TrayChip({ slug, onAdd }: { slug: string; onAdd: () => void }) {
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
      {chipLabel(slug)}
    </button>
  );
}

function TrayArea({
  trayFoods,
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
  query: string;
  setQuery: (q: string) => void;
  effectiveTargetWeek: number;
  setTargetWeek: (w: number) => void;
  weekLabel: (i: number) => string;
  onAdd: (slug: string) => void;
  planExists: boolean;
  onStartEmpty: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "tray" });
  return (
    <section
      ref={setNodeRef}
      className={cn("space-y-3 rounded-lg border p-4", isOver && "border-red-300 ring-2 ring-red-100")}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-semibold">Unplanned foods</h2>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          aria-label="Search unplanned foods"
          className="h-8 max-w-45"
        />
        {planExists ? (
          <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            Tap adds to
            <select
              value={effectiveTargetWeek}
              onChange={(e) => setTargetWeek(Number(e.target.value))}
              className="rounded-md border bg-background px-2 py-1 text-xs"
              aria-label="Week that tapped foods are added to"
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
            start with an empty board
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Drag onto a week, or tap to add to the selected week. Drop a planned food back here to
        remove it.
      </p>
      <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
        {trayFoods.map((slug) => (
          <TrayChip key={slug} slug={slug} onAdd={() => onAdd(slug)} />
        ))}
      </div>
    </section>
  );
}
