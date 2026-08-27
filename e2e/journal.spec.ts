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

test.describe("Feeding journal (granular history)", () => {
  test("logs time, meal, measured amount and notes, then shows them on the journal", async ({
    page,
  }) => {
    await completeOnboarding(page);

    await page.goto("/log?food=carrot");
    // The fast path is untouched — details are behind an opt-in expander.
    await page.getByRole("button", { name: /Add details/ }).click();

    await page.getByLabel("Time").fill("19:00");
    await page.getByLabel("Meal").selectOption("dinner");
    await page.getByLabel("Measured amount value").fill("20");
    await page.getByLabel("Measured amount unit").selectOption("ml");
    await page.getByLabel("Notes").fill("Grabbed the spoon herself");
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();

    await page.goto("/history");
    // Today's entries sit under a friendly day header, not a bare ISO date.
    await expect(page.getByRole("heading", { name: "Today" })).toBeVisible();
    await expect(page.getByText("7:00 PM")).toBeVisible();
    await expect(page.getByText("Dinner")).toBeVisible();
    await expect(page.getByText("20 ml")).toBeVisible();
    await expect(page.getByText("Grabbed the spoon herself")).toBeVisible();
    // First time this food was eaten.
    await expect(page.getByText("first try")).toBeVisible();
  });

  test("a hurried log still works and reads honestly with no time", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/log?food=carrot");
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();

    await page.goto("/history");
    // Time is pre-filled with "now", so a one-tap log is still placed on the
    // day's timeline rather than being dumped at the end.
    await expect(page.getByRole("heading", { name: "Today" })).toBeVisible();
    await expect(page.getByText("Carrot × 1")).toBeVisible();
  });

  test("orders a day forward in time and puts untimed entries last", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        const babyId = state.babies[0].id;
        const date = new Date().toISOString().slice(0, 10);
        const base = { babyId, date, prepBandUsed: "6-8m", amountEaten: "some",
          enjoyment: "neutral", gagging: false, symptoms: [] };
        state.logs.push({ ...base, id: "l-dinner", foodSlug: "pear", time: "18:30" });
        state.logs.push({ ...base, id: "l-none", foodSlug: "beef" });
        state.logs.push({ ...base, id: "l-breakfast", foodSlug: "carrot", time: "07:15" });
      }`,
    );
    await page.goto("/history");

    const entries = page.locator("ul > li");
    await expect(entries).toHaveCount(3);
    await expect(entries.nth(0)).toContainText("Carrot");
    await expect(entries.nth(1)).toContainText("Pear");
    await expect(entries.nth(2)).toContainText("Beef");
    await expect(entries.nth(2)).toContainText("no time set");
  });

  test("edits an existing entry in place to add detail after the fact", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/log?food=carrot");
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();

    await page.goto("/history");
    await page.getByRole("button", { name: /Edit the Carrot entry/ }).click();
    await page.getByLabel("Measured amount value").fill("45");
    await page.getByLabel("Measured amount unit").selectOption("g");
    await page.getByRole("button", { name: "😍 Loved" }).click();
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByText("45 g")).toBeVisible();
    await expect(page.getByText("Loved it")).toBeVisible();

    // The edit survives a reload, i.e. it was persisted rather than local state.
    await page.reload();
    await expect(page.getByText("45 g")).toBeVisible();
  });

  test("filters down to first tries and to reactions", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        const babyId = state.babies[0].id;
        const base = { babyId, prepBandUsed: "6-8m", amountEaten: "some",
          enjoyment: "neutral", gagging: false, symptoms: [] };
        state.logs.push({ ...base, id: "l-1", foodSlug: "carrot", date: "2026-08-01", time: "08:00" });
        // Same food again — not a first try.
        state.logs.push({ ...base, id: "l-2", foodSlug: "carrot", date: "2026-08-02", time: "08:00" });
        state.logs.push({ ...base, id: "l-3", foodSlug: "pear", date: "2026-08-03", time: "08:00",
          gagging: true });
      }`,
    );
    await page.goto("/history");
    await expect(page.locator("ul > li")).toHaveCount(3);

    await page.getByRole("button", { name: "First tries" }).click();
    await expect(page.locator("ul > li")).toHaveCount(2); // carrot l-1 + pear l-3

    await page.getByRole("button", { name: "Reactions" }).click();
    const reacted = page.locator("ul > li");
    await expect(reacted).toHaveCount(1);
    await expect(reacted.nth(0)).toContainText("Pear");

    await page.getByRole("button", { name: "Everything" }).click();
    await expect(page.locator("ul > li")).toHaveCount(3);
  });

  test("groups older entries under named and dated day headers", async ({ page }) => {
    await completeOnboarding(page);
    await mutateStore(
      page,
      `(state) => {
        const babyId = state.babies[0].id;
        const d = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
        const base = { babyId, prepBandUsed: "6-8m", amountEaten: "some",
          enjoyment: "neutral", gagging: false, symptoms: [] };
        state.logs.push({ ...base, id: "l-today", foodSlug: "carrot", date: d(0), time: "08:00" });
        state.logs.push({ ...base, id: "l-yest", foodSlug: "pear", date: d(1), time: "08:00" });
        state.logs.push({ ...base, id: "l-old", foodSlug: "beef", date: d(6), time: "08:00" });
      }`,
    );
    await page.goto("/history");
    await expect(page.getByRole("heading", { name: "Today" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Yesterday" })).toBeVisible();
    // Newest day leads the page.
    const headings = page.getByRole("heading", { level: 2 });
    await expect(headings.nth(0)).toHaveText("Today");
    await expect(headings.nth(1)).toHaveText("Yesterday");
  });

  test("history is reachable from the primary nav on both breakpoints", async ({ page }) => {
    await completeOnboarding(page);

    // Desktop top nav
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/today");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "History" }).click();
    await page.waitForURL("**/history");

    // Mobile bottom tab bar
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/today");
    await page.getByRole("navigation", { name: /Primary/i }).getByRole("link", { name: "History" }).click();
    await page.waitForURL("**/history");
  });
});
