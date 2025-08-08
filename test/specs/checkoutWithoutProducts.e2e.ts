import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Sauce Demo - Checkout Tests', () => {
    describe('Test Case #9: Checkout without products', () => {
        it('should display error when trying to checkout with empty cart', async () => {
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            const initialCartCount = await InventoryPage.getCartBadgeCount()
            expect(initialCartCount).toBe('0')

            stepper.step('1. Click on the "Cart" button at the top right corner')
            await InventoryPage.openCart()

            const cartStatus = await CartPage.verifyCartPageLoaded()
            expect(cartStatus.cartLoaded).toBe(true)

            const emptyCartStatus = await CartPage.verifyEmptyCart()
            expect(emptyCartStatus.isEmpty).toBe(true)
            expect(emptyCartStatus.itemsCount).toBe(0)

            stepper.step('2. Click on the "Checkout" button')
            await CartPage.checkoutButton.click()

            const currentUrl = await browser.getUrl()
            expect(currentUrl).toContain('/cart.html')

            const CheckoutPage = (await import('../pageobjects/checkout.page')).default
            
            const errorMessage = await CheckoutPage.getErrorMessage()
            expect(errorMessage).toContain('Cart is empty')
        
        })
    })
})

