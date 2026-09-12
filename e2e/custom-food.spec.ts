import { expect, test, type Page } from "@playwright/test";

/**
 * Cross-language food search in the /log picker, and adding a custom food
 * that logs by name and appears in history without a (nonexistent) food page.
 */

const DAY = 86400000;
function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Nibbler") {
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

test("finds a food in the log picker by its Chinese name", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/log");
  await page.getByLabel("Search food to log").fill("番茄");
  // Tomato's English name is the chip label; the Chinese name matched it.
  await expect(page.getByRole("button", { name: "Tomato", exact: true })).toBeVisible();
});

test("adds a custom food, logs it, and shows it in history without a link", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/log");

  // A name not in the database offers a custom-food add.
  await page.getByLabel("Search food to log").fill("Zorbafruit");
  const addBtn = page.getByRole("button", { name: /Add "Zorbafruit" as a custom food/ });
  await expect(addBtn).toBeVisible();
  await addBtn.click();

  // Selected as custom: no prep section, but amount/reaction are present.
  await expect(page.getByText("custom", { exact: true })).toBeVisible();
  await expect(page.getByText(/logs by name only/)).toBeVisible();
  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText(/Logged — nice work/)).toBeVisible();

  // History shows the custom name as plain text (no food-page link).
  await page.goto("/history");
  await expect(page.getByText("Zorbafruit").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Zorbafruit" })).toHaveCount(0);
});
