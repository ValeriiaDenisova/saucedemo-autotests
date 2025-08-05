import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Sauce Demo - Login Tests', () => {
    describe('Test Case #3: Login with invalid login', () => {
        it('should display error when login with invalid username', async () => {
            await LoginPage.login(testUsers.invalidUser.username, testUsers.invalidUser.password)

            const errorDisplayed = await LoginPage.isErrorDisplayed()
            expect(errorDisplayed).toBe(true)

            const errorMessage = await LoginPage.getErrorMessage()
            expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service')

            const errorIconsDisplayed = await LoginPage.areErrorIconsDisplayed()
            expect(errorIconsDisplayed).toBe(true)

            const inputsHighlightedRed = await LoginPage.areInputsHighlightedRed()
            expect(inputsHighlightedRed).toBe(true)
        })
    })
}) 