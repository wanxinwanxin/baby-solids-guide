import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

/** Complete the fresh-start onboarding wizard for a ~7-month-old. */
async function completeOnboarding(
  page: Page,
  opts: { severeEczema?: boolean; finish?: "fresh" | "import" } = {},
) {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill("Testling");
  await page.getByLabel("Birth date").fill(isoDaysAgo(213)); // ~7 months
  await page.getByRole("button", { name: "A mix of both" }).click();
  await page.getByRole("button", { name: "Next: allergy questions" }).click();

  if (opts.severeEczema) {
    await page.getByRole("button", { name: "Severe" }).click();
  } else {
    await page.getByRole("button", { name: "No", exact: true }).nth(0).click();
  }
  await page.getByRole("button", { name: "No", exact: true }).nth(1).click();
  await page.getByRole("button", { name: "No", exact: true }).nth(2).click();
  await page.getByRole("button", { name: "Next: readiness" }).click();

  for (const sign of [
    "Sits upright",
    "Steady head control",
    "Brings hands and toys",
    "Watches your food",
    "tongue-thrust",
  ]) {
    await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
  }
  await page.getByRole("button", { name: "Next: one last thing" }).click();
  await page.getByRole("checkbox", { name: /educational guide/ }).check();

  if (opts.finish === "import") {
    await page.getByRole("button", { name: /already started → import/ }).click();
    await page.waitForURL("**/onboarding/import");
  } else {
    await page.getByRole("button", { name: /Start fresh/ }).click();
    await page.waitForURL("**/today");
  }
}

test.describe("fresh-start journey", () => {
  test("onboarding → today shows iron-first picks and the peanut rail", async ({ page }) => {
    await completeOnboarding(page);
    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();
    await expect(page.getByText("Today's picks")).toBeVisible();
    await expect(page.getByText(/Iron stores dip around 6 months/).first()).toBeVisible();
    await expect(page.getByText("Next up: Peanut")).toBeVisible();
  });

  test("severe eczema gates peanut behind a doctor conversation", async ({ page }) => {
    await completeOnboarding(page, { severeEczema: true });
    await expect(page.getByText("Next up: Peanut")).toBeVisible();
    await expect(page.getByText("on hold")).toBeVisible();
    await expect(page.getByText(/pediatrician or allergist/)).toBeVisible();
    // The tracker offers the clearance confirmation
    await page.goto("/allergens");
    await expect(page.getByRole("button", { name: /My doctor cleared us/ })).toBeVisible();
  });
});

