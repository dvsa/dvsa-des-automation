export default async(
    loadingtext: string
) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 10000;
    const elementSelector = `//*[contains(text(), "${loadingtext}")]`;

    const contexts: Array<any> = await driver.getContexts();
    try {
        console.info("checking for loading spinner to exist")
        const contexts: Array<any> = driver.getContexts();
        await $(elementSelector).waitForExist({
            timeout: ms,
            reverse: false,
            interval: 100
        });
        console.info("checking for loading spinner to display")
        await $(elementSelector).waitForDisplayed({
            timeout: ms,
            reverse: false,
            interval: 100
        });

        console.info("checking for loading spinner to disappear")
        await $(elementSelector).waitForDisplayed({
            timeout: ms,
            reverse: true,
            interval: 100
        });
    } catch (error) {

    }
};
