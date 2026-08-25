import { Suspense } from "react";
import type { Metadata } from "next";
import { msg } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { onboardingMsgs } from "@/lib/i18n/messages/onboarding";
import { OnboardingWizard } from "./OnboardingWizard";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: msg(onboardingMsgs.metaTitle, locale) };
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
