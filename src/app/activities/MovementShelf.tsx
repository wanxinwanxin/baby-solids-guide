import Link from "next/link";
import { activityIdeas } from "../../../content/activities";
import { IDEA_AREAS, type IdeaArea, type MovementIdea } from "@/content-schema/activity-ideas";
import { fmt, msg, type Locale } from "@/lib/i18n/config";
import { ACTIVITY_EMOJI, IDEA_AREA_MSGS, activitiesMsgs } from "@/lib/i18n/messages/activities";
import { pick } from "@/lib/i18n/config";
import { LogItemButton } from "@/components/LogItemButton";
import { cn } from "@/lib/utils";

/**
 * The movement shelf, rendered on the server so the whole corpus stays out
 * of the client bundle — only the small LogItemButton inside each entry is
 * interactive. This mirrors /read, which made the same split for the same
 * reason.
 */

/**
 * One heading per starting age, youngest first. The heading groups on
 * `fromMonths` alone: `toMonths` varies from idea to idea within a group,
 * because tummy time stops being a separate activity long before bicycle
 * legs do, and grouping on the pair would splinter the shelf into headings
 * with a single idea under each.
 */
function startAges(ideas: MovementIdea[]): number[] {
  return [...new Set(ideas.map((i) => i.fromMonths))].sort((a, b) => a - b);
}

/** Areas in their fixed order, so a mixed age group reads moving → routines. */
const areaRank = (a: IdeaArea) => IDEA_AREAS.indexOf(a);

/**
 * The area filter is a set of plain links (`?area=hands`), so it works with
 * no client JavaScript and the shelf stays a server component.
 */
export function MovementShelf({ locale, area }: { locale: Locale; area: IdeaArea | null }) {
  const t = pick(activitiesMsgs, locale);
  const shown = (area ? activityIdeas.filter((i) => i.area === area) : activityIdeas)
    .slice()
    .sort((a, b) => areaRank(a.area) - areaRank(b.area));
  const chips: { key: IdeaArea | null; label: string; count: number }[] = [
    { key: null, label: t.areaAll, count: activityIdeas.length },
    ...IDEA_AREAS.map((a) => ({
      key: a,
      label: msg(IDEA_AREA_MSGS[a], locale),
      count: activityIdeas.filter((i) => i.area === a).length,
    })),
  ];

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{t.movementTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.movementIntro}</p>
      </div>

      <nav aria-label={t.areaFilterLabel} className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = c.key === area;
          return (
            <Link
              key={c.key ?? "all"}
              href={c.key ? `/activities?collection=everyday&area=${c.key}` : "/activities?collection=everyday"}
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
                active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/60",
              )}
            >
              {c.label}
              <span className={cn("font-data text-[11px]", active ? "opacity-80" : "text-muted-foreground")}>
                {c.count}
              </span>
            </Link>
          );
        })}
      </nav>

      {startAges(shown).map((from) => {
        const ideas = shown.filter((i) => i.fromMonths === from);
        return (
          <section key={from} className="space-y-2">
            <h3 className="font-data text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
              {from === 0 ? t.movementFromBirth : fmt(t.movementFromAge, { from })} ·{" "}
              {ideas.length}
            </h3>
            <div className="space-y-2">
              {ideas.map((idea) => (
                <details key={idea.slug} className="group rounded-2xl border bg-card px-5 py-3.5">
                  <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[15px] font-bold">
                      <span aria-hidden="true">{ACTIVITY_EMOJI[idea.activity]}</span>{" "}
                      {msg(idea.title, locale)}
                    </span>
                    {/* With a filter on, every card has the same area, so the label is noise. */}
                    {!area && (
                      <span className="font-data text-[11px] text-muted-foreground">
                        {msg(IDEA_AREA_MSGS[idea.area], locale)}
                      </span>
                    )}
                  </summary>
                  <div className="mt-3 space-y-3 pb-1.5">
                    <ol className="list-decimal space-y-1.5 pl-5 text-sm">
                      {idea.steps.map((step, si) => (
                        <li key={si}>{msg(step, locale)}</li>
                      ))}
                    </ol>
                    <div className="space-y-1">
                      <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        {t.movementWhy}
                      </p>
                      <p className="text-sm">{msg(idea.why, locale)}</p>
                    </div>
                    {/* The stop sign sits with the instruction, never on
                        another page — see the watchFor field's comment. */}
                    <div className="space-y-1 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                      <p className="font-data text-[11px] uppercase tracking-[0.1em] text-amber-700 dark:text-amber-500">
                        {t.movementWatchFor}
                      </p>
                      <p className="text-sm">{msg(idea.watchFor, locale)}</p>
                    </div>
                    <LogItemButton
                      activity={idea.activity}
                      itemId={idea.slug}
                      itemTitle={msg(idea.title, locale)}
                      markLabel={t.markDone}
                      doneLabel={t.doneToday}
                    />
                  </div>
                </details>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-muted-foreground">{t.movementAgeNote}</p>
    </section>
  );
}
