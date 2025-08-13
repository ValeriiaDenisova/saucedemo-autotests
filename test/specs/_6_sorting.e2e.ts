import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import { testUsers } from '../config/testUsers'
import { baseTestSetup } from './baseTest/baseTestSetup'

describe('Test Case #6: Sorting', () => {
    beforeEach(async () => {
        await baseTestSetup()
        await LoginPage.login(testUsers.validUser.username, testUsers.validUser.password)
        await InventoryPage.verifyInventoryPageLoaded()
    })

    const sortingTestCases = [
        {
            name: 'Price (low to high)',
            option: 'lohi' as const,
            testFunction: async () => {
                const prices = await InventoryPage.getProductPrices()
                const sorted = [...prices].sort((a, b) => a - b)
                expect(prices).toEqual(sorted)
            }
        },
        {
            name: 'Price (high to low)',
            option: 'hilo' as const,
            testFunction: async () => {
                const prices = await InventoryPage.getProductPrices()
                const sorted = [...prices].sort((a, b) => b - a)
                expect(prices).toEqual(sorted)
            }
        },
        {
            name: 'Name (A to Z)',
            option: 'az' as const,
            testFunction: async () => {
                const names = await InventoryPage.getProductNames()
                const sorted = [...names].sort()
                expect(names).toEqual(sorted)
            }
        },
        {
            name: 'Name (Z to A)',
            option: 'za' as const,
            testFunction: async () => {
                const names = await InventoryPage.getProductNames()
                const sorted = [...names].sort().reverse()
                expect(names).toEqual(sorted)
            }
        }
    ]

    sortingTestCases.forEach(({ name, option, testFunction }) => {
        it(`should sort products by ${name}`, async () => {
            await InventoryPage.selectSortOption(option)
            await testFunction()
        })
    })
}) 