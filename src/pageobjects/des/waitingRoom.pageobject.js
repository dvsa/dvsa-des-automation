"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setInputField_1 = __importDefault(require("@shared-boilerplate/support/action/setInputField"));
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
class WaitingRoomPageObject extends page_1.default {
    get insuranceDeclarationLabel() { return ('des-exam-waiting-room::insurance-declaration-label'); }
    get residencyDeclarationLabel() { return ('des-exam-waiting-room::residency-declaration-label'); }
    get signatureAreaXpath() { return ('des-exam-waiting-room::signature-area-xpath'); }
    get declarationContinueButton() { return ('des-general::continue-btn'); }
    get comunicationContinueButton() { return ('des-comms-screen::continue-btn'); }
    get byPostRadioButton() { return ('des-comms-screen::by-post-radio-btn'); }
    get manoeuvresPassCertNumberInput() { return ('des-final-outcome-screen::manoeuvres-pass-cert-number'); }
    async completeDeclarationPage(category) {
        // Set manoeuvres pass cert for Cat C/D
        if (['C', 'C1', 'C+E', 'C1+E', 'D', 'D1', 'D+E', 'D1+E'].some((cat) => cat === category.toUpperCase())) {
            await (0, setInputField_1.default)('add', 'C123456X', this.manoeuvresPassCertNumberInput);
        }
        await (0, clickElement_1.default)('click', 'selector', this.insuranceDeclarationLabel);
        // Don't set Residency declaration when ADI2 / ADI3 / SC
        if (!['ADI2', 'ADI3', 'SC'].some((cat) => cat === category.toUpperCase())) {
            await (0, clickElement_1.default)('click', 'selector', this.residencyDeclarationLabel);
        }
        await (0, clickElement_1.default)('click', 'selector', this.signatureAreaXpath);
        await (0, clickElement_1.default)('click', 'selector', this.declarationContinueButton);
    }
    async completeCatCDeclarationPage() {
        await (0, setInputField_1.default)('add', 'C123456X', this.manoeuvresPassCertNumberInput);
        await (0, clickElement_1.default)('click', 'selector', this.insuranceDeclarationLabel);
        await (0, clickElement_1.default)('click', 'selector', this.residencyDeclarationLabel);
        await (0, clickElement_1.default)('click', 'selector', this.signatureAreaXpath);
        await (0, clickElement_1.default)('click', 'selector', this.declarationContinueButton);
    }
    async completeCommunicationPage() {
        await (0, clickElement_1.default)('click', 'selector', this.byPostRadioButton);
        await (0, clickElement_1.default)('click', 'selector', this.comunicationContinueButton);
    }
}
exports.default = new WaitingRoomPageObject();
