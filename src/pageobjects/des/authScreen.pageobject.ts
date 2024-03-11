import Page from '../base/page';

class AuthPageObject extends Page {
  async completeAuthPage(): Promise<void> {
    await browser.pause(500);
    await driver.touchId(true);
  }
}

export default new AuthPageObject();
