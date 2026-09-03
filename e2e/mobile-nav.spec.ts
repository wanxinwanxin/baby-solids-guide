import { expect, test, type Page } from "@playwright/test";

/** The mobile chrome: what fits on the bottom bar, and where the rest goes. */

function isoDaysAgo(days: number): string {
  // Local calendar date, matching how the app stamps log dates.
  const d = new Date(Date.now() - days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
    for (const label of ["Today", "History", "Plan", "More"]) {
      await expect(bar.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(bar.getByRole("link", { name: "Foods", exact: true })).toHaveCount(0);

    // Foods stays one tap away from every page.
    await page.getByRole("banner").getByRole("link", { name: "Foods" }).click();
    await page.waitForURL("**/foods");
  });

  test("the More tab reaches everything the bar dropped", async ({ page }) => {
    await completeOnboarding(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/today");

    const bar = page.getByRole("navigation", { name: /Primary/i });
    await bar.getByRole("link", { name: "More", exact: true }).click();
    await page.waitForURL("**/more");
    const main = page.getByRole("main");
    for (const label of ["Learn", "Allergens", "Insights", "Safety", "Read to baby"]) {
      await expect(main.getByRole("link", { name: new RegExp(label) })).toBeVisible();
    }

    // A destination that lives behind More keeps the tab lit while open.
    await main.getByRole("link", { name: /Learn/ }).click();
    await page.waitForURL("**/learn");
    await expect(bar.getByRole("link", { name: "More", exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
