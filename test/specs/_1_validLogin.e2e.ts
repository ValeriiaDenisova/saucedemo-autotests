import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Login', () => {
    describe('Test Case #1: Valid Login', () => {
        it('should login with valid credentials and redirect to inventory page', async () => {

            stepper.step('1. Enter valid login into "Login" field')
            stepper.step('2. Enter valid password into "Password" field')
            stepper.step('3. Click on the "Login" button')
            await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)

            const inventoryStatus = await InventoryPage.verifyInventoryPageLoaded()
            
            expect(inventoryStatus.inventoryLoaded).toBe(true)
            expect(inventoryStatus.productsCount).toBeGreaterThan(0)
            expect(inventoryStatus.cartDisplayed).toBe(true)

            const productsDisplayed = await InventoryPage.areProductsDisplayed()
            expect(productsDisplayed).toBe(true)
        })
    })
}) 