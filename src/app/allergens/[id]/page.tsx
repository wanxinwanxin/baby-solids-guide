import type { Metadata } from"next";
import Link from"next/link";
import { notFound } from"next/navigation";
import { allergenPrograms } from"../../../../content/allergens";
import { foodBySlug } from"../../../../content/foods";
import { fmt, msg, pick } from"@/lib/i18n/config";
import { allergensMsgs } from"@/lib/i18n/messages/allergens";
import { getLocale } from"@/lib/i18n/server";
import { localizeAllergen, localizeFood } from"@/lib/l10n";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";

export function generateStaticParams() {
  return allergenPrograms.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const program = allergenPrograms.find((p) => p.id === id);
  if (!program) return {};
  const locale = await getLocale();
  const localized = localizeAllergen(program, locale);
  return {
    title: fmt(msg(allergensMsgs.introducing, locale), { name: localized.name }),
    description: localized.firstServe,
    alternates: { canonical: `/allergens/${id}` },
  };
}

export default async function AllergenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = allergenPrograms.find((p) => p.id === id);
  if (!base) notFound();
  const locale = await getLocale();
  const t = pick(allergensMsgs, locale);
  const program = localizeAllergen(base, locale);
  const deliverFoods = program.foodSlugs.map((slug) => {
    const food = foodBySlug.get(slug);
    return { slug, name: food ? localizeFood(food, locale).name : slug };
  });

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">{fmt(t.introducing, { name: program.name })}</h1>

      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle className="text-base">{t.firstServe}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-base font-medium">{program.firstServe}</p>
          <div>
            <p className="font-semibold">{t.buildUp}</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              {program.doseProgression.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </div>
          <p>
            <span className="font-semibold">{t.keepGoing}</span>
            {program.maintenance}
          </p>
        </CardContent>
      </Card>

      <Alert className="border-red-300">
        <AlertTitle>{t.reactionTitle}</AlertTitle>
        <AlertDescription>
          <ul className="mt-1 space-y-1">
            {program.reactionSigns.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
          <p className="mt-2">
            {t.reactionBefore}
            <strong>{t.reactionCall}</strong>
            {t.reactionSee}
            <Link href="/safety"className="underline underline-offset-2">
              {t.emergencyGuide}
            </Link>
            {t.reactionEnd}
          </p>
        </AlertDescription>
      </Alert>

      {program.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.goodToKnow}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {program.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{t.foodsDeliver}</h2>
        <div className="flex flex-wrap gap-2">
          {deliverFoods.map((food) => (
            <Link
              key={food.slug}
              href={`/foods/${food.slug}`}
              className="rounded-full border px-3 py-1.5 text-sm hover:border-primary/60"
            >
              {food.name} →
            </Link>
          ))}
        </div>
      </section>

      <footer className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="font-medium">{t.sources}</p>
        <ul className="space-y-1">
          {program.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer"target="_blank"className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              {fmt(t.retrieved, { date: s.retrievedOn })}
            </li>
          ))}
        </ul>
        <p>{t.disclaimer}</p>
      </footer>
    </article>
  );
}
