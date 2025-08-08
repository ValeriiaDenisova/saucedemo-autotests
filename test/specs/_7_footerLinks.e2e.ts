import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Footer', () => {
    describe('Test Case #7: Footer Links', () => {
        it('should open social media links in new tabs', async () => {

            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const footerDisplayed = await InventoryPage.isFooterDisplayed()
            expect(footerDisplayed).toBe(true)

            const initialHandles = await browser.getWindowHandles()

            stepper.step('1. Click on the "Twitter" link')
            await InventoryPage.clickTwitterLink()
            await InventoryPage.switchToNewTab()
            const twitterUrl = await InventoryPage.getCurrentUrl()
            expect(twitterUrl).toContain('x.com/saucelabs')
            await InventoryPage.closeCurrentTab()

            stepper.step('2. Click on the "Facebook" link')
            await InventoryPage.clickFacebookLink()
            await InventoryPage.switchToNewTab()
            const facebookUrl = await InventoryPage.getCurrentUrl()
            expect(facebookUrl).toContain('facebook.com')
            await InventoryPage.closeCurrentTab()

            stepper.step('3. Click on the "LinkedIn" link')
            await InventoryPage.clickLinkedinLink()
            await InventoryPage.switchToNewTab()
            const linkedinUrl = await InventoryPage.getCurrentUrl()
            expect(linkedinUrl).toContain('linkedin.com')
            await InventoryPage.closeCurrentTab()

            const finalHandles = await browser.getWindowHandles()
            expect(finalHandles.length).toBe(initialHandles.length)
        })
    })
}) 