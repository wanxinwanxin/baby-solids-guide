import type { Metadata } from "next";
import { allFoods } from "../../../content/foods";
import { slimFood } from "@/lib/food-utils";
import { FoodBrowser } from "./FoodBrowser";

export const metadata: Metadata = {
  title: "Food library",
  description:
    "Every food with an exact safe texture per age, choking-hazard notes, allergen flags, and prep tips.",
};

export default function FoodsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Food library</h1>
      <p className="max-w-2xl text-sm text-muted-foreground">
        {allFoods.length} foods, each with the exact form that makes it safe at every age, a
        physical pass/fail test, and tips for getting the texture right.
      </p>
      <FoodBrowser foods={allFoods.map(slimFood)} />
    </div>
  );
}
