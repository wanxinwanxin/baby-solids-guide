"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
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
} from "@dnd-kit/core";
import type { Food } from "@/content-schema/food";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useActivePlan, useHydrated } from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useL10nFoods } from "@/lib/i18n/content-client";
import { allergenLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { planMsgs } from "@/lib/i18n/messages/plan";
import {
  addFoodToWeek,
  entryDay,
  generatePlan,
  INTRO_SPACING_DAYS,
  PLAN_WEEKS,
  removeFoodFromPlan,
  scheduleSlugs,
  validatePlan,
  type PlanWarning,
} from "@/lib/planner";
import { eligibilityAgeMonths, planWeekIndex } from "@/lib/engine";
import { useGuideStore } from "@/lib/storage/store";
import type { Plan, PlanEntry } from "@/lib/storage/types";
import { mondayOf } from "@/lib/planner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const DAYS_PER_MONTH = 30.4375;
/** Options rendered at once in the per-week combobox; the rest are counted. */
const MAX_OPTIONS = 8;

/** Case- and accent-insensitive haystack for food search. */
function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function PlannedChip({
  entry,
  label,
  startLabel,
  warnings,
  onRemove,
}: {
  entry: PlanEntry;
  label: string;
  startLabel: string;
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
      <span
        className="text-xs tabular-nums text-muted-foreground"
        title={fmt(t.startsOn, { label, date: startLabel })}
      >
        {startLabel}
      </span>
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

type AddOption = {
  slug: string;
  label: string;
  hints: string[];
};

/**
 * Inline combobox at the end of a week lane. Matches on name *and* aliases so
 * the zh overlays (Chinese name + English alias) are searchable in either
 * language, and never filters out an already-planned food — picking one moves
 * it into this week, which is exactly what `addFoodToWeek` does.
 */
function WeekAddFood({
  weekLabel,
  options,
  onPick,
}: {
  weekLabel: string;
  options: (query: string) => { visible: AddOption[]; total: number };
  onPick: (slug: string) => void;
}) {
  const t = useMsgs(planMsgs);
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const addRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { visible, total } = useMemo(() => options(query), [options, query]);
  const active = visible[Math.min(highlight, Math.max(visible.length - 1, 0))];
  const listId = `${uid}-list`;
  const optionId = (slug: string) => `${uid}-opt-${slug}`;

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setHighlight(0);
    addRef.current?.focus();
  }

  function pick(slug: string) {
    onPick(slug);
    close();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((h) => (visible.length ? Math.min(h + 1, visible.length - 1) : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (active) pick(active.slug);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  return (
    <div className="mt-2">
      <button
        ref={addRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? t.closeAddFood : fmt(t.addFoodAria, { week: weekLabel })}
        aria-expanded={open}
        className="rounded-full border border-dashed px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
      >
        {open ? t.closeAddFood : t.addFood}
      </button>

      {open && (
        <div className="mt-2 space-y-1.5">
          <Input
            ref={inputRef}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active ? optionId(active.slug) : undefined}
            aria-label={fmt(t.addFoodSearchAria, { week: weekLabel })}
            placeholder={t.addFoodPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={onKeyDown}
            className="h-8 text-sm"
          />
          <ul
            id={listId}
            role="listbox"
            aria-label={t.addFoodListAria}
            className="max-h-56 overflow-y-auto rounded-md border bg-background text-sm"
          >
            {visible.length === 0 && (
              <li className="px-2 py-1.5 text-xs text-muted-foreground">{t.addFoodNoMatch}</li>
            )}
            {visible.map((option) => (
              <li
                key={option.slug}
                id={optionId(option.slug)}
                role="option"
                aria-selected={active?.slug === option.slug}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(option.slug)}
                className={cn(
                  "cursor-pointer px-2 py-1.5",
                  active?.slug === option.slug && "bg-secondary",
                )}
              >
                <span>{option.label}</span>
                {option.hints.length > 0 && (
                  <>
                    {" "}
                    <span className="text-xs text-muted-foreground">
                      {option.hints.join(" · ")}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
          {total > visible.length && (
            <p className="text-xs text-muted-foreground">
              {fmt(t.addFoodMore, { n: total - visible.length })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function WeekLane({
  weekIndex,
  label,
  isCurrent,
  entries,
  warningsByEntry,
  chipLabel,
  startLabel,
  addOptions,
  onAdd,
  onRemove,
}: {
  weekIndex: number;
  label: string;
  isCurrent: boolean;
  entries: PlanEntry[];
  warningsByEntry: Map<string, PlanWarning[]>;
  chipLabel: (slug: string) => string;
  startLabel: (entry: PlanEntry) => string;
  addOptions: (query: string) => { visible: AddOption[]; total: number };
  onAdd: (slug: string) => void;
  onRemove: (foodSlug: string) => void;
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
            startLabel={startLabel(e)}
            warnings={warningsByEntry.get(e.id) ?? []}
            onRemove={() => onRemove(e.foodSlug)}
          />
        ))}
      </div>
      <WeekAddFood weekLabel={label} options={addOptions} onPick={onAdd} />
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
  const [startedEmpty, setStartedEmpty] = useState(false);

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
          <Link href="/onboarding" className="underline underline-offset-2">
            {t.setupLink}
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const currentWeek = plan ? planWeekIndex(plan, today) : 0;
  const effectiveTargetWeek = targetWeek ?? Math.min(Math.max(currentWeek, 0), PLAN_WEEKS - 1);
  const weekOfEntry = (entry: PlanEntry) => Math.floor(entryDay(entry) / 7);
  // Re-spacing can push the tail past week 12 — grow the board rather than
  // dropping chips off the end of it.
  const laneCount = Math.max(
    PLAN_WEEKS,
    ...(plan?.entries.length ? plan.entries.map((e) => weekOfEntry(e) + 1) : [PLAN_WEEKS]),
  );
  const weekBySlug = new Map((plan?.entries ?? []).map((e) => [e.foodSlug, weekOfEntry(e)]));
  const plannedSlugs = new Set(plan?.entries.map((e) => e.foodSlug) ?? []);
  const chipLabel = (slug: string): string => {
    const food = foodBySlug.get(slug);
    return `${food?.emoji ? `${food.emoji} ` : ""}${food?.name ?? slug}`;
  };
  const trayFoods = foods
    .filter((f) => !plannedSlugs.has(f.slug))
    .filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const anchor = plan ? Date.parse(`${plan.anchorMonday}T00:00:00Z`) : Date.parse(`${mondayOf(today)}T00:00:00Z`);
  const startLabel = (entry: PlanEntry): string =>
    new Date(anchor + entryDay(entry) * 86400000).toLocaleDateString(
      locale === "zh" ? "zh-CN" : undefined,
      { month: "short", day: "numeric", timeZone: "UTC" },
    );

  const ageAtWeek = (weekIndex: number) =>
    eligibilityAgeMonths(baby, today) + (weekIndex * 7) / DAYS_PER_MONTH;

  /** Option list for one week's combobox: emoji + name plus eligibility hints. */
  function addOptionsFor(weekIndex: number) {
    return (raw: string): { visible: AddOption[]; total: number } => {
      const q = norm(raw.trim());
      const age = ageAtWeek(weekIndex);
      // Name matches outrank alias matches, so typing a food's own name puts
      // it first even when another food lists it as an alias.
      const rank = (f: Food): number => {
        const name = norm(f.name);
        if (name.startsWith(q)) return 0;
        if (name.includes(q)) return 1;
        return f.aliases.some((alias) => norm(alias).includes(q)) ? 2 : 3;
      };
      const matches = foods
        .map((f: Food) => ({ f, r: rank(f) }))
        .filter(({ r }) => r < 3)
        .sort((a, b) => a.r - b.r || a.f.name.localeCompare(b.f.name))
        .map(({ f }) => f);
      const visible = matches.slice(0, MAX_OPTIONS).map((f) => {
        const hints: string[] = [];
        if (f.minAgeMonths > age) hints.push(fmt(t.hintMinAge, { months: f.minAgeMonths }));
        if (f.commonAllergen) {
          hints.push(fmt(t.hintAllergen, { allergen: allergenLabel(f.commonAllergen, locale) }));
        }
        if (f.chokingRisk === "high") hints.push(t.hintChoking);
        const inWeek = weekBySlug.get(f.slug);
        if (inWeek !== undefined) hints.push(fmt(t.hintAlreadyIn, { n: inWeek + 1 }));
        return { slug: f.slug, label: chipLabel(f.slug), hints };
      });
      return { visible, total: matches.length };
    };
  }

  const basePlan = (): Plan =>
    plan ?? { babyId: baby.id, anchorMonday: mondayOf(today), entries: [] };

  /**
   * A plan with no entries is how a *cleared* plan travels between devices, so
   * it reads as "no plan" everywhere. Starting from an empty board is a
   * different intent that lives only in this view until a food is added.
   */
  const boardActive = !!plan || startedEmpty;

  /**
   * Every edit goes through the planner so the observation-window spacing is
   * re-derived from scratch. An empty board is the one case `addFoodToWeek`
   * cannot express: with nothing scheduled it packs the first food onto day 0,
   * so the requested week is what defines where the plan starts instead.
   */
  function placeFood(slug: string, weekIndex: number) {
    const base = basePlan();
    setPlan(
      base.entries.length === 0
        ? { ...base, entries: scheduleSlugs([slug], foodBySlug, Math.max(weekIndex, 0) * 7) }
        : addFoodToWeek(base, slug, weekIndex, foodBySlug),
    );
  }

  function removeFood(foodSlug: string) {
    setPlan(removeFoodFromPlan(basePlan(), foodSlug, foodBySlug));
  }

  function startEmpty() {
    setStartedEmpty(true);
    setPlan(basePlan());
  }

  function onDragStart(event: DragStartEvent) {
    setDragging(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    setDragging(null);
    const overId = event.over?.id?.toString();
    const activeId = event.active.id.toString();
    if (!overId) return;
    const slugOf = (id: string) =>
      id.startsWith("tray-") ? id.slice(5) : plan?.entries.find((e) => e.id === id)?.foodSlug;
    const slug = slugOf(activeId);
    if (!slug) return;
    if (overId.startsWith("week-")) {
      placeFood(slug, Number(overId.slice(5)));
    } else if (overId === "tray" && !activeId.startsWith("tray-")) {
      removeFood(slug);
    }
  }

  function suggest() {
    const suggested = generatePlan({ baby: baby!, foods, logs, overrides, today });
    setPlan(suggested);
  }

  const weekLabel = (i: number) => {
    if (!boardActive) return fmt(t.weekN, { n: i + 1 });
    // An empty board has no stored plan yet, so it anchors on this week.
    const anchorMonday = plan?.anchorMonday ?? mondayOf(today);
    const start = new Date(new Date(`${anchorMonday}T00:00:00Z`).getTime() + i * 7 * 86400000);
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
          <Button variant="outline" onClick={suggest}>
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
                <Button variant="outline" size="sm" onClick={() => setConfirmClear(false)}>
                  {t.no}
                </Button>
              </span>
            ) : (
              <Button variant="ghost" onClick={() => setConfirmClear(true)}>
                {t.clearPlan}
              </Button>
            ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground">
        {t.intro}{" "}
        <Link href="/learn/ordering" className="underline underline-offset-2">
          {t.introLink}
        </Link>
      </p>

      {!boardActive && (
        <Alert className="border-primary/40">
          <AlertTitle>{t.noPlanTitle}</AlertTitle>
          <AlertDescription>{fmt(t.noPlanBody, { name: baby.nickname })}</AlertDescription>
        </Alert>
      )}

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {boardActive && (
          <div className="space-y-2">
            <p className="max-w-2xl text-sm text-muted-foreground">
              {fmt(t.spacingNote, { days: INTRO_SPACING_DAYS })}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: laneCount }, (_, i) => (
                <WeekLane
                  key={i}
                  weekIndex={i}
                  label={weekLabel(i)}
                  isCurrent={i === currentWeek}
                  entries={(plan?.entries ?? [])
                    .filter((e) => weekOfEntry(e) === i)
                    .sort((a, b) => entryDay(a) - entryDay(b))}
                  warningsByEntry={warningsByEntry}
                  chipLabel={chipLabel}
                  startLabel={startLabel}
                  addOptions={addOptionsFor(i)}
                  onAdd={(slug) => placeFood(slug, i)}
                  onRemove={removeFood}
                />
              ))}
            </div>
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
          onAdd={(slug) => placeFood(slug, effectiveTargetWeek)}
          planExists={boardActive}
          onStartEmpty={startEmpty}
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
          <button type="button" onClick={onStartEmpty} className="ml-auto text-xs underline underline-offset-2">
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
