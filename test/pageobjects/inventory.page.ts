import { $, $$ } from '@wdio/globals'
import Page from './page';

class InventoryPage extends Page {
    public get inventoryContainer () {
        return $('.inventory_container');
    }

    public get products () {
        return $$('.inventory_item');
    }

    public get shoppingCart () {
        return $('.shopping_cart_link');
    }

    public get shoppingCartBadge () {
        return $('.shopping_cart_badge');
    }

    public get burgerMenu () {
        return $('#react-burger-menu-btn');
    }

    public get logoutLink () {
        return $('#logout_sidebar_link');
    }

    public get menuItems () {
        return $$('.bm-item-list a');
    }

    public get menuContainer () {
        return $('.bm-menu');
    }

    public get addToCartButtons () {
        return $$('.btn_inventory');
    }

    public get cartBadgeCount () {
        return $('.shopping_cart_badge');
    }

    public get sortDropdown () {
        return $('.product_sort_container');
    }

    public get productPrices () {
        return $$('.inventory_item_price');
    }

    public get productNames () {
        return $$('.inventory_item_name');
    }

    public async isOnInventoryPage () {
        return await this.inventoryContainer.isDisplayed();
    }

    public async getProductCount () {
        const products = await this.products;
        return products.length;
    }

    public async isShoppingCartDisplayed () {
        return await this.shoppingCart.isDisplayed();
    }

    public async areProductsDisplayed () {
        const products = await this.products;
        const count = await products.length;
        return count > 0;
    }

    public async verifyInventoryPageLoaded () {
        await this.inventoryContainer.waitForDisplayed();
        const productCount = await this.getProductCount();
        const cartDisplayed = await this.isShoppingCartDisplayed();
        
        return {
            inventoryLoaded: await this.isOnInventoryPage(),
            productsCount: productCount,
            cartDisplayed: cartDisplayed
        };
    }

    public async openBurgerMenu () {
        await this.burgerMenu.waitForDisplayed();
        await this.burgerMenu.click();
        await this.menuContainer.waitForDisplayed();
    }

    public async getMenuItemsCount () {
        const menuItems = await this.menuItems;
        return menuItems.length;
    }

    public async isMenuExpanded () {
        return await this.menuContainer.isDisplayed();
    }

    public async addFirstProductToCart () {
        const addToCartButtons = await this.addToCartButtons;
        const count = await addToCartButtons.length;
    
        if (count > 0) {
            await addToCartButtons[0].click();
        }
    }

    public async getCartBadgeCount () {
        const badge = await this.cartBadgeCount;
        if (await badge.isDisplayed()) {
            return await badge.getText();
        }
        return '0';
    }

    public async openCart () {
        await this.shoppingCart.click();
    }

    public async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectByAttribute('value', option);
    }

    public async getProductPrices(): Promise<number[]> {
        const priceElements = await this.productPrices;
        const prices = [];
        for (const el of priceElements) {
            const text = await el.getText();
            prices.push(Number(text.replace('$', '')));
        }
        return prices;
    }

    public async getProductNames(): Promise<string[]> {
        const nameElements = await this.productNames;
        const names = [];
        for (const el of nameElements) {
            names.push(await el.getText());
        }
        return names;
    }

    public async logout () {
        await this.logoutLink.click();
    }
}

export default new InventoryPage(); 