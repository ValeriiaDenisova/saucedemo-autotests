import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Logout', () => {
    describe('Test Case #4: Logout', () => {
        it('should logout successfully and redirect to login page', async () => {
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            expect(inventoryStatus.inventoryLoaded).toBe(true)

            stepper.step('1. Click on the "Burger" menu button')
            await InventoryPage.openBurgerMenu()

            const menuExpanded = await InventoryPage.isMenuExpanded()
            expect(menuExpanded).toBe(true)

            const menuItemsCount = await InventoryPage.getMenuItemsCount()
            expect(menuItemsCount).toBe(4)

            stepper.step('2. Click on the "Logout" button')
            await InventoryPage.logout()

            const usernameValue = await LoginPage.inputUsername.getValue()
            const passwordValue = await LoginPage.inputPassword.getValue()

            expect(usernameValue).toBe('')
            expect(passwordValue).toBe('')
        })
    })
}) 