import Page from '../base/page'
import clickElement from '../../support/common/action/clickElement'
import ionicWaitforSideMenu from '../../support/ionic/ionic-action/ionic-waitforSideMenu'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import waitForSpinningWheel from '../../support/common/action/waitForSpinningWheel'

class SideMenuPageObject extends Page {

    get sidemenubutton() { return this.getStrategy('smc-sidemenu::sidemenubutton') }
    get sidemenutitle() { return this.getStrategy('smc-sidemenu::menutitle') }
    get logoutButton() { return this.getSelector('smc-sidemenu::logout') }

    logout() {
        waitForSpinningWheel("Refreshing databases")

        if ($(this.sidemenubutton).isExisting()) {

            clickElement('click', 'selector', this.sidemenubutton);
            ionicWaitforSideMenu(this.sidemenutitle, 'show');

            this.logoutButton.waitForExist();
            this.logoutButton.click();
            // //@ts-ignore
            // $(this.logoutButton).waitAndClick();

            clickElementWithText('click', 'button', 'YES');
        }
    }
}

export default new SideMenuPageObject()