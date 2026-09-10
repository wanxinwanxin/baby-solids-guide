import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Full day view: the account toggle flips Today into a whole-day dashboard,
 * promotes sleep + care into the nav, and the "to do today" list completes
 * (swipe or the Done button) — completing a food logs it eaten.
 */

const DAY = 86400000;
function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Kai") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(240));
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

async function enableFullDay(page: Page) {
  await page.goto("/account");
  await page.getByRole("button", { name: "Switch to full day view" }).click();
}

test("toggle flips Today into the whole-day dashboard and promotes the nav", async ({ page }) => {
  await completeOnboarding(page);
  await enableFullDay(page);

  await page.goto("/today");
  await expect(page.getByRole("heading", { name: "Today for Kai" })).toBeVisible();
  await expect(page.getByText("To do today")).toBeVisible();
  await expect(page.getByText("Done today")).toBeVisible();

  // Sleep and Care are now first-class in the desktop nav (short labels).
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Sleep", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Care", exact: true })).toBeVisible();

  // The swipe rows must stay accessible (the Done button is the guarantee).
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => v.impact === "critical")).toEqual([]);

  await page.screenshot({ path: "test-results/full-day-today.png", fullPage: true });

  // Mobile: Sleep + Care are first-class tabs, and the Log button picks a domain.
  await page.setViewportSize({ width: 390, height: 844 });
  const tabbar = page.getByRole("navigation", { name: "Primary" });
  await expect(tabbar.getByRole("link", { name: "Sleep" })).toBeVisible();
  await expect(tabbar.getByRole("link", { name: "Care" })).toBeVisible();
  await page.getByRole("button", { name: "Log a food" }).click();
  await expect(tabbar.getByRole("link", { name: "Bottle" })).toBeVisible();
  await expect(tabbar.getByRole("link", { name: "Diaper" })).toBeVisible();
  await page.screenshot({ path: "test-results/full-day-mobile.png" });
});

test("completing a food in the to-do list logs it eaten", async ({ page }) => {
  await completeOnboarding(page);
  await enableFullDay(page);
  await page.goto("/today");

  // Solids starts at none; complete the first suggested food via its Done button.
  await expect(page.getByText("None yet").first()).toBeVisible();
  await page.getByRole("button", { name: "Ate it" }).first().click();
  await expect(page.getByText(/\d+ eaten/)).toBeVisible();
});

test("reverting to the solids app restores the standard Today", async ({ page }) => {
  await completeOnboarding(page);
  await enableFullDay(page);
  await page.goto("/account");
  await page.getByRole("button", { name: "Back to the solids app" }).click();
  // "Today for Kai" is the heading in BOTH modes, so assert on a full-day-only
  // marker instead: the standard Today has no "To do today" dashboard section.
  await page.goto("/today");
  await expect(page.getByText("To do today")).toHaveCount(0);
  await expect(page.getByText("Done today")).toHaveCount(0);
});
