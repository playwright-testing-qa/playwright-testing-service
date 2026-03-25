import { test, expect } from '@playwright/test';

test('basic login page loads', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});
