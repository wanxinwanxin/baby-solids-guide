import { expect, test } from "@playwright/test";

test("browse: filter iron-rich → open salmon → see safe form + pass/fail test", async ({ page }) => {
  await page.goto("/foods");
  await expect(page.getByRole("heading", { name: /foods, all free/ })).toBeVisible();

  await page.getByRole("button", { name: "Iron-rich" }).click();
  const salmon = page.getByRole("link", { name: /Salmon/ });
  await expect(salmon).toBeVisible();
  await salmon.click();

  await expect(page.getByRole("heading", { name: "Salmon", exact: true })).toBeVisible();
  await expect(page.getByText("Safe form at 6–8 months")).toBeVisible();
  await expect(page.getByText(/Pass\/fail test:/)).toBeVisible();
  await expect(page.getByText("Common allergen: Fish")).toBeVisible();
});

test("search narrows the library", async ({ page }) => {
  await page.goto("/foods");
  await page.getByLabel("Search foods").fill("carrot");
  await expect(page.getByRole("link", { name: /Carrot/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Banana/ })).toHaveCount(0);
});
