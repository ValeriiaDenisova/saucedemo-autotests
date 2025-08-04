import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'

describe('Sauce Demo - Login Tests', () => {
    describe('Test Case #1: Valid Login', () => {
        it('should login with valid credentials and redirect to inventory page', async () => {
            await LoginPage.open()
            await LoginPage.login('standard_user', 'secret_sauce')

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            
            expect(inventoryStatus.inventoryLoaded).toBe(true)
            expect(inventoryStatus.productsCount).toBeGreaterThan(0)
            expect(inventoryStatus.cartDisplayed).toBe(true)

            const productsDisplayed = await InventoryPage.areProductsDisplayed()
            expect(productsDisplayed).toBe(true)
        })
    })
}) 