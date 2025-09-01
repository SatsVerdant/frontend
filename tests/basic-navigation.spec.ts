import { test, expect } from '@playwright/test'

// Basic navigation flow through the SatsVerdant app
// Verifies that clicking nav items updates the visible page content

test.describe('Navigation', () => {
  test('enter app then navigate between sections', async ({ page }) => {
    // Landing
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Enter App' })).toBeVisible()

    // Enter App -> Dashboard
    await page.getByRole('button', { name: 'Enter App' }).click()
    await expect(page.getByRole('heading', { name: 'Recycler Dashboard' })).toBeVisible()

    // Sidebar should be visible on desktop and contain nav buttons
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    // Go to Waste Submission
    await page.getByRole('button', { name: 'Waste Submission' }).click()
    await expect(page.getByRole('heading', { name: 'Waste Submission' })).toBeVisible()

    // Go to Rewards
    await page.getByRole('button', { name: 'Rewards' }).click()
    await expect(page.getByRole('heading', { name: 'Rewards Dashboard' })).toBeVisible()

    // Go to Validator Hub
    await page.getByRole('button', { name: 'Validator Hub' }).click()
    await expect(page.getByRole('heading', { name: 'Validator Hub' })).toBeVisible()

    // Go to Governance
    await page.getByRole('button', { name: 'Governance' }).click()
    await expect(page.getByRole('heading', { name: 'Governance' })).toBeVisible()

    // Go to ESG Dashboard
    await page.getByRole('button', { name: 'ESG Dashboard' }).click()
    await expect(page.getByRole('heading', { name: 'ESG Dashboard' })).toBeVisible()

    // Go to Marketplace
    await page.getByRole('button', { name: 'Marketplace' }).click()
    await expect(page.getByRole('heading', { name: 'Carbon Marketplace' })).toBeVisible()

    // Go to Implementation Guide
    await page.getByRole('button', { name: 'Implementation Guide' }).click()
    await expect(page.getByRole('heading', { name: 'Implementation Guide' })).toBeVisible()

    // Go to Settings (via sidebar footer button might exist only on mobile, but sidebar list has Settings too)
    await page.getByRole('button', { name: 'Settings' }).click()
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

    // Go Home from Dashboard header button: first navigate back to Dashboard, then click Home
    await page.getByRole('button', { name: 'Dashboard' }).click()
    await expect(page.getByRole('heading', { name: 'Recycler Dashboard' })).toBeVisible()
    await page.getByRole('button', { name: 'Home' }).click()
    // Back to Landing
    await expect(page.getByRole('button', { name: 'Enter App' })).toBeVisible()
  })
})
