import { expect, test } from "@playwright/test";

/**
 * Handing the app to another parent. The two things that can silently break
 * are the clipboard fallback (most desktop browsers have no share sheet) and
 * the language the link carries — a Chinese link that opens in English is
 * the whole reason the parameter exists.
 */
test.describe("Share the app with a friend", () => {
  test("copies an invite that says what the app is, with a link back", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/more");

    // The footer carries the same control, so scope to the page body.
    await page.locator("main").getByRole("button", { name: "Tell a friend" }).click();
    await expect(page.locator("main").getByText("Copied — paste it anywhere")).toBeVisible();

    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain("OpenSolids");
    expect(copied).toContain("/?lang=en");
  });

  test("a link shared in Chinese opens the app in Chinese", async ({ page }) => {
    await page.goto("/?lang=zh");
    // The parameter is spent on the cookie, not left in the address bar.
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: "Switch to English" })).toBeVisible();

    // And it stays: the next page the friend opens is Chinese too.
    await page.goto("/foods");
    await expect(page.getByRole("button", { name: "Switch to English" })).toBeVisible();
  });
});
