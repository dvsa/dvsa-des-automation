import Page from '../base/page'
import clickElement from '../../support/common/action/clickElement'
import clickElementWithText from '../../support/common/action/clickElementWithText'
import setInputField from '../../support/common/action/setInputField'


class DefectsPageObject extends Page {

    get pageTitle() { return this.getSelector('smc-defects::page-title') }
    get categoryDropdownSelect() { return 'smc-defects::categoryButtonFinder' }
    get sectionDropdownSelect() { return 'smc-defects::sectionButtonFinder' }
    get descriptionDropwdownSelect() { return 'smc-defects::descriptionButtonFinder' }
    get subsectionDropwdownSelect() { return 'smc-defects::subSectionButtonFinder' }
    get textDropdownSelect() { return 'smc-defects::textButtonFinder' }
    get severityDescriptionDropwdownSelect() { return 'smc-defects::severityDescriptionButtonFinder' }
    get addDefectsButton() { return 'smc-defects::addDefectButtonFinder' }
    get addSeverityActualAction() { return 'smc-defect-details::actual-action-drop-button' }


     addDefectToVehicle(defectType:string,data: any) {
        const {  category, section, subSection, description,text,severityOfDescription } = data;
        
        console.info(`Filling  ${defectType} Defect details for vehicle`);

        clickElement('click', 'selector', "#defectCategoryDropdown");
        clickElementWithText('click', 'button', category)

        clickElement('click', 'selector', "#defectSectionDropdown");
        clickElementWithText('click', 'button', section)

        clickElement('click', 'selector', "#defectSubSectionDropdown");
        clickElementWithText('click', 'button', subSection)

        clickElement('click', 'selector', "#defectDescDropdown");
        clickElementWithText('click', 'button', description)

        clickElement('click', 'selector', "#defectTextDropdown");
        clickElementWithText('click', 'button', text)

        clickElement('click', 'selector', "#defectSeverityDescDropdown");
        clickElementWithText('click', 'button', severityOfDescription)

        clickElement('click', 'selector', "#addDefectsButton");
        clickElement('click', 'selector', "#actualActionDropdown");

        clickElementWithText('click', 'button', defectType)

        // When changing defect type you may get a nre field for 'Deviation'
        if ($("#deviationTitle").isDisplayed()===true){
            console.log('Deviation field is displayed. Filling in deviation reason ...')
            setInputField('set',"testing" , '#deviationResult input')
        }

        clickElement('click', 'selector', "#defectDetailSaveButton");

    }
    
     addDefectToTrailer(defectType:string,data: any) {
        const {  category, section, subSection, description,text,severityOfDescription } = data;
        
        console.info(`Filling  ${defectType} Defect details for Trailer`);

        clickElement('click', 'selector', "#defectCategoryDropdown");
        clickElementWithText('click', 'button', category)

        clickElement('click', 'selector', "#defectSectionDropdown");
        clickElementWithText('click', 'button', section)

        clickElement('click', 'selector', "#defectSubSectionDropdown");
        clickElementWithText('click', 'button', subSection)

        clickElement('click', 'selector', "#defectDescDropdown");
        clickElementWithText('click', 'button', description)

        clickElement('click', 'selector', "#defectTextDropdown");
        clickElementWithText('click', 'button', text)

        clickElement('click', 'selector', "#defectSeverityDescDropdown");
        clickElementWithText('click', 'button', severityOfDescription)

        clickElement('click', 'selector', "#addDefectsButton");
        clickElement('click', 'selector', "#actualActionDropdown");

        clickElementWithText('click', 'button', defectType)

        // When changing defect type you may get a nre field for 'Deviation'
        if ($("#deviationTitle").isDisplayed()===true){
            console.log('Deviation field is displayed. Filling in deviation reason ...')
            setInputField('set',"testing" , '#deviationResult input')
        }

        clickElement('click', 'selector', "#defectDetailSaveButton");

    }

}

export default new DefectsPageObject()