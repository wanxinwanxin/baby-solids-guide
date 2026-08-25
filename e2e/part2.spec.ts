import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

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

test.describe("Learn (Phase 9)", () => {
  test("landing strip → chapter with sources → onboarding CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("New to solids? Start here")).toBeVisible();
    await page.getByRole("link", { name: /Why solids at all/ }).click();
    await expect(page.getByRole("heading", { name: "Why solids at all?" })).toBeVisible();
    await expect(page.getByText("Sources", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Set up your plan/ })).toBeVisible();
    await page.goto("/learn");
    await expect(page.getByRole("heading", { name: "Learn" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Does order matter/ })).toBeVisible();
  });
});

test.describe("Backup nudge (Phase 6.0)", () => {
  test("appears at 10 unexported logs, clears after export", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        const babyId = state.babies[0].id;
        for (let i = 0; i < 10; i++) {
          state.logs.push({
            id: "seed-" + i, babyId, foodSlug: "banana", date: "2026-08-0" + ((i % 9) + 1),
            prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "neutral", gagging: false, symptoms: [],
          });
        }
      }`,
    );
    await page.goto("/today");
    await expect(page.getByText(/Back up Testling/)).toBeVisible();

    await page.goto("/history");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export JSON" }).click();
    await downloadPromise;

    await page.goto("/today");
    await expect(page.getByText(/Back up Testling/)).toHaveCount(0);
  });
});

test.describe("Reaction check-ins (Phase 8A)", () => {
  test("schedule after logging an allergen → due card → complete with symptoms", async ({ page }) => {
    await completeOnboarding(page);

    await page.goto("/log?food=peanut-butter");
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();
    await expect(page.getByText(/common allergen — want a reminder/)).toBeVisible();
    // default 2h is preselected
    await page.getByRole("button", { name: /^Schedule check-in$/ }).click();
    await expect(page.getByText(/1 check-in scheduled/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Google Calendar/ })).toBeVisible();

    await page.goto("/today");
    await expect(page.getByText(/Upcoming: Peanut butter check/)).toBeVisible();

    // Time-travel: make it due
    await mutateStore(page, `(state) => { state.checkIns[0].dueAt = "2026-01-01T00:00:00.000Z"; }`);
    await page.goto("/today");
    await expect(page.getByText("Check for a reaction to Peanut butter")).toBeVisible();

    await page.getByRole("link", { name: "Log what you see" }).click();
    await expect(page.getByRole("heading", { name: "Check-in" })).toBeVisible();
    await expect(page.getByText(/How does Testling look after Peanut butter/)).toBeVisible();
    await page.getByRole("checkbox", { name: /A few hives near the mouth/ }).check();
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText(/check with your pediatrician before offering this again/i)).toBeVisible();

    // check-in resolved → no longer on Today
    await page.goto("/today");
    await expect(page.getByText("Check for a reaction to Peanut butter")).toHaveCount(0);
  });

  test("all-clear resolves without a log", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/log?food=egg");
    await page.getByRole("button", { name: "Save log" }).click();
    await page.getByRole("button", { name: /^Schedule check-in$/ }).click();
    await mutateStore(page, `(state) => { state.checkIns[0].dueAt = "2026-01-01T00:00:00.000Z"; }`);
    await page.goto("/today");
    await page.getByRole("button", { name: "All clear ✓" }).click();
    await expect(page.getByText("Check for a reaction to Egg")).toHaveCount(0);
  });
});

test.describe("Planner (Phase 11)", () => {
  test("suggest fills the board; today shows the plan reason", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/plan");
    await page.getByRole("button", { name: "Suggest a plan" }).click();
    await expect(page.getByText("This week", { exact: true }).first()).toBeVisible();
    // ≥8 week lanes have at least one chip (chips have a remove button)
    const removeButtons = page.getByRole("button", { name: /Remove .* from plan/ });
    expect(await removeButtons.count()).toBeGreaterThanOrEqual(20);

    await page.goto("/today");
    await expect(page.getByText("On your plan for this week.").first()).toBeVisible();
  });

  test("tap-to-add, crowding warning, and clear", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/plan");
    await page.getByRole("button", { name: "start with an empty board" }).click();
    await expect(page.getByText("This week", { exact: true }).first()).toBeVisible();

    // put two new allergens into the same later week → crowding warning
    await page.getByLabel("Week that tapped foods are added to").selectOption("2");
    await page.getByLabel("Search unplanned foods").fill("egg");
    await page.getByRole("button", { name: /🥚 Egg/ }).click();
    await page.getByLabel("Search unplanned foods").fill("yogurt");
    await page.getByRole("button", { name: /Yogurt/ }).click();
    await expect(page.getByText(/2 new allergens land in week 3/).first()).toBeVisible();

    // remove one → warning clears
    await page.getByRole("button", { name: "Remove 🥛 Yogurt from plan" }).click();
    await expect(page.getByText(/2 new allergens land in week 3/)).toHaveCount(0);

    await page.getByRole("button", { name: "Clear plan" }).click();
    await page.getByRole("button", { name: "Yes", exact: true }).click();
    await expect(page.getByText("No plan yet")).toBeVisible();
  });
});

test.describe("Multi-baby (Phase 13)", () => {
  test("add a second baby, switch between isolated histories", async ({ page }) => {
    await completeOnboarding(page, "Alpha");
    await page.goto("/log?food=carrot");
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();

    // add second baby
    await page.goto("/history");
    await page.getByRole("link", { name: "add another baby" }).click();
    await expect(page.getByRole("heading", { name: "Add another baby" })).toBeVisible();
    await page.getByLabel("Name or nickname").fill("Beta");
    await page.getByLabel("Birth date").fill(isoDaysAgo(200));
    await page.getByRole("button", { name: "A mix of both" }).click();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
    for (const i of [0, 1, 2]) await page.getByRole("button", { name: "No", exact: true }).nth(i).click();
    await page.getByRole("button", { name: "Next: readiness" }).click();
    for (const sign of ["Sits upright", "Steady head control", "Brings hands", "Watches your food", "tongue-thrust"]) {
      await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
    }
    await page.getByRole("button", { name: "Next: one last thing" }).click();
    await page.getByRole("checkbox", { name: /educational guide/ }).check();
    await page.getByRole("button", { name: "Save profile" }).click();
    await page.waitForURL("**/today");

    // Beta is active with an empty history; switcher can go back to Alpha
    await expect(page.getByRole("heading", { name: "Today for Beta" })).toBeVisible();
    await page.goto("/history");
    await expect(page.getByText("No logs yet")).toBeVisible();

    await page.getByLabel("Switch baby").selectOption({ label: "Alpha" });
    await expect(page.getByText("Carrot × 1")).toBeVisible();
    await page.goto("/today");
    await expect(page.getByRole("heading", { name: "Today for Alpha" })).toBeVisible();
  });
});

test.describe("Insights (Phase 14)", () => {
  test("renders variety, refusals, and links back to history", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        const babyId = state.babies[0].id;
        state.logs.push(
          { id: "i1", babyId, foodSlug: "beef", date: "${isoDaysAgo(2)}", prepBandUsed: "6-8m", amountEaten: "lots", enjoyment: "loved", gagging: false, symptoms: [] },
          { id: "i2", babyId, foodSlug: "banana", date: "${isoDaysAgo(1)}", prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "neutral", gagging: false, symptoms: [] },
          { id: "i3", babyId, foodSlug: "broccoli", date: "${isoDaysAgo(1)}", prepBandUsed: "6-8m", amountEaten: "none", enjoyment: "refused", gagging: false, symptoms: [] },
        );
      }`,
    );
    await page.goto("/insights");
    await expect(page.getByRole("heading", { name: "Insights" })).toBeVisible();
    await expect(page.getByText(/Variety/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Broccoli/ })).toBeVisible();
    await expect(page.getByText(/8–15 relaxed offers/)).toBeVisible();
    await expect(page.getByRole("link", { name: /See the logs behind this/ }).first()).toBeVisible();
  });

  test("zero-logs state points to /log", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/insights");
    await expect(page.getByRole("link", { name: /Log/ }).first()).toBeVisible();
  });
});

