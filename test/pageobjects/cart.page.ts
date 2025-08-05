import { $, $$ } from '@wdio/globals'
import Page from './page';

class CartPage extends Page {
    public get cartContainer () {
        return $('.cart_list');
    }

    public get cartItems () {
        return $$('.cart_item');
    }

    public get cartTitle () {
        return $('.title');
    }

    public get checkoutButton () {
        return $('#checkout');
    }

    public get continueShoppingButton () {
        return $('#continue-shopping');
    }

    public get removeButtons () {
        return $$('.btn_secondary');
    }

    public async isOnCartPage () {
        return await this.cartContainer.isDisplayed();
    }

    public async getCartItemsCount () {
        const cartItems = await this.cartItems;
        return cartItems.length;
    }

    public async getCartTitle () {
        return await this.cartTitle.getText();
    }

    public async verifyCartPageLoaded () {
        await this.cartContainer.waitForDisplayed();
        const title = await this.getCartTitle();
        const itemsCount = await this.getCartItemsCount();
        
        return {
            cartLoaded: await this.isOnCartPage(),
            title: title,
            itemsCount: itemsCount
        };
    }
}

export default new CartPage(); 