const DEFAULT_TIMEOUT = 3000;

class CustomCommand {
    private static alreadyAdded = false;
    static addCommands() {
        if (!this.alreadyAdded) {
            console.log('############### Adding Custom Commands ######################');
            browser.addCommand("waitAndClick", function (this: WebdriverIO.Element) {
                this.waitForDisplayed({ timeout: DEFAULT_TIMEOUT })
                this.click()
            }, true)

            this.alreadyAdded = true;
        }
    }
}

export default CustomCommand;