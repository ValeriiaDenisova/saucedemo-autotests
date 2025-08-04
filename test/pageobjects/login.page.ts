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

    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public open () {
        return super.open('');
    }
}

export default new LoginPage();
