import type { Metadata } from "next";
import Link from "next/link";
import { allFoods, foodBySlug } from "../../content/foods";
import { allGuides } from "../../content/guides";
import { SOURCES } from "../../content/sources";
import {
  CutDiagram,
  isDiagramVariant,
  type DiagramVariant,
} from "@/components/diagrams/CutDiagram";
import { Reveal } from "@/components/landing/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { fmt, msg, pick } from "@/lib/i18n/config";
import {
  LANDING_BAND_CAPTIONS,
  LANDING_BAND_LABELS,
  LANDING_QUESTION_CARDS,
  landingMsgs,
} from "@/lib/i18n/messages/landing";
import { getLocale } from "@/lib/i18n/server";
import { localizeFood, localizeGuides } from "@/lib/l10n";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/wanxinwanxin/baby-solids-guide";

// Title and description come from the root layout; the landing page only
// pins its canonical URL so crawlers fold query-string variants into "/".
export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * The 12–24m banana is served whole / in large hand-held pieces and carries no
 * cutDiagram in content — "batons" (large hand-held pieces) is the closest
 * parametric stand-in.
 */
const FALLBACK_VARIANT: DiagramVariant = "batons";

/** Receipt chips link straight to the primary sources they name. */
const RECEIPTS = [
  { label: "NIAID 2017", href: SOURCES.niaid2017.url },
  { label: "LEAP · NEJM 2015", href: SOURCES.leapStudy.url },
  { label: "EAT · NEJM 2016", href: SOURCES.eatStudy.url },
  { label: "CDC", href: SOURCES.cdcFoodsAndDrinks.url },
  { label: "AAP", href: SOURCES.aapStartingSolids.url },
  { label: "WHO", href: SOURCES.whoComplementary.url },
  { label: "USDA WIC", href: SOURCES.wicGuide.url },
];

const FEATURED_GUIDE_SLUGS = ["why-solids", "when-to-start", "allergens-101"];

const ctaPrimary = cn(buttonVariants({ size: "lg" }), "h-12 px-7 text-base");
const ctaOutline = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 border-foreground/75 px-7 text-base text-foreground",
);

