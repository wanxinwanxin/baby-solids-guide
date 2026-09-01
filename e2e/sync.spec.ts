import { expect, test, type Browser, type Page } from "@playwright/test";

/**
 * Phase 6 end-to-end sync — needs a real DATABASE_URL (dev server reads
 * .env.local). Gated so default CI stays hermetic:
 *   ENABLE_SYNC_E2E=1 npx playwright test e2e/sync.spec.ts
 */
test.skip(!process.env.ENABLE_SYNC_E2E, "set ENABLE_SYNC_E2E=1 to run against a real database");

function isoDaysAgo(days: number): string {
  // Local calendar date, matching how the app stamps log dates.
  const d = new Date(Date.now() - days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

test("family sharing: A invites, B accepts, logs flow both ways, deletion hands off", async ({
  browser,
}: {
  browser: Browser;
}) => {
  test.setTimeout(240000);
  const stamp = Date.now();
  const emailA = `e2e-fam-a-${stamp}@example.com`;
  const emailB = `e2e-fam-b-${stamp}@example.com`;
  const password = "test-password-123";

  // Parent A: guest history → account → synced.
  const ctxA = await browser.newContext();
  const pageA = await ctxA.newPage();
  await completeOnboarding(pageA, "FamBaby");
  await logFood(pageA, "carrot");
  await signIn(pageA, emailA, password, "sign-up");
  await pageA.goto("/today");
  await expect(pageA.getByText(/synced ✓|syncing…/)).toBeVisible({ timeout: 15000 });

  // A creates an invite from the Family card.
  await pageA.goto("/account");
  await pageA.getByRole("button", { name: "Invite a co-parent" }).click();
  const inviteUrl = (await pageA.locator("code").first().textContent()) ?? "";
  expect(inviteUrl).toContain("/join/");
  const joinPath = new URL(inviteUrl).pathname;

  // Parent B: own account, accepts the invite, sees the shared baby.
  const ctxB = await browser.newContext();
  const pageB = await ctxB.newPage();
  await signIn(pageB, emailB, password, "sign-up");
  await pageB.goto(joinPath);
  await pageB.getByRole("button", { name: /Accept as/ }).click();
  await pageB.waitForURL("**/today", { timeout: 20000 });
  await expect(pageB.getByRole("heading", { name: "Today for FamBaby" })).toBeVisible({
    timeout: 20000,
  });
  await pageB.goto("/history");
  await expect(pageB.getByText("Carrot × 1")).toBeVisible({ timeout: 20000 });

  // B logs a food; A picks it up.
  await logFood(pageB, "avocado");
  await pageB.waitForTimeout(4000);
  await pageA.goto("/history");
  await expect(pageA.getByText("Avocado × 1")).toBeVisible({ timeout: 20000 });

  // A's Family card lists both parents.
  await pageA.goto("/account");
  await expect(pageA.getByText(emailB)).toBeVisible({ timeout: 15000 });

  // A (creator) deletes their account → the baby hands off to B.
  await pageA.getByRole("button", { name: "Delete account and server data" }).click();
  await pageA.getByRole("button", { name: "Yes, delete my account" }).click();
  await expect(pageA.getByRole("heading", { name: "Save your data" })).toBeVisible({ timeout: 15000 });
  await pageB.goto("/history");
  await expect(pageB.getByText("Avocado × 1")).toBeVisible({ timeout: 20000 });

  // B deletes too — the family is gone, server clean.
  await pageB.goto("/account");
  await pageB.getByRole("button", { name: "Delete account and server data" }).click();
  await pageB.getByRole("button", { name: "Yes, delete my account" }).click();
  await expect(pageB.getByRole("heading", { name: "Save your data" })).toBeVisible({ timeout: 15000 });

  await ctxA.close();
  await ctxB.close();
});
