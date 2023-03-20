"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clickElement_1 = __importDefault(require("@shared-boilerplate/support/action/clickElement"));
const clickElementWithText_1 = __importDefault(require("@shared-custom/support/action/clickElementWithText"));
const credentials = __importStar(require("../../../creds/credentials.json"));
const page_1 = __importDefault(require("../base/page"));
class LoginMobilePageObject extends page_1.default {
    msSignInContextTitle = 'Sign in to your account';
    msSignOutContextTitle = 'Sign out';
    async waitForExist(element) {
        const { selector } = element;
        await element.waitForExist({
            timeout: 15000,
            reverse: false,
            timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
        });
    }
    async waitForExistAndClickable(element) {
        const { selector } = element;
        await element.waitForDisplayed({
            timeout: 15000,
            reverse: false,
            timeoutMsg: `Element with selector: ${selector} did not exist on page within 15 seconds`,
        });
        await element.waitForClickable({
            timeout: 15000,
            reverse: false,
            timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
        });
    }
    async waitForClickable(element) {
        const { selector } = element;
        await element.waitForClickable({
            timeout: 15000,
            reverse: false,
            timeoutMsg: `Element with selector: ${selector} was not clickable on page within 15 seconds`,
        });
    }
    async login(typeOfUser) {
        // pause on app launch
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(5000);
        const [user] = credentials.Environment.Dev[typeOfUser];
        const burgerMenu = await $('ion-menu-button');
        const loginBackdrop = await $('.backdrop-no-scroll');
        const loginError = await $('#loginSorry');
        // check if already logged in on app launch.
        await Promise.race([
            this.waitForExist(burgerMenu),
            this.waitForExist(loginBackdrop),
            this.waitForExist(loginError),
        ]);
        if (await loginError.isDisplayed()) {
            throw new Error('log in error');
        }
        if (await burgerMenu.isDisplayed()) {
            await this.logout();
        }
        await this.clickNativeButtonWithText('Continue');
        // wait for log in page
        await this.waitForContextToExist(this.msSignInContextTitle);
        const signInContext = await this.getContextByTitle(this.msSignInContextTitle);
        // @ts-ignore
        await driver.switchContext(signInContext.id);
        // click 'use another account if clickable
        const continueButton = await $('input[value="Continue"]');
        const useAnotherAccount = await $('#otherTileText');
        const emailTextBox = await $('#i0116');
        // resolve as soo as either 'use another account' or email input available
        await Promise.race([
            this.waitForExistAndClickable(continueButton),
            this.waitForExistAndClickable(useAnotherAccount),
            this.waitForExistAndClickable(emailTextBox),
        ]);
        // click use another account if it is available
        const useAnotherAccountButtonPresent = await useAnotherAccount.isExisting();
        if (useAnotherAccountButtonPresent) {
            await this.clickElement(useAnotherAccount);
        }
        // set email
        await this.waitForExistAndClickable(emailTextBox);
        await this.clickElement(emailTextBox);
        await emailTextBox.addValue(user.UserPrincipalName);
        // click next button
        const nextButton = await $('#idSIButton9');
        await this.waitForExistAndClickable(nextButton);
        await this.clickElement(nextButton);
        // click password button
        const passwordBox = await $('#passwordInput');
        await this.waitForExistAndClickable(passwordBox);
        await this.clickElement(passwordBox);
        await passwordBox.setValue(user.Password);
        // click sign in
        const signInButton = await $('#submitButton');
        await this.waitForExistAndClickable(signInButton);
        await this.clickElement(signInButton);
        // click continue button
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(5000);
        await this.waitForClickable(continueButton);
        await this.clickElement(continueButton);
        // switch to Search app context
        await this.switchToDESContext();
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(3000);
    }
    async logout() {
        console.log('>>>>>>>>>>>>>> LOGGING OUT <<<<<<<<<<<<<');
        await this.switchToDESContext();
        await (0, clickElement_1.default)('click', 'selector', '//ion-menu-button');
        await (0, clickElement_1.default)('click', 'selector', '#logout');
        await (0, clickElementWithText_1.default)('click', 'button', 'Logout');
        await this.clickNativeButtonWithText('Continue');
        await this.waitForContextToExist(this.msSignOutContextTitle);
        const signOutContext = await this.getContextByTitle(this.msSignOutContextTitle);
        if (!signOutContext) {
            throw new Error('Sign out context is undefined');
        }
        await driver.switchContext(signOutContext.id);
        const logoutTile = await $('small=Signed in');
        await this.waitForExistAndClickable(logoutTile);
        await this.clickElement(logoutTile);
        await this.clickNativeButtonWithText('Cancel');
        console.log('>>>>>>>>>SIGNED OUT>>>>>>>>>');
        await this.switchToDESContext();
        const signInAgainButton = await $('span=Sign in');
        await this.clickElement(signInAgainButton);
    }
}
exports.default = new LoginMobilePageObject();
