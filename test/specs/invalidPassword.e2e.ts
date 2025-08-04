import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'

describe('Sauce Demo - Login Tests', () => {
    describe('Test Case #2: Login with invalid password', () => {
        it('should display error when login with invalid password', async () => {
            await LoginPage.open()
            await LoginPage.login('standard_user', 'wrong_password')

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