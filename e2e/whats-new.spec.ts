import { expect, test, type Page } from "@playwright/test";

/**
 * The one-time "what's new" spotlight. It targets people who had the app
 * before this release, decided by the persisted `whatsNewSeen` flag: fresh
 * onboarding leaves it true (never shown), so we simulate an existing user by
 * flipping it false in localStorage.
 */

const DAY = 86400000;
function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Kai") {
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

/** Flip the persisted flag to mimic a user who predates this release. */
async function markAsExistingUser(page: Page) {
  await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1")!);
    raw.state.whatsNewSeen = false;
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  });
}

test("a new user never sees the what's-new spotlight", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/today");
  // Fresh onboarding keeps whatsNewSeen = true; the prompt must stay away.
  await expect(page.getByText(/tell us what to build/)).toHaveCount(0);
});

test("an existing user sees it once, highlighting the feedback button", async ({ page }) => {
  await completeOnboarding(page);
  await markAsExistingUser(page);
  await page.goto("/today");

  // Step 1 spotlights the feedback button (always present — the feedback
  // button is not auth-gated).
  const dialog = page.getByRole("dialog", { name: /tell us what to build/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/request a food or a feature/)).toBeVisible();
  await page.screenshot({ path: "test-results/whats-new-spotlight.png" });

  // The Full day step anchors to the account button, which only renders when
  // auth is configured. So the spotlight is 1 or 2 steps; finish either.
  const next = page.getByRole("dialog").getByRole("button", { name: "Next" });
  if (await next.count()) {
    await next.click();
    await expect(page.getByRole("dialog", { name: /Full day view/ })).toBeVisible();
  }
  await page.getByRole("dialog").getByRole("button", { name: "Got it" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // It never returns.
  await page.reload();
  await expect(page.getByText(/tell us what to build/)).toHaveCount(0);
});
