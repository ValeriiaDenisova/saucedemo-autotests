import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

beforeEach(async () => {
    await baseTestSetup()
})

describe('Test Case Objective: Login', () => {
    describe('Test Case #2: Login with invalid password', () => {
        it('should display error when login with invalid password', async () => {
            stepper.step('1.Enter valid login into "Login" field')
            stepper.step('2. Enter invalid password into "Password" field')
            stepper.step('3. Click on the "Login" button')
            await LoginPage.login(testUsers.invalidPassword.username, testUsers.invalidPassword.password)

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