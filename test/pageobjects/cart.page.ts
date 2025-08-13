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

    public get emptyCartMessage () {
        return $('.removed_cart_item');
    }

    public get errorMessage () {
        return $('[data-test="error"]');
    }

    public get cartQuantity () {
        return $('.cart_quantity');
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

    public async isCartEmpty () {
        const itemsCount = await this.getCartItemsCount();
        return itemsCount === 0;
    }

    public async getEmptyCartMessage () {
        const emptyMessage = await this.emptyCartMessage;
        if (await emptyMessage.isDisplayed()) {
            return await emptyMessage.getText();
        }
        return '';
    }

    public async getErrorMessage () {
        const errorElement = await this.errorMessage;
        if (await errorElement.isDisplayed()) {
            return await errorElement.getText();
        }
        return '';
    }

    public async verifyEmptyCart () {
        const itemsCount = await this.getCartItemsCount();
        const isEmpty = itemsCount === 0;
        
        return {
            isEmpty: isEmpty,
            itemsCount: itemsCount
        };
    }

    public async clickCheckout () {
        await this.checkoutButton.click();
    }

    public async getCurrentUrl () {
        return await browser.getUrl();
    }
}

export default new CartPage(); 