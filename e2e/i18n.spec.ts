import { expect, test } from "@playwright/test";

test("language toggle switches the whole app to Simplified Chinese and back", async ({ page }) => {
  await page.goto("/foods");
  await expect(page.getByRole("heading", { name: /foods, all free/ })).toBeVisible();

  // Toggle shows the language you'd switch TO.
  await page.getByRole("button", { name: "切换到中文" }).click();

  // <html lang>, nav chrome, page copy, and content all flip.
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("link", { name: "食谱", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /种食物/ })).toBeVisible();

  // Localized content: food names render in Chinese, and search matches both languages.
  const search = page.getByLabel("搜索食物");
  await search.fill("胡萝卜");
  await expect(page.getByRole("link", { name: /胡萝卜/ })).toBeVisible();
  await search.fill("carrot");
  await expect(page.getByRole("link", { name: /胡萝卜/ })).toBeVisible();

  // Food detail page renders localized prep content.
  await page.getByRole("link", { name: /胡萝卜/ }).first().click();
  await expect(page.getByText(/6–8个月/).first()).toBeVisible();

  // The choice persists across navigations (cookie).
  await page.goto("/learn");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");

  // And toggles back to English.
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Learn" })).toBeVisible();
});
