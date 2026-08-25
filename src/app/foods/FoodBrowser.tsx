"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AgeBand, FoodCategory } from "@/content-schema/food";
import { deriveFoodStats } from "@/lib/engine";
import { ALLERGEN_LABELS, type SlimFood } from "@/lib/food-utils";
import { fmt, msg } from "@/lib/i18n/config";
import { allergenLabel, CATEGORY_MSGS, categoryLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { BROWSER_BAND_MSGS, foodBrowserMsgs } from "@/lib/i18n/messages/foods";
import { useActiveLogs, useHydrated } from "@/lib/hooks";
import { CutDiagram, isDiagramVariant } from "@/components/diagrams/CutDiagram";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Filter =
  | "all"
  | "iron"
  | "allergen"
  | "first-picks"
  | "omega3"
  | "vitaminC"
  | "safe"
  | "untried"
  | FoodCategory;

const CATEGORY_IDS = Object.keys(CATEGORY_MSGS) as FoodCategory[];

/** A food belongs to a band once its age gate has opened by the band's end. */
const BAND_CAP: Record<AgeBand, number> = { "6-8m": 8, "9-12m": 12, "12-24m": 24 };
const BAND_IDS: AgeBand[] = ["6-8m", "9-12m", "12-24m"];

function Chip({
  selected,
  onClick,
  children,
  fill = "ink",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  fill?: "ink" | "primary";
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        selected
          ? fill === "primary"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <span className="font-data mr-1 text-[10.5px] tracking-[0.1em] text-muted-foreground whitespace-nowrap">
      {children}
    </span>
  );
}

export function FoodBrowser({ foods }: { foods: SlimFood[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [band, setBand] = useState<AgeBand | null>(null);
  const hydrated = useHydrated();
  const logs = useActiveLogs();
  const t = useMsgs(foodBrowserMsgs);
  const locale = useLocale();

  const showFilters: { id: Filter; label: string }[] = [
    { id: "first-picks", label: t.greatFirstFoods },
    { id: "iron", label: t.ironRich },
    { id: "allergen", label: fmt(t.commonAllergens, { n: Object.keys(ALLERGEN_LABELS).length }) },
    { id: "omega3", label: t.omega3 },
    { id: "vitaminC", label: t.vitaminC },
  ];

  /** Per-food tried/safe state from the active baby's logs (empty for guests
   * with no history — the chips still work, they just match nothing). */
  const triedState = useMemo(() => {
    const stats = deriveFoodStats(logs);
    const tried = new Set<string>();
    const safe = new Set<string>();
    for (const l of logs) {
      if (l.amountEaten !== "none") {
        tried.add(l.foodSlug);
        if (!stats.get(l.foodSlug)?.hasPausingSymptoms) safe.add(l.foodSlug);
      }
    }
    return { tried, safe };
  }, [logs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods
      .filter((f) => {
        if (
          q &&
          !f.name.toLowerCase().includes(q) &&
          !f.slug.includes(q) &&
          !f.aliases.some((a) => a.toLowerCase().includes(q))
        )
          return false;
        if (band && f.minAgeMonths > BAND_CAP[band]) return false;
        if (filter === "all") return true;
        if (filter === "iron") return f.ironRich;
        if (filter === "allergen") return f.commonAllergen !== null;
        if (filter === "first-picks") return f.firstFoodPick;
        if (filter === "omega3") return f.nutrients?.includes("omega3") ?? false;
        if (filter === "vitaminC") return f.nutrients?.includes("vitaminC") ?? false;
        if (filter === "safe") return triedState.safe.has(f.slug);
        if (filter === "untried") return !triedState.tried.has(f.slug);
        return f.category === filter;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [foods, query, filter, band, triedState]);

  return (
    <div className="space-y-5">
      <div className="relative max-w-xl">
        <svg
          viewBox="0 0 17 17"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="7.5" cy="7.5" r="5.8" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="12" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <Input
          type="search"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t.searchLabel}
          className="h-14 rounded-full border-[1.5px] border-foreground bg-card pr-6 pl-12 text-base shadow-sm md:text-base"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.filtersLabel}>
        <GroupLabel>{t.bandGroup}</GroupLabel>
        {BAND_IDS.map((b) => (
          <Chip
            key={b}
            fill="primary"
            selected={band === b}
            onClick={() => setBand((cur) => (cur === b ? null : b))}
          >
            {msg(BROWSER_BAND_MSGS[b], locale)}
          </Chip>
        ))}
        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />
        <GroupLabel>{t.showGroup}</GroupLabel>
        {showFilters.map((f) => (
          <Chip
            key={f.id}
            selected={filter === f.id}
            onClick={() => setFilter((cur) => (cur === f.id ? "all" : f.id))}
          >
            {f.label}
          </Chip>
        ))}
        {hydrated && triedState.tried.size > 0 && (
          <>
            <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />
            <GroupLabel>{t.yoursGroup}</GroupLabel>
            <Chip
              fill="primary"
              selected={filter === "safe"}
              onClick={() => setFilter((cur) => (cur === "safe" ? "all" : "safe"))}
            >
              {t.safeSoFar}
            </Chip>
            <Chip
              fill="primary"
              selected={filter === "untried"}
              onClick={() => setFilter((cur) => (cur === "untried" ? "all" : "untried"))}
            >
              {t.notYetTried}
            </Chip>
          </>
        )}
        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />
        <GroupLabel>{t.categoryGroup}</GroupLabel>
        {CATEGORY_IDS.map((id) => (
          <Chip
            key={id}
            selected={filter === id}
            onClick={() => setFilter((cur) => (cur === id ? "all" : id))}
          >
            {categoryLabel(id, locale)}
          </Chip>
        ))}
      </div>

      <p className="font-data text-[11.5px] tracking-[0.08em] text-muted-foreground">
        {fmt(t.resultCount, { n: visible.length })}
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((f) => (
          <li key={f.slug}>
            <Link
              href={`/foods/${f.slug}`}
              className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary"
            >
              <div aria-hidden="true" className="flex h-24 items-center justify-center rounded-lg bg-muted">
                {isDiagramVariant(f.cutDiagram) ? (
                  <CutDiagram
                    variant={f.cutDiagram}
                    locale={locale}
                    showCaption={false}
                    className="flex h-full w-full items-center justify-center [&_svg]:h-full [&_svg]:max-w-[180px]"
                  />
                ) : (
                  <span className="text-3xl">{f.emoji ?? f.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-lg leading-tight font-bold">{f.name}</span>
                <span className="font-data text-[10.5px] text-muted-foreground whitespace-nowrap">
                  {fmt(t.monthsPlus, { n: f.minAgeMonths })}
                </span>
              </div>
              <p className="line-clamp-2 flex-1 text-[13px] leading-snug text-muted-foreground">{f.hint}</p>
              <div className="flex flex-wrap gap-1.5">
                {f.ironRich && <Badge variant="secondary">{t.ironRich}</Badge>}
                {f.commonAllergen && (
                  <Badge className="border-transparent bg-accent text-accent-foreground">
                    {fmt(t.allergenBadge, {
                      a: locale === "en" ? f.commonAllergen : allergenLabel(f.commonAllergen, locale),
                    })}
                  </Badge>
                )}
                {f.chokingRisk !== "low" && (
                  <Badge variant="outline" className="border-honey/50 text-honey-text">
                    {f.chokingRisk === "high" ? t.highChokingRisk : t.chokingCare}
                  </Badge>
                )}
                {f.firstFoodPick && <Badge variant="secondary">{t.greatFirstFood}</Badge>}
                <Badge variant="outline">{categoryLabel(f.category, locale)}</Badge>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
