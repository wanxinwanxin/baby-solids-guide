import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFamilyRecipes, familyRecipeBySlug } from "../../../../../content/family-recipes";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { ShareButton } from "@/components/ShareButton";
import { BRAND } from "@/lib/brand";
import { getLocale } from "@/lib/i18n/server";
import { pick } from "@/lib/i18n/config";
import { recipesMsgs } from "@/lib/i18n/messages/recipes";
import { localizeFamilyRecipe } from "@/lib/l10n";

export function generateStaticParams() {
  return allFamilyRecipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = familyRecipeBySlug.get(slug);
  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  if (!base) return { title: t.recipeFallback };
  const recipe = localizeFamilyRecipe(base, locale);
  return {
    title: recipe.name,
    description: recipe.whyItWorks,
    alternates: { canonical: `/recipes/family/${slug}` },
  };
}

export default async function FamilyRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = familyRecipeBySlug.get(slug);
  if (!base) notFound();

  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  const recipe = localizeFamilyRecipe(base, locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <div className="mx-auto max-w-2xl space-y-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.name,
          description: recipe.whyItWorks,
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          recipeCategory: "Family meal",
          recipeYield: recipe.serves,
          totalTime: recipe.time,
          recipeIngredient: recipe.ingredients,
          recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step })),
          author: { "@type": "Organization", name: BRAND, url: siteUrl },
        }}
      />
      <div className="space-y-3">
        <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/recipes" className="hover:text-foreground">
            {t.breadcrumbRecipes}
          </Link>{" "}
          / {t.familyBreadcrumb}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span aria-hidden="true">{recipe.emoji}</span> {recipe.name}
        </h1>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{t.familyBadge}</Badge>
          <span className="font-data text-[11px] text-muted-foreground">
            {t.familyTime}: {recipe.time} · {t.familyServes}: {recipe.serves}
          </span>
          <span className="ml-auto">
            <ShareButton title={recipe.name} path={`/recipes/family/${recipe.slug}`} />
          </span>
        </div>
      </div>

      <section className="space-y-2.5">
        <h2 className="text-xl font-bold">{t.familyIngredients}</h2>
        <ul className="list-disc space-y-1 pl-5 text-[15px] leading-relaxed">
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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

      {recipe.tips && recipe.tips.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-base font-bold">{t.familyTips}</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            {recipe.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-[13px] leading-relaxed text-muted-foreground">{t.familyBabyNote}</p>

      <div className="flex justify-center pt-2">
        <Link href="/recipes" className={cn(buttonVariants({ variant: "outline" }), "min-h-11 px-6")}>
          {t.allRecipes}
        </Link>
      </div>
    </div>
  );
}
