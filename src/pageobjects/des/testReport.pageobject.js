"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const longClickElement_1 = __importDefault(require("@shared-custom/support/action/longClickElement"));
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
const waitFor_1 = __importDefault(require("../../../shared/boilerplate/support/action/waitFor"));
class TestReportPageObject extends page_1.default {
    get firstNSLegalReqTick() {
        return ('des-test-report-screen::test-requirement-first-ns-tick');
    }
    get NSCatD() {
        return ('des-test-report-screen::legal-requirements-NS');
    }
    get BSCatD() {
        return ('des-test-report-screen::legal-requirements-BS');
    }
    get secondNSLegalReqTick() {
        return ('des-test-report-screen::test-requirement-second-ns-tick');
    }
    get firstASLegalReqTick() {
        return ('des-test-report-screen::test-requirement-as-tick');
    }
    get hsdsLegalReqTick() {
        return ('des-test-report-screen::test-requirement-hs-ds-tick');
    }
    get ecoLegalReqTick() {
        return ('des-test-report-screen::eco-tick-button-xpath');
    }
    get showTellLegalReqTick() {
        return ('des-test-report-screen::show-tell-tick-button-xpath');
    }
    get maneuversLegalReqTick() {
        return ('des-test-report-screen::manouvers-btn-tick');
    }
    get maneuversReverseRightLegalReqButton() {
        return ('des-test-report-screen::manouvers-reverse-right-label');
    }
    get seriousFaultButton() {
        return ('des-test-report-screen::serious-fault-btn');
    }
    get dangerousFaultButton() {
        return ('des-test-report-screen::dangerous-fault-btn');
    }
    get uhLegalReqTick() {
        return ('des-test-report-screen::test-requirement-uh-tick');
    }
    get dhLegalReqTick() {
        return ('des-test-report-screen::test-requirement-dh-tick');
    }
    get competencyButton() {
        return ('des-test-report-screen::competency-button');
    }
    get asCsLegalReqTick() {
        return ('des-test-report-screen::test-requirement-as-cs-tick');
    }
    get answerLabelOne() {
        return ('des-test-report-screen::answer-label-1');
    }
    get answerLabelTwo() {
        return ('des-test-report-screen::answer-label-2');
    }
    get answerLabelThree() {
        return ('des-test-report-screen::answer-label-3');
    }
    get answerLabelFour() {
        return ('des-test-report-screen::answer-label-4');
    }
    get answerLabelFive() {
        return ('des-test-report-screen::answer-label-5');
    }
    get answerLabelSix() {
        return ('des-test-report-screen::answer-label-6');
    }
    get answerLabelSeven() {
        return ('des-test-report-screen::answer-label-7');
    }
    get answerLabelEight() {
        return ('des-test-report-screen::answer-label-8');
    }
    get answerLabelNine() {
        return ('des-test-report-screen::answer-label-9');
    }
    get answerLabelTen() {
        return ('des-test-report-screen::answer-label-10');
    }
    get nextPageButton() {
        return ('des-test-report-screen::next-page-button');
    }
    get uhdhLegalReqTick() {
        return ('des-test-report-screen::test-requirements-uh-ds-tick');
    }
    get reverseLegalReqTick() {
        return ('des-test-report-screen::test-requirements-reverse-tick');
    }
    get highwaySafetyLegalReqTick() {
        return ('des-test-report-screen::test-requirements-highway-safety-tick');
    }
    get controlledStopLegalReqTick() {
        return ('des-test-report-screen::test-requirements-controlled-stop-tick');
    }
    get studentPartlyTrained() {
        return ('des-lesson-and-theme-screen::student-partly-trained-label');
    }
    get studentTrained() {
        return ('des-lesson-and-theme-screen::student-trained-label');
    }
    get studentFLHNew() {
        return ('des-lesson-and-theme-screen::student-flh-new-label');
    }
    get studentFLHExperienced() {
        return ('des-lesson-and-theme-screen::student-flh-experienced-label');
    }
    get manoeuvresOneReverseRight() { return ('des-test-report-screen::manoeuvres-one-reverse-right'); }
    get manoeuvresTwoReverseParkRoad() { return ('des-test-report-screen::manoeuvres-two-reverse-park-road'); }
    get smtmTestRequirement() { return ('des-test-report-screen::test-requirement-sm-tm'); }
    selectCompetencyButton(competencyItem) {
        $(`competency-button='${competencyItem}'`).waitForDisplayed();
        return $(`competency-button='${competencyItem}'`).click();
    }
    async completeLegalRequirementsForCatB() {
        await (0, longClickElement_1.default)(this.firstNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.secondNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.firstASLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.hsdsLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.maneuversLegalReqTick, 500);
        await (0, waitFor_1.default)(this.maneuversReverseRightLegalReqButton, '', false, 'be displayed');
        await (0, clickElement_1.default)('click', 'selector', this.maneuversReverseRightLegalReqButton);
        await (0, longClickElement_1.default)(this.maneuversLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.showTellLegalReqTick, 500);
    }
    async completeLegalRequirementsForCatCPC(status) {
        for (let i = 1; i <= 4; i += 1) {
            await (0, clickElement_1.default)('click', 'selector', this.answerLabelOne);
            if (status === 'pass') {
                await (0, clickElement_1.default)('click', 'selector', this.answerLabelTwo);
                await (0, clickElement_1.default)('click', 'selector', this.answerLabelThree);
                await (0, clickElement_1.default)('click', 'selector', this.answerLabelFour);
            }
            await (0, clickElement_1.default)('click', 'selector', this.nextPageButton);
        }
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelOne);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelTwo);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelThree);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelFour);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelFive);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelSix);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelSeven);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelEight);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelNine);
        await (0, clickElement_1.default)('click', 'selector', this.answerLabelTen);
    }
    async completeLegalRequirementsForCatC() {
        await (0, longClickElement_1.default)(this.firstNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.secondNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.uhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.dhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.asCsLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
    }
    async completeLegalRequirementsForCatD() {
        await (0, longClickElement_1.default)(this.NSCatD, 500);
        await (0, longClickElement_1.default)(this.NSCatD, 500);
        await (0, longClickElement_1.default)(this.BSCatD, 500);
        await (0, longClickElement_1.default)(this.BSCatD, 500);
        await (0, longClickElement_1.default)(this.uhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.dhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.asCsLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
    }
    async completeLegalRequirementsForCatMod2() {
        await (0, longClickElement_1.default)(this.firstNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.secondNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.firstASLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.hsdsLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
    }
    async completeLegalRequirementsForCatManoeuvre() {
        await (0, longClickElement_1.default)(this.competencyButton, 500);
    }
    async completeLegalRequirementsForCatADI2() {
        await (0, longClickElement_1.default)(this.firstNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.secondNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.firstASLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.uhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.dhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.maneuversLegalReqTick, 500);
        await (0, waitFor_1.default)(this.manoeuvresOneReverseRight, '', false, 'be displayed');
        await (0, clickElement_1.default)('click', 'selector', this.manoeuvresOneReverseRight);
        await (0, clickElement_1.default)('click', 'selector', this.manoeuvresTwoReverseParkRoad);
        await (0, longClickElement_1.default)(this.maneuversLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.smtmTestRequirement, 500);
    }
    async completeLegalRequirementsForCatHome() {
        await (0, longClickElement_1.default)(this.firstNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.secondNSLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.firstASLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.uhdhLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.reverseLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.ecoLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.highwaySafetyLegalReqTick, 500);
        await (0, longClickElement_1.default)(this.controlledStopLegalReqTick, 500);
    }
    async completeLegalRequirements(category) {
        const cat = category.toLowerCase();
        switch (cat) {
            case 'b':
                await this.completeLegalRequirementsForCatB();
                break;
            case 'c':
                await this.completeLegalRequirementsForCatC();
                break;
            case 'd':
                await this.completeLegalRequirementsForCatD();
                break;
            case 'cpc-pass':
                await this.completeLegalRequirementsForCatCPC('pass');
                break;
            case 'cpc-fail':
                await this.completeLegalRequirementsForCatCPC('fail');
                break;
            case 'manoeuvre':
                await this.completeLegalRequirementsForCatManoeuvre();
                break;
            case 'mod2':
                await this.completeLegalRequirementsForCatMod2();
                break;
            case 'adi2':
                await this.completeLegalRequirementsForCatADI2();
                break;
            case 'home':
                await this.completeLegalRequirementsForCatHome();
                break;
            default:
                console.info(`${cat} does not exist`);
        }
    }
    async addingFault(faultCount, fault, selector) {
        let i = 0;
        while (i < faultCount) {
            switch (fault.toLowerCase()) {
                case 'driving':
                    await (0, longClickElement_1.default)(selector, 500);
                    break;
                case 'serious':
                    await (0, clickElement_1.default)('click', 'selector', this.seriousFaultButton);
                    await (0, longClickElement_1.default)(selector, 500);
                    break;
                case 'dangerous':
                    await (0, clickElement_1.default)('click', 'selector', this.dangerousFaultButton);
                    await (0, longClickElement_1.default)(selector, 500);
                    break;
                default:
                    console.error('This is not the correct selector');
            }
            i += 1;
        }
    }
    async studentOptionADI3(studentOption) {
        const studentSelector = `//app-test-report-cat-adi3//student-level//assessment-answer//label[contains(text(), '${studentOption}')]`;
        await (0, clickElement_1.default)('click', 'selector', studentSelector);
    }
    async lessonOptionADI3(lessonOption) {
        for (let i = 0; i < lessonOption.length; i += 1) {
            const selector = `//app-test-report-cat-adi3//assessment-answer//div[contains(text(), '${lessonOption[i][0]}')]/../../ion-col//label`;
            await (0, clickElement_1.default)('click', 'selector', selector);
        }
    }
    async testReportADI3Questions(score, questionNumber, section) {
        const sectionSelector = {
            'lesson planning': 'lp',
            'risk management': 'rm',
            'teaching & learning strategies': 'tls',
        };
        const selector = `#${sectionSelector[section.toLowerCase()]}-${questionNumber}assessment-input-${score}`;
        await (0, scroll_1.default)(selector);
        await (0, clickElement_1.default)('click', 'selector', selector);
    }
}
exports.default = new TestReportPageObject();
