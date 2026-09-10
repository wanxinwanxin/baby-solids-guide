import { expect, test, type Page } from "@playwright/test";

/**
 * The always-visible feedback button, its composer, and the automatic
 * food-request signal when a custom food is added. The e2e dev server has no
 * database, so /api/feedback is intercepted to make the flow deterministic.
 */

const DAY = 86400000;
function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Feedbaby") {
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

test("send feedback from the always-visible button", async ({ page }) => {
  const posted: Array<Record<string, unknown>> = [];
  await page.route("**/api/feedback", async (route) => {
    posted.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await completeOnboarding(page);
  await page.getByRole("button", { name: "Send feedback" }).first().click();

  const dialog = page.getByRole("dialog", { name: "Tell us anything" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Idea" }).click();
  await dialog.getByLabel("Your message").fill("Please add a dark mode.");
  await dialog.getByRole("button", { name: "Send", exact: true }).click();

  await expect(page.getByText(/Thank you/)).toBeVisible();
  expect(posted).toHaveLength(1);
  expect(posted[0]).toMatchObject({ category: "idea", message: "Please add a dark mode." });
});

test("adding a custom food fires a food-request", async ({ page }) => {
  const posted: Array<Record<string, unknown>> = [];
  await page.route("**/api/feedback", async (route) => {
    posted.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await completeOnboarding(page);
  await page.goto("/log");
  await page.getByLabel("Search food to log").fill("Ackee");
  await page.getByRole("button", { name: /Add "Ackee" as a custom food/ }).click();
  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText(/Logged — nice work/)).toBeVisible();

  expect(posted.some((p) => p.category === "food-request" && String(p.message).includes("Ackee"))).toBe(
    true,
  );
});
