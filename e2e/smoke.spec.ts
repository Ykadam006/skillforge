import { expect, test } from "@playwright/test";

test.describe("Smoke", () => {
  test("home redirects to dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Dashboard", level: 1 })).toBeVisible();
  });

  test("dashboard shows hero and stats", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Your learning command center", level: 2 })).toBeVisible();
    await expect(page.getByText("Skills completed")).toBeVisible();
  });
});
