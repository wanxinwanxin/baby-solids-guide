import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRecipes, recipeBySlug } from "../../../../content/recipes";
import { foodBySlug } from "../../../../content/foods";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { ShareButton } from "@/components/ShareButton";
import { BRAND } from "@/lib/brand";
import { getLocale } from "@/lib/i18n/server";
import { msg, pick } from "@/lib/i18n/config";
import { bandLabel } from "@/lib/i18n/labels";
import { recipesMsgs, RECIPE_METHOD_MSGS } from "@/lib/i18n/messages/recipes";
import { localizeFood, localizeRecipe } from "@/lib/l10n";

export function generateStaticParams() {
  return allRecipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = recipeBySlug.get(slug);
  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  if (!base) return { title: t.recipeFallback };
  const recipe = localizeRecipe(base, locale);
  return {
    title: recipe.name,
    description: recipe.whyItWorks,
    alternates: { canonical: `/recipes/${slug}` },
  };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = recipeBySlug.get(slug);
  if (!base) notFound();

  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  const recipe = localizeRecipe(base, locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const ingredientNames = recipe.foods.map((s) => {
    const f = foodBySlug.get(s);
    return f ? localizeFood(f, locale).name : s;
  });

  return (
    <div className="mx-auto max-w-2xl space-y-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.name,
          description: recipe.whyItWorks,
          image: [`${siteUrl}/recipes/${recipe.slug}/opengraph-image`],
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          recipeCategory: "Baby food",
          keywords: recipe.bands.join(", "),
          recipeIngredient: ingredientNames,
          recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step })),
          author: { "@type": "Organization", name: BRAND, url: siteUrl },
        }}
      />
      <div className="space-y-3">
        <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/recipes" className="hover:text-foreground">
            {t.breadcrumbRecipes}
          </Link>{" "}
          / {msg(RECIPE_METHOD_MSGS[recipe.method], locale)}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{recipe.name}</h1>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{msg(RECIPE_METHOD_MSGS[recipe.method], locale)}</Badge>
          {recipe.ironPairing && <Badge variant="secondary">{t.ironLong}</Badge>}
          <span className="font-data text-[11px] text-muted-foreground">
            {recipe.bands.map((b) => bandLabel(b, locale)).join(" · ")}
          </span>
          <span className="ml-auto">
            <ShareButton title={recipe.name} path={`/recipes/${recipe.slug}`} />
          </span>
        </div>
      </div>

      <section className="space-y-2.5">
        <h2 className="text-xl font-bold">{t.whatsInIt}</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.foods.map((s) => {
            const baseFood = foodBySlug.get(s);
            const food = baseFood ? localizeFood(baseFood, locale) : undefined;
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
        <p className="text-[13px] text-muted-foreground">{t.ingredientNote}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t.steps}</h2>
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
        <h2 className="text-base font-bold">{t.whyItWorks}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{recipe.whyItWorks}</p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-base font-bold">{t.storage}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{recipe.storage}</p>
      </section>

      <div className="flex justify-center pt-2">
        <Link href="/recipes" className={cn(buttonVariants({ variant: "outline" }), "min-h-11 px-6")}>
          {t.allRecipes}
        </Link>
      </div>
    </div>
  );
}
