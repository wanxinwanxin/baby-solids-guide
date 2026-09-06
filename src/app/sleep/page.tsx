import type { Metadata } from "next";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { sleepMsgs } from "@/lib/i18n/messages/sleep";
import { SleepClient } from "./SleepClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(sleepMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/sleep" },
    // A personal tool over device-local data — keep it out of search results.
    robots: { index: false },
  };
}

export default function SleepPage() {
  return <SleepClient />;
}
