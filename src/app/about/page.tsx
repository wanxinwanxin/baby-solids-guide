import type { Metadata } from "next";
import { SOURCES } from "../../../content/sources";
import { allFoods } from "../../../content/foods";
import { getLocale } from "@/lib/i18n/server";
import { fmt, pick } from "@/lib/i18n/config";
import { aboutMsgs } from "@/lib/i18n/messages/about";
import { SUPPORT_EMAIL } from "@/lib/brand";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(aboutMsgs, locale);
  return {
    title: t.metaTitle,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = pick(aboutMsgs, locale);
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">{t.title}</h1>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{t.whatTitle}</h2>
        <p>{t.what1}</p>
        <p>{t.what2}</p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{t.methodTitle}</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>{fmt(t.method1, { n: allFoods.length })}</li>
          <li>{t.method2}</li>
          <li>{t.method3}</li>
          <li>{t.method4}</li>
        </ul>
      </section>

      <section className="space-y-3 text-sm">
        <h2 className="text-lg font-semibold">{t.sourcesTitle}</h2>
        <ul className="space-y-2">
          {Object.values(SOURCES).map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              <span className="text-muted-foreground">{fmt(t.retrieved, { date: s.retrievedOn })}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{t.privacyTitle}</h2>
        <p>{t.privacyBody}</p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{t.contactTitle}</h2>
        <p>
          {/* Split on the placeholder so the address lands inline in both
              locales, where the sentence actually puts it. */}
          {t.contactBody.split("{email}")[0]}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-2">
            {SUPPORT_EMAIL}
          </a>
          {t.contactBody.split("{email}")[1]}
        </p>
        <p className="text-muted-foreground">
          {t.contactUrgent}{" "}
          <Link href="/safety" className="underline underline-offset-2">
            {t.contactEmergencyLink}
          </Link>
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{t.nameTitle}</h2>
        <p>{t.nameBody}</p>
      </section>
    </article>
  );
}
