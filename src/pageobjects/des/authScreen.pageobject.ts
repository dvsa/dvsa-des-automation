import Page from '../base/page';
import keyboardClickLetter from '../../app-actions/des-action/keyboardClickLetter';

class AuthPageObject extends Page {
  async completeAuthPage(): Promise<void> {
    await browser.pause(500);
    await browser.keys('p');
    await keyboardClickLetter('Enter');
  }
}

export default new AuthPageObject();
