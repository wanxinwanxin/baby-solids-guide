"use client";

import Link from "next/link";
import { useActiveBaby, useHydrated } from "@/lib/hooks";
import { todayIso } from "@/lib/food-utils";
import { msg } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import {
  ACTIVITY_EMOJI,
  ACTIVITY_MSGS,
  activitiesMsgs,
} from "@/lib/i18n/messages/activities";
import { newId, useGuideStore } from "@/lib/storage/store";
import { ACTIVITY_IDS } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * The one-tap row of activity buttons. Split out of the page (2026-09-15) so
 * /activities can be a server component and keep the movement corpus out of
 * the client bundle.
 *
 * Without a profile this shows the setup prompt instead of the buttons. The
 * movement shelf below still renders, so a visitor with no baby yet can read
 * the ideas.
 */
export function ActivityQuickLog() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const addActivityLog = useGuideStore((s) => s.addActivityLog);
  const locale = useLocale();
  const t = useMsgs(activitiesMsgs);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>{t.setupTitle}</AlertTitle>
        <AlertDescription>
          {t.setupBody}{" "}
          <Link href="/onboarding" className="underline underline-offset-2">
            {t.startOnboarding}
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const today = todayIso();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.quickLogTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {ACTIVITY_IDS.map((activity) => (
            <Button
              key={activity}
              variant="outline"
              className="min-h-11"
              onClick={() =>
                addActivityLog({
                  id: newId(),
                  babyId: baby.id,
                  activity,
                  date: today,
                })
              }
            >
              <span aria-hidden="true">{ACTIVITY_EMOJI[activity]}</span>{" "}
              {msg(ACTIVITY_MSGS[activity], locale)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
