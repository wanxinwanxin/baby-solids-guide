import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFoods, foodBySlug } from "../../../../content/foods";
import { allRecipes } from "../../../../content/recipes";
import { ALLERGEN_LABELS, CATEGORY_LABELS, NUTRIENT_LABELS } from "@/lib/food-utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PrepBands } from "./PrepBands";

export function generateStaticParams() {
  return allFoods.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const food = foodBySlug.get(slug);
  if (!food) return {};
  return {
    title: `${food.name} for babies — safe texture by age`,
    description: food.prepSpecs[0].form,
  };
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-36 flex-1 flex-col gap-1 px-5 py-4">
      <dt className="font-data text-[10px] tracking-[0.12em] text-muted-foreground whitespace-nowrap">{label}</dt>
      <dd className="text-[15px] font-bold">{children}</dd>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = foodBySlug.get(slug);
  if (!food) notFound();

  const lname = food.name.toLowerCase();
  const categoryLabel = CATEGORY_LABELS[food.category];
  const recipesWithFood = allRecipes
    .filter((r) => r.foods.includes(food.slug))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 8);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <nav
          aria-label="Breadcrumb"
          className="font-data text-[11.5px] tracking-[0.1em] text-muted-foreground uppercase"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/foods" className="transition-colors hover:text-foreground">
                Foods
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{categoryLabel}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {food.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{food.name}</h1>
          <Badge className="border-transparent bg-accent text-accent-foreground">{categoryLabel}</Badge>
          {food.firstFoodPick && <Badge variant="secondary">Great first food</Badge>}
        </div>

        <div className="overflow-x-auto rounded-2xl border bg-card">
          <dl className="flex w-max min-w-full divide-x divide-border">
            <Fact label="AGE">{food.minAgeMonths} months +</Fact>
            <Fact label="COMMON ALLERGEN">
              {food.commonAllergen ? ALLERGEN_LABELS[food.commonAllergen] : "No"}
            </Fact>
            <Fact label="CHOKING RISK">
              {food.chokingRisk === "low" ? (
                <>
                  Low <span className="font-medium text-muted-foreground">· prep still matters</span>
                </>
              ) : food.chokingRisk === "moderate" ? (
                <span className="text-accent-foreground">Moderate</span>
              ) : (
                <span className="text-accent-foreground">High — prep is the fix</span>
              )}
            </Fact>
            <Fact label="IRON">{food.ironRich ? "Iron-rich" : "Not iron-rich"}</Fact>
            <Fact label="GOOD FOR">
              {food.nutrients ? food.nutrients.map((n) => NUTRIENT_LABELS[n]).join(" · ") : "—"}
            </Fact>
          </dl>
        </div>
      </header>

      <section className="space-y-3">
        <SectionHeading>When can babies have {lname}?</SectionHeading>
        <p className="max-w-[62ch] text-pretty leading-relaxed text-foreground/80">
          From {food.minAgeMonths} months (corrected age)
          {food.firstFoodPick
            ? " — and it’s one of our curated great first foods."
            : ", in the age-right form below."}
        </p>
        {food.nutritionHighlights.length > 0 && (
          <ul className="max-w-[62ch] space-y-1.5">
            {food.nutritionHighlights.map((h) => (
              <li key={h} className="flex gap-2.5 leading-relaxed text-foreground/80">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeading>How do I serve it at each age?</SectionHeading>
        <PrepBands prepSpecs={food.prepSpecs} servingGuidance={food.servingGuidance} />
      </section>

      <section className="space-y-3">
        <SectionHeading>How do I get the texture right?</SectionHeading>
        <ul className="max-w-[62ch] space-y-2">
          {food.tips.map((t) => (
            <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <SectionHeading>Is {lname} a choking hazard?</SectionHeading>
        {food.chokingRisk === "low" ? (
          <p className="max-w-[62ch] leading-relaxed text-foreground/80">
            {food.chokingNotes ??
              "Low risk in the forms above — shape and texture do the safety work. Any food can be a hazard served the wrong way, so match the form to your baby’s age."}
          </p>
        ) : (
          <div
            className={cn(
              "max-w-[62ch] space-y-1.5 rounded-xl border px-5 py-4",
              food.chokingRisk === "high"
                ? "border-destructive/30 bg-destructive-tint"
                : "border-honey/30 bg-accent",
            )}
          >
            <p
              className={cn(
                "text-sm font-bold",
                food.chokingRisk === "high" ? "text-destructive" : "text-accent-foreground",
              )}
            >
              {food.chokingRisk === "high" ? "High choking risk — prep matters" : "Choking care"}
            </p>
            <p
              className={cn(
                "text-sm leading-relaxed",
                food.chokingRisk === "high" ? "text-foreground/80" : "text-accent-foreground",
              )}
            >
              {food.chokingNotes}
            </p>
          </div>
        )}
      </section>

      {food.commonAllergen && (
        <section className="space-y-3">
          <SectionHeading>Is {lname} a common allergen?</SectionHeading>
          <div className="max-w-[62ch] space-y-1.5 rounded-xl border border-honey/30 bg-accent px-5 py-4">
            <p className="text-sm font-bold text-accent-foreground">
              Common allergen: {ALLERGEN_LABELS[food.commonAllergen]}
            </p>
            <p className="text-sm leading-relaxed text-accent-foreground">
              Yes — introduce it early in the day, alongside familiar foods, and watch for 2 hours.{" "}
              <Link
                href={`/allergens/${food.commonAllergen}`}
                className="font-semibold underline underline-offset-2"
              >
                See the {ALLERGEN_LABELS[food.commonAllergen]} introduction program →
              </Link>
            </p>
          </div>
        </section>
      )}

      {food.watchOuts && food.watchOuts.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Anything to watch for?</SectionHeading>
          <div className="max-w-[62ch] space-y-2.5 rounded-xl border border-honey/30 bg-accent px-5 py-4">
            {food.watchOuts.map((w) => (
              <p key={w} className="flex items-start gap-3 text-sm leading-relaxed text-accent-foreground">
                <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-honey" />
                {w}
              </p>
            ))}
          </div>
        </section>
      )}

      {food.nutrients && (
        <section className="space-y-3">
          <SectionHeading>What nutrients does it bring?</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {food.nutrients.map((n) => (
              <Badge key={n} variant="secondary">
                {NUTRIENT_LABELS[n]}
              </Badge>
            ))}
          </div>
          {food.nutrients.includes("iron") && (
            <p className="max-w-[62ch] text-sm leading-relaxed text-foreground/80">
              <span className="font-semibold text-foreground">Iron tip: </span>
              vitamin C boosts iron absorption — pair with{" "}
              {allFoods
                .filter((f) => f.nutrients?.includes("vitaminC") && f.slug !== food.slug)
                .sort((a, b) => a.slug.localeCompare(b.slug))
                .slice(0, 3)
                .map((f, i) => (
                  <span key={f.slug}>
                    {i > 0 && ", "}
                    <Link href={`/foods/${f.slug}`} className="underline underline-offset-2">
                      {f.name.toLowerCase()}
                    </Link>
                  </span>
                ))}
              .
            </p>
          )}
        </section>
      )}

      {food.flavorPairings.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>What does it go with?</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {food.flavorPairings.map((p) => (
              <li key={p}>
                <Link
                  href={`/foods/${p}`}
                  className="inline-flex items-center rounded-full border bg-card px-4.5 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
                >
                  {foodBySlug.get(p)?.name ?? p}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recipesWithFood.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Recipes that use it</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {recipesWithFood.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4.5 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
                >
                  {r.name}
                  {r.ironPairing && (
                    <span className="font-data text-[10px] text-secondary-foreground">IRON+C</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex justify-center py-2">
        <Link
          href={`/log?food=${food.slug}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-13 px-8 text-base font-bold shadow-lg shadow-primary/25",
          )}
        >
          + Log {lname}
        </Link>
      </div>

      <footer className="space-y-3 border-t pt-6">
        <p className="font-data text-[11px] tracking-[0.12em] text-muted-foreground">
          RECEIPTS — EVERY CLAIM TRACES TO A FREE PRIMARY SOURCE
        </p>
        <ul className="flex flex-wrap gap-2">
          {food.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
              >
                {s.label}
                <span className="font-data text-[10px] text-muted-foreground">{s.retrievedOn}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          Educational guidance, not medical advice. Every baby develops differently — when in
          doubt, ask your pediatrician.
        </p>
      </footer>
    </article>
  );
}
