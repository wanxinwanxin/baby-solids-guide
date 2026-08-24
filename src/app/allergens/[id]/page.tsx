import type { Metadata } from"next";
import Link from"next/link";
import { notFound } from"next/navigation";
import { allergenPrograms } from"../../../../content/allergens";
import { foodBySlug } from"../../../../content/foods";
import { ALLERGEN_LABELS } from"@/lib/food-utils";
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
  return { title: `Introducing ${program.name}` };
}

export default async function AllergenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = allergenPrograms.find((p) => p.id === id);
  if (!program) notFound();

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">Introducing {ALLERGEN_LABELS[program.id]}</h1>

      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle className="text-base">First serve</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-base font-medium">{program.firstServe}</p>
          <div>
            <p className="font-semibold">Build up like this:</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              {program.doseProgression.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </div>
          <p>
            <span className="font-semibold">Then keep it going: </span>
            {program.maintenance}
          </p>
        </CardContent>
      </Card>

      <Alert className="border-red-300">
        <AlertTitle>What a reaction can look like</AlertTitle>
        <AlertDescription>
          <ul className="mt-1 space-y-1">
            {program.reactionSigns.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
          <p className="mt-2">
            Trouble breathing, tongue or lip swelling, widespread hives with vomiting, or a pale,
            floppy baby means <strong>call 911 now</strong>. See the{" "}
            <Link href="/safety"className="underline underline-offset-2">
              emergency guide
            </Link>
            .
          </p>
        </AlertDescription>
      </Alert>

      {program.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Good to know</CardTitle>
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
        <h2 className="text-lg font-semibold">Foods that deliver it</h2>
        <div className="flex flex-wrap gap-2">
          {program.foodSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/foods/${slug}`}
              className="rounded-full border px-3 py-1.5 text-sm hover:border-primary/60"
            >
              {foodBySlug.get(slug)?.name ?? slug} →
            </Link>
          ))}
        </div>
      </section>

      <footer className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="font-medium">Sources</p>
        <ul className="space-y-1">
          {program.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer"target="_blank"className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              (retrieved {s.retrievedOn})
            </li>
          ))}
        </ul>
        <p>Educational guidance, not medical advice — allergy decisions belong with your pediatrician or allergist.</p>
      </footer>
    </article>
  );
}
