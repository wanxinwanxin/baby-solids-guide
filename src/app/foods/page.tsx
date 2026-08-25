import type { Metadata } from "next";
import Link from "next/link";
import { allFoods } from "../../../content/foods";
import { allRecipes } from "../../../content/recipes";
import { slimFood } from "@/lib/food-utils";
import { FoodBrowser } from "./FoodBrowser";

export const metadata: Metadata = {
  title: "Food library",
  description:
    "Every food with an exact safe texture per age, choking-hazard notes, allergen flags, and prep tips.",
};

export default function FoodsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-[2.75rem]">
          {allFoods.length} foods, all free<span className="text-primary">.</span>
        </h1>
        <Link
          href="/recipes"
          className="font-data text-[11px] uppercase tracking-[0.08em] text-primary hover:text-primary-deep"
        >
          {allRecipes.length} recipes →
        </Link>
      </div>
      <FoodBrowser foods={allFoods.map(slimFood)} />
    </div>
  );
}
