import { expect, test } from "@playwright/test";

test("the 蒙学顺口溜 shelf renders on /read with pinyin", async ({ page }) => {
  await page.goto("/read");

  // The chant group sits right after the curated starter picks.
  await expect(page.getByText(/蒙学顺口溜 · \d+/)).toBeVisible();

  // Expanding a piece shows hanzi lines with machine pinyin above them.
  await page.getByText("三字经 · 其一").click();
  await expect(page.getByText("rén zhī chū,")).toBeVisible();

  // The musical one is there too.
  await expect(page.getByText("声律启蒙 · 一东 其一")).toBeVisible();
});
