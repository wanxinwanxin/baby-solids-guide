import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/server";
import { pick } from "@/lib/i18n/config";
import { planMsgs } from "@/lib/i18n/messages/plan";
import { PlanBoard } from "./PlanBoard";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(planMsgs, locale);
  return {
    title: t.title,
    description: t.metaDescription,
  };
}

export default function PlanPage() {
  return <PlanBoard />;
}
