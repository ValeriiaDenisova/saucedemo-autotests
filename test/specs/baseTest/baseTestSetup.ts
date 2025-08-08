import LoginPage from "../../pageobjects/login.page";
import { TestCaseStepper } from "../../utils/testCaseStepper";

export async function baseTestSetup() {
    await LoginPage.open()
}

// Create and export stepper instance for all tests
export const stepper = new TestCaseStepper()