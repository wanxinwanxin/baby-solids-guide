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
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-[2.75rem]">
        {allFoods.length} foods, all free<span className="text-primary">.</span>
      </h1>
      <FoodBrowser foods={allFoods.map(slimFood)} />
    </div>
  );
}
