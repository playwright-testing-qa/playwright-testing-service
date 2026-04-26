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
  await Promise.all([
  page.waitForLoadState('networkidle').catch(() => {}),
  page.click('button[type="submit"]')
]);

// Wait for either navigation OR network settle
await Promise.race([
  page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => {}),
  page.waitForTimeout(7000)
]);

// Check server error (safe)
const errorLocator = page.locator('text=Server Error, text=Error, text=Something went wrong');

if (await errorLocator.isVisible().catch(() => false)) {
  await page.screenshot({ path: 'server-error.png', fullPage: true });
  throw new Error('❌ Server Error detected after form submission');
}

// Always screenshot (for demo / proof)
await page.screenshot({
  path: `result-${Date.now()}.png`,
  fullPage: true
});

// Log URL
console.log('📍 Current URL:', page.url());