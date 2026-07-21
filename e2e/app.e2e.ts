import { test, expect } from './fixtures/electron'

test.describe('Electron app', () => {
  test('launches and shows the home greeting', async ({ window }) => {
    await expect(window.getByRole('heading', { name: 'Hello' })).toBeVisible()
    await expect(
      window.getByRole('button', { name: 'Toggle sidebar' })
    ).toBeVisible()
  })

  test('navigates to Chords from home', async ({ window }) => {
    await window.locator('nav').getByRole('link', { name: 'Chords' }).click()
    await expect(window.getByRole('heading', { name: 'Chords' })).toBeVisible()
    await expect(window.getByText('User Chords')).toBeVisible()
  })

  test('navigates to Settings from home', async ({ window }) => {
    await window.locator('nav').getByRole('link', { name: 'Settings' }).click()
    await expect(
      window.getByRole('heading', { name: 'Settings' }).first()
    ).toBeVisible()
  })
})
