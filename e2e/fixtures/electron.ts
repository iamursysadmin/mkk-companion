import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  test as base,
  expect,
  _electron as electron,
  type ElectronApplication,
  type Page
} from '@playwright/test'

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
)
const mainEntry = path.join(rootDir, 'dist-electron/main/index.js')
const rendererIndex = path.join(rootDir, 'dist/index.html')

export type ElectronFixtures = {
  electronApp: ElectronApplication
  window: Page
}

function assertAppBuilt() {
  if (!fs.existsSync(mainEntry) || !fs.existsSync(rendererIndex)) {
    throw new Error(
      'App build missing. Run `pnpm run build:app` before e2e tests.'
    )
  }
}

export const test = base.extend<ElectronFixtures>({
  // `browserName` keeps the required object-destructure shape without launching a browser.
  electronApp: async ({ browserName }, use, testInfo) => {
    void browserName
    assertAppBuilt()

    const userDataDir = path.join(
      os.tmpdir(),
      `mkk-e2e-${testInfo.workerIndex}-${testInfo.parallelIndex}-${Date.now()}`
    )

    const electronApp = await electron.launch({
      args: [mainEntry],
      cwd: rootDir,
      env: {
        ...process.env,
        PW_TEST: '1',
        PW_USER_DATA: userDataDir,
        // Prefer packaged renderer assets over a Vite dev server.
        VITE_DEV_SERVER_URL: ''
      },
      timeout: 60_000
    })

    await use(electronApp)
    await electronApp.close()

    await fs.promises.rm(userDataDir, { recursive: true, force: true })
  },

  window: async ({ electronApp }, use) => {
    const window = await electronApp.firstWindow()
    await window.waitForLoadState('domcontentloaded')
    await window.locator('#app').waitFor({ state: 'visible' })
    await use(window)
  }
})

export { expect }
