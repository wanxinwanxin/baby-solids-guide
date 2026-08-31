import { describe, expect, it } from "vitest";
import { INTRO_SPACING_DAYS, entryDay, planProgress } from "./plan-progress";
import type { ExposureLog, Plan } from "./storage/types";

const ANCHOR = "2026-08-24"; // a Monday
const at = (day: number) => new Date(`${ANCHOR}T12:00:00Z`).getTime() + day * 86400000;
const on = (day: number) => new Date(at(day));

function plan(slugs: string[], startDay = 0): Plan {
  return {
    babyId: "b1",
    anchorMonday: ANCHOR,
    entries: slugs.map((foodSlug, i) => {
      const dayIndex = startDay + i * INTRO_SPACING_DAYS;
      return { id: `plan-${foodSlug}`, foodSlug, dayIndex, weekIndex: Math.floor(dayIndex / 7) };
    }),
  };
}

function ate(foodSlug: string, day: number, over: Partial<ExposureLog> = {}): ExposureLog {
  return {
    id: `${foodSlug}-${day}`,
    babyId: "b1",
    foodSlug,
    date: new Date(at(day)).toISOString().slice(0, 10),
    prepBandUsed: "6-8m",
    amountEaten: "some",
    enjoyment: "neutral",
    gagging: false,
    symptoms: [],
    ...over,
  };
}

describe("entryDay", () => {
  it("prefers the day slot and falls back to the week for older plans", () => {
    expect(entryDay({ id: "a", foodSlug: "carrot", weekIndex: 2, dayIndex: 15 })).toBe(15);
    expect(entryDay({ id: "a", foodSlug: "carrot", weekIndex: 2 })).toBe(14);
  });
});

