import { test, expect } from '@playwright/test';

test.use({
  browserName: 'chromium',
  headless: false,
});

test.setTimeout(60000);

test('Dogus form test (stable demo)', async ({ page }) => {

  await page.goto('https://www.dogus.edu.tr/aday/merak-ettikleriniz/kayit-kabul');

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Name
  await page.fill('#Textbox-1', 'Test User');
  await page.waitForTimeout(1500);

  // Email
  await page.fill('#Textbox-2', 'test@example.com');
  await page.waitForTimeout(1500);

  // Phone
  await page.fill('input[type="tel"]', '5555555555');
  await page.waitForTimeout(1500);

  // Dropdowns
  await page.locator('select').nth(0).selectOption({ index: 1 });
  await page.waitForTimeout(1500);

  await page.locator('select').nth(1).selectOption({ index: 1 });
  await page.waitForTimeout(1500);

  // Message
  await page.fill('#Textarea-1', 'Automation test message');
  await page.waitForTimeout(1500);

  // Checkbox
  await page.check('input[type="checkbox"]');
  await page.waitForTimeout(1500);

  // Submit
  await page.waitForTimeout(3000);
  await page.click('button[type="submit"]');

  // 🚨 CRITICAL: navigation ile yarışma
  await page.waitForTimeout(8000);

  // URL check (SAFE)
  const currentURL = page.url();
  console.log('📍 Current URL:', currentURL);

  // Screenshot ALWAYS (no condition)
  console.log('📸 Screenshot captured');
  await page.screenshot({
    path: `result-${Date.now()}.png`,
    fullPage: true
  });

});