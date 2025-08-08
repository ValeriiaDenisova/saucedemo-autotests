import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup, stepper } from './baseTest/baseTestSetup'

describe('Test Case Objective: Cart', () => {
    describe('Test Case #6: Sorting', () => {
    beforeEach(async () => {
        await baseTestSetup()
        await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)
        await InventoryPage.verifyInventoryPageLoaded()
    });

    it('should sort products by Price (low to high)', async () => {
        stepper.step('1. Select "Price (low to high)" option from the "Sort" dropdown')
        await InventoryPage.selectSortOption('lohi')
        const prices = await InventoryPage.getProductPrices()
        const sorted = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sorted)
    });

    it('should sort products by Price (high to low)', async () => {
        stepper.step('2. Select "Price (high to low)" option from the "Sort" dropdown')
        await InventoryPage.selectSortOption('hilo')
        const prices = await InventoryPage.getProductPrices()
        const sorted = [...prices].sort((a, b) => b - a)
        expect(prices).toEqual(sorted)
    });

    it('should sort products by Name (A to Z)', async () => {
        stepper.step('3. Select "Name (A to Z)" option from the "Sort" dropdown')
        await InventoryPage.selectSortOption('az')
        const names = await InventoryPage.getProductNames()
        const sorted = [...names].sort()
        expect(names).toEqual(sorted)
    });

    it('should sort products by Name (Z to A)', async () => {
        stepper.step('4. Select "Name (Z to A)" option from the "Sort" dropdown')
        await InventoryPage.selectSortOption('za')
        const names = await InventoryPage.getProductNames()
        const sorted = [...names].sort().reverse()
        expect(names).toEqual(sorted)
        });
    });
}); 