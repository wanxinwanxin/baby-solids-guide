import { expect, test, type Page } from "@playwright/test";

/**
 * Caregiver mode (Phase 16): a device-local setting for a helper who feeds
 * but does not plan. Today collapses to the day's foods with their prep,
 * and the nav hides the planning surfaces.
 */

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

test.describe("Caregiver mode", () => {
  test("toggle on the account page simplifies Today and the nav, and can be undone", async ({ page }) => {
    await completeOnboarding(page);

    // Turn it on from the account page (works with or without auth).
    await page.goto("/account");
    await page.getByRole("button", { name: "Switch to caregiver view" }).click();
    await expect(page.getByText("Caregiver view is on for this device.")).toBeVisible();

    // Today shows the prep-focused view, not the planning dashboard.
    await page.goto("/today");
    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();
    await expect(page.getByText("How to prepare").first()).toBeVisible();
    await expect(page.getByText(/Safe-texture check/).first()).toBeVisible();
    await expect(page.getByText("Allergen plan")).toHaveCount(0);
    await expect(page.getByText("Texture stage")).toHaveCount(0);

    // The mobile bar keeps Today / Foods / Safety and drops the log button.
    await page.setViewportSize({ width: 390, height: 844 });
    const bar = page.getByRole("navigation", { name: /Primary/i });
    await expect(bar.getByRole("link")).toHaveCount(3);
    for (const label of ["Today", "Foods", "Safety"]) {
      await expect(bar.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(bar.getByRole("link", { name: "Log a food" })).toHaveCount(0);

    // The footer link brings the full app back.
    await page.getByRole("button", { name: "Show the full app" }).click();
    await expect(page.getByText("Today's picks")).toBeVisible();
    await expect(bar.getByRole("link", { name: "Log a food" })).toBeVisible();
  });
});
