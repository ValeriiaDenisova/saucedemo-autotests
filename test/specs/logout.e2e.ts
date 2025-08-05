import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'

describe('Sauce Demo - Logout Tests', () => {
    describe('Test Case #4: Logout', () => {
        it('should logout successfully and redirect to login page', async () => {
            await LoginPage.open()
            await LoginPage.login('standard_user', 'secret_sauce')

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            await InventoryPage.openBurgerMenu()
            await InventoryPage.shouldSeeExpandedMenu()

            const menuItemsCount = await InventoryPage.getMenuItemsCount()
            expect(menuItemsCount).toBe(4)

            await InventoryPage.logout()

            const usernameValue = await LoginPage.inputUsername.getValue()
            const passwordValue = await LoginPage.inputPassword.getValue()

            expect(usernameValue).toBe('')
            expect(passwordValue).toBe('')
        })
    })
}) 