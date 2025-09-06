import { Page, expect } from '@playwright/test'
import { InstantQuotePage } from '../models/instantQuotePage'

export const fillInitialInstantQuoteForm = async (page: Page): Promise<void> => {
    const instantQuotePage = new InstantQuotePage(page)
    await instantQuotePage.verifyInstantQuoteFormIsVisible()
    await instantQuotePage.selectCountryOfRental('United States')
    await instantQuotePage.selectRentalCoverageDates()
    await instantQuotePage.selectCountryOfResidence('United States')
    await instantQuotePage.selectVehicleType('Car')
    await instantQuotePage.clickGetInstantQuoteButton()
}

export const fillRentalStatePickup = async (page: Page): Promise<void> => {
    const instantQuotePage = new InstantQuotePage(page)
    await instantQuotePage.selectRentalStatePickup('California')
}