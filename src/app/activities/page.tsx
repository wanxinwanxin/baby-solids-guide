import type { Metadata } from "next";
import Link from "next/link";
import { pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { activitiesMsgs } from "@/lib/i18n/messages/activities";
import { ActivityHistory } from "./ActivityHistory";
import { ActivityQuickLog } from "./ActivityQuickLog";
import { MovementShelf } from "./MovementShelf";

/**
 * Activities: one-tap logging for development and education activities —
 * reading, singing, exercise, tummy time, and so on — with a shelf of
 * movement ideas under it.
 *
 * The activity registry lives in ACTIVITY_IDS; add a new activity there and
 * in the two records in messages/activities.ts. Movement ideas live in
 * content/activities/movement.ts.
 *
 * A server component since 2026-09-15, so the movement corpus never reaches
 * the client bundle and the page finally carries its own metadata. The
 * interactive parts are ActivityQuickLog, ActivityHistory, and the small
 * LogItemButton inside each idea.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(activitiesMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/activities" },
  };
}

export default async function ActivitiesPage() {
  const locale = await getLocale();
  const t = pick(activitiesMsgs, locale);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.heading}</h1>
        <p className="text-muted-foreground">
          {t.intro}{" "}
          <Link href="/read" className="text-primary underline underline-offset-2">
            {t.readShelfLink}
          </Link>
        </p>
      </div>

      <ActivityQuickLog />
      <MovementShelf locale={locale} />
      <ActivityHistory />
    </div>
  );
}
