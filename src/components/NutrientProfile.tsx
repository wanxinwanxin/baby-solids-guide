"use client";

import { Fragment, type ReactNode } from "react";
import type { Food, NutrientTag } from "@/content-schema/food";
import { fmt } from "@/lib/i18n/config";
import { categoryLabel, NUTRIENT_MSGS, nutrientLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { todayMsgs } from "@/lib/i18n/messages/today";
import { cn } from "@/lib/utils";

/**
 * The day's nutrient story, in two halves (Today page, under the picks).
 *
 * Form: a horizontal segmented bar per nutrient — one cell per pick, filled
 * when that pick carries the nutrient. NOT a pie: a food carries 1–4 tags, so
 * the parts overlap and never sum to a whole; and 4–12 thin slices with long
 * names is exactly the case pies fail. Counts here are tiny integers (1–3), so
 * discrete cells beat a continuous bar — a parent can literally count "2 of
 * today's 3 foods bring iron" off a common left baseline.
 *
 * Color does no identity work: every bar is the same chart-1 hue (nominal
 * categories, one measure — coloring them by value would re-encode what the
 * bar length already shows). Identity comes from the row label, magnitude from
 * the filled cells plus a visible n/m value, so nothing depends on color.
 * Both tokens resolve per theme from globals.css.
 */

/** Canonical nutrient order — the tie-break for equal counts, so the chart is stable day to day. */
const NUTRIENT_ORDER = Object.keys(NUTRIENT_MSGS) as NutrientTag[];

/** Rows past this fold into a plain-text "Also:" line rather than growing the panel. */
const MAX_ROWS = 8;

/** Every nutrient a food delivers — tags plus the standalone iron-rich flag. */
function nutrientsOf(food: Food): Set<NutrientTag> {
  const tags = new Set<NutrientTag>(food.nutrients ?? []);
  if (food.ironRich) tags.add("iron");
  return tags;
}

export function NutrientProfile({ foods }: { foods: Food[] }) {
  const t = useMsgs(todayMsgs);
  const locale = useLocale();

  const total = foods.length;
  if (total === 0) return null;

  const counts = new Map<NutrientTag, number>();
  for (const food of foods) {
    for (const tag of nutrientsOf(food)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  // Graceful degradation: picks with no nutrient data get no chart at all.
  if (counts.size === 0) return null;

  const rows = [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || NUTRIENT_ORDER.indexOf(a[0]) - NUTRIENT_ORDER.indexOf(b[0]),
  );
  const shown = rows.slice(0, MAX_ROWS);
  const rest = rows.slice(MAX_ROWS);
  const groups = [...new Set(foods.map((f) => f.category))].map((c) => categoryLabel(c, locale));

  const ariaLabel = fmt(total === 1 ? t.nutrientChartLabelOne : t.nutrientChartLabel, {
    n: total,
    list: rows
      .map(([tag, n]) =>
        fmt(t.nutrientAriaItem, { nutrient: nutrientLabel(tag, locale), n, m: total }),
      )
      .join(t.listSep),
  });

  return (
    <div className="space-y-2.5">
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold">{t.nutrientMixTitle}</h3>
        <p className="text-[12px] leading-snug text-muted-foreground">
          {total === 1 ? t.nutrientMixSubOne : fmt(t.nutrientMixSub, { n: total })}
        </p>
      </div>
      {/* role="img" + a full aria-label: the bars are a summary of data, and the
          label carries every fact the picture does. */}
      <div role="img" aria-label={ariaLabel} className="space-y-1.5">
        {shown.map(([tag, n]) => (
          <div key={tag} className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 truncate text-[12px] leading-tight text-foreground/80">
              {nutrientLabel(tag, locale)}
            </span>
            <span className="flex min-w-0 flex-1 gap-[2px]">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={cn("h-2 flex-1 rounded-[2px]", i < n ? "bg-chart-1" : "bg-border")}
                />
              ))}
            </span>
            <span className="font-data w-8 shrink-0 text-right text-[11px] text-muted-foreground">
              {n}/{total}
            </span>
          </div>
        ))}
      </div>
      {rest.length > 0 && (
        <p className="text-[11.5px] leading-snug text-muted-foreground">
          {fmt(t.nutrientAlso, {
            list: rest.map(([tag]) => nutrientLabel(tag, locale)).join(t.listSep),
          })}
        </p>
      )}
      <p className="text-[11.5px] leading-snug text-muted-foreground">
        {fmt(t.foodGroups, { list: groups.join(t.listSep) })}
      </p>
    </div>
  );
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Word boundaries only where the term actually has an ASCII edge — `\b` is
 * defined against [A-Za-z0-9_], so it would never match beside a Chinese
 * character (and would silently kill every zh highlight).
 */
function bounded(term: string): string {
  const lead = /^[A-Za-z0-9]/.test(term) ? "\\b" : "";
  const tail = /[A-Za-z0-9]$/.test(term) ? "\\b" : "";
  return lead + escapeRe(term) + tail;
}

/** Bold every occurrence of a nutrient term inside already-localized prose. */
function emphasize(text: string, terms: string[]): ReactNode {
  if (terms.length === 0) return text;
  const pattern = [...terms].sort((a, b) => b.length - a.length).map(bounded).join("|");
  let re: RegExp;
  try {
    re = new RegExp(`(${pattern})`, "gi");
  } catch {
    return text;
  }
  // One capture group → split() interleaves matches at the odd indices.
  const chunks = text.split(re);
  if (chunks.length === 1) return text;
  return chunks.map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {chunk}
      </strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  );
}

/**
 * One concrete benefit per pick, key nutrient term emphasized. Capped at the
 * first highlight per food so this stays a few lines and never buries the
 * picks above it.
 */
export function NutrientBenefits({ foods }: { foods: Food[] }) {
  const t = useMsgs(todayMsgs);
  const locale = useLocale();

  const items = foods
    .map((food) => ({ food, text: food.nutritionHighlights[0] }))
    .filter((item): item is { food: Food; text: string } => !!item.text);
  if (items.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <h3 className="text-sm font-bold">{t.benefitsTitle}</h3>
      <ul className="space-y-2">
        {items.map(({ food, text }) => (
          <li
            key={food.slug}
            className="flex gap-2 text-[12.5px] leading-relaxed text-foreground/70"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] size-1.5 shrink-0 rounded-full bg-chart-1"
            />
            <span>
              <span className="font-semibold text-foreground/85">{food.name}</span>
              {t.benefitSep}
              {emphasize(
                text,
                [...nutrientsOf(food)].map((tag) => nutrientLabel(tag, locale)),
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
