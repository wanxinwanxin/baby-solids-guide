"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { tourMsgs } from "@/lib/i18n/messages/tour";
import { whatsNewMsgs } from "@/lib/i18n/messages/whats-new";
import { SpotlightOverlay, type SpotlightLabels } from "@/components/Tour";

/**
 * A one-time "what's new" spotlight for people who already had the app before
 * this release: it highlights the feedback button (the headline ask — request
 * a food or feature) and points to the new Full day view. It fires once on
 * Today, then never again.
 *
 * Who sees it is decided by the persisted `whatsNewSeen` flag: it defaults
 * true for fresh installs and is flipped false only by the store's migration,
 * so brand-new users (and the whole e2e suite) never trigger it.
 */
export function WhatsNewController() {
  const t = useMsgs(whatsNewMsgs);
  const tour = useMsgs(tourMsgs);
  const hydrated = useHydrated();
  const pathname = usePathname();
  const seen = useGuideStore((s) => s.whatsNewSeen);
  const setSeen = useGuideStore((s) => s.setWhatsNewSeen);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!hydrated || seen || pathname !== "/today") return;
    // Let the page settle so the anchored controls are laid out first.
    const id = setTimeout(() => setArmed(true), 400);
    return () => clearTimeout(id);
  }, [hydrated, seen, pathname]);

  if (!armed || seen) return null;

  const steps = [
    { sel: '[data-tour="feedback"]', title: t.feedbackTitle, body: t.feedbackBody },
    { sel: '[data-tour="account"]', title: t.fullDayTitle, body: t.fullDayBody },
  ];
  const labels: SpotlightLabels = {
    stepLabel: tour.stepLabel,
    skip: t.skip,
    back: tour.back,
    next: tour.next,
    done: t.done,
  };
  return (
    <SpotlightOverlay
      steps={steps}
      labels={labels}
      onClose={() => {
        setSeen(true);
        setArmed(false);
      }}
    />
  );
}
