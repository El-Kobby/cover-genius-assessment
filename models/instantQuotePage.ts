import { Locator, Page, expect } from '@playwright/test'

export class InstantQuotePage {
    private readonly page: Page
    private readonly instantQuoteForm: Locator
    private readonly rentalCountryDropdownLabel: Locator
    private readonly rentalCountryDropdown: Locator
    private readonly rentalCountryInput: Locator
    private readonly rentalCoverageDateDropdownLabel: Locator
    private readonly rentalCoverageStartDateSelector: Locator
    private readonly rentalCoverageEndDateSelector: Locator
    private readonly defaultResidentCountrySelection: Locator
    private readonly countryChangeButton: Locator
    private readonly residentCountryDropdownLabel: Locator
    private readonly residentCountryDropdown: Locator
    private readonly residentCountryInput: Locator
    private readonly defaultVehicleTypeSelection: Locator
    private readonly vehicleTypeChangeButton: Locator
    private readonly vehicleTypeDropdownLabel: Locator
    private readonly vehicleTypeDropdown: Locator
    private readonly vehicleTypeInput: Locator
    private readonly policyOptions: Locator
    private readonly getInstantQuoteButton: Locator
    private readonly rentalStatePickupModal: Locator
    private readonly rentalStatePickupDropdown: Locator
    private readonly rentalStatePickupInput: Locator
    private readonly confirmInstantQuoteButton: Locator

    constructor(page: Page) {
        this.page = page

        //locators for homepage instant quote form
        this.instantQuoteForm = page.locator('.booking-form')
        this.rentalCountryDropdownLabel = page.locator(`//label[contains(., 'In which country are you renting your vehicle?')]`)  // Using XPath here because there are no unique selectors or stable class names for this element, making XPath the most reliable way to locate it.
        this.rentalCountryDropdown = page.locator('#destinationCountry')
        this.rentalCountryInput = page.locator('#destinationCountry-input')
        this.rentalCoverageDateDropdownLabel = page.locator(`//label[contains(., 'Dates')]`)
        this.rentalCoverageStartDateSelector = page.locator('#coverageDates-startDate')
        this.rentalCoverageEndDateSelector = page.locator('#coverageDates-endDate')
        this.policyOptions = page.locator(`//form[@class='booking-form']/div[2]`)
        this.defaultResidentCountrySelection = page.getByTestId('cor-country')
        this.countryChangeButton = page.getByTestId('cor-change-button')
        this.residentCountryDropdownLabel = page.locator(`//label[contains(., 'Country of Residence')]`) // The XPath selects the <label> containing the text 'Country of Residence'
        this.residentCountryDropdown = page.locator(`//label[contains(., 'Country of Residence')]/following-sibling::div`) // The XPath selects the <div> immediately following the label containing 'Country of Residence'
        this.residentCountryInput = page.locator(`(//label[contains(., 'Country of Residence')]/following-sibling::div//input)[1]`)
        this.defaultVehicleTypeSelection = page.getByTestId('vehicle-type')
        this.vehicleTypeChangeButton = page.getByTestId('vehicle-change-button')
        this.vehicleTypeDropdownLabel = page.locator(`//label[contains(.,'Vehicle Type')]`)
        this.vehicleTypeDropdown = page.locator(`//label[contains(.,'Vehicle Type')]/following-sibling::div`)
        this.vehicleTypeInput = page.locator(`(//label[contains(.,'Vehicle Type')]/following-sibling::div//input)[1]`)
        this.getInstantQuoteButton = page.locator(`//button[contains(@data-analytics,'getInstantQuote')]`)

        //locators for modal
        this.rentalStatePickupModal = page.getByTestId('Modal-body')
        this.rentalStatePickupDropdown = page.locator(`//label[contains(.,'Select or type a state')]/following-sibling::div[1]`)
        this.rentalStatePickupInput = page.locator(`(//label[contains(.,'Select or type a state')]/following-sibling::div[1]//input)[1]`)
        this.confirmInstantQuoteButton = page.getByTestId('state-selection-modal-cta-button-quote')
    }

    async verifyInstantQuoteFormIsVisible(): Promise<void> {
        await expect(this.instantQuoteForm).toBeVisible()
    }

    async selectCountryOfRental(rentalCountry: string): Promise<void> {
        await expect(this.rentalCountryDropdownLabel).toBeVisible()
        await this.rentalCountryDropdown.click()
        await this.rentalCountryInput.fill(rentalCountry)
        await this.page.waitForTimeout(2000)
        await this.page.keyboard.press('Enter')
        await expect(this.policyOptions).toBeVisible()
    }

    async selectRentalCoverageDates(): Promise<void> {
        await expect(this.rentalCoverageDateDropdownLabel).toBeVisible()
        await this.rentalCoverageStartDateSelector.click()
        await this.page.locator('td[role="button"][aria-label*="September 30, 2025"]').click()
        await this.rentalCoverageEndDateSelector.click()
        await this.page.locator('td[role="button"][aria-label*="October 30, 2025"]').click()
    }

    async selectCountryOfResidence(residentCountry: string): Promise<void> {
        const selectedCountry = await this.defaultResidentCountrySelection.textContent()
        if (!selectedCountry?.includes('United States')) {
            await this.countryChangeButton.click()
            await expect(this.residentCountryDropdownLabel).toBeVisible()
            await expect(this.residentCountryDropdown).toBeVisible()
            await this.residentCountryDropdown.click()
            await this.residentCountryInput.fill(residentCountry)
            await this.page.keyboard.press('Enter')
        }
    }

    async selectVehicleType(vehicleType: string): Promise<void> {
        const selectedVehicle = await this.defaultVehicleTypeSelection.textContent()
        if (!selectedVehicle?.includes('Car')) {
            await this.vehicleTypeChangeButton.click()
            await expect(this.vehicleTypeDropdownLabel).toBeVisible()
            await expect(this.vehicleTypeDropdown).toBeVisible()
            await this.vehicleTypeDropdown.click()
            await this.vehicleTypeInput.fill(vehicleType)
            await this.page.keyboard.press('Enter')
        }
    }

    async clickGetInstantQuoteButton(): Promise<void> {
        await expect(this.getInstantQuoteButton).toBeVisible()
        await this.getInstantQuoteButton.click()
    }

    async selectRentalStatePickup(state: string): Promise<void> {
        await expect(this.rentalStatePickupModal).toBeVisible()
        await expect(this.rentalStatePickupDropdown).toBeVisible()
        await this.rentalStatePickupDropdown.click()
        await this.rentalStatePickupInput.fill(state)
        await this.page.keyboard.press('Enter')
        await this.confirmInstantQuoteButton.click()
    }
}