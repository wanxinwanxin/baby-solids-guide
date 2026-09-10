"use client";

import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { fullDayCardMsgs } from "@/lib/i18n/messages/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Device-level switch for the Full day view (2026-09-10). Lives on the account
 * page next to the caregiver switch; the two are mutually exclusive. Local to
 * this device, never synced — it describes how this phone shows the app.
 */
export function FullDayModeCard() {
  const hydrated = useHydrated();
  const t = useMsgs(fullDayCardMsgs);
  const on = useGuideStore((s) => s.fullDayMode);
  const setFullDayMode = useGuideStore((s) => s.setFullDayMode);
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
          onClick={() => setFullDayMode(!on)}
        >
          {on ? t.toggleOff : t.toggleOn}
        </Button>
      </CardContent>
    </Card>
  );
}
