import { expect, test } from "@playwright/test";

test("family-table recipes are browsable from /recipes", async ({ page }) => {
  await page.goto("/recipes");
  await expect(page.getByRole("heading", { name: /The family table/ })).toBeVisible();

  await page.getByRole("link", { name: /Tomato & egg stir-fry/ }).click();
  await page.waitForURL("**/recipes/family/tomato-egg-stir-fry");
  await expect(page.getByRole("heading", { name: /Tomato & egg stir-fry/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ingredients" })).toBeVisible();
  await expect(page.getByText("4 large eggs")).toBeVisible();
  // The baby carve-out note is always present on family recipes.
  await expect(page.getByText(/Cooking for a baby too\?/)).toBeVisible();
});

test("family-table recipes render in Chinese via the zh overlay", async ({ page }) => {
  await page.goto("/recipes");
  await page.getByRole("button", { name: "切换到中文" }).click();
  await expect(page.getByRole("heading", { name: /全家餐桌/ })).toBeVisible();

  await page.getByRole("link", { name: /番茄炒蛋/ }).click();
  await page.waitForURL("**/recipes/family/tomato-egg-stir-fry");
  await expect(page.getByRole("heading", { name: /番茄炒蛋/ })).toBeVisible();
  await expect(page.getByText("鸡蛋 4 个")).toBeVisible();
});
