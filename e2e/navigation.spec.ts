import { expect, test } from "@playwright/test";

test.describe("Desktop navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("sidebar links reach main sections", async ({ page }) => {
    await page.goto("/dashboard");

    await page.locator("aside").getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page).toHaveURL(/\/skills$/);
    await expect(page.getByRole("heading", { name: "Skills library", level: 1 })).toBeVisible();

    await page.locator("aside").getByRole("link", { name: "Practice", exact: true }).click();
    await expect(page).toHaveURL(/\/practice$/);
    await expect(page.getByRole("heading", { name: "Practice", level: 1 })).toBeVisible();

    await page.locator("aside").getByRole("link", { name: "Analytics", exact: true }).click();
    await expect(page).toHaveURL(/\/analytics$/);
    await expect(page.getByRole("heading", { name: "Analytics", level: 1 })).toBeVisible();
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/dashboard");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.click();
    await expect(page.locator("#main-content")).toBeFocused();
  });
});
