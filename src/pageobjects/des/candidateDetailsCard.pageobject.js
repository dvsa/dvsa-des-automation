"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkEqualsText_1 = __importDefault(require("@shared-boilerplate/support/check/checkEqualsText"));
const page_1 = __importDefault(require("../base/page"));
class CandidateDetailsPageObject extends page_1.default {
    async checkCandidateTestDetailsCard(data) {
        const { testCentre, candidateName, testTime, candidateReference, testCategory, examinerName, } = data;
        console.info('Checking candidate details card');
        await (0, checkEqualsText_1.default)('element', '<test-category />', false, testCategory);
        await (0, checkEqualsText_1.default)('element', '.time-test-complete-text', false, testTime);
        await (0, checkEqualsText_1.default)('element', '.team-journal-test-centre-name', false, testCentre);
        await (0, checkEqualsText_1.default)('element', '.team-journal-driver-number', false, candidateReference);
        await (0, checkEqualsText_1.default)('element', '.candidate-name', false, candidateName);
        await (0, checkEqualsText_1.default)('element', '.examiner-name', false, examinerName);
    }
}
exports.default = new CandidateDetailsPageObject();
