import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFoods, foodBySlug } from "../../../../content/foods";
import { allRecipes } from "../../../../content/recipes";
import { fmt, msg, pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { allergenLabel, categoryLabel, nutrientLabel } from "@/lib/i18n/labels";
import { foodDetailMsgs } from "@/lib/i18n/messages/food-detail";
import { localizeFood, localizeRecipes } from "@/lib/l10n";
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
  const base = foodBySlug.get(slug);
  if (!base) return {};
  const locale = await getLocale();
  const food = localizeFood(base, locale);
  return {
    title: fmt(msg(foodDetailMsgs.metaTitle, locale), { name: food.name }),
    description: food.prepSpecs[0].form,
    alternates: { canonical: `/foods/${slug}` },
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
  const base = foodBySlug.get(slug);
  if (!base) notFound();

  const locale = await getLocale();
  const t = pick(foodDetailMsgs, locale);
  const food = localizeFood(base, locale);

  /** English question headings use the lowercased name; zh uses the localized name as-is. */
  const foodRef = locale === "en" ? food.name.toLowerCase() : food.name;
  /** Localized display name for another food, by slug. */
  const foodName = (s: string) => {
    const f = foodBySlug.get(s);
    return f ? localizeFood(f, locale).name : s;
  };
  const category = categoryLabel(food.category, locale);
  const recipesWithFood = localizeRecipes(allRecipes, locale)
    .filter((r) => r.foods.includes(food.slug))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 8);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <nav
          aria-label={t.breadcrumbLabel}
          className="font-data text-[11.5px] tracking-[0.1em] text-muted-foreground uppercase"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/foods" className="transition-colors hover:text-foreground">
                {t.breadcrumbFoods}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{category}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {food.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{food.name}</h1>
          <Badge className="border-transparent bg-accent text-accent-foreground">{category}</Badge>
          {food.firstFoodPick && <Badge variant="secondary">{t.greatFirstFood}</Badge>}
        </div>

        <div className="overflow-x-auto rounded-2xl border bg-card">
          <dl className="flex w-max min-w-full divide-x divide-border">
            <Fact label={t.factAge}>{fmt(t.monthsPlus, { n: food.minAgeMonths })}</Fact>
            <Fact label={t.factAllergen}>
              {food.commonAllergen ? allergenLabel(food.commonAllergen, locale) : t.no}
            </Fact>
            <Fact label={t.factChoking}>
              {food.chokingRisk === "low" ? (
                <>
                  {t.chokingLow} <span className="font-medium text-muted-foreground">{t.chokingLowNote}</span>
                </>
              ) : food.chokingRisk === "moderate" ? (
                <span className="text-accent-foreground">{t.chokingModerate}</span>
              ) : (
                <span className="text-accent-foreground">{t.chokingHigh}</span>
              )}
            </Fact>
            <Fact label={t.factIron}>{food.ironRich ? t.ironRich : t.notIronRich}</Fact>
            <Fact label={t.factGoodFor}>
              {food.nutrients ? food.nutrients.map((n) => nutrientLabel(n, locale)).join(" · ") : "—"}
            </Fact>
          </dl>
        </div>
      </header>

      <section className="space-y-3">
        <SectionHeading>{fmt(t.whenHeading, { name: foodRef })}</SectionHeading>
        <p className="max-w-[62ch] text-pretty leading-relaxed text-foreground/80">
          {fmt(food.firstFoodPick ? t.fromMonthsFirstPick : t.fromMonthsDefault, {
            n: food.minAgeMonths,
          })}
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
        <SectionHeading>{t.serveHeading}</SectionHeading>
        <PrepBands prepSpecs={food.prepSpecs} servingGuidance={food.servingGuidance} />
      </section>

      <section className="space-y-3">
        <SectionHeading>{t.textureHeading}</SectionHeading>
        <ul className="max-w-[62ch] space-y-2">
          {food.tips.map((tip) => (
            <li key={tip} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <SectionHeading>{fmt(t.chokingHeading, { name: foodRef })}</SectionHeading>
        {food.chokingRisk === "low" ? (
          <p className="max-w-[62ch] leading-relaxed text-foreground/80">
            {food.chokingNotes ?? t.chokingFallback}
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
              {food.chokingRisk === "high" ? t.highChokingTitle : t.chokingCareTitle}
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
          <SectionHeading>{fmt(t.allergenHeading, { name: foodRef })}</SectionHeading>
          <div className="max-w-[62ch] space-y-1.5 rounded-xl border border-honey/30 bg-accent px-5 py-4">
            <p className="text-sm font-bold text-accent-foreground">
              {fmt(t.commonAllergenLabel, { a: allergenLabel(food.commonAllergen, locale) })}
            </p>
            <p className="text-sm leading-relaxed text-accent-foreground">
              {t.allergenBody}{" "}
              <Link
                href={`/allergens/${food.commonAllergen}`}
                className="font-semibold underline underline-offset-2"
              >
                {fmt(t.allergenLink, { a: allergenLabel(food.commonAllergen, locale) })}
              </Link>
            </p>
          </div>
        </section>
      )}

      {food.watchOuts && food.watchOuts.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>{t.watchHeading}</SectionHeading>
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
          <SectionHeading>{t.nutrientsHeading}</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {food.nutrients.map((n) => (
              <Badge key={n} variant="secondary">
                {nutrientLabel(n, locale)}
              </Badge>
            ))}
          </div>
          {food.nutrients.includes("iron") && (
            <p className="max-w-[62ch] text-sm leading-relaxed text-foreground/80">
              <span className="font-semibold text-foreground">{t.ironTipLabel}</span>
              {t.ironTipBody}
              {allFoods
                .filter((f) => f.nutrients?.includes("vitaminC") && f.slug !== food.slug)
                .sort((a, b) => a.slug.localeCompare(b.slug))
                .slice(0, 3)
                .map((f, i) => (
                  <span key={f.slug}>
                    {i > 0 && t.listSep}
                    <Link href={`/foods/${f.slug}`} className="underline underline-offset-2">
                      {locale === "en" ? foodName(f.slug).toLowerCase() : foodName(f.slug)}
                    </Link>
                  </span>
                ))}
              {t.sentenceEnd}
            </p>
          )}
        </section>
      )}

      {food.flavorPairings.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>{t.pairingsHeading}</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {food.flavorPairings.map((p) => (
              <li key={p}>
                <Link
                  href={`/foods/${p}`}
                  className="inline-flex items-center rounded-full border bg-card px-4.5 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
                >
                  {foodName(p)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recipesWithFood.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>{t.recipesHeading}</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {recipesWithFood.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4.5 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
                >
                  {r.name}
                  {r.ironPairing && (
                    <span className="font-data text-[10px] text-secondary-foreground">{t.ironCTag}</span>
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
          {fmt(t.logCta, { name: foodRef })}
        </Link>
      </div>

      <footer className="space-y-3 border-t pt-6">
        <p className="font-data text-[11px] tracking-[0.12em] text-muted-foreground">
          {t.receiptsLabel}
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
          {t.disclaimer}
        </p>
      </footer>
    </article>
  );
}
