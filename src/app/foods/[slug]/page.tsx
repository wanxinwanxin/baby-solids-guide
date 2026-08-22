import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFoods, foodBySlug } from "../../../../content/foods";
import { ALLERGEN_LABELS, BAND_LABELS, CATEGORY_LABELS } from "@/lib/food-utils";
import { CutDiagram, isDiagramVariant } from "@/components/diagrams/CutDiagram";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = foodBySlug.get(slug);
  if (!food) notFound();

  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold">{food.name}</h1>
          <Badge variant="outline">{CATEGORY_LABELS[food.category]}</Badge>
          <Badge variant="outline">{food.minAgeMonths} months +</Badge>
          {food.ironRich && (
            <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-400">
              Iron-rich
            </Badge>
          )}
        </div>
        {food.nutritionHighlights.length > 0 && (
          <ul className="flex max-w-2xl flex-col gap-1 text-sm text-muted-foreground">
            {food.nutritionHighlights.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        )}
      </div>

      {food.commonAllergen && (
        <Alert className="border-violet-300">
          <AlertTitle>Common allergen: {ALLERGEN_LABELS[food.commonAllergen]}</AlertTitle>
          <AlertDescription>
            Introduce it early in the day, alongside familiar foods, and watch for 2 hours.{" "}
            <Link href={`/allergens/${food.commonAllergen}`} className="underline underline-offset-2">
              See the {ALLERGEN_LABELS[food.commonAllergen]} introduction program →
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {food.chokingNotes && (
        <Alert className="border-red-300">
          <AlertTitle>
            {food.chokingRisk === "high" ? "High choking risk — prep matters" : "Choking care"}
          </AlertTitle>
          <AlertDescription>{food.chokingNotes}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={food.prepSpecs[0].band}>
        <TabsList>
          {food.prepSpecs.map((spec) => (
            <TabsTrigger key={spec.band} value={spec.band}>
              {BAND_LABELS[spec.band]}
            </TabsTrigger>
          ))}
        </TabsList>
        {food.prepSpecs.map((spec) => (
          <TabsContent key={spec.band} value={spec.band} className="space-y-4 pt-4">
            <Card className="border-emerald-300">
              <CardHeader>
                <CardTitle className="text-base">Safe form at {BAND_LABELS[spec.band]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-pretty text-lg font-medium">{spec.form}</p>
                <div className="rounded-md bg-emerald-50 p-3 text-sm dark:bg-emerald-950">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                    Pass/fail test:{" "}
                  </span>
                  {spec.passFailTest}
                </div>
                {isDiagramVariant(spec.cutDiagram) && (
                  <CutDiagram variant={spec.cutDiagram} className="pt-1" />
                )}
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Why this form: </span>
                  {spec.whyThisForm}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">How to prepare</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal space-y-2 pl-5 text-sm">
                    {spec.prepSteps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
              {spec.commonMistakes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Common mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {spec.commonMistakes.map((m) => (
                        <li key={m}>✗ {m}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Getting the texture right</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {food.tips.map((t) => (
              <li key={t}>💡 {t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/log?food=${food.slug}`}
          className={cn(buttonVariants(), "bg-emerald-700 text-white hover:bg-emerald-800")}
        >
          Log this food
        </Link>
        {food.flavorPairings.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Pairs well with:{" "}
            {food.flavorPairings.map((p, i) => (
              <span key={p}>
                {i > 0 && ", "}
                <Link href={`/foods/${p}`} className="underline underline-offset-2">
                  {foodBySlug.get(p)?.name ?? p}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>

      <footer className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="font-medium">Sources</p>
        <ul className="space-y-1">
          {food.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              (retrieved {s.retrievedOn})
            </li>
          ))}
        </ul>
        <p>
          Educational guidance, not medical advice. Every baby develops differently — when in
          doubt, ask your pediatrician.
        </p>
      </footer>
    </article>
  );
}
