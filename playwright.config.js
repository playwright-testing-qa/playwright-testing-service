const { defineConfig } = require('@playwright/test');

// Detect if running in CI (e.g., GitHub Actions)
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',

  // Timeout: longer in CI for stability
  timeout: isCI ? 60000 : 30000,

  // Retry only in CI
  retries: isCI ? 1 : 0,

  // Run tests sequentially (important for demo + stability)
  workers: 1,

  use: {
    // Headless in CI, visible browser locally
    headless: isCI,

    // Fullscreen + slow motion (demo friendly)
    launchOptions: {
      slowMo: isCI ? 0 : 1500, // increase to 2000 if you want even slower
      args: ['--start-maximized'], // open fullscreen
    },

    // Required for fullscreen to work properly
    viewport: null,

    // Screenshots only on failure
    screenshot: 'only-on-failure',

    // Video:
    // - CI: keep only failures
    // - Local: record everything (great for demos)
    video: isCI ? 'retain-on-failure' : 'on',
  },
});