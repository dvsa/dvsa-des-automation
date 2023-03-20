"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const page_1 = __importDefault(require("../base/page"));
const checkEqualsText_1 = __importDefault(require("../../../shared/boilerplate/support/check/checkEqualsText"));
class ConfirmationPageObject extends page_1.default {
    get testOutcomeValue() {
        return ('des-final-confirmation-screen::test-outcome-value');
    }
    get activityCodeValue() {
        return ('des-final-confirmation-screen::test-activity-code-value');
    }
    get testCategoryValue() {
        return ('des-final-confirmation-screen::test-cat-value');
    }
    get provisionalLicencedValue() {
        return ('des-final-confirmation-screen::test-prov-licence-value');
    }
    get transmissionValue() {
        return ('des-final-confirmation-screen::test-transmission-value');
    }
    get d255Value() {
        return ('des-final-confirmation-screen::test-d255-value');
    }
    get studentValue() {
        return ('des-final-confirmation-screen::student-value');
    }
    get lessonThemeValue() {
        return ('des-final-confirmation-screen::lesson-theme-value');
    }
    get lessonPlanningValue() {
        return ('des-final-confirmation-screen::lesson-planning-value');
    }
    get riskManagementValue() {
        return ('des-final-confirmation-screen::risk-management-value');
    }
    get teachingLearningStrategiesValue() {
        return ('des-final-confirmation-screen::teaching-learning-strategies-value');
    }
    get totalScoreValue() {
        return ('des-final-confirmation-screen::total-score-value');
    }
    async checkPassedConfirmationPageDetails(data) {
        const { testOutcome, activityCode, testCategory, provLicenceRecieved, transmission, d255, student, lessonTheme, lessonPlanning, riskManagement, teachingLearningStrategies, totalScore, } = data;
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'testoutcome':
                        await (0, checkEqualsText_1.default)('element', this.testOutcomeValue, false, testOutcome);
                        break;
                    case 'activitycode':
                        await (0, checkEqualsText_1.default)('element', this.activityCodeValue, false, activityCode);
                        break;
                    case 'testcategory':
                        await (0, checkEqualsText_1.default)('element', this.testCategoryValue, false, testCategory);
                        break;
                    case 'provisionlicence':
                        await (0, checkEqualsText_1.default)('element', this.provisionalLicencedValue, false, provLicenceRecieved);
                        break;
                    case 'transmission':
                        await (0, checkEqualsText_1.default)('element', this.transmissionValue, false, transmission);
                        break;
                    case 'd255':
                        await (0, checkEqualsText_1.default)('element', this.d255Value, false, d255);
                        break;
                    case 'student':
                        (0, scroll_1.default)(this.studentValue);
                        await (0, checkEqualsText_1.default)('element', this.studentValue, false, student);
                        break;
                    case 'lessontheme':
                        (0, scroll_1.default)(this.lessonThemeValue);
                        await (0, checkEqualsText_1.default)('element', this.lessonThemeValue, false, lessonTheme);
                        break;
                    case 'lessonplanning':
                        (0, scroll_1.default)(this.lessonPlanningValue);
                        await (0, checkEqualsText_1.default)('element', this.lessonPlanningValue, false, lessonPlanning);
                        break;
                    case 'riskmanagement':
                        (0, scroll_1.default)(this.riskManagementValue);
                        await (0, checkEqualsText_1.default)('element', this.riskManagementValue, false, riskManagement);
                        break;
                    case 'teachinglearningstrategies':
                        (0, scroll_1.default)(this.teachingLearningStrategiesValue);
                        await (0, checkEqualsText_1.default)('element', this.teachingLearningStrategiesValue, false, teachingLearningStrategies);
                        break;
                    case 'totalscore':
                        (0, scroll_1.default)(this.totalScoreValue);
                        await (0, checkEqualsText_1.default)('element', this.totalScoreValue, false, totalScore);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
    }
}
exports.default = new ConfirmationPageObject();
