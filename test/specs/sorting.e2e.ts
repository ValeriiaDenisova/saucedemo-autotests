import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testData } from '../config/testData'
import { baseTestSetup } from './baseTest/baseTestSetup'

describe('Sauce Demo - Product Sorting', () => {
    beforeEach(async () => {
        await baseTestSetup()
        await LoginPage.login(testData.validUser.username, testData.validUser.password)
        await InventoryPage.verifyInventoryPageLoaded()
    });

    it('should sort products by Price (low to high)', async () => {
        await InventoryPage.selectSortOption('lohi')
        const prices = await InventoryPage.getProductPrices()
        const sorted = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sorted)
    });

    it('should sort products by Price (high to low)', async () => {
        await InventoryPage.selectSortOption('hilo')
        const prices = await InventoryPage.getProductPrices()
        const sorted = [...prices].sort((a, b) => b - a)
        expect(prices).toEqual(sorted)
    });

    it('should sort products by Name (A to Z)', async () => {
        await InventoryPage.selectSortOption('az')
        const names = await InventoryPage.getProductNames()
        const sorted = [...names].sort()
        expect(names).toEqual(sorted)
    });

    it('should sort products by Name (Z to A)', async () => {
        await InventoryPage.selectSortOption('za')
        const names = await InventoryPage.getProductNames()
        const sorted = [...names].sort().reverse()
        expect(names).toEqual(sorted)
    });
}); 