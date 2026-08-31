import { expect, test, type Page } from "@playwright/test";

/**
 * The plan as a live thing (Part III E): Today, the board, and the picks all
 * read one projection, so a food that was skipped, eaten, or put on hold
 * moves everywhere at once.
 */

const DAY = 86400000;

/** UTC ISO date `n` days from today — the same clock the store writes. */
function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * DAY).toISOString().slice(0, 10);
}

/** Monday of the week containing `d`, in UTC. */
function mondayOf(d: Date): Date {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay();
  x.setUTCDate(x.getUTCDate() + (day === 0 ? -6 : 1 - day));
  return x;
}

/** A plan anchored two weeks back, so every day index below stays positive. */
const ANCHOR = new Date(mondayOf(new Date()).getTime() - 14 * DAY);
const ANCHOR_ISO = ANCHOR.toISOString().slice(0, 10);
const TODAY_DAY = Math.round(
  (Date.parse(`${isoDaysAgo(0)}T00:00:00Z`) - ANCHOR.getTime()) / DAY,
);

async function completeOnboarding(page: Page, nickname = "Testling") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(213));
  await page.getByRole("button", { name: "A mix of both" }).click();
  await page.getByRole("button", { name: "Next: allergy questions" }).click();
  for (const i of [0, 1, 2]) {
    await page.getByRole("button", { name: "No", exact: true }).nth(i).click();
  }
  await page.getByRole("button", { name: "Next: readiness" }).click();
  for (const sign of ["Sits upright", "Steady head control", "Brings hands", "Watches your food", "tongue-thrust"]) {
    await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
  }
  await page.getByRole("button", { name: "Next: one last thing" }).click();
  await page.getByRole("checkbox", { name: /educational guide/ }).check();
  await page.getByRole("button", { name: /Start fresh/ }).click();
  await page.waitForURL("**/today");
}

/** White-box helper: mutate the persisted store and reload. */
async function mutateStore(page: Page, fn: string) {
  await page.evaluate(`(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1"));
    const mutate = ${fn};
    mutate(raw.state);
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  })()`);
  await page.reload();
}

/**
 * Carrot introduced four days ago and eaten cleanly, egg due today, broccoli
 * three days out — plus enough clean days for the egg group's opening gate.
 */
function seedPlan(page: Page) {
  return mutateStore(
    page,
    `(state) => {
      const babyId = state.babies[0].id;
      const base = { babyId, prepBandUsed: "6-8m", amountEaten: "some",
        enjoyment: "loved", gagging: false, symptoms: [] };
      state.logs.push({ ...base, id: "seed-1", foodSlug: "banana", date: "${isoDaysAgo(6)}" });
      state.logs.push({ ...base, id: "seed-2", foodSlug: "pear", date: "${isoDaysAgo(5)}" });
      state.logs.push({ ...base, id: "seed-3", foodSlug: "avocado", date: "${isoDaysAgo(4)}" });
      state.logs.push({ ...base, id: "seed-4", foodSlug: "carrot", date: "${isoDaysAgo(4)}" });
      state.plans.push({
        babyId,
        anchorMonday: "${ANCHOR_ISO}",
        entries: [
          { id: "plan-carrot", foodSlug: "carrot", dayIndex: ${TODAY_DAY - 4}, weekIndex: 0 },
          { id: "plan-egg", foodSlug: "egg", dayIndex: ${TODAY_DAY}, weekIndex: 0 },
          { id: "plan-broccoli", foodSlug: "broccoli", dayIndex: ${TODAY_DAY + 3}, weekIndex: 0 },
        ],
        updatedAt: new Date().toISOString(),
      });
    }`,
  );
}

test.describe("A plan that tracks what actually happened", () => {
  test("suggesting a plan puts the same food on the board and on Today", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/plan");
    await page.getByRole("button", { name: "Suggest a plan" }).click();

    await expect(page.getByRole("heading", { name: "Where you are" })).toBeVisible();
    const boardNow = await page
      .locator("section", { has: page.getByRole("heading", { name: "Where you are" }) })
      .getByText("Introducing now")
      .locator("xpath=following-sibling::p[1]")
      .innerText();

    await page.goto("/today");
    await expect(page.getByRole("heading", { name: "Coming up" })).toBeVisible();
    // The board's current food is the food Today says is on the tray.
    const food = boardNow.replace(/^\S+\s/, "").trim();
    await expect(
      page.getByRole("link", { name: food, exact: true }).first(),
    ).toBeVisible();
  });

  test("shows what is coming with enough notice to shop for it", async ({ page }) => {
    await completeOnboarding(page);
    await seedPlan(page);

    await page.goto("/today");
    const comingUp = page.locator("section", {
      has: page.getByRole("heading", { name: "Coming up" }),
    });
    await expect(comingUp.getByText("On the tray now")).toBeVisible();
    await expect(comingUp.getByRole("link", { name: "Egg", exact: true })).toBeVisible();
    // Broccoli is three days out, and it says so rather than making the
    // parent step through the day picker to find it.
    await expect(comingUp.getByRole("link", { name: "Broccoli", exact: true })).toBeVisible();
    await expect(comingUp.getByText(/in 3 days/)).toBeVisible();
    await expect(comingUp.getByText("1 of 3 introduced")).toBeVisible();
  });

  test("a reaction moves the plan on, and both surfaces say so", async ({ page }) => {
    await completeOnboarding(page);
    await seedPlan(page);
    await mutateStore(
      page,
      `(state) => {
        state.logs.push({ id: "egg-reaction", babyId: state.babies[0].id, foodSlug: "egg",
          date: "${isoDaysAgo(0)}", prepBandUsed: "6-8m", amountEaten: "taste",
          enjoyment: "neutral", gagging: false, symptoms: ["hives-widespread"] });
      }`,
    );

    await page.goto("/today");
    await expect(page.getByText(/The egg group is paused/)).toBeVisible();
    // Egg is off the picks entirely, not merely flagged.
    const picks = page.locator("section", {
      has: page.getByRole("heading", { name: "Today's picks" }),
    });
    await expect(picks.getByRole("link", { name: "Egg", exact: true })).toHaveCount(0);

    await page.goto("/plan");
    const standing = page.locator("section", {
      has: page.getByRole("heading", { name: "Where you are" }),
    });
    await expect(standing.getByText("On hold", { exact: true })).toBeVisible();
    await expect(standing.getByText(/🥚 Egg/)).toBeVisible();
    // The food behind egg keeps its own date rather than vanishing with it.
    await expect(standing.getByText(/🥦 Broccoli/)).toBeVisible();
  });

  test("waits for a food nobody served instead of dropping it", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        state.plans.push({
          babyId: state.babies[0].id,
          anchorMonday: "${ANCHOR_ISO}",
          entries: [
            { id: "plan-carrot", foodSlug: "carrot", dayIndex: ${TODAY_DAY - 6}, weekIndex: 0 },
            { id: "plan-pear", foodSlug: "pear", dayIndex: ${TODAY_DAY - 3}, weekIndex: 0 },
          ],
          updatedAt: new Date().toISOString(),
        });
      }`,
    );

    await page.goto("/today");
    const comingUp = page.locator("section", {
      has: page.getByRole("heading", { name: "Coming up" }),
    });
    // Carrot was due six days ago and never served, so it is still the food
    // on the tray — the calendar alone used to skip straight past it.
    await expect(comingUp.getByRole("link", { name: "Carrot", exact: true })).toBeVisible();
    await expect(comingUp.getByText("0 of 2 introduced")).toBeVisible();

    await page.goto("/plan");
    await expect(page.getByText(/Running 6 days behind/)).toBeVisible();
  });
});
