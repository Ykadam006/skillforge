import { expect, test } from "@playwright/test";

test.describe("Dashboard insights UI", () => {
  test("activity heatmap and goal block render", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByTestId("activity-heatmap")).toBeVisible();
    await expect(page.getByTestId("goal-vs-actual")).toBeVisible();
  });

  test("onboarding strip can be dismissed", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("sf-onboarding-dismissed");
      } catch {
        /* ignore */
      }
    });
    await page.goto("/dashboard");
    const strip = page.getByTestId("onboarding-strip");
    await expect(strip).toBeVisible();
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(strip).toHaveCount(0);
  });
});
