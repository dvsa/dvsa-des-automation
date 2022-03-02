export default async (
    elementSelector: string,
    timeout: number = 3000
) => {
    let el = $(elementSelector);

    el.waitForExist();

    let animating = true;
    let preLoc = el.getLocation();

    while (animating) {
        browser.pause(50);
        let postLoc = el.getLocation();

        if (preLoc.x == postLoc.x &&
            preLoc.y == postLoc.y) {
            animating = false;
        }
        let spread = [postLoc.x - preLoc.x, postLoc.y - preLoc.y]

        preLoc = postLoc;
    }
    return true;
};



