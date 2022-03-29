import scroll from '@shared-boilerplate/support/action/scroll';
import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import clickElementWithText from '../../../shared/custom/support/action/clickElementWithText';

class OfficePageObject extends Page {
  get routeNumberInput() { return ('des-office-page::route-number-input'); }

  get satNavButton() { return ('des-office-page::independant-driving-sat-nav-input'); }

  get trafficSignsButton() { return ('des-office-page::independant-driving-traffice-signs-input'); }

  get candidateLikenessYes() { return ('des-office-page::candidate-true-likeness-yes-input'); }

  get candidateLikenessNo() { return ('des-office-page::candidate-true-likeness-no-input'); }

  get distinguishingFeatureInput() { return ('des-office-page::desc-of-candidate-input'); }

  get photoCardButton() { return ('des-office-page::identification-photo-card-input'); }

  get passportButton() { return ('des-office-page::identification-passport-input'); }

  get showMeQuestionSelector() { return ('des-office-page::show-me-question-selector'); }

  get weatherConditionsSelector() { return ('des-office-page::weather-conditions-selector'); }

  async completeOfficePage(data: any): Promise<void> {
    const {
      activityCode, routeNumber, independentDriving, trueLikeness, distinguishingFeatures,
      identification, showMeQuestion, weatherCondition,
    } = data;

    if (activityCode.toLowerCase() !== 'na') {
      // Code will need to be inputted for Unsuccesful and Terminated tests
    }

    await setInputField('add', routeNumber, this.routeNumberInput);

    if (independentDriving.toLowerCase() !== 'na') {
      if (independentDriving.toLowerCase() === 'sat nav') {
        await clickElement('click', 'selector', this.satNavButton);
      }
      if (independentDriving.toLowerCase() === 'traffic signs') {
        await clickElement('click', 'selector', this.trafficSignsButton);
      }
    }

    if (trueLikeness.toLowerCase() !== 'na') {
      if (trueLikeness.toLowerCase() === 'yes') {
        await clickElement('click', 'selector', this.candidateLikenessYes);
      }
      if (trueLikeness.toLowerCase() === 'no') {
        await clickElement('click', 'selector', this.candidateLikenessNo);
      }
    }

    await scroll(this.distinguishingFeatureInput);

    await setInputField('add', distinguishingFeatures, this.distinguishingFeatureInput);

    await scroll(this.photoCardButton);

    if (identification.toLowerCase() !== 'na') {
      if (identification.toLowerCase() === 'photo card') {
        await clickElement('click', 'selector', this.photoCardButton);
      }
      if (identification.toLowerCase() === 'passport') {
        await clickElement('click', 'selector', this.passportButton);
      }
    }

    await scroll(this.showMeQuestionSelector);

    if (showMeQuestion.toLowerCase() !== 'na') {
      await clickElement('click', 'selector', this.showMeQuestionSelector);
      await clickElementWithText('click', 'button', showMeQuestion);
      await clickElementWithText('click', 'element', 'Submit');
    }

    await scroll(this.weatherConditionsSelector);

    if (showMeQuestion.toLowerCase() !== 'na') {
      await clickElement('click', 'selector', this.weatherConditionsSelector);
      await clickElementWithText('click', 'button', weatherCondition);
      await clickElementWithText('click', 'element', 'Submit');
    }
  }
}

export default new OfficePageObject();
