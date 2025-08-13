import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup } from './baseTest/baseTestSetup'

describe('Test Case #1: Valid Login', () => {
    beforeEach(async () => {
        await baseTestSetup()
    })

    it('should login with valid credentials and redirect to inventory page', async () => {

        await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

        const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
        
        expect(inventoryStatus.inventoryLoaded).toBe(true)
        expect(inventoryStatus.productsCount).toBeGreaterThan(0)
        expect(inventoryStatus.cartDisplayed).toBe(true)

        const productsDisplayed = await InventoryPage.areProductsDisplayed()
        expect(productsDisplayed).toBe(true)
    })
}) 