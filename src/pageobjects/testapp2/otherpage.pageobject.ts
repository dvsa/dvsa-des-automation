import clickElement from '../../support/common/action/clickElement';
import setInputFieldWithRandom from '../../support/common/action/setInputFieldWithRandom';
import waitForTextToBe from '../../support/lib/waitForTextToBe';
import Page from '../base/page'
import generalpagePageobject from './generalpage.pageobject';

class OtherPage extends Page {


    // This will get the actual element
    get newTextBox() { return this.getSelector('ionicapp-otherpage::newtextbox') }
    get pageTitle() { return this.getSelector('ionicapp-otherpage::newtextbox') }
   
    // This will get the selector from the global elements
    get pageTitleRaw() { return 'ionicapp-otherpage::newtextbox' }

    navigateToThePage() {

        // When I click on the button "ionicapp-general::other"
        clickElement("click", 'selector', "ionicapp-general::other")

        //  Then I wait for the text to be "Other Stuff" in "ionicapp-general::pagetitle"
        waitForTextToBe("Other Stuff", "ionicapp-general::pagetitle" );
        // waitForTextToBe("Other Stuff", "//ion-tabs//*[starts-with(name(), 'app-tab') and normalize-space(@class)='ion-page' and not(contains(@class,'ion-page-hidden'))]//ion-title" );
        
        // Then I add 10 random characters to the inputfield "#newTextBox input"
        // setInputFieldWithRandom('add',20,'#newTextBox input');

        for ( let x = 1 ; x < 20 ; x++){
            setInputFieldWithRandom('add',2,'#newTextBox input');
        }
        clickElement("click", 'selector', "ionicapp-general::home")

        console.log('Navigate Here');
    }

}

export default new OtherPage()