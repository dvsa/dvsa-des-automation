import Page from '../base/page';
import keys from 'webdriverio/build/commands/browser/keys';

class TestCentreJournalPageObject extends Page {

  pressReturn (){
    driver.pressKeyCode(13);

  }

}

export default new TestCentreJournalPageObject();
