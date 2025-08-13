import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'

import { testUsers } from '../config/testUsers'
import { baseTestSetup } from './baseTest/baseTestSetup'

describe('Test Case #9: Checkout without products', () => {
    beforeEach(async () => {
        await baseTestSetup()
    })

    it('should display error when trying to checkout with empty cart', async () => {
        await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

        const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
        expect(inventoryStatus.inventoryLoaded).toBe(true)

        const initialCartCount = await InventoryPage.getCartBadgeCount()
        expect(initialCartCount).toBe('0')

        await InventoryPage.openCart()

        const cartStatus = await CartPage.verifyCartPageLoaded()
        expect(cartStatus.cartLoaded).toBe(true)

        const emptyCartStatus = await CartPage.verifyEmptyCart()
        expect(emptyCartStatus.isEmpty).toBe(true)
        expect(emptyCartStatus.itemsCount).toBe(0)

        await CartPage.clickCheckout()

        const currentUrl = await CartPage.getCurrentUrl()
        expect(currentUrl).toContain('/cart.html')
        
        const errorMessage = await CheckoutPage.getErrorMessage()
        expect(errorMessage).toContain('Cart is empty')
    
    })
})