export default async function LandingPage() {
  const locale = await getLocale();
  const t = pick(landingMsgs, locale);
  const rawBanana = foodBySlug.get("banana");
  if (!rawBanana) throw new Error("Landing page expects a banana entry in content/foods");
  const banana = localizeFood(rawBanana, locale);
  const heroSpec = banana.prepSpecs[0];
  const heroVariant = isDiagramVariant(heroSpec.cutDiagram)
    ? heroSpec.cutDiagram
    : FALLBACK_VARIANT;
  const sourceCount = Object.keys(SOURCES).length;
  const learnGuides = localizeGuides(
    FEATURED_GUIDE_SLUGS.flatMap((slug) => allGuides.find((g) => g.slug === slug) ?? []),
    locale,
  );

  return (
    <div className="space-y-16 pt-6 sm:space-y-20">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 self-start whitespace-nowrap rounded-full bg-secondary px-3.5 py-1.5 font-data text-[10px] tracking-[0.1em] text-secondary-foreground sm:text-[11px]">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {t.badge}
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            {t.heroTitle}<span className="text-primary">{t.heroTitleDot}</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.heroLede}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/onboarding" className={ctaPrimary}>
              {t.ctaFresh}
            </Link>
            <Link href="/onboarding/import" className={ctaOutline}>
              {t.ctaStarted}
            </Link>
          </div>
          <div className="mt-1 grid grid-cols-3 gap-4 border-t pt-5">
            <div className="flex flex-col gap-1">
              <span className="font-data text-2xl font-bold sm:text-3xl">{allFoods.length}</span>
              <span className="font-data text-[9px] tracking-[0.08em] text-muted-foreground sm:text-[10px]">
                {t.statFoods}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-data text-2xl font-bold sm:text-3xl">{sourceCount}</span>
              <span className="font-data text-[9px] tracking-[0.08em] text-muted-foreground sm:text-[10px]">
                {t.statSources}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-data text-2xl font-bold sm:text-3xl">100%</span>
              <span className="font-data text-[9px] tracking-[0.08em] text-muted-foreground sm:text-[10px]">
                {t.statOpenSource}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rotate-[1.2deg] rounded-2xl border bg-card p-5 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <span className="font-heading text-xl font-bold">{banana.name}</span>
              <span className="whitespace-nowrap rounded-full bg-secondary px-2.5 py-1 font-data text-[10px] tracking-[0.12em] text-secondary-foreground">
                {msg(LANDING_BAND_LABELS[heroSpec.band], locale)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-center rounded-xl bg-muted px-3 py-4">
              <CutDiagram variant={heroVariant} locale={locale} showCaption={false} className="flex w-full justify-center" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-data text-[9.5px] tracking-[0.12em] text-primary-deep">
                {t.passFail}{" "}
              </span>
              {heroSpec.passFailTest}
            </p>
          </div>

          {/* Product preview — static mock content by design. The `dark` class
              scopes dark tokens to this card so every color stays tokenized. */}
          <div className="dark -mt-1 w-full max-w-[340px] -rotate-[1.6deg] self-start rounded-2xl bg-card p-5 text-foreground shadow-xl">
            <span className="font-data text-[10px] tracking-[0.12em] text-secondary-foreground">
              {t.mockEyebrow}
            </span>
            <p className="mt-2 font-heading text-xl font-bold leading-snug">
              {t.mockHeadline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.mockMeta}
            </p>
            <span className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {t.mockCta}
            </span>
          </div>
        </div>
      </section>

      {/* One food, three ages */}
      <section className="flex flex-col gap-7">
        <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">
          {t.threeAgesTitle}
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {banana.prepSpecs.map((spec, i) => {
            const variant = isDiagramVariant(spec.cutDiagram) ? spec.cutDiagram : FALLBACK_VARIANT;
            const highlighted = i === 0;
            const caption = LANDING_BAND_CAPTIONS[spec.band];
            return (
              <Reveal key={spec.band} delayMs={i * 120} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col gap-3 rounded-2xl border bg-card p-5",
                    highlighted && "border-[1.5px] border-primary",
                  )}
                >
                  <span
                    className={cn(
                      "self-start whitespace-nowrap rounded-full px-3 py-1 font-data text-[10.5px] tracking-[0.12em]",
                      highlighted
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {msg(LANDING_BAND_LABELS[spec.band], locale)}
                  </span>
                  <div className="flex items-center justify-center rounded-xl bg-muted p-3">
                    <CutDiagram variant={variant} locale={locale} showCaption={false} className="flex w-full justify-center" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {caption ? msg(caption, locale) : spec.form}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Three questions */}
      <section className="grid gap-5 sm:grid-cols-3">
        {LANDING_QUESTION_CARDS.map((q) => (
          <div key={q.eyebrow.en} className="flex flex-col gap-2.5 rounded-2xl bg-muted p-6">
            <span className="font-data text-[10.5px] tracking-[0.12em] text-primary-deep">
              {msg(q.eyebrow, locale)}
            </span>
            <h3 className="font-heading text-xl font-bold">{msg(q.title, locale)}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{msg(q.body, locale)}</p>
          </div>
        ))}
      </section>

      {/* Learn strip */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t.learnTitle}</h2>
          <Link href="/learn" className="text-sm font-semibold text-primary hover:text-primary-deep">
            {t.allChaptersBefore}<span className="font-data">{allGuides.length}</span>{t.allChaptersAfter}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {learnGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/learn/${g.slug}`}
              className="flex flex-col gap-2.5 rounded-2xl border bg-card p-6 transition-colors hover:border-primary"
            >
              <h3 className="font-heading text-lg font-bold">{g.title}</h3>
              <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {g.summary}
              </p>
              <span className="font-data text-[10.5px] tracking-[0.1em] text-primary-deep">
                {fmt(t.minRead, { n: g.minRead })}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t pt-5">
          <span className="mr-1 font-data text-[10.5px] tracking-[0.12em] text-muted-foreground">
            {t.receiptsLabel}
          </span>
          {RECEIPTS.map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {r.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {t.openSource}
          </a>
        </div>
      </section>

      {/* Dark CTA band — `dark` class scopes dark tokens to this panel. */}
      <section className="dark flex flex-col gap-6 rounded-3xl bg-card px-7 py-10 text-foreground sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t.ctaBandTitle}</h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            {t.ctaBandBody}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-7 text-base font-bold")}
          >
            {t.ctaFresh}
          </Link>
          <Link
            href="/onboarding/import"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-7 text-base dark:border-primary dark:bg-transparent dark:hover:bg-primary/10",
            )}
          >
            {t.ctaStarted}
          </Link>
        </div>
      </section>
    </div>
  );
}
