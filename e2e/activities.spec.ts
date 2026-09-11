import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Nori") {
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

test("quick-logs an activity for today, then deletes it", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/activities");

  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
  await page.getByRole("button", { name: /Singing/ }).click();
  await expect(page.getByRole("listitem").getByText("🎤 Singing")).toBeVisible();

  await page.getByRole("button", { name: /Delete Singing/ }).click();
  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
});

test("marks a specific piece as read on /read and it shows itemized", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/read");

  // Expand the first English piece and log it; the button flips to undo.
  await page.locator("details > summary").first().click();
  await page.getByRole("button", { name: "Read this to baby ✓" }).first().click();
  await expect(page.getByRole("button", { name: /Read today ✓/ })).toBeVisible();

  // The itemized entry (with its title) shows on the activities page.
  await page.goto("/activities");
  await expect(page.getByText(/📖 Read to baby · /)).toBeVisible();

  // And the Full day dashboard shows reading done, with the title as detail.
  await page.goto("/account");
  await page.getByRole("button", { name: "Switch to full day view" }).click();
  await page.goto("/today");
  await expect(page.getByText("Read today ✓")).toBeVisible();
});
