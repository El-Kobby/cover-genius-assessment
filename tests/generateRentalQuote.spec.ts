import { test, expect } from '@playwright/test'
import { fillInitialInstantQuoteForm, selectRentalStatePickup } from '../steps/generateQuoteSteps'

test.describe('Rental Quote', () => {
    test('Generate a rental quote successfully', async ({ page }) => {
        await page.goto('/')
        await fillInitialInstantQuoteForm(page)
        await selectRentalStatePickup(page)
        // Add assertions to verify the quote generation was successful
        await expect(page).toHaveURL(/www\.rentalcover\.com\/en\/quote/)
        await expect(page.getByTestId('Heading-title').nth(0)).toHaveText(/Your protection/)
    })
})