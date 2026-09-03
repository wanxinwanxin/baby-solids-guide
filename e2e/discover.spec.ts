import { expect, test } from "@playwright/test";

/** Discoverability: the app-wide search and the guided walkthrough. */

test.describe("App search", () => {
  test("finds a food from the top bar and navigates to it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    const input = page.getByRole("dialog").getByPlaceholder(/Search foods/);
    await expect(input).toBeFocused();

    // A synonym our labels never use still lands on the food library.
    await input.fill("food menu");
    await expect(page.getByRole("dialog").getByRole("button", { name: "Food library" })).toBeVisible();

    await input.fill("banana");
    await page.getByRole("dialog").getByRole("button", { name: "Banana", exact: true }).click();
    await page.waitForURL("**/foods/banana");
  });

  test("reaches the read-aloud shelf from a phone, in Chinese or English", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    const input = page.getByRole("dialog").getByPlaceholder(/Search foods/);
    await input.fill("古诗");
    await page.getByRole("dialog").getByRole("button", { name: "Read to baby" }).click();
    await page.waitForURL("**/read");
  });

  test("Enter opens the top-ranked hit", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("dialog").getByPlaceholder(/Search foods/).fill("choking");
    await page.keyboard.press("Enter");
    await page.waitForURL("**/safety");
  });
});

test.describe("Walkthrough", () => {
  test("More → Show me around spotlights the chrome step by step", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "More" }).click();
    await page.getByRole("menuitem", { name: "Show me around" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Your daily loop" })).toBeVisible();

    // Walk to the end: desktop shows nav, log, foods, more, search, language.
    for (const heading of [
      "Log every taste",
      "The food library",
      "More lives here",
      "Search everything",
      "English · 中文",
    ]) {
      await dialog.getByRole("button", { name: "Next" }).click();
      await expect(dialog.getByRole("heading", { name: heading })).toBeVisible();
    }
    await dialog.getByRole("button", { name: "Done" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("Skip ends the tour immediately", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    // The search dialog's footer is the mobile entry point for the tour.
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Show me around" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Your daily loop" })).toBeVisible();
    await dialog.getByRole("button", { name: "Skip tour" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
