import { expect, test, type Page } from "@playwright/test";

/** The mobile chrome: what fits on the bottom bar, and where the rest goes. */

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

test.describe("Mobile chrome", () => {
  test("two tabs sit either side of the log button, with foods in the top bar", async ({ page }) => {
    await completeOnboarding(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/today");

    const bar = page.getByRole("navigation", { name: /Primary/i });
    await expect(bar.getByRole("link")).toHaveCount(5); // 4 tabs + the log button
    for (const label of ["Today", "History", "Plan", "Learn"]) {
      await expect(bar.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(bar.getByRole("link", { name: "Foods", exact: true })).toHaveCount(0);

    // Foods stays one tap away from every page.
    await page.getByRole("banner").getByRole("link", { name: "Foods" }).click();
    await page.waitForURL("**/foods");
  });
});
