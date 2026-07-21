import type { ElectronApplication, Page } from '@playwright/test'
import { test, expect } from './fixtures/electron'

/** Fixed content size so snapshots match across Linux runners (ignores OS window chrome). */
const VIEWPORT = { width: 1280, height: 800 } as const

async function setWindowSize(
  electronApp: ElectronApplication,
  page: Page,
  size: { width: number; height: number } = VIEWPORT
) {
  await electronApp.evaluate(async ({ BrowserWindow }, nextSize) => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) return
    win.setMenuBarVisibility(false)
    // Keep the window fully on-screen — center() can push it off small Xvfb displays.
    win.setPosition(0, 0)
    win.setContentSize(nextSize.width, nextSize.height)
    win.webContents.setZoomFactor(1)
  }, size)

  await expect
    .poll(async () =>
      page.evaluate(() => ({ width: innerWidth, height: innerHeight }))
    )
    .toEqual({ width: size.width, height: size.height })
}

test.describe('Visual snapshots', () => {
  test('home page', async ({ window, electronApp }) => {
    await setWindowSize(electronApp, window)
    await expect(window.getByRole('heading', { name: 'Hello' })).toBeVisible()
    await expect(window).toHaveScreenshot('home.png', {
      clip: { x: 0, y: 0, ...VIEWPORT }
    })
  })

  test('chords page', async ({ window, electronApp }) => {
    await setWindowSize(electronApp, window)
    await window.locator('nav').getByRole('link', { name: 'Chords' }).click()
    await expect(window.getByRole('heading', { name: 'Chords' })).toBeVisible()
    await expect(window).toHaveScreenshot('chords.png', {
      clip: { x: 0, y: 0, ...VIEWPORT }
    })
  })
})
