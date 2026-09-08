import type { Metadata } from "next";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { careMsgs } from "@/lib/i18n/messages/care";
import { CareClient } from "./CareClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(careMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/care" },
    // A personal logging tool — keep it out of search results.
    robots: { index: false },
  };
}

export default function CarePage() {
  return <CareClient />;
}
