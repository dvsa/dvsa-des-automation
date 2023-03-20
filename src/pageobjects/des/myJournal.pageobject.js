"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clickElement_1 = __importDefault(require("@shared-boilerplate/support/action/clickElement"));
const checkEqualsText_1 = __importDefault(require("@shared-boilerplate/support/check/checkEqualsText"));
const element_reference_helper_1 = require("@shared-helpers/element-reference-helper");
const waitFor_1 = __importDefault(require("@shared-boilerplate/support/action/waitFor"));
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const page_1 = __importDefault(require("../base/page"));
class MyJournalPageObject extends page_1.default {
    get nextDayButton() { return ('des-my-journal::next-day-btn'); }
    get previousDayButton() { return ('des-my-journal::previous-day-btn'); }
    get dayName() { return ('des-my-journal::day-name'); }
    get dateName() { return ('des-my-journal::date'); }
    get earlyStartTestModelTitle() { return ('des-my-journal::start-test-model-time-early-title'); }
    get earlyStartTestModelButton() { return ('des-my-journal::early-start-test-modal-start-test-btn'); }
    get expiredStartTestModelTitle() { return ('des-my-journal::start-test-model-time-expired-title'); }
    get expiredStartTestModelButton() { return ('des-my-journal::start-test-modal-start-test-btn'); }
    get expiredStartTestModelRekeyButton() { return ('des-my-journal::start-test-modal-rekey-test-btn'); }
    get specialReqsStartTestModelTitle() { return ('des-my-journal::start-test-model-candidate-special-reqs-title'); }
    get specialReqsStartTestModelButton() { return ('des-my-journal::start-test-modal-view-candidate-details-btn'); }
    get candidateDetailsPageTitle() { return ('des-candidate-details::page-title'); }
    get candidateDetailsBackButton() { return ('des-candidate-details::close-button'); }
    async changeDayCheckDate(direction, days) {
        await (0, waitFor_1.default)(this.dayName, '', false, 'be displayed');
        const gettingDateElementCurrentPage = await $((0, element_reference_helper_1.getElementByReference)(this.dateName)).getText();
        let i = 0;
        if (direction === 'back') {
            while (i < days) {
                await (0, clickElement_1.default)('click', 'selector', this.previousDayButton);
                i += 1;
            }
        }
        else {
            while (i < days) {
                await (0, clickElement_1.default)('click', 'selector', this.nextDayButton);
                i += 1;
            }
        }
        const initialDate = new Date(gettingDateElementCurrentPage);
        const adjustedDateAsNumber = direction === 'back' ? initialDate.getDate() - days : initialDate.getDate() + days;
        const adjustedDate = new Date(initialDate.setDate(adjustedDateAsNumber));
        const month = adjustedDate.toLocaleString('default', { month: 'long' });
        const weekday = adjustedDate.toLocaleString('default', { weekday: 'long' });
        const date = `${adjustedDate.getDate()} ${month} ${adjustedDate.getFullYear()}`;
        const dateToday = new Date();
        const currentDateString = `${dateToday.toLocaleString('default', { weekday: 'long' })} ${dateToday.getDate()} ${dateToday.toLocaleString('default', { month: 'long' })} ${dateToday.getFullYear()}`;
        const gettingDayNameElementValue = await $((0, element_reference_helper_1.getElementByReference)(this.dayName)).getText();
        if (gettingDayNameElementValue === 'Today') {
            await (0, checkEqualsText_1.default)('element', this.dayName, false, 'Today');
            await (0, checkEqualsText_1.default)('element', this.dateName, false, currentDateString);
        }
        else {
            await (0, checkEqualsText_1.default)('element', this.dayName, false, weekday);
            await (0, checkEqualsText_1.default)('element', this.dateName, false, date);
        }
    }
    async startEarlyTest() {
        await (0, waitFor_1.default)(this.earlyStartTestModelButton, '', false, 'be displayed');
        await (0, clickElement_1.default)('click', 'selector', this.earlyStartTestModelButton);
    }
    async startLateTest() {
        await (0, waitFor_1.default)(this.expiredStartTestModelButton, '', false, 'be displayed');
        await (0, clickElement_1.default)('click', 'selector', this.expiredStartTestModelButton);
    }
    async startTest(selector) {
        await (0, scroll_1.default)(selector);
        await (0, waitFor_1.default)(selector, '', false, 'be displayed');
        await (0, clickElement_1.default)('click', 'selector', selector);
        if (await $((0, element_reference_helper_1.getElementByReference)(this.earlyStartTestModelTitle)).isExisting()) {
            await this.startEarlyTest();
        }
        if (await $((0, element_reference_helper_1.getElementByReference)(this.expiredStartTestModelTitle)).isExisting()) {
            await this.startLateTest();
        }
        if (await $((0, element_reference_helper_1.getElementByReference)(this.specialReqsStartTestModelTitle)).isExisting()) {
            await (0, waitFor_1.default)(this.specialReqsStartTestModelButton, '', false, 'be displayed');
            await (0, clickElement_1.default)('click', 'selector', this.specialReqsStartTestModelButton);
            await (0, waitFor_1.default)(this.candidateDetailsPageTitle, '', false, 'be displayed');
            await (0, clickElement_1.default)('click', 'selector', this.candidateDetailsBackButton);
            await (0, clickElement_1.default)('click', 'selector', selector);
            if (await $((0, element_reference_helper_1.getElementByReference)(this.earlyStartTestModelTitle)).isExisting()) {
                await this.startEarlyTest();
            }
            if (await $((0, element_reference_helper_1.getElementByReference)(this.expiredStartTestModelTitle)).isExisting()) {
                await this.startLateTest();
            }
        }
    }
}
exports.default = new MyJournalPageObject();
