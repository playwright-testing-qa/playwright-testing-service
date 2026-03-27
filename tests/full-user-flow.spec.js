import { test, expect } from '@playwright/test';

test('full user journey: login -> add to cart -> verify', async ({ page }) => {
  // go to app
  await page.goto('https://www.saucedemo.com/');

  // login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // verify login success
  await expect(page.locator('.inventory_list')).toBeVisible();

  // add item to cart
  await page.click('.inventory_item button');

  // verify cart updated
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // go to cart
  await page.click('.shopping_cart_link');

  // verify item in cart page
  await expect(page.locator('.cart_item')).toBeVisible();

  // small wait (for demo visibility)
  await page.waitForTimeout(2000);
});
