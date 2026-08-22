import { expect, test, type Browser, type Page } from "@playwright/test";

/**
 * Phase 6 end-to-end sync — needs a real DATABASE_URL (dev server reads
 * .env.local). Gated so default CI stays hermetic:
 *   ENABLE_SYNC_E2E=1 npx playwright test e2e/sync.spec.ts
 */
test.skip(!process.env.ENABLE_SYNC_E2E, "set ENABLE_SYNC_E2E=1 to run against a real database");

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

async function completeOnboarding(page: Page, nickname: string) {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(213));
  await page.getByRole("button", { name: "A mix of both" }).click();
  await page.getByRole("button", { name: "Next: allergy questions" }).click();
  for (const i of [0, 1, 2]) await page.getByRole("button", { name: "No", exact: true }).nth(i).click();
  await page.getByRole("button", { name: "Next: readiness" }).click();
  for (const sign of ["Sits upright", "Steady head control", "Brings hands", "Watches your food", "tongue-thrust"]) {
    await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
  }
  await page.getByRole("button", { name: "Next: one last thing" }).click();
  await page.getByRole("checkbox", { name: /educational guide/ }).check();
  await page.getByRole("button", { name: /Start fresh/ }).click();
  await page.waitForURL("**/today");
}

async function logFood(page: Page, slug: string) {
  await page.goto(`/log?food=${slug}`);
  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();
}

async function signIn(page: Page, email: string, password: string, mode: "sign-in" | "sign-up") {
  await page.goto("/account");
  await page.getByRole("tab", { name: mode === "sign-in" ? "Sign in" : "Create account" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: mode === "sign-in" ? "Sign in" : "Create account" }).click();
  await expect(page.getByText(email)).toBeVisible({ timeout: 15000 });
}

test("guest history → sign up → second browser sees it → edits flow back → delete account", async ({
  browser,
}: {
  browser: Browser;
}) => {
  test.setTimeout(180000);
  const email = `e2e-sync-${Date.now()}@example.com`;
  const password = "test-password-123";

  // Device A: build guest history, then create the account.
  const ctxA = await browser.newContext();
  const pageA = await ctxA.newPage();
  await completeOnboarding(pageA, "SyncBaby");
  await logFood(pageA, "carrot");
  await logFood(pageA, "banana");
  await signIn(pageA, email, password, "sign-up");

  // Push happens on login; give the debounce a beat, then confirm indicator.
  await pageA.goto("/today");
  await expect(pageA.getByText(/synced ✓|syncing…/)).toBeVisible({ timeout: 15000 });

  // Device B: fresh browser, sign in, expect the same data to appear.
  const ctxB = await browser.newContext();
  const pageB = await ctxB.newPage();
  await signIn(pageB, email, password, "sign-in");
  await pageB.goto("/today");
  await expect(pageB.getByRole("heading", { name: "Today for SyncBaby" })).toBeVisible({ timeout: 20000 });
  await pageB.goto("/history");
  await expect(pageB.getByText("Carrot × 1")).toBeVisible({ timeout: 20000 });
  await expect(pageB.getByText("Banana × 1")).toBeVisible();

  // Device B logs a new food; Device A picks it up on reload.
  await logFood(pageB, "avocado");
  await pageB.waitForTimeout(4000); // debounce + push
  await pageA.goto("/history");
  await expect(pageA.getByText("Avocado × 1")).toBeVisible({ timeout: 20000 });

  // Delete the account from A: server data gone, local guest data intact.
  await pageA.goto("/account");
  await pageA.getByRole("button", { name: "Delete account and server data" }).click();
  await pageA.getByRole("button", { name: "Yes, delete my account" }).click();
  await expect(pageA.getByRole("heading", { name: "Save your data" })).toBeVisible({ timeout: 15000 });
  await pageA.goto("/history");
  await expect(pageA.getByText("Carrot × 1")).toBeVisible(); // local copy survives

  // B's session now hits a dead account; sync fails gracefully, local data stays.
  await pageB.goto("/history");
  await expect(pageB.getByText("Avocado × 1")).toBeVisible();

  await ctxA.close();
  await ctxB.close();
});
