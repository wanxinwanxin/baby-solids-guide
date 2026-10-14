import Link from "next/link";
import { babySparksActivities, filterBabySparks } from "../../../content/activities/babysparks";
import { IDEA_AREAS, type IdeaArea } from "@/content-schema/activity-ideas";
import { LogItemButton } from "@/components/LogItemButton";
import { msg, pick, fmt, type Locale } from "@/lib/i18n/config";
import { activitiesMsgs, IDEA_AREA_MSGS } from "@/lib/i18n/messages/activities";
import { cn } from "@/lib/utils";

export function BabySparksShelf({ locale, area, age, query }: {
  locale: Locale; area: IdeaArea | null; age: string | null; query: string;
}) {
  const t = pick(activitiesMsgs, locale);
  const shown = filterBabySparks(area, age, query);
  function href(nextArea: string | null, nextAge: string | null, nextQuery = query) {
    const params = new URLSearchParams();
    if (nextArea) params.set("area", nextArea);
    if (nextAge) params.set("age", nextAge);
    if (nextQuery) params.set("q", nextQuery);
    return `/activities${params.size ? `?${params}` : ""}`;
  }
  const chip = (active: boolean) => cn(
    "inline-flex min-h-9 items-center rounded-full border px-3 text-sm font-medium",
    active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{t.catalogTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.catalogIntro}</p>
        <p className="text-xs text-muted-foreground">{t.catalogAgeNote}</p>
      </div>
      <form action="/activities" className="flex flex-wrap items-end gap-2">
        {area && <input type="hidden" name="area" value={area} />}
        {age && <input type="hidden" name="age" value={age} />}
        <label className="flex-1 space-y-1 text-sm" htmlFor="activity-search">
          <span>{t.activitySearch}</span>
          <input id="activity-search" name="q" defaultValue={query} key={query}
            className="min-h-10 w-full rounded-lg border bg-background px-3" />
        </label>
        <button className="min-h-10 rounded-lg border px-4 text-sm" type="submit">{t.searchButton}</button>
        {query && <Link href={href(area, age, "")} className="px-2 py-2 text-sm underline">{t.clearSearch}</Link>}
      </form>
      <nav aria-label={t.catalogAgeFilter} className="flex flex-wrap gap-2">
        {[null, "4-6", "7-9"].map((band) => (
          <Link key={band ?? "all"} href={href(area, band)} scroll={false}
            aria-current={age === band ? "page" : undefined} className={chip(age === band)}>
            {band ? (band === "4-6" ? t.catalog4to6 : t.catalog7to9) : t.allAges}
          </Link>
        ))}
      </nav>
      <nav aria-label={t.areaFilterLabel} className="flex flex-wrap gap-2">
        {[null, ...IDEA_AREAS].map((key) => (
          <Link key={key ?? "all"} href={href(key, age)} scroll={false}
            aria-current={area === key ? "page" : undefined} className={chip(area === key)}>
            {key ? msg(IDEA_AREA_MSGS[key], locale) : t.areaAll}
            <span className="ml-1.5 text-xs opacity-70">{filterBabySparks(key, age, query).length}</span>
          </Link>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground" role="status">{fmt(t.catalogCount, { count: shown.length, total: babySparksActivities.length })}</p>
      {shown.length === 0 && <p>{t.noActivities}</p>}
      {["4-6", "7-9"].map((band) => {
        const entries = shown.filter((entry) => entry.ageBand === band);
        if (!entries.length) return null;
        return <section key={band} className="space-y-2">
          <h3 className="font-bold">{band === "4-6" ? t.catalog4to6 : t.catalog7to9} · {entries.length}</h3>
          {entries.map((entry) => <details key={entry.slug} id={entry.slug} className="rounded-2xl border bg-card px-5 py-3.5">
            <summary className="cursor-pointer text-[15px] font-bold">
              {msg(entry.title, locale)}
              <span className="ml-3 text-xs font-normal text-muted-foreground">#{String(entry.catalogId).padStart(3, "0")} · {msg(IDEA_AREA_MSGS[entry.area], locale)}</span>
            </summary>
            <div className="mt-3 space-y-3 pb-1.5 text-sm">
              <dl className="space-y-3">
                {([
                  [t.activityGoal, entry.goal], [t.activityMaterials, entry.materials],
                  [t.activityDuration, entry.duration], [t.activityInstructions, entry.instructions],
                  ...(entry.milestone ? [[t.activityMilestone, entry.milestone] as const] : []),
                ] as const).map(([label, value]) => <div key={label}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="mt-1 whitespace-pre-line">{msg(value, locale)}</dd>
                </div>)}
              </dl>
              {entry.reminder && <aside className="space-y-1 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                <p className="font-semibold">{t.addedReminder}</p>
                <p>{msg(entry.reminder, locale)}</p>
                <p className="text-xs text-muted-foreground">{entry.reminderBasis}</p>
              </aside>}
              <LogItemButton activity={entry.activity} itemId={entry.slug} itemTitle={msg(entry.title, locale)} markLabel={t.markDone} doneLabel={t.doneToday} />
            </div>
          </details>)}
        </section>;
      })}
    </section>
  );
}
