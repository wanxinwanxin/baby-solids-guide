import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRecipes, recipeBySlug } from "../../../../content/recipes";
import { foodBySlug } from "../../../../content/foods";
import { BAND_LABELS } from "@/lib/food-utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return allRecipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  return { title: recipe ? recipe.name : "Recipe" };
}

const METHOD_LABELS: Record<string, string> = {
  blend: "Blend",
  mash: "Mash",
  stir: "Stir",
  assemble: "Assemble",
  "freeze-cubes": "Freezer cubes",
};

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-7">
      <div className="space-y-3">
        <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/recipes" className="hover:text-foreground">
            Recipes
          </Link>{" "}
          / {METHOD_LABELS[recipe.method]}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{recipe.name}</h1>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{METHOD_LABELS[recipe.method]}</Badge>
          {recipe.ironPairing && <Badge variant="secondary">Iron + vitamin C</Badge>}
          <span className="font-data text-[11px] text-muted-foreground">
            {recipe.bands.map((b) => BAND_LABELS[b]).join(" · ")}
          </span>
        </div>
      </div>

      <section className="space-y-2.5">
        <h2 className="text-xl font-bold">What&apos;s in it</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.foods.map((s) => {
            const food = foodBySlug.get(s);
            return (
              <Link
                key={s}
                href={`/foods/${s}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold hover:border-primary"
              >
                <span aria-hidden="true">{food?.emoji}</span>
                {food?.name ?? s}
              </Link>
            );
          })}
        </div>
        <p className="text-[13px] text-muted-foreground">
          Tap any ingredient for its safe form at your baby&apos;s age — the recipe assumes those
          preps.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Steps</h2>
        <ol className="space-y-2.5">
          {recipe.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="font-data mt-0.5 text-[12px] font-semibold text-honey-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-secondary/40 p-5 ring-1 ring-primary/30">
        <h2 className="text-base font-bold">Why it works</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{recipe.whyItWorks}</p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-base font-bold">Storage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{recipe.storage}</p>
      </section>

      <div className="flex justify-center pt-2">
        <Link href="/recipes" className={cn(buttonVariants({ variant: "outline" }), "min-h-11 px-6")}>
          All recipes →
        </Link>
      </div>
    </div>
  );
}
