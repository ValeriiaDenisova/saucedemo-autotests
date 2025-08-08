import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import { testUsers } from '../config/testUsers'
import { checkoutData } from '../config/checkoutData'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Checkout', () => {
    describe('Test Case #8: Valid Checkout', () => {
        it('should complete checkout process successfully', async () => {
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const initialCartCount = await InventoryPage.getCartBadgeCount()
            expect(initialCartCount).toBe('0')

            stepper.step('1. Click on the "Add to cart" button near any product')
            await InventoryPage.addFirstProductToCart()

            const cartCountAfterAdd = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterAdd).toBe('1')

            stepper.step('2. Click on the "Cart" button')
            await InventoryPage.openCart()

            const cartStatus = await CartPage.verifyCartPageLoaded()
            expect(cartStatus.cartLoaded).toBe(true)
            expect(cartStatus.itemsCount).toBe(1)

            stepper.step('3. Click on the "Checkout" button')
            await CartPage.checkoutButton.click()

            const checkoutPageLoaded = await CheckoutPage.isOnCheckoutPage()
            expect(checkoutPageLoaded).toBe(true)

            stepper.step('4. Fill the "First Name" field with valid data')
            stepper.step('5. Fill the "Last Name" field with valid data')
            stepper.step('6. Fill the "Postal Code" field with valid data')
            await CheckoutPage.fillCheckoutForm(
                checkoutData.firstName,
                checkoutData.lastName,
                checkoutData.postalCode
            )

            stepper.step('7. Click on the "Continue" button')
            await CheckoutPage.clickContinue()

            const overviewPageLoaded = await CheckoutPage.isOnOverviewPage()
            expect(overviewPageLoaded).toBe(true)

            const checkoutItemsCount = await CheckoutPage.getCheckoutItemsCount()
            expect(checkoutItemsCount).toBe(1)

            const totalPrice = await CheckoutPage.getTotalPrice()
            expect(totalPrice).toContain('Item total: $')

            stepper.step('8. Click on the "Finish" button')
            await CheckoutPage.clickFinish()

            const completeStatus = await CheckoutPage.verifyCheckoutComplete()
            expect(completeStatus.completeLoaded).toBe(true)
            expect(completeStatus.message).toBe('Thank you for your order!')

            stepper.step('9. Click on the "Back Home" button')
            await CheckoutPage.clickBackHome()

            const inventoryStatusAfterCheckout = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatusAfterCheckout.inventoryLoaded).toBe(true)

            const cartCountAfterCheckout = await InventoryPage.getCartBadgeCount()
            expect(cartCountAfterCheckout).toBe('0')
        })
    })
}) 