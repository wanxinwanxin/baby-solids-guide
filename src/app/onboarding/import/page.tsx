import type { Metadata } from "next";
import { msg } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { importFlowMsgs } from "@/lib/i18n/messages/import-flow";
import { ImportFlow } from "./ImportFlow";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: msg(importFlowMsgs.metaTitle, locale) };
}

export default function ImportPage() {
  return <ImportFlow />;
}
