"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkEqualsText_1 = __importDefault(require("@shared-boilerplate/support/check/checkEqualsText"));
const page_1 = __importDefault(require("../base/page"));
class DebriefScreenPageObject extends page_1.default {
    async checkCorrectFaults(data) {
        const [{ faultSelector, faultExpectedText, faultCountSelector, numberOfFaults, }] = data;
        for (let i = 0; i < data.length; i += 1) {
            await (0, checkEqualsText_1.default)('element', faultSelector, false, faultExpectedText);
            await (0, checkEqualsText_1.default)('element', faultCountSelector, false, numberOfFaults);
        }
    }
}
exports.default = new DebriefScreenPageObject();
