import LoginPage from "../../pageobjects/login.page";

export async function baseTestSetup() {
    await LoginPage.open()
}