import { expect, test } from "@playwright/test";

test.describe("Reaching a human", () => {
  test("every page offers a contact address, and About sets expectations", async ({ page }) => {
    await page.goto("/foods");
    const footerContact = page.getByRole("link", { name: "Contact us" });
    await expect(footerContact).toHaveAttribute("href", "mailto:hello@opensolids.org");

    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "Getting in touch" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "hello@opensolids.org" }),
    ).toHaveAttribute("href", "mailto:hello@opensolids.org");
    // Email is the slow channel, so the two faster paths are named.
    await expect(page.getByText(/For a reaction happening right now/)).toBeVisible();
    await expect(page.getByText(/your pediatrician comes first/)).toBeVisible();
    await page.getByRole("link", { name: "Emergency guide" }).click();
    await page.waitForURL("**/safety");
  });

  test("the contact address is localized into Chinese too", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "切换到中文" }).click();
    await expect(page.getByRole("heading", { name: "联系我们" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "hello@opensolids.org" }),
    ).toHaveAttribute("href", "mailto:hello@opensolids.org");
  });
});
