import { expect, test, type Page } from "@playwright/test";

/**
 * The sleep window predictor (/sleep, Extras): wake anchor → window card
 * with its explainer → asleep state → back awake with the session listed.
 */

const DAY = 86400000;

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Sleepy") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(213));
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

// The window title depends on the wall clock: an evening run predicts bedtime.
const WINDOW_TITLE = /^(Next nap window|Bedtime window)$/;

test("predicts a window from a wake anchor and logs a session", async ({ page }) => {
  await completeOnboarding(page);

  await page.goto("/sleep");
  await expect(page.getByRole("heading", { name: "Sleep", exact: true })).toBeVisible();

  // No wake evidence yet — the page asks.
  await expect(page.getByText("When did your baby last wake up?")).toBeVisible();
  await page.getByRole("button", { name: "Just now" }).click();

  // The window card and its explainer appear.
  await expect(page.getByText(WINDOW_TITLE)).toBeVisible();
  await expect(page.getByText("Why this window")).toBeVisible();
  await expect(page.getByText(/Typical wake window at/)).toBeVisible();
  await expect(page.getByText(/Still learning your baby's pattern/)).toBeVisible();
  await expect(page.getByText(/Estimated bedtime tonight/)).toBeVisible();

  // Fall asleep → asleep state; wake up → session in today's list.
  await page.getByRole("button", { name: "Fell asleep now" }).click();
  await expect(page.getByText(/Asleep for/)).toBeVisible();
  await page.getByRole("button", { name: "Woke up now" }).click();
  await expect(page.getByText(WINDOW_TITLE)).toBeVisible();
  await expect(page.getByText(/Total:/)).toBeVisible();
  await expect(page.getByText("No sleep logged today yet.")).toHaveCount(0);

  // The log survives a reload (device-local persistence).
  await page.reload();
  await expect(page.getByText(/Total:/)).toBeVisible();
});

test("reaches /sleep from the More page", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/more");
  await page.getByRole("link", { name: /Sleep windows/ }).click();
  await page.waitForURL("**/sleep");
  await expect(page.getByRole("heading", { name: "Sleep", exact: true })).toBeVisible();
});
