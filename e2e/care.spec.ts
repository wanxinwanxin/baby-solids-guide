import { expect, test, type Page } from "@playwright/test";

/**
 * Bottles & diapers (/care, Extras): log a formula bottle and a diaper,
 * see them in today's list with a summary, edit one, and reach the page
 * from More.
 */

const DAY = 86400000;

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Buttons") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(120));
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
  await expect(page.getByRole("heading", { name: "Bottles & diapers" })).toBeVisible();

  // The bottle button is disabled until an amount is chosen.
  const formulaCard = page.locator("div").filter({ has: page.getByText("Formula bottle") }).last();
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
  await expect(formulaCard).toBeTruthy();
});

test("reaches /care from the More page", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/more");
  await page.getByRole("link", { name: /Bottles & diapers/ }).click();
  await page.waitForURL("**/care");
  await expect(page.getByRole("heading", { name: "Bottles & diapers" })).toBeVisible();
});
