export default (
    loadingtext: string
) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 2000;
    const elementSelector = `//*[contains(text(), "${loadingtext}")]`;

    if ($(elementSelector).isExisting()) {
        // Wait for the loading indicator to hide
        $(elementSelector).waitForDisplayed({
            timeout: ms,
            reverse: true,
            interval: 100
        });
    }

};
