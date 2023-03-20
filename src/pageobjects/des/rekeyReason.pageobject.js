"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
const setInputField_1 = __importDefault(require("../../../shared/boilerplate/support/action/setInputField"));
class RekeyReasonPageObject extends page_1.default {
    get ipadIssueChexbox() { return ('des-rekey-reason-page::ipadIssueCheckbox'); }
    get techFaultRadio() { return ('des-rekey-reason-page::tech-fault-radio'); }
    get lostRadio() { return ('des-rekey-reason-page::lost-radio'); }
    get otherReasonCheckbox() { return ('des-rekey-reason-page::other-reason-rekey-label'); }
    get otherReasonText() { return ('des-rekey-reason-page::reason-for-rekey-text'); }
    get transferCheckbox() { return ('des-rekey-reason-page::transfer-label'); }
    get staffNumberText() { return ('des-rekey-reason-page::staff-number-text'); }
    async completeRekeyReasonPage(data) {
        const { transfer, other, } = data;
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'ipad':
                        await (0, clickElement_1.default)('click', 'selector', this.ipadIssueChexbox);
                        await this.setIPad(fieldInput);
                        break;
                    case 'transfer':
                        await (0, clickElement_1.default)('click', 'selector', this.transferCheckbox);
                        await (0, setInputField_1.default)('set', transfer, this.staffNumberText);
                        break;
                    case 'other':
                        await (0, clickElement_1.default)('click', 'selector', this.otherReasonCheckbox);
                        await (0, setInputField_1.default)('set', other, this.otherReasonText);
                        break;
                    default:
                        console.log(`Could not find ${field}`);
                }
            }
        }
    }
    async setIPad(fieldInput) {
        switch (fieldInput) {
            case 'tech':
                await (0, clickElement_1.default)('click', 'selector', this.techFaultRadio);
                break;
            case 'lost':
                await (0, clickElement_1.default)('click', 'selector', this.lostRadio);
                break;
            default:
                console.log(`Could not find ${fieldInput}`);
        }
    }
}
exports.default = new RekeyReasonPageObject();
