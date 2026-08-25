import type { Metadata } from "next";
import Link from "next/link";
import { allFoods } from "../../../content/foods";
import { allRecipes } from "../../../content/recipes";
import { slimFood } from "@/lib/food-utils";
import { localizeFoods } from "@/lib/l10n";
import { fmt, pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { foodsIndexMsgs } from "@/lib/i18n/messages/foods";
import { FoodBrowser } from "./FoodBrowser";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(foodsIndexMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function FoodsPage() {
  const locale = await getLocale();
  const t = pick(foodsIndexMsgs, locale);
  const foods = localizeFoods(allFoods, locale);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-[2.75rem]">
          {fmt(t.heading, { n: foods.length })}<span className="text-primary">{t.headingDot}</span>
        </h1>
        <Link
          href="/recipes"
          className="font-data text-[11px] uppercase tracking-[0.08em] text-primary hover:text-primary-deep"
        >
          {fmt(t.recipesLink, { n: allRecipes.length })}
        </Link>
      </div>
      <FoodBrowser foods={foods.map(slimFood)} />
    </div>
  );
}
