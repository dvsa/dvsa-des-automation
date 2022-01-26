import waitFor from "./waitFor";

export default (
    loadingtext: string
) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 2000;
    //const elementSelector = `.loading-content`;
    const elementSelector = `//*[contains(text(), "${loadingtext}")]`;

    const contexts: Array<any> = driver.getContexts();

    // console.log('Available contexts', contexts);

    // if ($(elementSelector).isExisting()) {

    try {
        console.info("checking for loading spinner to exist")
        const contexts: Array<any> = driver.getContexts();

        // console.log('Available contexts', contexts);
        $(elementSelector).waitForExist({
            timeout: ms,
            reverse: false,
            interval: 100
        });
        console.info("checking for loading spinner to display")
        $(elementSelector).waitForDisplayed({
            timeout: ms,
            reverse: false,
            interval: 100
        });

        console.info("checking for loading spinner to disappear")
        $(elementSelector).waitForDisplayed({
            timeout: ms,
            reverse: true,
            interval: 100
        });
    } catch (error) {

    }
};
