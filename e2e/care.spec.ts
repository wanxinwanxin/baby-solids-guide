import { expect, test, type Page } from "@playwright/test";

/**
 * Feeding & diapers (/care, Extras): time a breastfeed on both sides, type
 * in a past one, log formula and breast-milk bottles and a diaper, see them
 * in today's list with a summary, edit one, and reach the page from More
 * and from the log button.
 */

const DAY = 86400000;

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Buttons", ageDays = 120) {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(ageDays));
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

test("logs a formula bottle and a diaper, then edits the bottle", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/care");
  await expect(page.getByRole("heading", { name: "Feeding & diapers" })).toBeVisible();

  // The bottle button is disabled until an amount is chosen.
  await page.getByRole("button", { name: "120 ml" }).click();
  await page.getByRole("button", { name: "Log bottle", exact: true }).click();
  // Time confirm prefilled with now — accept it.
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(/Bottle · 120 ml/)).toBeVisible();

  // Log a dirty diaper.
  await page.getByRole("button", { name: /Dirty \(poop\)/ }).click();
  await page.getByRole("button", { name: "Log diaper", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(/Diaper · Dirty/)).toBeVisible();

  // Today summary reflects one bottle and one diaper.
  await expect(page.getByText(/1 bottles · 120 ml/)).toBeVisible();
  await expect(page.getByText(/1 diapers/)).toBeVisible();

  // Edit the bottle amount from its own row.
  const bottleRow = page
    .locator("li")
    .filter({ hasText: "Bottle · 120 ml" })
    .first();
  await bottleRow.getByRole("button", { name: /^Edit/ }).click();
  await bottleRow.getByLabel("Amount").fill("150");
  await bottleRow.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(/Bottle · 150 ml/)).toBeVisible();

  // Survives a reload.
  await page.reload();
  await expect(page.getByText(/Bottle · 150 ml/)).toBeVisible();
});

test("times a breastfeed on both sides, then offers the other side next", async ({ page }) => {
  await page.clock.install();
  await completeOnboarding(page);
  await page.goto("/care");
  const card = page.locator("#breast");

  await card.getByRole("button", { name: /Left/ }).click();
  await page.clock.fastForward("05:00");
  await card.getByRole("button", { name: /Right/ }).click();
  await page.clock.fastForward("03:00");
  await expect(card.getByText("Total 8:00")).toBeVisible();

  // A feed in progress survives a reload.
  await page.reload();
  await expect(card.getByRole("button", { name: /Right/ })).toHaveAttribute("aria-pressed", "true");

  await card.getByRole("button", { name: "Done", exact: true }).click();
  await expect(card.getByLabel("Left (min)")).toHaveValue("5");
  await expect(card.getByLabel("Right (min)")).toHaveValue("3");
  await card.getByRole("button", { name: "Save feed" }).click();

  await expect(page.getByText("Breastfeed · left 5 min, right 3 min")).toBeVisible();
  await expect(page.getByText("1 breastfeeds · 8 min")).toBeVisible();
  await expect(card.getByText(/Last feed started on the left side/)).toBeVisible();
  await expect(card.getByRole("button", { name: /Right/ })).toContainText("Next");
  await expect(card.getByText("Today: 1 feeds · left 5 min · right 3 min")).toBeVisible();
});

test("enters a past breastfeed, and says why an empty one cannot save", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/care");
  const card = page.locator("#breast");

  await card.getByRole("button", { name: "Enter a past feed" }).click();
  await card.getByRole("button", { name: "Save feed" }).click();
  await expect(card.getByText("Enter the minutes on at least one side.")).toBeVisible();

  await card.getByLabel("Right (min)").fill("12");
  await card.getByRole("button", { name: "Save feed" }).click();
  await expect(page.getByText("Breastfeed · right 12 min")).toBeVisible();
  await expect(card.getByText(/Last feed started on the right side/)).toBeVisible();

  // Fix it from its row: both sides, left first.
  const row = page.locator("li").filter({ hasText: "Breastfeed · right 12 min" }).first();
  await row.getByRole("button", { name: /^Edit/ }).click();
  await row.getByLabel("Left (min)").fill("4");
  await row.getByRole("button", { name: "Left", exact: true }).click();
  await row.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Breastfeed · left 4 min, right 12 min")).toBeVisible();
});

test("a breast-milk bottle says so, and the next bottle starts from it", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/care");
  const bottle = page.locator("#bottle");
  await bottle.getByRole("button", { name: "Breast milk" }).click();
  await bottle.getByRole("button", { name: "90 ml" }).click();
  await bottle.getByRole("button", { name: "Log bottle", exact: true }).click();
  await bottle.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Bottle · 90 ml · breast milk")).toBeVisible();

  await page.reload();
  await expect(bottle.getByRole("button", { name: "Breast milk" })).toHaveAttribute("aria-pressed", "true");
});

test("under 4 months, the log button offers feeds and the Today screen links them", async ({ page }) => {
  await completeOnboarding(page, "Pip", 40);
  await page.goto("/today");
  await expect(page.getByRole("heading", { name: "Until then: feeds, diapers, and sleep" })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  const tabbar = page.getByRole("navigation", { name: "Primary" });
  await page.getByRole("button", { name: "Log a feed, diaper, sleep, or food" }).click();
  await expect(tabbar.getByRole("link", { name: "Log food" })).toHaveCount(0);
  await tabbar.getByRole("link", { name: "Breastfeed" }).click();
  await page.waitForURL("**/care#breast");
  await expect(page.locator("#breast").getByRole("button", { name: /Left/ })).toBeInViewport();
});

test("a past day opens to its sleeps, and a sleep can be fixed there", async ({ page }) => {
  await completeOnboarding(page);
  // One nap two days ago, 13:00 → 14:00, and nothing else.
  await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1")!);
    const babyId = raw.state.babies[0].id;
    const at = (h: number) => {
      const d = new Date();
      d.setDate(d.getDate() - 2);
      d.setHours(h, 0, 0, 0);
      return d.toISOString();
    };
    raw.state.sleepSessions = [{ id: "nap1", babyId, start: at(13), end: at(14) }];
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  });
  await page.reload();
  await page.goto("/care");

  await page.getByText("sleep 1 h", { exact: true }).click();
  // The day itself is a list item too; the sleep row is the innermost one.
  const napRow = page
    .locator("li")
    .filter({ has: page.getByRole("button", { name: /started at 1:00\sPM/ }) })
    .last();
  await napRow.getByRole("button", { name: /started at 1:00\sPM/ }).click();
  await page.locator("#edit-nap1-end-time").fill("2:45 pm");
  await napRow.getByRole("button", { name: "Save", exact: true }).click();
  await expect(napRow.getByText("1 h 45 min", { exact: true })).toBeVisible();
  // The day's one-line summary follows the edit.
  await expect(page.getByText("sleep 1 h 45 min", { exact: true })).toBeVisible();
});

test("reaches /care from the More page", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/more");
  await page.getByRole("link", { name: /Feeding & diapers/ }).click();
  await page.waitForURL("**/care");
  await expect(page.getByRole("heading", { name: "Feeding & diapers" })).toBeVisible();
});
