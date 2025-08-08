import { $, $$ } from '@wdio/globals'
import Page from './page';

class CheckoutPage extends Page {
    public get checkoutContainer () {
        return $('.checkout_info');
    }

    public get firstNameField () {
        return $('#first-name');
    }

    public get lastNameField () {
        return $('#last-name');
    }

    public get postalCodeField () {
        return $('#postal-code');
    }

    public get continueButton () {
        return $('#continue');
    }

    public get cancelButton () {
        return $('#cancel');
    }

    public get errorMessage () {
        return $('[data-test="error"]');
    }

    public async getErrorMessage () {
        const errorElement = await this.errorMessage;
        if (await errorElement.isDisplayed()) {
            return await errorElement.getText();
        }
        return '';
    }

    public get overviewContainer () {
        return $('.cart_list');
    }

    public get finishButton () {
        return $('#finish');
    }

    public get backHomeButton () {
        return $('#back-to-products');
    }

    public get completeMessage () {
        return $('.complete-header');
    }

    public get totalPrice () {
        return $('.summary_subtotal_label');
    }

    public get checkoutItems () {
        return $$('.cart_item');
    }

    public async isOnCheckoutPage () {
        return await this.checkoutContainer.isDisplayed();
    }

    public async fillCheckoutForm (firstName: string, lastName: string, postalCode: string) {
        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);
        await this.postalCodeField.setValue(postalCode);
    }

    public async clickContinue () {
        await this.continueButton.click();
    }

    public async isOnOverviewPage () {
        return await this.overviewContainer.isDisplayed();
    }

    public async getTotalPrice () {
        const totalText = await this.totalPrice.getText();
        return totalText;
    }

    public async getCheckoutItemsCount () {
        const items = await this.checkoutItems;
        return items.length;
    }

    public async clickFinish () {
        await this.finishButton.click();
    }

    public async isOnCompletePage () {
        return await this.completeMessage.isDisplayed();
    }

    public async getCompleteMessage () {
        return await this.completeMessage.getText();
    }

    public async clickBackHome () {
        await this.backHomeButton.click();
    }

    public async verifyCheckoutComplete () {
        await this.completeMessage.waitForDisplayed();
        const message = await this.getCompleteMessage();
        
        return {
            completeLoaded: await this.isOnCompletePage(),
            message: message
        };
    }
}

export default new CheckoutPage(); 