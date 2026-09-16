import { expect, test, type Page } from "@playwright/test";

/**
 * A meal of several foods, logged in one pass (parent request, 2026-09-16).
 * Each food becomes its own history entry, and the check-in offer says which
 * food of the meal it follows.
 *
 * Adding a custom food fires a food-request to /api/feedback, and the dev
 * server talks to the real database — so this spec intercepts that route (see
 * e2e/custom-food.spec.ts).
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

async function pickFood(page: Page, query: string, chip: string) {
  await page.getByLabel("Search food to log").fill(query);
  await page.getByRole("button", { name: chip, exact: true }).click();
}

test("logs two foods as one meal, and keeps an entry for each", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/log");

  await pickFood(page, "pear", "Pear");
  await pickFood(page, "sweet potato", "Sweet potato");

  // The picker stays open, and the meal says what it holds.
  await expect(page.getByText("2 foods in this meal")).toBeVisible();
  // Two foods share one stage, so the prep list gives way to stage buttons.
  await expect(page.getByText("One stage for the whole plate")).toBeVisible();

  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText(/Logged — nice work/)).toBeVisible();
  await expect(page.getByText(/Pear and Sweet potato are in the book for Nibbler/)).toBeVisible();

  await page.goto("/history");
  await expect(page.getByRole("link", { name: "Pear" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Sweet potato" }).first()).toBeVisible();
});

test("drops a food from the meal before saving", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/log");

  await pickFood(page, "pear", "Pear");
  await pickFood(page, "sweet potato", "Sweet potato");
  await page.getByRole("button", { name: "Remove Pear" }).click();

  await expect(page.getByText("2 foods in this meal")).toHaveCount(0);
  // One food again, so its own prep options come back.
  await expect(page.getByText("Prep used")).toBeVisible();

  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText(/Sweet potato is in the book for Nibbler/)).toBeVisible();
});

test("says which food of the meal the check-ins follow", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/log");

  await pickFood(page, "egg", "Egg");
  await pickFood(page, "pear", "Pear");
  await page.getByRole("button", { name: "Save log" }).click();

  await expect(page.getByText(/Egg is a common allergen/)).toBeVisible();
  await expect(page.getByText(/The check-ins follow Egg/)).toBeVisible();
});

test("mixes a custom food into the meal and keeps the custom note", async ({ page }) => {
  // Keep the food-request signal off the real feedback table (see file note).
  await page.route("**/api/feedback", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );

  await completeOnboarding(page);
  await page.goto("/log");

  await pickFood(page, "pear", "Pear");
  await page.getByLabel("Search food to log").fill("Zorbafruit");
  await page.getByRole("button", { name: /Add "Zorbafruit" as a custom food/ }).click();

  await expect(page.getByText("custom", { exact: true })).toBeVisible();
  await expect(page.getByText(/logs by name only/)).toBeVisible();

  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText(/Pear and Zorbafruit are in the book for Nibbler/)).toBeVisible();

  await page.goto("/history");
  await expect(page.getByText("Zorbafruit").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Zorbafruit" })).toHaveCount(0);
});
