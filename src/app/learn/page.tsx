import type { Metadata } from"next";
import Link from"next/link";
import { allGuides } from"../../../content/guides";
import { Card, CardContent } from"@/components/ui/card";
import { getLocale } from "@/lib/i18n/server";
import { fmt, pick } from "@/lib/i18n/config";
import { learnMsgs } from "@/lib/i18n/messages/learn";
import { localizeGuides } from "@/lib/l10n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(learnMsgs, locale);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function LearnPage() {
  const locale = await getLocale();
  const t = pick(learnMsgs, locale);
  const guides = localizeGuides(allGuides, locale);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="max-w-2xl text-muted-foreground">{t.intro}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {guides.map((g, i) => (
          <Link key={g.slug} href={`/learn/${g.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/60">
              <CardContent className="pt-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-semibold">
                    <span className="mr-2 text-primary">{i + 1}.</span>
                    {g.title}
                  </h2>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {fmt(t.minRead, { n: g.minRead })}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
