import type { Metadata } from "next";
import Link from "next/link";
import { allRecipes } from "../../../content/recipes";
import { foodBySlug } from "../../../content/foods";
import { BAND_LABELS } from "@/lib/food-utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Blender-simple baby recipes: blend, mash, stir, or freeze into cubes. Built only from foods in the database, with iron + vitamin-C pairings marked.",
};

const METHOD_LABELS: Record<string, string> = {
  blend: "Blend",
  mash: "Mash",
  stir: "Stir",
  assemble: "Assemble",
  "freeze-cubes": "Freezer cubes",
};

export default function RecipesPage() {
  const recipes = [...allRecipes].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {recipes.length} blender-simple recipes<span className="text-primary">.</span>
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/70">
          Nothing here is a cooking project: blend, mash, stir, or freeze into cubes and reheat.
          Every ingredient links to its safe-prep page, and iron + vitamin-C pairings are marked —
          that combination helps plant iron absorb.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/recipes/${r.slug}`}
              className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary"
            >
              <div aria-hidden="true" className="flex h-14 items-center gap-1 text-3xl">
                {r.foods.slice(0, 4).map((slug) => (
                  <span key={slug}>{foodBySlug.get(slug)?.emoji ?? "·"}</span>
                ))}
              </div>
              <span className="font-heading text-lg leading-tight font-bold">{r.name}</span>
              <p className="line-clamp-2 flex-1 text-[13px] leading-snug text-muted-foreground">
                {r.whyItWorks}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">{METHOD_LABELS[r.method]}</Badge>
                {r.ironPairing && <Badge variant="secondary">Iron + vit C</Badge>}
                <span className="font-data self-center text-[10.5px] text-muted-foreground">
                  {r.bands.map((b) => BAND_LABELS[b]).join(" · ")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
