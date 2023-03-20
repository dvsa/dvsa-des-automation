"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const element_reference_helper_1 = require("@shared-helpers/element-reference-helper");
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
const setInputField_1 = __importDefault(require("../../../shared/boilerplate/support/action/setInputField"));
class OfficePageObject extends page_1.default {
    get routeNumberInput() { return ('des-office-page::route-number-input'); }
    get satNavButton() { return ('des-office-page::independant-driving-sat-nav-input'); }
    get trafficSignsButton() { return ('des-office-page::independant-driving-traffice-signs-input'); }
    get diagramButton() { return ('des-office-page::independant-driving-diagram-input'); }
    get candidateLikenessYes() { return ('des-office-page::candidate-true-likeness-yes-input'); }
    get candidateLikenessNo() { return ('des-office-page::candidate-true-likeness-no-input'); }
    get distinguishingFeatureInput() { return ('des-office-page::desc-of-candidate-input'); }
    get photoCardButton() { return ('des-office-page::identification-photo-card-input'); }
    get passportButton() { return ('des-office-page::identification-passport-input'); }
    get showMeQuestionSelector() { return ('des-office-page::show-me-question-selector'); }
    get weatherConditionsSelector() { return ('des-office-page::weather-conditions-selector'); }
    get eyesightFaultComment() { return ('des-office-page::serious-fault-comment-eyesight-input'); }
    get seriousFaultComment() { return ('des-office-page::serious-comment-controls-accelerator'); }
    get genericFaultCommentBox() { return ('des-office-page::general-fault-comment-input'); }
    get assessmentReport() { return ('des-office-page::assessment-report'); }
    get circuitLeft() { return ('des-office-page::circuit-left-input'); }
    get circuitRight() { return ('des-office-page::circuit-right-input'); }
    get testConductedCarBikeInput() { return ('des-office-page::test-conducted-car-bike-input'); }
    get testConductedBikeBikeInput() { return ('des-office-page::test-conducted-bike-bike-input'); }
    get firstShowMeQuestionSelect() { return ('des-office-page::adi2-first-show-me-question'); }
    get secondShowMeQuestionSelect() { return ('des-office-page::adi2-second-show-me-question'); }
    get additionalInformationTextArea() { return ('des-office-page::additional-information-textarea'); }
    async completeOfficePage(data) {
        const { routeNumber, distinguishingFeatures, showMeQuestion, weatherCondition, firstShowMeQuestion, secondShowMeQuestion, additionalInformation, } = data;
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'activitycode':
                        // @TODO: Code will need to be inputted for Unsuccessful and Terminated tests
                        break;
                    case 'routenumber':
                        await (0, setInputField_1.default)('add', routeNumber, this.routeNumberInput);
                        break;
                    case 'independentdriving':
                        await this.setIndependentDriving(fieldInput);
                        break;
                    case 'truelikeness':
                        await this.setTrueLikeness(fieldInput);
                        break;
                    case 'distinguishingfeatures':
                        await (0, scroll_1.default)(this.distinguishingFeatureInput);
                        await (0, setInputField_1.default)('add', distinguishingFeatures, this.distinguishingFeatureInput);
                        break;
                    case 'identification':
                        await this.setIdentification(fieldInput);
                        break;
                    case 'showmequestion':
                        await this.selectAndCloseIonSelectByText(this.showMeQuestionSelector, showMeQuestion, 'Submit');
                        break;
                    case 'weathercondition':
                        await this.selectAndCloseIonSelectByText(this.weatherConditionsSelector, weatherCondition, 'Submit');
                        break;
                    case 'circuit':
                        await this.setCircuit(fieldInput);
                        break;
                    case 'testconducted':
                        await this.setTestConducted(fieldInput);
                        break;
                    case 'firstshowmequestion':
                        await this.selectAndCloseIonSelectByText(this.firstShowMeQuestionSelect, firstShowMeQuestion, 'Submit');
                        break;
                    case 'secondshowmequestion':
                        await this.selectAndCloseIonSelectByText(this.secondShowMeQuestionSelect, secondShowMeQuestion, 'Submit');
                        break;
                    case 'additionalinformation':
                        await (0, scroll_1.default)(this.additionalInformationTextArea);
                        await (0, setInputField_1.default)('add', additionalInformation, this.additionalInformationTextArea);
                        break;
                    default:
                        console.log(`Could not find ${field}`);
                }
            }
        }
    }
    async completeUnsuccessfullOfficePage(data) {
        const { routeNumber, distinguishingFeatures, showMeQuestion, weatherCondition, faultComment, eyesightFaultComment, assessment, firstShowMeQuestion, secondShowMeQuestion, } = data;
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'activitycode':
                        // Code will need to be inputted for Unsuccessful and Terminated tests
                        break;
                    case 'routenumber':
                        await (0, setInputField_1.default)('add', routeNumber, this.routeNumberInput);
                        break;
                    case 'independentdriving':
                        await this.setIndependentDriving(fieldInput);
                        break;
                    case 'truelikeness':
                        await this.setTrueLikeness(fieldInput);
                        break;
                    case 'distinguishingfeatures':
                        await (0, scroll_1.default)(this.distinguishingFeatureInput);
                        await (0, setInputField_1.default)('add', distinguishingFeatures, this.distinguishingFeatureInput);
                        break;
                    case 'assessment':
                        await (0, scroll_1.default)(this.assessmentReport);
                        await (0, setInputField_1.default)('add', assessment, this.assessmentReport);
                        break;
                    case 'identification':
                        await this.setIdentification(fieldInput);
                        break;
                    case 'showmequestion':
                        await this.selectAndCloseIonSelectByText(this.showMeQuestionSelector, showMeQuestion, 'Submit');
                        break;
                    case 'weathercondition':
                        await this.selectAndCloseIonSelectByText(this.weatherConditionsSelector, weatherCondition, 'Submit');
                        break;
                    case 'circuit':
                        await this.setCircuit(fieldInput);
                        break;
                    case 'faultcomment':
                        const getElementRefForPage = (0, element_reference_helper_1.getElementByReference)(this.genericFaultCommentBox);
                        const nrOfElements = await $$(getElementRefForPage);
                        for (let i = 0; i < nrOfElements.length; i += 1) {
                            const faultCommentElement = `(${nrOfElements[i].selector})[${i + 1}]`;
                            await (0, scroll_1.default)(faultCommentElement);
                            await (0, setInputField_1.default)('add', faultComment, faultCommentElement);
                        }
                        break;
                    case 'eyesightfaultcomment':
                        await (0, scroll_1.default)(this.eyesightFaultComment);
                        await (0, setInputField_1.default)('add', eyesightFaultComment, this.eyesightFaultComment);
                        break;
                    case 'testconducted':
                        await this.setTestConducted(fieldInput);
                        break;
                    case 'firstshowmequestion':
                        await this.selectAndCloseIonSelectByText(this.firstShowMeQuestionSelect, firstShowMeQuestion, 'Submit');
                        break;
                    case 'secondshowmequestion':
                        await this.selectAndCloseIonSelectByText(this.secondShowMeQuestionSelect, secondShowMeQuestion, 'Submit');
                        break;
                    default:
                        console.log(`Could not find ${field}`);
                }
            }
        }
    }
    async setIndependentDriving(fieldInput) {
        switch (fieldInput) {
            case 'sat nav':
                await (0, clickElement_1.default)('click', 'selector', this.satNavButton);
                break;
            case 'traffic signs':
                await (0, clickElement_1.default)('click', 'selector', this.trafficSignsButton);
                break;
            case 'diagram':
                await (0, clickElement_1.default)('click', 'selector', this.diagramButton);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
    async setTrueLikeness(fieldInput) {
        switch (fieldInput) {
            case 'yes':
                await (0, clickElement_1.default)('click', 'selector', this.candidateLikenessYes);
                break;
            case 'no':
                await (0, clickElement_1.default)('click', 'selector', this.candidateLikenessNo);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
    async setIdentification(fieldInput) {
        await (0, scroll_1.default)(this.photoCardButton);
        switch (fieldInput) {
            case 'photo card':
                await (0, clickElement_1.default)('click', 'selector', this.photoCardButton);
                break;
            case 'passport':
                await (0, clickElement_1.default)('click', 'selector', this.passportButton);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
    async setCircuit(fieldInput) {
        await (0, scroll_1.default)(this.circuitLeft);
        switch (fieldInput) {
            case 'left':
                await (0, clickElement_1.default)('click', 'selector', this.circuitLeft);
                break;
            case 'right':
                await (0, clickElement_1.default)('click', 'selector', this.circuitRight);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
    async setTestConducted(fieldInput) {
        await (0, scroll_1.default)(this.testConductedCarBikeInput);
        switch (fieldInput) {
            case 'car to bike':
                await (0, clickElement_1.default)('click', 'selector', this.testConductedCarBikeInput);
                break;
            case 'bike to bike':
                await (0, clickElement_1.default)('click', 'selector', this.testConductedBikeBikeInput);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
}
exports.default = new OfficePageObject();
