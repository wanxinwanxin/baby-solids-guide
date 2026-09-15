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

test("logs a movement idea from the shelf and shows it itemized", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/activities");

  // The shelf groups by starting age, youngest first.
  await expect(page.getByRole("heading", { name: /Things to do with the baby/ })).toBeVisible();
  await expect(page.getByText(/From birth · \d+/)).toBeVisible();
  await expect(page.getByText(/From 6 months · \d+/)).toBeVisible();

  // Open one idea: steps, the reason, and the limit all render.
  await page.getByText("Tummy time on your chest").click();
  await expect(page.getByText(/Lay the baby tummy-down on your chest/)).toBeVisible();
  await expect(page.getByText("Why it helps").first()).toBeVisible();
  await expect(page.getByText("Watch for").first()).toBeVisible();

  // One tap logs it, carrying the idea's title.
  await page.getByRole("button", { name: "Did this today ✓" }).first().click();
  await expect(page.getByRole("button", { name: /Done today ✓/ })).toBeVisible();
  await expect(
    page.getByRole("listitem").getByText("🐢 Tummy time · Tummy time on your chest"),
  ).toBeVisible();

  // Tapping again undoes it.
  await page.getByRole("button", { name: /Done today ✓/ }).first().click();
  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
});

test("the movement shelf reads for a visitor with no baby yet", async ({ page }) => {
  // No onboarding: the quick-log row becomes a setup prompt, but the ideas
  // must still be readable, and no log button may appear without a profile.
  await page.goto("/activities");

  await expect(page.getByText("Set up a profile to log activities")).toBeVisible();
  await expect(page.getByText("Tummy time on your chest")).toBeVisible();
  await expect(page.getByRole("button", { name: /Did this today/ })).toHaveCount(0);
});
