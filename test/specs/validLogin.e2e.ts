import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testData } from '../config/testData'
import { baseTestSetup } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Sauce Demo - Login Tests', () => {
    describe('Test Case #1: Valid Login', () => {
        it('should login with valid credentials and redirect to inventory page', async () => {
            await LoginPage.login(testData.validUser.username, testData.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            
            expect(inventoryStatus.inventoryLoaded).toBe(true)
            expect(inventoryStatus.productsCount).toBeGreaterThan(0)
            expect(inventoryStatus.cartDisplayed).toBe(true)

            const productsDisplayed = await InventoryPage.areProductsDisplayed()
            expect(productsDisplayed).toBe(true)
        })
    })
}) 