test.describe("Day preview (Part III D1) + safe-so-far (D2)", () => {
  test("step to tomorrow, see the preview banner, come back; safe list appears after a log", async ({ page }) => {
    await completeOnboarding(page);
    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();

    await page.getByRole("button", { name: "Next day" }).click();
    await expect(page.getByRole("heading", { name: "Tomorrow for Testling" })).toBeVisible();
    await expect(page.getByText(/Suggestions assume the history you have today/)).toBeVisible();
    await page.getByRole("button", { name: "← back to today" }).click();
    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();

    // No safe list yet, then one appears after a clean log.
    await expect(page.getByText("Safe so far")).toHaveCount(0);
    await mutateStore(
      page,
      `(state) => { state.logs.push({ id: "sl-1", babyId: state.babies[0].id, date: "${isoDaysAgo(1)}", foodSlug: "banana", prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "liked", gagging: false, symptoms: [], updatedAt: new Date().toISOString() }); }`,
    );
    await expect(page.getByRole("heading", { name: "Safe so far" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Banana/ }).first()).toBeVisible();
  });
});

test.describe("Recipes (Part III D3)", () => {
  test("index renders the corpus; a recipe page shows steps and ingredient links", async ({ page }) => {
    await page.goto("/recipes");
    await expect(page.getByRole("heading", { name: /blender-simple recipes/ })).toBeVisible();
    await page.getByRole("link", { name: /Banana peanut oat mash/ }).click();
    await expect(page.getByRole("heading", { name: "Banana peanut oat mash" })).toBeVisible();
    await expect(page.getByText("Steps", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Peanut butter/ })).toBeVisible();
    await expect(page.getByText(/Why it works/)).toBeVisible();
  });
});
