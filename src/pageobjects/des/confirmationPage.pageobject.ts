import scroll from '@shared-boilerplate/support/action/scroll';
import Page from '../base/page';
import checkEqualsText from '../../../shared/boilerplate/support/check/checkEqualsText';

interface PassedConfirmationData {
  testOutcome: string;
  activityCode: string;
  testCategory: string;
  provLicenceReceived: string;
  transmission: string;
  d255: string;
  student: string;
  lessonTheme: string;
  lessonPlanning: string;
  riskManagement: string;
  teachingLearningStrategies: string;
  totalScore: string;
}

class ConfirmationPageObject extends Page {
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

  async checkPassedConfirmationPageDetails(
    data: Record<keyof PassedConfirmationData, string>,
  ): Promise<void> {
    const {
      testOutcome,
      activityCode,
      testCategory,
      provLicenceReceived,
      transmission,
      d255,
      student,
      lessonTheme,
      lessonPlanning,
      riskManagement,
      teachingLearningStrategies,
      totalScore,
    } = data;

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'testoutcome':
            await checkEqualsText('element', this.testOutcomeValue, false, testOutcome);
            break;
          case 'activitycode':
            await checkEqualsText('element', this.activityCodeValue, false, activityCode);
            break;
          case 'testcategory':
            await checkEqualsText('element', this.testCategoryValue, false, testCategory);
            break;
          case 'provlicencereceived':
            await checkEqualsText('element', this.provisionalLicencedValue, false, provLicenceReceived);
            break;
          case 'transmission':
            await checkEqualsText('element', this.transmissionValue, false, transmission);
            break;
          case 'd255':
            await checkEqualsText('element', this.d255Value, false, d255);
            break;
          case 'student':
            scroll(this.studentValue);
            await checkEqualsText('element', this.studentValue, false, student);
            break;
          case 'lessontheme':
            scroll(this.lessonThemeValue);
            await checkEqualsText('element', this.lessonThemeValue, false, lessonTheme);
            break;
          case 'lessonplanning':
            scroll(this.lessonPlanningValue);
            await checkEqualsText('element', this.lessonPlanningValue, false, lessonPlanning);
            break;
          case 'riskmanagement':
            scroll(this.riskManagementValue);
            await checkEqualsText('element', this.riskManagementValue, false, riskManagement);
            break;
          case 'teachinglearningstrategies':
            scroll(this.teachingLearningStrategiesValue);
            await checkEqualsText('element', this.teachingLearningStrategiesValue, false, teachingLearningStrategies);
            break;
          case 'totalscore':
            scroll(this.totalScoreValue);
            await checkEqualsText('element', this.totalScoreValue, false, totalScore);
            break;

          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }
}

export default new ConfirmationPageObject();
