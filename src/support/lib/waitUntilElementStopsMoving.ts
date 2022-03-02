export default async (
  elementSelector: string,
  timeout: number = 3000,
) => {
  const el = $(elementSelector);

  el.waitForExist();

  let animating = true;
  let preLoc = el.getLocation();

  while (animating) {
    browser.pause(50);
    const postLoc = el.getLocation();

    if (preLoc.x == postLoc.x
            && preLoc.y == postLoc.y) {
      animating = false;
    }
    const spread = [postLoc.x - preLoc.x, postLoc.y - preLoc.y];

    // console.log(`WaitForAnimation: Spread x: ${spread[0]}; Spread y: ${spread[1]}`)

    preLoc = postLoc;
  }
  // console.log('WaitForAnimation: Done')
  return true;
};
