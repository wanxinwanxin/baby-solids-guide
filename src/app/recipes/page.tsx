import type { Metadata } from "next";
import Link from "next/link";
import { allRecipes } from "../../../content/recipes";
import { foodBySlug } from "../../../content/foods";
import { Badge } from "@/components/ui/badge";
import { getLocale } from "@/lib/i18n/server";
import { fmt, msg, pick } from "@/lib/i18n/config";
import { bandLabel } from "@/lib/i18n/labels";
import { recipesMsgs, RECIPE_METHOD_MSGS } from "@/lib/i18n/messages/recipes";
import { localizeRecipes } from "@/lib/l10n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function RecipesPage() {
  const locale = await getLocale();
  const t = pick(recipesMsgs, locale);
  const recipes = [...localizeRecipes(allRecipes, locale)].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {fmt(t.heading, { n: recipes.length })}
          <span className="text-primary">{t.headingDot}</span>
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/70">{t.intro}</p>
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
                <Badge variant="outline">{msg(RECIPE_METHOD_MSGS[r.method], locale)}</Badge>
                {r.ironPairing && <Badge variant="secondary">{t.ironShort}</Badge>}
                <span className="font-data self-center text-[10.5px] text-muted-foreground">
                  {r.bands.map((b) => bandLabel(b, locale)).join(" · ")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
