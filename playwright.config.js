const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: process.env.CI ? true : false,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 1000
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});