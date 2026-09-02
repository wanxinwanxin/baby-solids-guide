import type { Metadata } from "next";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { allergensMsgs } from "@/lib/i18n/messages/allergens";

// The /allergens index is a client component, so it cannot export metadata
// itself; this segment layout carries it. /allergens/[id] overrides the
// title, description, and canonical with its own.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(allergensMsgs, locale);
  return {
    title: t.title,
    description: t.intro,
    alternates: { canonical: "/allergens" },
  };
}

export default function AllergensLayout({ children }: { children: React.ReactNode }) {
  return children;
}
