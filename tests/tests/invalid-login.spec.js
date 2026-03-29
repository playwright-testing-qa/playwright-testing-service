import { test, expect } from '@playwright/test';

test('user cannot login with invalid credentials', async ({ page }) => {
  // go to app
  await page.goto('https://www.saucedemo.com/');

  // invalid login
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  // verify error message
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
  
  // small wait for demo
  await page.waitForTimeout(2000);
});
