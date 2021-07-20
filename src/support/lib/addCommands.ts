const DEFAULT_TIMEOUT = 3000;

class CustomCommand {
    private static alreadyAdded = false;
    static addCommands() {
        if (!this.alreadyAdded) {
            console.log('############### Adding Custom Commands ######################');

            // browser.addCommand('waitAndSetValue', (el: WebdriverIO.Element, text: string) => {
            //     el.waitForDisplayed({ timeout: DEFAULT_TIMEOUT });
            //     el.setValue(text);
            // }, true);

            // browser.addCommand('waitForAnimation', function (el: WebdriverIO.Element) {
            //     el.waitForExist({ timeout: 15000 });
            //     var animating = true;

            //     var preLoc = el.getLocation();

            //     while (animating) {
            //         browser.pause(150);
            //         let postLoc = el.getLocation();

            //         if (preLoc.x == postLoc.x &&
            //             preLoc.y == postLoc.y) {
            //             animating = false;
            //         }
            //         var spread = [postLoc.x - preLoc.x, postLoc.y - preLoc.y]
            //         // console.log(`WaitForAnimation: Spread x: ${spread[0]}; Spread y: ${spread[1]}`)

            //         preLoc = postLoc;
            //     }
            //     // console.log('WaitForAnimation: Done')
            //     return true;

            // }, false);

            browser.addCommand("waitAndClick", function (this: WebdriverIO.Element) {
                this.waitForDisplayed({ timeout: DEFAULT_TIMEOUT })
                this.click()
            }, true)

            this.alreadyAdded = true;
        }
    }
}

export default CustomCommand;