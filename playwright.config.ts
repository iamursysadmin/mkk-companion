import { defineConfig } from '@playwright/test'

/**
 * Electron e2e + visual snapshots.
 * Uses Electron's bundled Chromium via `_electron` — no Playwright browser download needed.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      // Electron/Linux CI tends to be slightly noisier than browser CI.
      maxDiffPixelRatio: 0.02,
      animations: 'disabled'
    }
  },
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  outputDir: 'test-results',
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: 'electron',
      testMatch: /.*\.e2e\.ts/
    }
  ]
})
