"use client";

import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { caregiverCardMsgs } from "@/lib/i18n/messages/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Device-level switch for the caregiver view (Phase 16). It lives on the
 * account page because it describes who holds this device, but it works
 * with or without a signed-in session — the flag is local, never synced.
 */
export function CaregiverModeCard() {
  const hydrated = useHydrated();
  const t = useMsgs(caregiverCardMsgs);
  const on = useGuideStore((s) => s.caregiverMode);
  const setCaregiverMode = useGuideStore((s) => s.setCaregiverMode);
  if (!hydrated) return null;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{t.body}</p>
        {on && <p className="font-medium text-primary">{t.onNote}</p>}
        <Button
          variant={on ? "outline" : "default"}
          size="sm"
          aria-pressed={on}
          onClick={() => setCaregiverMode(!on)}
        >
          {on ? t.toggleOff : t.toggleOn}
        </Button>
      </CardContent>
    </Card>
  );
}
