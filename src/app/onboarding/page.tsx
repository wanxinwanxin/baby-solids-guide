import { Suspense } from "react";
import type { Metadata } from "next";
import { OnboardingWizard } from "./OnboardingWizard";

export const metadata: Metadata = { title: "Set up your plan" };

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
