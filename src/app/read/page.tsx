import type { Metadata } from "next";
import { chinesePoems, englishPieces } from "../../../content/read-aloud";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { readMsgs } from "@/lib/i18n/messages/read";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(readMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/read" },
    // A personal, auxiliary shelf — deliberately kept out of search results
    // so it never competes with the solids content.
    robots: { index: false },
  };
}

const KIND_KEY = { rhyme: "kindRhyme", poem: "kindPoem", sonnet: "kindSonnet" } as const;

export default async function ReadPage() {
  const locale = await getLocale();
  const t = pick(readMsgs, locale);

  const english = (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">{t.englishSection}</h2>
      <div className="space-y-2">
        {englishPieces.map((p) => (
          <details key={p.slug} className="group rounded-2xl border bg-card px-5 py-3.5">
            <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[15px] font-bold">{p.title}</span>
              <span className="font-data text-[11px] text-muted-foreground">
                {p.author} · {t[KIND_KEY[p.kind]]}
              </span>
            </summary>
            <div className="mt-3 space-y-4 pb-1.5">
              {/* Rhymes repeat lines verbatim, so positions are the only stable keys. */}
              {p.stanzas.map((stanza, si) => (
                <p key={si} className="text-[15px] leading-relaxed">
                  {stanza.map((line, li) => (
                    <span key={li} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );

  // Curated starter picks first, then the 唐诗三百首 poems grouped by form.
  const groupOrder = [
    t.groupCurated,
    ...Array.from(new Set(chinesePoems.map((p) => p.form).filter((f): f is string => !!f))),
  ];
  const groups = groupOrder.map((label) => ({
    label,
    poems: chinesePoems.filter((p) => (p.form ?? t.groupCurated) === label),
  }));

  const chinese = (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{t.chineseSection}</h2>
        <p className="text-sm text-muted-foreground">{t.chineseSectionNote}</p>
      </div>
      {groups.map((group) => (
        <section key={group.label} className="space-y-2">
          <h3 className="font-data text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
            {group.label} · {group.poems.length}
          </h3>
          <div className="space-y-2">
            {group.poems.map((p) => (
          <details key={p.slug} className="group rounded-2xl border bg-card px-5 py-3.5">
            <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[15px] font-bold">{p.title}</span>
              <span className="font-data text-[11px] text-muted-foreground">
                {p.pinyinTitle} · {p.dynasty} · {p.author}
              </span>
            </summary>
            <div className="mt-3 space-y-3 pb-1.5">
              {p.lines.map((line, li) => (
                <div key={li}>
                  <div className="font-data text-[12px] text-muted-foreground">{line.pinyin}</div>
                  <div className="text-[17px] leading-relaxed tracking-wide">{line.hanzi}</div>
                </div>
              ))}
            </div>
          </details>
            ))}
          </div>
        </section>
      ))}
    </section>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="max-w-2xl text-muted-foreground">{t.intro}</p>
      </div>
      {locale === "zh" ? (
        <>
          {chinese}
          {english}
        </>
      ) : (
        <>
          {english}
          {chinese}
        </>
      )}
    </div>
  );
}