describe("planProgress", () => {
  it("has nothing to say about a missing or empty plan", () => {
    expect(planProgress({ plan: null, logs: [], today: on(0) }).total).toBe(0);
    expect(
      planProgress({ plan: { babyId: "b1", anchorMonday: ANCHOR, entries: [] }, logs: [], today: on(0) })
        .now,
    ).toBeNull();
  });

  it("opens on the first food and dates the rest one window apart", () => {
    const p = planProgress({ plan: plan(["oatmeal", "pear", "beef"]), logs: [], today: on(0) });
    expect(p.now?.foodSlug).toBe("oatmeal");
    expect(p.upcoming.map((s) => s.foodSlug)).toEqual(["pear", "beef"]);
    expect(p.upcoming.map((s) => s.daysAway)).toEqual([3, 6]);
    expect(p.upcoming[0].projectedDate).toBe("2026-08-27");
    expect(p.slipDays).toBe(0);
  });

  it("marks a food eaten as introduced and waits out its window before the next", () => {
    const p = planProgress({
      plan: plan(["oatmeal", "pear"]),
      logs: [ate("oatmeal", 0)],
      today: on(1),
    });
    expect(p.steps[0].status).toBe("introduced");
    expect(p.introducedCount).toBe(1);
    // Nothing new today: the plan is still watching yesterday's food.
    expect(p.now).toBeNull();
    expect(p.watching?.foodSlug).toBe("oatmeal");
    expect(p.upcoming[0].foodSlug).toBe("pear");
  });

  it("opens the next food once the observation window closes", () => {
    const p = planProgress({
      plan: plan(["oatmeal", "pear"]),
      logs: [ate("oatmeal", 0)],
      today: on(3),
    });
    expect(p.watching).toBeNull();
    expect(p.now?.foodSlug).toBe("pear");
  });

  it("lets a refused food take its turn without calling it introduced", () => {
    // Refusals are normal and the retry queue brings the food back, so the
    // plan must not stall on a food the baby turned down once.
    const refused = [ate("oatmeal", 0, { amountEaten: "none", enjoyment: "refused" })];
    const p = planProgress({ plan: plan(["oatmeal", "pear"]), logs: refused, today: on(0) });
    expect(p.steps[0].status).toBe("offered");
    expect(p.steps[0].attempts).toBe(1);
    expect(p.introducedCount).toBe(0);
    // Its window still belongs to it: keep offering it today, move on later.
    expect(p.watching?.foodSlug).toBe("oatmeal");
    expect(p.now).toBeNull();
    expect(planProgress({ plan: plan(["oatmeal", "pear"]), logs: refused, today: on(3) }).now
      ?.foodSlug).toBe("pear");
  });

  it("waits for a food nobody has offered rather than skipping past it", () => {
    // Day 3 is pear's written day, but oatmeal was never served. Advancing
    // on the calendar alone would drop oatmeal silently.
    const p = planProgress({ plan: plan(["oatmeal", "pear"]), logs: [], today: on(3) });
    expect(p.now?.foodSlug).toBe("oatmeal");
    expect(p.upcoming[0].foodSlug).toBe("pear");
    expect(p.upcoming[0].daysAway).toBe(3);
  });

  it("slides the whole tail forward when a family falls behind", () => {
    // Three weeks in with nothing logged: the plan restarts from today rather
    // than showing four foods that were all due in the past.
    const p = planProgress({ plan: plan(["oatmeal", "pear", "beef"]), logs: [], today: on(21) });
    expect(p.now?.foodSlug).toBe("oatmeal");
    expect(p.now?.daysAway).toBe(0);
    expect(p.upcoming.map((s) => s.daysAway)).toEqual([3, 6]);
    expect(p.slipDays).toBe(21);
  });

  it("keeps the written day as a floor so a later slot is not pulled forward", () => {
    // Pear is deliberately parked in week 4; eating oatmeal early must not
    // drag it back to this week.
    const p = planProgress({
      plan: {
        babyId: "b1",
        anchorMonday: ANCHOR,
        entries: [
          { id: "plan-oatmeal", foodSlug: "oatmeal", dayIndex: 0, weekIndex: 0 },
          { id: "plan-pear", foodSlug: "pear", dayIndex: 28, weekIndex: 4 },
        ],
      },
      logs: [ate("oatmeal", 0)],
      today: on(4),
    });
    expect(p.upcoming[0].projectedDay).toBe(28);
  });

  it("parks a blocked food without a date and never opens it", () => {
    const paused = (slug: string) => (slug === "egg" ? "The egg group is paused." : undefined);
    const p = planProgress({ plan: plan(["egg", "pear"]), logs: [], today: on(0), isBlocked: paused });
    expect(p.blocked.map((s) => s.foodSlug)).toEqual(["egg"]);
    expect(p.blocked[0].blockedReason).toBe("The egg group is paused.");
    expect(p.blocked[0].projectedDate).toBeUndefined();
    // Egg held day 0, so today has no new food — the food behind it keeps
    // its own day rather than being rushed forward into the gap.
    expect(p.now).toBeNull();
    expect(p.upcoming.map((s) => s.foodSlug)).toEqual(["pear"]);
    expect(planProgress({ plan: plan(["egg", "pear"]), logs: [], today: on(3), isBlocked: paused }).now
      ?.foodSlug).toBe("pear");
  });

  it("gives a blocked food its turn back the day the block lifts", () => {
    const started = plan(["egg", "pear"]);
    const paused = planProgress({
      plan: started,
      logs: [],
      today: on(6),
      isBlocked: (slug) => (slug === "egg" ? "paused" : undefined),
    });
    expect(paused.now?.foodSlug).toBe("pear");

    const resumed = planProgress({ plan: started, logs: [], today: on(6) });
    expect(resumed.now?.foodSlug).toBe("egg");
    expect(resumed.upcoming[0].foodSlug).toBe("pear");
  });

  it("keeps a started-then-stopped food out of the queue but holds its window", () => {
    // Egg was eaten on day 3 and then paused after a reaction. The next food
    // still waits out egg's observation window instead of starting the day
    // after the reaction.
    const p = planProgress({
      plan: plan(["oatmeal", "egg", "pear"]),
      logs: [ate("oatmeal", 0), ate("egg", 3)],
      today: on(4),
      isBlocked: (slug) => (slug === "egg" ? "The egg group is paused." : undefined),
    });
    expect(p.steps[1].status).toBe("blocked");
    expect(p.steps[1].startedOn).toBe("2026-08-27");
    expect(p.now).toBeNull();
    expect(p.upcoming[0].foodSlug).toBe("pear");
    expect(p.upcoming[0].daysAway).toBe(2); // egg day 3 + 3-day window
  });

  it("counts a food eaten off-plan as introduced", () => {
    const p = planProgress({
      plan: plan(["oatmeal", "pear"]),
      logs: [ate("pear", 0)],
      today: on(0),
    });
    expect(p.steps[1].status).toBe("introduced");
    expect(p.now?.foodSlug).toBe("oatmeal");
  });

  it("reports the plan's size and how much of it is behind the family", () => {
    const p = planProgress({
      plan: plan(["oatmeal", "pear", "beef", "yogurt"]),
      logs: [ate("oatmeal", 0), ate("pear", 3)],
      today: on(6),
    });
    expect(p.total).toBe(4);
    expect(p.introducedCount).toBe(2);
    expect(p.now?.foodSlug).toBe("beef");
    expect(p.upcoming.map((s) => s.foodSlug)).toEqual(["yogurt"]);
  });
});
