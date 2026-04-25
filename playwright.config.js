const { defineConfig } = require('@playwright/test');

// Detect if running in CI (e.g., GitHub Actions)
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',

  // Timeout
  timeout: isCI ? 60000 : 30000,

  // Retries (only in CI)
  retries: isCI ? 1 : 0,

  // Run tests one by one (stable + demo friendly)
  workers: 1,

  use: {
    // Headless in CI, visible locally
    headless: isCI ? true : false,

    // Browser launch settings
    launchOptions: {
      slowMo: isCI ? 0 : 7000, // slower = better demo
      args: ['--start-maximized'],
    },

    // Required for fullscreen
    viewport: null,

    contextOptions: {
    viewport: null,
},

    // Better stability on slow sites
    navigationTimeout: isCI ? 30000 : 20000,
    actionTimeout: isCI ? 15000 : 10000,

    // Screenshots
    screenshot: 'only-on-failure',

    // Video
    video: isCI ? 'retain-on-failure' : 'on',

    // Trace (VERY IMPORTANT for debugging)
    trace: 'on-first-retry',
  },
});