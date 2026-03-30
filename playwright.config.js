// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: false,
    launchOptions: {
      slowMo: 1000
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});
