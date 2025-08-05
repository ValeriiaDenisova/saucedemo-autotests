import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import { testData } from '../config/testData'

describe('Sauce Demo - Cart Tests', () => {
    describe('Test Case #5: Saving the card after logout', () => {
        it('should save cart items after logout and login', async () => {
            await LoginPage.open()
            await LoginPage.login(testData.validUser.username, testData.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const initialCartCount = await InventoryPage.getCartBadgeCount()
            expect(initialCartCount).toBe('0')

            await InventoryPage.addFirstProductToCart()

            const cartCountAfterAdd = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterAdd).toBe('1')

            await InventoryPage.openBurgerMenu()

            const menuExpanded = await InventoryPage.isMenuExpanded()
            expect(menuExpanded).toBe(true)

            const menuItemsCount = await InventoryPage.getMenuItemsCount()
            expect(menuItemsCount).toBe(4)

            await InventoryPage.logout()

            const usernameValue = await LoginPage.inputUsername.getValue()
            const passwordValue = await LoginPage.inputPassword.getValue()
            expect(usernameValue).toBe('')
            expect(passwordValue).toBe('')

            await LoginPage.login(testData.validUser.username, testData.validUser.password)

            const inventoryStatusAfterLogin = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatusAfterLogin.inventoryLoaded).toBe(true)

            const cartCountAfterLogin = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterLogin).toBe('1')

            await InventoryPage.openCart()

            const cartStatus = await CartPage.verifyCartPageLoaded()
            expect(cartStatus.cartLoaded).toBe(true)
            expect(cartStatus.itemsCount).toBe(1)
        })
    })
}) 