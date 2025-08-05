import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import { testUsers } from '../config/testUsers'
import { checkoutData } from '../config/checkoutData'
import { baseTestSetup } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Sauce Demo - Checkout Tests', () => {
    describe('Test Case #8: Valid Checkout', () => {
        it('should complete checkout process successfully', async () => {
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const initialCartCount = await InventoryPage.getCartBadgeCount()
            expect(initialCartCount).toBe('0')

            await InventoryPage.addFirstProductToCart()

            const cartCountAfterAdd = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterAdd).toBe('1')

            await InventoryPage.openCart()

            const cartStatus = await CartPage.verifyCartPageLoaded()
            expect(cartStatus.cartLoaded).toBe(true)
            expect(cartStatus.itemsCount).toBe(1)

            await CartPage.checkoutButton.click()

            const checkoutPageLoaded = await CheckoutPage.isOnCheckoutPage()
            expect(checkoutPageLoaded).toBe(true)

            await CheckoutPage.fillCheckoutForm(
                checkoutData.firstName,
                checkoutData.lastName,
                checkoutData.postalCode
            )

            await CheckoutPage.clickContinue()

            const overviewPageLoaded = await CheckoutPage.isOnOverviewPage()
            expect(overviewPageLoaded).toBe(true)

            const checkoutItemsCount = await CheckoutPage.getCheckoutItemsCount()
            expect(checkoutItemsCount).toBe(1)

            const totalPrice = await CheckoutPage.getTotalPrice()
            expect(totalPrice).toContain('Item total: $')

            await CheckoutPage.clickFinish()

            const completeStatus = await CheckoutPage.verifyCheckoutComplete()
            expect(completeStatus.completeLoaded).toBe(true)
            expect(completeStatus.message).toBe('Thank you for your order!')

            await CheckoutPage.clickBackHome()

            const inventoryStatusAfterCheckout = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatusAfterCheckout.inventoryLoaded).toBe(true)

            const cartCountAfterCheckout = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterCheckout).toBe('0')
        })
    })
}) 