import type { Metadata } from "next";
import Link from "next/link";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import { moreMsgs } from "@/lib/i18n/messages/more";
import { TourButton } from "./TourButton";

/**
 * The phone's "More" menu, as a page: the mobile tab bar links here, so every
 * section is reachable on a phone without knowing a hidden icon. Desktop has
 * the dropdown in the top bar instead, but the page works everywhere.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(moreMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/more" },
    // A navigation utility, not content — keep it out of search results.
    robots: { index: false },
  };
}

export default async function MorePage() {
  const locale = await getLocale();
  const t = pick(moreMsgs, locale);
  const nav = pick(chromeMsgs, locale);

  const links: { href: string; label: string; desc: string }[] = [
    { href: "/foods", label: nav.navFoods, desc: t.descFoods },
    { href: "/recipes", label: nav.navRecipes, desc: t.descRecipes },
    { href: "/learn", label: nav.navLearn, desc: t.descLearn },
    { href: "/allergens", label: nav.navAllergens, desc: t.descAllergens },
    { href: "/insights", label: nav.navInsights, desc: t.descInsights },
    { href: "/safety", label: nav.navSafety, desc: t.descSafety },
  ];
  const extras = [{ href: "/read", label: nav.navRead, desc: t.descRead }];

  const row = (l: { href: string; label: string; desc: string }) => (
    <Link
      key={l.href}
      href={l.href}
      className="flex items-center justify-between gap-3 rounded-2xl border bg-card px-5 py-4 hover:border-primary/60"
    >
      <span>
        <span className="block text-[15px] font-bold">{l.label}</span>
        <span className="block text-sm text-muted-foreground">{l.desc}</span>
      </span>
      <span aria-hidden="true" className="text-muted-foreground">
        ›
      </span>
    </Link>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="text-muted-foreground">{t.intro}</p>
      </div>
      <div className="space-y-2">{links.map(row)}</div>
      <section className="space-y-2">
        <h2 className="font-data text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {nav.navExtras}
        </h2>
        {extras.map(row)}
        <TourButton />
      </section>
    </div>
  );
}
