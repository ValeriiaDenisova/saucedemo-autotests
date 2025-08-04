import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {
    public get inputUsername () {
        return $('#user-name');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('#login-button');
    }

    public get errorMessage () {
        return $('[data-test="error"]');
    }

    public get errorIcon () {
        return $('.error_icon');
    }

    public get inputErrorClass () {
        return $('.input_error');
    }

    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public async isErrorDisplayed () {
        return await this.errorMessage.isDisplayed();
    }

    public async getErrorMessage () {
        return await this.errorMessage.getText();
    }

    public async areErrorIconsDisplayed () {
        return await this.errorIcon.isDisplayed();
    }

    public async areInputsHighlightedRed () {
        const usernameInput = await this.inputUsername.getAttribute('class');
        const passwordInput = await this.inputPassword.getAttribute('class');
        return usernameInput.includes('error') && passwordInput.includes('error');
    }

    public open () {
        return super.open('');
    }
}

export default new LoginPage();
