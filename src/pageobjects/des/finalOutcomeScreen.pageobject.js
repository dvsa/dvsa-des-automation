"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
const checkEqualsText_1 = __importDefault(require("../../../shared/boilerplate/support/check/checkEqualsText"));
const setInputField_1 = __importDefault(require("../../../shared/boilerplate/support/action/setInputField"));
const scroll_1 = __importDefault(require("../../../shared/boilerplate/support/action/scroll"));
class FinalOutcomePageObject extends page_1.default {
    get testOutcomePassed() { return ('des-final-outcome-screen::test-outcome-pass'); }
    get testOutcomeFailed() { return ('des-final-outcome-screen::test-outcome-failed'); }
    get testOutcomeTerminated() { return ('des-final-outcome-screen::test-outcome-terminated'); }
    get provLicencedRecievedYes() { return ('des-final-outcome-screen::provisional-license-recieved-option-yes'); }
    get provLicencedRecievedNo() { return ('des-final-outcome-screen::provisional-license-recieved-option-no'); }
    get transmissionManualInput() { return ('des-final-outcome-screen::transmission-manual-input'); }
    get transmissionManualInputCatC() { return ('des-final-outcome-screen::transmission-manual-label'); }
    get transmissionAutomaticInput() { return ('des-final-outcome-screen::transmission-automatic-input'); }
    get passCertificateNumberInput() { return ('des-final-outcome-screen::pass-certificate-number-field-input'); }
    get d255YesInput() { return ('des-final-outcome-screen::d255-yes-input'); }
    get d255NoInput() { return ('des-final-outcome-screen::d255-no-input'); }
    get languageEnglishInput() { return ('des-final-outcome-screen::lang-pref-english-input'); }
    get languageCymraegInput() { return ('des-final-outcome-screen::lang-pref-cymraeg-input'); }
    get debriefWitnessedYes() { return ('des-final-outcome-screen::debrief-witness-yes-input'); }
    get debriefWitnessedNo() { return ('des-final-outcome-screen::debrief-witness-no-input'); }
    get passFinalisationContinueButton() { return ('des-final-outcome-screen::continue-btn'); }
    get failFinalisationContinueButton() { return ('des-final-outcome-screen::fail-continue-btn'); }
    get activityCodeSelector() { return ('des-final-outcome-screen::activity-code-selector-xpath'); }
    get code78() { return ('des-final-outcome-screen::code-78-not-received'); }
    get licenceReceivedYesLabel() { return ('des-final-outcome-screen::licence-received-yes-label'); }
    get licenceReceivedNoLabel() { return ('des-final-outcome-screen::licence-received-no-label'); }
    get furtherAdviceYesInput() { return ('des-final-outcome-screen::further-advice-yes-input'); }
    get furtherAdviceNoInput() { return ('des-final-outcome-screen::further-advice-no-input'); }
    get reasonForAdviceTextArea() { return ('des-final-outcome-screen::reason-for-advice-textarea'); }
    async completePassedFinalOutcomePage(data) {
        const { testOutcome = 'passed', passCertNumber, noAdviceGiven } = data;
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'testoutcome':
                        await this.checkFinaliseOutcomeTestOutcome(testOutcome);
                        break;
                    case 'code78':
                        await (0, clickElement_1.default)('click', 'selector', this.code78);
                        break;
                    case 'provisionallicencereceived':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.provLicencedRecievedYes : this.provLicencedRecievedNo);
                        break;
                    case 'transmission':
                        await this.setClickTransmission(fieldInput);
                        break;
                    case 'passcertnumber':
                        await (0, setInputField_1.default)('add', passCertNumber, this.passCertificateNumberInput);
                        break;
                    case 'd255':
                        await this.setD255(fieldInput);
                        break;
                    case 'testlanguage':
                        await this.setTestLanguage(fieldInput);
                        break;
                    case 'debriefwitnessed':
                        await this.setDebriefWitnessed(fieldInput);
                        break;
                    case 'licencereceived':
                        await this.setLicenceReceived(fieldInput);
                        break;
                    case 'furtheradvice':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.furtherAdviceYesInput : this.furtherAdviceNoInput);
                        break;
                    case 'noadvicegiven':
                        await (0, setInputField_1.default)('add', noAdviceGiven, this.reasonForAdviceTextArea);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
        await (0, clickElement_1.default)('click', 'selector', this.passFinalisationContinueButton);
    }
    async completeNonPassedFinalOutcomePage(testOutcome, data) {
        const { activityCode, noAdviceGiven } = data;
        await this.checkFinaliseOutcomeTestOutcome(testOutcome);
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'activitycode':
                        await (0, clickElement_1.default)('click', 'selector', this.activityCodeSelector);
                        await (0, clickElement_1.default)('click', 'selector', activityCode);
                        if (activityCode === 'des-final-outcome-screen::activity-code-4' || activityCode === 'des-final-outcome-screen::activity-code-5') {
                            await this.checkFinaliseOutcomeTestOutcome('unsuccessful');
                        }
                        break;
                    case 'd255':
                        await this.setD255(fieldInput);
                        break;
                    case 'testlanguage':
                        await this.setTestLanguage(fieldInput);
                        break;
                    case 'debriefwitnessed':
                        await this.setDebriefWitnessed(fieldInput);
                        await (0, scroll_1.default)(this.debriefWitnessedYes);
                        break;
                    case 'furtheradvice':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.furtherAdviceYesInput : this.furtherAdviceNoInput);
                        break;
                    case 'noadvicegiven':
                        await (0, setInputField_1.default)('add', noAdviceGiven, this.reasonForAdviceTextArea);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
        await (0, clickElement_1.default)('click', 'selector', this.failFinalisationContinueButton);
    }
    async checkFinaliseOutcomeTestOutcome(outcome) {
        switch (outcome) {
            case 'passed':
                await (0, checkEqualsText_1.default)('element', this.testOutcomePassed, false, 'Passed');
                break;
            case 'unsuccessful':
                await (0, checkEqualsText_1.default)('element', this.testOutcomeFailed, false, 'Unsuccessful');
                break;
            case 'terminated':
                await (0, checkEqualsText_1.default)('element', this.testOutcomeTerminated, false, 'Terminated');
                break;
            case 'Passed - Grade A':
                await (0, checkEqualsText_1.default)('element', this.testOutcomePassed, false, 'Passed - Grade A');
                break;
            case 'Passed - Grade B':
                await (0, checkEqualsText_1.default)('element', this.testOutcomePassed, false, 'Passed - Grade B');
                break;
            default:
                console.info(`${outcome} is not a test outcome, or ${outcome} could not be found`);
        }
    }
    async setClickTransmission(fieldInput) {
        switch (fieldInput) {
            case 'manual':
                await (0, clickElement_1.default)('click', 'selector', this.transmissionManualInput);
                break;
            case 'automatic':
                await (0, clickElement_1.default)('click', 'selector', this.transmissionAutomaticInput);
                break;
            case 'manualcatc':
                await (0, clickElement_1.default)('click', 'selector', this.transmissionManualInputCatC);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setD255(fieldInput) {
        await (0, scroll_1.default)(this.d255YesInput);
        switch (fieldInput) {
            case 'yes':
                await (0, clickElement_1.default)('click', 'selector', this.d255YesInput);
                break;
            case 'no':
                await (0, clickElement_1.default)('click', 'selector', this.d255NoInput);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setTestLanguage(fieldInput) {
        await (0, scroll_1.default)(this.languageEnglishInput);
        switch (fieldInput) {
            case 'english':
                await (0, clickElement_1.default)('click', 'selector', this.languageEnglishInput);
                break;
            case 'cymraeg':
                await (0, clickElement_1.default)('click', 'selector', this.languageCymraegInput);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setDebriefWitnessed(fieldInput) {
        await (0, scroll_1.default)(this.debriefWitnessedYes);
        switch (fieldInput) {
            case 'yes':
                await (0, clickElement_1.default)('click', 'selector', this.debriefWitnessedYes);
                break;
            case 'no':
                await (0, clickElement_1.default)('click', 'selector', this.debriefWitnessedNo);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setLicenceReceived(fieldInput) {
        await (0, scroll_1.default)(this.licenceReceivedYesLabel);
        switch (fieldInput) {
            case 'yes':
                await (0, clickElement_1.default)('click', 'selector', this.licenceReceivedYesLabel);
                break;
            case 'no':
                await (0, clickElement_1.default)('click', 'selector', this.licenceReceivedNoLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
}
exports.default = new FinalOutcomePageObject();
