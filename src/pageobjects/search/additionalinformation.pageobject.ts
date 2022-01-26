import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'
import setInputFieldWithRandom from '../../support/common/action/setInputFieldWithRandom'
import Page from '../base/page'

class AdditionalInformationPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-additional-information::page-title') }
    get inspectionLevelDropDown() { return ('smc-additional-information::inspection-level-drop-button') }
    get specialReturnDropdown() { return ('smc-additional-information::special-return-drop-button') }
    get retainSpecialReturnYes() { return ('smc-additional-information::retain-special-return-yes-button') }
    get retainSpecialReturnNo() { return ('smc-additional-information::retain-special-return-no-button') }
    get specialReturnDetailsDropdown() { return ('smc-additional-information::special-return-details-drop-button') }
    get additionalTextButton() { return ('smc-additional-information::additional-text-button') }
    get additionalTextTypeButton() { return ('smc-additional-information::additional-text-type-button') }
    get additionalTextArea() { return ('smc-additional-information::additional-text') }
    get additionalTextSaveButton() { return ('smc-additional-information::additional-text-save-data-button') }
    get digitalActualDriver() { return ('smc-additional-information::digital-actual-driver') }
    get digitalOtherDriver() { return ('smc-additional-information::digital-other-driver') }
    get analogueActualDriver() { return ('smc-additional-information::analogue-actual-driver') }
    get analogueOtherDriver() { return ('smc-additional-information::analogue-other-driver') }
    get saveDataButton() { return ('smc-additional-information::save-data-button') }
    get speedLimitedCheckToggle() { return ('smc-additional-information::speed-limited-check-toggle') }
    get addInfoDefectProsecutionDropdown() { return ('smc-additional-information::add-info-defect-prosecution-drop-button') }


    public fillMandatoryAdditionalInformationFromDataTable(data: any) {
        const { inspectionLevel, speedLimitedCheckToggle, defectProsecution } = data;

        console.info('Filling in mandatory Additional Information');

        if(inspectionLevel !== 'FULL'){
        clickElement('click', 'selector', this.inspectionLevelDropDown);
        clickElementWithText('click', 'element', inspectionLevel);
        }

        if(speedLimitedCheckToggle === 'Yes'){
            clickElement('click', 'selector', this.speedLimitedCheckToggle);
        }

        if(defectProsecution !== 'NO'){
        clickElement('click', 'selector', this.addInfoDefectProsecutionDropdown);
        clickElementWithText('click', 'element', defectProsecution);
        }

        clickElement('click', 'selector', this.saveDataButton);
    }

    public fillAllAdditionalInformationFromDataTable(data: any) {
        const { inspectionLevel, speedLimitedCheckToggle, defectProsecution, specialReturn, specialReturnDetail, returnSpecialReturnFutureEncounter, additionalTextType, additionalText, digitalActualDriver, digitalOtherDriver, analogueActualDriver, analogueOtherDriver } = data;

        console.info('Filling in all Additional Information');

        if(inspectionLevel !== 'FULL'){
        clickElement('click', 'selector', this.inspectionLevelDropDown);
        clickElementWithText('click', 'element', inspectionLevel);
        }

        if(speedLimitedCheckToggle === 'Yes'){
            clickElement('click', 'selector', this.speedLimitedCheckToggle);
        }

        if(defectProsecution !== 'NO'){
        clickElement('click', 'selector', this.addInfoDefectProsecutionDropdown);
        clickElementWithText('click', 'element', defectProsecution);
        }

        clickElement('click', 'selector', this.specialReturnDropdown);
        clickElementWithText('click', 'element', specialReturn);

        clickElement('click', 'selector', this.specialReturnDetailsDropdown);
        clickElementWithText('click', 'element', specialReturnDetail);
        clickElementWithText('click', 'element', 'OK');

        if(returnSpecialReturnFutureEncounter === 'Yes'){
            clickElement('click', 'selector', this.retainSpecialReturnYes);
        }else{
            clickElement('click', 'selector', this.retainSpecialReturnYes);
        }
       
        clickElement('click', 'selector', this.additionalTextButton);
        clickElement('click', 'selector', this.additionalTextTypeButton);
        clickElementWithText('click', 'element', additionalTextType);

        clickElement('click', 'selector', this.additionalTextArea);

        if(additionalText === 'Random' || additionalText === 'random'){
            setInputFieldWithRandom('set', 120, this.additionalTextArea)
        }else{
            setInputField('set', additionalText, this.additionalTextArea);
        }

        clickElement('click', 'selector', this.additionalTextSaveButton);


        if(digitalActualDriver !== 'NA'){
            clickElement('click', 'selector', '#addInfoDigitalActualDriverInput');
            setInputField('set', digitalActualDriver, this.digitalActualDriver)
        }

        if(digitalOtherDriver !== 'NA'){
            clickElement('click', 'selector', '#addInfoDigitalOtherDriverInput');
            setInputField('set', digitalOtherDriver, this.digitalOtherDriver)
        }

        if(analogueActualDriver !== 'NA'){
            clickElement('click', 'selector', '#addInfoAnalogueActualDriverInput');
            setInputField('set', analogueActualDriver, this.analogueActualDriver)
        }

        if(analogueOtherDriver !== 'NA'){
            clickElement('click', 'selector', '#addInfoAnalogueOtherDriverInput');
            setInputField('set', analogueOtherDriver, this.analogueOtherDriver)
        }

        clickElement('click', 'selector', this.saveDataButton);
    }
}

export default new AdditionalInformationPageObject()