import type { Metadata } from"next";
import Link from"next/link";
import { notFound } from"next/navigation";
import { allGuides, guideBySlug } from"../../../../content/guides";
import { getLocale } from "@/lib/i18n/server";
import { fmt, pick } from "@/lib/i18n/config";
import { learnMsgs } from "@/lib/i18n/messages/learn";
import { localizeGuide } from "@/lib/l10n";

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = guideBySlug.get(slug);
  if (!base) return {};
  const locale = await getLocale();
  const guide = localizeGuide(base, locale);
  return { title: guide.title, description: guide.summary, alternates: { canonical: `/learn/${slug}` } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = guideBySlug.get(slug);
  if (!base) notFound();

  const locale = await getLocale();
  const t = pick(learnMsgs, locale);
  const guide = localizeGuide(base, locale);

  const idx = allGuides.findIndex((g) => g.slug === slug);
  const nextBase = allGuides[idx + 1];
  const next = nextBase ? localizeGuide(nextBase, locale) : undefined;

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {fmt(t.eyebrow, { n: guide.minRead })}
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

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-primary/40 p-4">
        <p className="text-sm font-medium">{t.readyCta}</p>
        <Link href="/onboarding"className="text-sm text-primary underline underline-offset-2">
          {t.setupLink}
        </Link>
        {next && (
          <Link href={`/learn/${next.slug}`} className="ml-auto text-sm underline underline-offset-2">
            {fmt(t.nextLabel, { title: next.title })}
          </Link>
        )}
      </div>

      <footer className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="font-medium">{t.sources}</p>
        <ul className="space-y-1">
          {guide.sources.map((s) => (
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
