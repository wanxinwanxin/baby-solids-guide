import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/server";
import { logPageMsgs } from "@/lib/i18n/messages/log";
import { LogForm } from "./LogForm";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: logPageMsgs.metaTitle[locale] };
}

export default function LogPage() {
  return (
    <Suspense>
      <LogForm />
    </Suspense>
  );
}
