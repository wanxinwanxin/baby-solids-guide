import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allGuides, guideBySlug } from "../../../../content/guides";

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  const idx = allGuides.findIndex((g) => g.slug === slug);
  const next = allGuides[idx + 1];

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          Learn · {guide.minRead} min read
        </p>
        <h1 className="text-3xl font-bold">{guide.title}</h1>
        <p className="text-lg text-muted-foreground">{guide.summary}</p>
      </div>

      {guide.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-emerald-300 p-4">
        <p className="text-sm font-medium">Ready to put it into practice?</p>
        <Link href="/onboarding" className="text-sm text-emerald-700 underline underline-offset-2 dark:text-emerald-400">
          Set up your plan →
        </Link>
        {next && (
          <Link href={`/learn/${next.slug}`} className="ml-auto text-sm underline underline-offset-2">
            Next: {next.title} →
          </Link>
        )}
      </div>

      <footer className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="font-medium">Sources</p>
        <ul className="space-y-1">
          {guide.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              (retrieved {s.retrievedOn})
            </li>
          ))}
        </ul>
        <p>Educational guidance, not medical advice — your pediatrician&apos;s word wins.</p>
      </footer>
    </article>
  );
}
