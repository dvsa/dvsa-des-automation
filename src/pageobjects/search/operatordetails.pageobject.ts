import clickElement from '../../support/common/action/clickElement';
import clickElementWithText from '../../support/common/action/clickElementWithText';
import setInputField from '../../support/common/action/setInputField';
import Page from '../base/page'

class OperatorDetailsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-operator-details::page-title') }
    get nationalityDrop() { return ('smc-operator-details::nationality-drop-button') }
    get name() { return ('smc-operator-details::name') }
    get address1() { return ('smc-operator-details::address-line1') }
    get posttown() { return ('smc-operator-details::posttown') }
    get country() { return ('smc-operator-details::country-drop-button') }
    get saveData() { return ('smc-operator-details::save-data-button') }

    public fillOperatorDetailsFromDataTable(data: any) {
        const { nationality, name, address1, posttown, country } = data;

        console.info('Filling in mandatory operator details');

        if (nationality !== 'GB') {
            clickElement('click', 'selector', this.nationalityDrop);
            clickElementWithText('click', 'element', nationality);
        }

        console.log('country check: ', country)
        if (country !== 'NA') {
            clickElement('click', 'selector', '#operatorDetailsCountrySelect button');
            clickElementWithText('click', 'element', country);
        }

        clickElement('click', 'selector', this.name);
        setInputField('set', name, this.name);

        clickElement('click', 'selector', this.address1);
        setInputField('set', address1, this.address1);

        clickElement('click', 'selector', this.posttown);
        setInputField('set', posttown, this.posttown);

        //Saving the data
        clickElement('click', 'selector', this.saveData);
    }
}

export default new OperatorDetailsPageObject()