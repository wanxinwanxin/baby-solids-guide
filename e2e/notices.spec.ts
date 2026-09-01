import { expect, test, type Page } from "@playwright/test";

/**
 * Notes on Today can be hidden. What raised a note stays in force — the
 * point is the banner, not the hold behind it.
 */

const DAY = 86400000;

function isoDaysAgo(days: number): string {
  // Local calendar date, matching how the app stamps log dates.
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function mondayOf(d: Date): Date {
  // UTC midnight of the LOCAL calendar date, matching the app anchor.
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = x.getUTCDay();
  x.setUTCDate(x.getUTCDate() + (day === 0 ? -6 : 1 - day));
  return x;
}

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

async function mutateStore(page: Page, fn: string) {
  await page.evaluate(`(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1"));
    const mutate = ${fn};
    mutate(raw.state);
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  })()`);
  await page.reload();
}

/** Egg due today, then a reaction that puts the whole group on hold. */
function seedPausedEgg(page: Page) {
  return mutateStore(
    page,
    `(state) => {
      const babyId = state.babies[0].id;
      const base = { babyId, prepBandUsed: "6-8m", amountEaten: "some",
        enjoyment: "loved", gagging: false, symptoms: [] };
      state.logs.push({ ...base, id: "seed-1", foodSlug: "banana", date: "${isoDaysAgo(6)}" });
      state.logs.push({ ...base, id: "seed-2", foodSlug: "pear", date: "${isoDaysAgo(5)}" });
      state.logs.push({ ...base, id: "seed-3", foodSlug: "carrot", date: "${isoDaysAgo(4)}" });
      state.logs.push({ ...base, id: "egg-reaction", foodSlug: "egg", date: "${isoDaysAgo(0)}",
        amountEaten: "taste", enjoyment: "neutral", symptoms: ["hives-widespread"] });
      state.plans.push({
        babyId,
        anchorMonday: "${ANCHOR_ISO}",
        entries: [
          { id: "plan-carrot", foodSlug: "carrot", dayIndex: ${TODAY_DAY - 4}, weekIndex: 0 },
          { id: "plan-egg", foodSlug: "egg", dayIndex: ${TODAY_DAY}, weekIndex: 0 },
        ],
        updatedAt: new Date().toISOString(),
      });
    }`,
  );
}

test.describe("Hiding a note", () => {
  test("stays hidden across a reload and can be brought back", async ({ page }) => {
    await completeOnboarding(page);
    await seedPausedEgg(page);

    await page.goto("/today");
    const note = page.getByText(/The egg group is paused/);
    await expect(note).toBeVisible();

    await page.getByRole("button", { name: /^Hide this note/ }).click();
    await expect(note).toHaveCount(0);
    await expect(page.getByText("1 note hidden.")).toBeVisible();

    await page.reload();
    await expect(page.getByText(/The egg group is paused/)).toHaveCount(0);
    // The hold itself is untouched: egg is still off the picks.
    await expect(
      page
        .locator("section", { has: page.getByRole("heading", { name: "Today's picks" }) })
        .getByRole("link", { name: "Egg", exact: true }),
    ).toHaveCount(0);

    await page.getByRole("button", { name: "Show them" }).click();
    await expect(page.getByText(/The egg group is paused/)).toBeVisible();
  });
});