test.describe("onboarding says why it won't continue", () => {
  test("an empty step never dead-ends silently", async ({ page }) => {
    await page.goto("/onboarding");
    const next = page.getByRole("button", { name: "Next: allergy questions" });

    // The button stays live — pressing it explains what's outstanding.
    await expect(next).toBeEnabled();
    await next.click();
    await expect(page.getByText("Before you continue:")).toBeVisible();
    await expect(page.getByText(/Add a birth date/)).toBeVisible();
    await expect(page.getByText(/Pick how you'd like to feed/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "About your baby" })).toBeVisible();

    await page.getByLabel("Birth date").fill(isoDaysAgo(213));
    await page.getByRole("button", { name: "A mix of both" }).click();
    await next.click();
    await expect(page.getByRole("heading", { name: /allergy questions/ })).toBeVisible();
  });

  test("a future birth date is refused with a reason", async ({ page }) => {
    await page.goto("/onboarding");
    await page.getByLabel("Birth date").fill(isoDaysAgo(-30));
    await page.getByRole("button", { name: "A mix of both" }).click();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
    await expect(page.getByText(/birth date is in the future/)).toBeVisible();
  });

  test("a newborn is told when solids start, not just blocked", async ({ page }) => {
    await page.goto("/onboarding");
    await page.getByLabel("Name or nickname").fill("Qingzhou");
    await page.getByLabel("Birth date").fill(isoDaysAgo(29));
    await expect(page.getByText(/Qingzhou is 4 weeks old today/)).toBeVisible();
    await expect(page.getByText("Too early for solids — and that's fine")).toBeVisible();
    await expect(page.getByText(/food picks turn on around/)).toBeVisible();
    // Under 4 months there is no override to offer — 4 months is the hard floor.
    await expect(page.getByText(/pediatrician's specific advice/)).toHaveCount(0);

    // …and the profile is still allowed through.
    await page.getByRole("button", { name: "A mix of both" }).click();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
    await expect(page.getByRole("heading", { name: /allergy questions/ })).toBeVisible();
  });

  test("4–6 months surfaces the pediatrician override inline", async ({ page }) => {
    await page.goto("/onboarding");
    await page.getByLabel("Birth date").fill(isoDaysAgo(150)); // ~4.9 months
    await expect(page.getByText("In the pediatrician-guided window")).toBeVisible();
    const override = page.getByRole("checkbox", { name: /pediatrician's specific advice/ });
    await expect(override).toBeVisible();
    await override.check();

    await page.getByRole("button", { name: "A mix of both" }).click();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
    for (const label of ["No"]) {
      await page.getByRole("button", { name: label, exact: true }).nth(0).click();
      await page.getByRole("button", { name: label, exact: true }).nth(1).click();
      await page.getByRole("button", { name: label, exact: true }).nth(2).click();
    }
    await page.getByRole("button", { name: "Next: readiness" }).click();
    // The step-2 checkbox reflects the choice already made on step 0.
    await expect(page.getByRole("checkbox", { name: /pediatrician's specific advice/ })).toBeChecked();
  });
});

test.describe("allergy history at onboarding", () => {
  const HOLD_OFF = { name: "What are you holding off on?" };
  const DIAGNOSED = { name: "Which one(s)?" };

  async function startWizard(page: Page) {
    await page.goto("/onboarding");
    await page.getByLabel("Name or nickname").fill("Testling");
    await page.getByLabel("Birth date").fill(isoDaysAgo(213));
    await page.getByRole("button", { name: "A mix of both" }).click();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
  }

  async function finishWizard(page: Page, save: RegExp | string) {
    await page.getByRole("button", { name: "Next: readiness" }).click();
    for (const sign of [
      "Sits upright",
      "Steady head control",
      "Brings hands and toys",
      "Watches your food",
      "tongue-thrust",
    ]) {
      await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
    }
    await page.getByRole("button", { name: "Next: one last thing" }).click();
    await page.getByRole("checkbox", { name: /educational guide/ }).check();
    await page.getByRole("button", { name: save }).click();
    await page.waitForURL("**/today");
  }

  function storedState(page: Page) {
    return page.evaluate(() => JSON.parse(localStorage.getItem("opensolids-v1")!).state);
  }

  test("a suspected (undiagnosed) milk allergy becomes a reversible avoid, not a hard block", async ({
    page,
  }) => {
    await startWizard(page);
    for (const i of [0, 1, 2]) {
      await page.getByRole("button", { name: "No", exact: true }).nth(i).click();
    }
    // The optional path: nothing diagnosed, but the family is holding off on dairy.
    await page.getByRole("checkbox", { name: /avoiding a food/ }).check();
    await expect(page.getByText(/Cow's milk protein allergy \(CMPA\)/).first()).toBeVisible();
    await page.getByRole("group", HOLD_OFF).getByRole("button", { name: "Milk (dairy)" }).click();
    await finishWizard(page, /Start fresh/);

    const state = await storedState(page);
    expect(state.babies[0].knownAllergies).toEqual([]); // not a diagnosis → no blocking entry
    expect(state.overrides).toMatchObject([{ allergenId: "milk", status: "avoid-per-doctor" }]);

    // Today holds the group, and the suggested plan never schedules a milk food.
    await expect(page.getByText(/milk group is excluded/)).toBeVisible();
    await page.goto("/plan");
    await page.getByRole("button", { name: "Suggest a plan" }).click();
    await expect(page.getByRole("button", { name: /Remove .* from plan/ }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Remove 🥛 Yogurt from plan/ })).toHaveCount(0);
  });

  test("a diagnosed allergy is stored on the profile and survives an edit round-trip", async ({
    page,
  }) => {
    await startWizard(page);
    await page.getByRole("button", { name: "No", exact: true }).nth(0).click(); // eczema
    await page.getByRole("button", { name: "Yes", exact: true }).nth(0).click(); // diagnosed allergy
    await page.getByRole("group", DIAGNOSED).getByRole("button", { name: "Egg", exact: true }).click();
    await page.getByRole("button", { name: "No", exact: true }).nth(2).click(); // family history
    await page.getByRole("checkbox", { name: /avoiding a food/ }).check();
    // Egg is already diagnosed, so it isn't offered again as a "holding off" pick.
    const holdOff = page.getByRole("group", HOLD_OFF);
    await expect(holdOff.getByRole("button", { name: "Egg", exact: true })).toHaveCount(0);
    await holdOff.getByRole("button", { name: "Soy", exact: true }).click();
    await finishWizard(page, /Start fresh/);

    let state = await storedState(page);
    expect(state.babies[0].knownAllergies).toEqual(["egg"]);
    expect(state.overrides).toMatchObject([{ allergenId: "soy", status: "avoid-per-doctor" }]);

    // Edit profile: both selections come back, and dropping soy clears its override.
    await page.goto("/onboarding?edit=1");
    await expect(page.getByRole("heading", { name: "Edit profile" })).toBeVisible();
    await page.getByRole("button", { name: "Next: allergy questions" }).click();
    await expect(
      page.getByRole("group", DIAGNOSED).getByRole("button", { name: "Egg", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    const soy = page.getByRole("group", HOLD_OFF).getByRole("button", { name: "Soy", exact: true });
    await expect(soy).toHaveAttribute("aria-pressed", "true");
    await soy.click();
    await page.getByRole("button", { name: "Next: readiness" }).click();
    await page.getByRole("button", { name: "Next: one last thing" }).click();
    await page.getByRole("button", { name: "Save profile" }).click();
    await page.waitForURL("**/today");

    state = await storedState(page);
    expect(state.babies).toHaveLength(1); // edited in place, not duplicated
    expect(state.babies[0].knownAllergies).toEqual(["egg"]);
    expect(state.overrides).toEqual([]);
  });
});

test.describe("logging journey", () => {
  test("log a food → persists across reload → export → wipe → import restores it", async ({ page }) => {
    await completeOnboarding(page);

    // Log carrot
    await page.goto("/log?food=carrot");
    await expect(page.getByText("Carrot")).toBeVisible();
    await page.getByRole("button", { name: "Lots!" }).click();
    await page.getByRole("button", { name: "😍 Loved" }).click();
    await page.getByRole("button", { name: "Save log" }).click();
    await expect(page.getByText("Logged — nice work. 🎉")).toBeVisible();
    await page.getByRole("button", { name: "Back to Today" }).click();
    await page.waitForURL("**/today**");

    // Persists across reload
    await page.goto("/history");
    await page.reload();
    await expect(page.getByText("Carrot × 1")).toBeVisible();

    // Export
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export JSON" }).click();
    const download = await downloadPromise;
    const filePath = await download.path();

    // Wipe
    await page.getByRole("button", { name: "Delete all data on this device" }).click();
    await page.getByRole("button", { name: "Yes, delete everything" }).click();
    await expect(page.getByText("No logs yet")).toBeVisible();

    // Import restores identical history
    await page
      .locator('input[type="file"][aria-label="Import backup file"]')
      .setInputFiles(filePath!);
    await expect(page.getByText(/Imported 1 log/)).toBeVisible();
    await expect(page.getByText("Carrot × 1")).toBeVisible();
  });

  test("reaction log pauses the allergen group and shows the playbook", async ({ page }) => {
    await completeOnboarding(page);

    await page.goto("/log?food=yogurt");
    await page.getByRole("button", { name: /Any symptoms/ }).click();
    await page.getByRole("checkbox", { name: /Widespread hives/ }).check();
    await page.getByRole("button", { name: "Save log" }).click();

    // Playbook screen after save
    await expect(page.getByText("Contact your pediatrician today.")).toBeVisible();
    await expect(page.getByText(/milk group is now paused/)).toBeVisible();

    // Today shows the hold; milk foods are out of the picks
    await page.goto("/today");
    await expect(page.getByText(/milk group is paused/)).toBeVisible();
  });

  test("a red-flag symptom interrupts with the emergency screen BEFORE save", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/log?food=egg");
    await page.getByRole("button", { name: /Any symptoms/ }).click();
    await page.getByRole("checkbox", { name: /Trouble breathing/ }).check();

    // Interrupt appears immediately — no save happened yet
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Call 911 now.")).toBeVisible();
    await dialog.getByRole("button", { name: /I understand/ }).click();
    await expect(dialog).toHaveCount(0);
  });
});

test.describe("import journey", () => {
  test("mid-journey family imports their state and gets a sensible plan", async ({ page }) => {
    await completeOnboarding(page, { finish: "import" });

    await expect(page.getByRole("heading", { name: "Where are you already?" })).toBeVisible();
    for (const food of ["Beef", "Banana", "Carrot", "Peanut butter"]) {
      await page.getByRole("button", { name: food, exact: true }).click();
    }
    await page
      .locator("label", { hasText: "Peanut" })
      .locator("select")
      .selectOption("maintaining");
    await page.getByRole("button", { name: /S2: Lumpy mash/ }).click();
    await page.getByRole("button", { name: /Done — build my plan \(4 foods\)/ }).click();
    await page.waitForURL("**/today**");

    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();
    await expect(page.getByText("stage S2")).toBeVisible();
    // Peanut is maintaining, so the rail moves on to egg
    await expect(page.getByText("Next up: Egg")).toBeVisible();
    // Imported foods show up in history
    await page.goto("/history");
    await expect(page.getByText("Beef × 1")).toBeVisible();
  });
});
