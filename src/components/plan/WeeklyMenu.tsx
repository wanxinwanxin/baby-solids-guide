"use client";

import Link from "next/link";
import type { Food } from "@/content-schema/food";
import { fmt, type Locale } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { planMsgs } from "@/lib/i18n/messages/plan";
import type { MenuDay, WeeklyMenu as Menu } from "@/lib/weekly-menu";
import { Badge } from "@/components/ui/badge";
import { stepDate } from "./PlanSteps";

/**
 * The week's menu under the plan board. Seven rows, one per day, each
 * carrying the recipes `weeklyMenu` chose. The day that introduces a food
 * says so, because that is the day a parent watches.
 */

type PlanCopy = ReturnType<typeof useMsgs<typeof planMsgs>>;

/**
 * True when one of the day's recipes actually contains the food the plan
 * introduces. When it does not, the row says so — "new: Broccoli" beside a
 * blueberry dish otherwise reads as though the dish holds broccoli.
 */
function cooksNewFood(day: MenuDay): boolean {
  return day.combos.some((c) => day.newFoodSlug !== undefined && c.usesPicks.includes(day.newFoodSlug));
}

/** Day label: the near days get a word, the rest get a date. */
function dayLabel(day: MenuDay, t: PlanCopy, locale: Locale): string {
  if (day.dayIndex === 0) return t.menuToday;
  if (day.dayIndex === 1) return t.menuTomorrow;
  return stepDate(day.date, locale);
}

export function WeeklyMenu({
  menu,
  babyName,
  foodBySlug,
}: {
  menu: Menu;
  babyName: string;
  foodBySlug: Map<string, Food>;
}) {
  const t = useMsgs(planMsgs);
  const locale = useLocale();
  const foodName = (slug: string) => foodBySlug.get(slug)?.name ?? slug;

  return (
    <section className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">{t.menuTitle}</h2>
        {menu.recipeCount > 0 && (
          <span className="font-data text-xs text-muted-foreground">
            {fmt(t.menuCount, { n: menu.recipeCount })}
          </span>
        )}
      </div>
      <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
        {fmt(t.menuLede, { name: babyName })}
      </p>

      {menu.daysWithFood === 0 ? (
        <p className="text-[13px] leading-relaxed text-muted-foreground">{t.menuNothingYet}</p>
      ) : (
        <ul className="divide-y">
          {menu.days.map((day) => (
            <li key={day.date} className="grid gap-2 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <div className="space-y-1">
                <p className="font-data text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
                  {dayLabel(day, t, locale)}
                </p>
                {day.newFoodSlug && (
                  <p className="text-[13px] leading-snug font-semibold text-primary">
                    {fmt(t.menuNewFood, { food: foodName(day.newFoodSlug) })}
                  </p>
                )}
                {day.newFoodSlug && !cooksNewFood(day) && day.combos.length > 0 && (
                  <p className="text-[12px] leading-snug text-muted-foreground">
                    {t.menuServePlain}
                  </p>
                )}
              </div>
              {day.combos.length === 0 ? (
                <p className="text-[13px] leading-relaxed text-muted-foreground">{t.menuNoRecipe}</p>
              ) : (
                <div className={day.combos.length > 1 ? "grid gap-2 sm:grid-cols-2" : "grid gap-2"}>
                  {day.combos.map(({ recipe, usesPicks }) => (
                    <Link
                      key={recipe.slug}
                      href={`/recipes/${recipe.slug}`}
                      className="flex flex-col gap-1.5 rounded-xl border p-3 transition-colors hover:border-primary"
                    >
                      <span className="font-heading text-[15px] leading-tight font-bold">
                        {recipe.name}
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {recipe.foods.map((slug) => (
                          <Badge
                            key={slug}
                            variant={usesPicks.includes(slug) ? "secondary" : "outline"}
                          >
                            {foodName(slug)}
                          </Badge>
                        ))}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t pt-3">
        <p className="max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
          {t.menuFootnote}
        </p>
        <Link
          href="/recipes"
          className="font-data text-[11px] uppercase tracking-[0.06em] text-primary hover:text-primary-deep"
        >
          {t.menuAllRecipes}
        </Link>
      </div>
    </section>
  );
}
