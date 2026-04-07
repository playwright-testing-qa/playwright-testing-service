import { test, expect } from '@playwright/test';

test('user can login and see products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('.inventory_list')).toBeVisible();
});
