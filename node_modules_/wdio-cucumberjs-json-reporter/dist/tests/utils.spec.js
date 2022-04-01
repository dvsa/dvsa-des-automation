"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocks_1 = require("./__mocks__/mocks");
const utils_1 = __importDefault(require("../utils"));
describe('utils', () => {
    describe('getFailedMessage', () => {
        it('should not return an error message if the status is "passed"', () => {
            expect(new utils_1.default().getFailedMessage(mocks_1.TEST_SCENARIO_STATS)).toEqual({});
        });
        it('should return an error message if the status is "failed"', () => {
            expect(new utils_1.default().getFailedMessage(mocks_1.TEST_SCENARIO_STATS_ERROR)).toMatchSnapshot();
        });
    });
    describe('containsSteps', () => {
        it('should return false if none of the values is a step name', () => {
            const steps = [
                { keyword: 'foo' },
                { keyword: 'bar' },
                { keyword: 'foobar' },
            ];
            const language = 'en';
            expect(new utils_1.default().containsSteps(steps, language)).toEqual(false);
        });
        it('should return true if step contains the word `Given`', () => {
            const steps = [
                { keyword: 'foo' },
                { keyword: 'bar' },
                { keyword: 'Given' },
            ];
            const language = 'en';
            expect(new utils_1.default().containsSteps(steps, language)).toEqual(true);
        });
        it('should return true if step contains the word `When`', () => {
            const steps = [
                { keyword: 'When' },
                { keyword: 'bar' },
                { keyword: 'foo' },
            ];
            const language = 'en';
            expect(new utils_1.default().containsSteps(steps, language)).toEqual(true);
        });
        it('should return true if step contains the word `Then`', () => {
            const steps = [
                { keyword: 'bar' },
                { keyword: 'Then' },
                { keyword: 'foo' },
            ];
            const language = 'en';
            expect(new utils_1.default().containsSteps(steps, language)).toEqual(true);
        });
        it('should return true if step contains the word `And`', () => {
            const steps = [
                { keyword: 'bar' },
                { keyword: 'And' },
            ];
            const language = 'en';
            expect(new utils_1.default().containsSteps(steps, language)).toEqual(true);
        });
    });
});
//# sourceMappingURL=utils.spec.js.map