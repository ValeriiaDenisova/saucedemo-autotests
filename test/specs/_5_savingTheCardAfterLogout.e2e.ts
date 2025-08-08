import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Cart', () => {
    describe('Test Case #5: Saving the card after logout', () => {
        it('should save cart items after logout and login', async () => {
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const initialCartCount = await InventoryPage.getCartBadgeCount()
            expect(initialCartCount).toBe('0')

            stepper.step('1. Add first product to cart')
            await InventoryPage.addFirstProductToCart()

            const cartCountAfterAdd = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterAdd).toBe('1')

            stepper.step('2. Click on the "Burger" menu button')
            await InventoryPage.openBurgerMenu()

            const menuExpanded = await InventoryPage.isMenuExpanded()
            expect(menuExpanded).toBe(true)

            const menuItemsCount = await InventoryPage.getMenuItemsCount()
            expect(menuItemsCount).toBe(4)

            stepper.step('3. Click on the "Logout" button')
            await InventoryPage.logout()

            const usernameValue = await LoginPage.inputUsername.getValue()
            const passwordValue = await LoginPage.inputPassword.getValue()
            expect(usernameValue).toBe('')
            expect(passwordValue).toBe('')

            stepper.step('4. Enter valid login into "Login" field')
            stepper.step('5. Enter valid password into "Password" field')
            stepper.step('6. Click on the "Login" button')
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatusAfterLogin = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatusAfterLogin.inventoryLoaded).toBe(true)

            const cartCountAfterLogin = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterLogin).toBe('1')

            stepper.step('7. Click on the "Cart" button')
            await InventoryPage.openCart()

            const cartStatus = await CartPage.verifyCartPageLoaded()
            expect(cartStatus.cartLoaded).toBe(true)
            expect(cartStatus.itemsCount).toBe(1)
        })
    })
}) 