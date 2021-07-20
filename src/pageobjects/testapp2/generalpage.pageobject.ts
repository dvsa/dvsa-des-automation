import Page from '../base/page'

class GeneralPage extends Page {

    get otherPageButton() { return this.getSelector('ionicapp-general::other')}

}

export default new GeneralPage()