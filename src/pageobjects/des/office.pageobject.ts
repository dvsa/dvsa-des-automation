import scroll from '@shared-boilerplate/support/action/scroll';
import { getElementByReference } from '@shared-helpers/element-reference-helper';
import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import clickElementWithText from '../../../shared/custom/support/action/clickElementWithText';

interface OfficePageData {
  routeNumber: number;
  distinguishingFeatures: string;
  showMeQuestion: string;
  weatherCondition: string;
  faultComment: string;
  eyesightFaultComment: string
}
class OfficePageObject extends Page {
  /* eslint-disable no-case-declarations, no-await-in-loop */

  get routeNumberInput() { return ('des-office-page::route-number-input'); }

  get satNavButton() { return ('des-office-page::independant-driving-sat-nav-input'); }

  get trafficSignsButton() { return ('des-office-page::independant-driving-traffice-signs-input'); }

  get diagramButton() { return ('des-office-page::independant-driving-diagram-input'); }

  get candidateLikenessYes() { return ('des-office-page::candidate-true-likeness-yes-input'); }

  get candidateLikenessNo() { return ('des-office-page::candidate-true-likeness-no-input'); }

  get distinguishingFeatureInput() { return ('des-office-page::desc-of-candidate-input'); }

  get photoCardButton() { return ('des-office-page::identification-photo-card-input'); }

  get passportButton() { return ('des-office-page::identification-passport-input'); }

  get showMeQuestionSelector() { return ('des-office-page::show-me-question-selector'); }

  get weatherConditionsSelector() { return ('des-office-page::weather-conditions-selector'); }

  get eyesightFaultComment() { return ('des-office-page::serious-fault-comment-eyesight-input'); }

  get seriousFaultComment() { return ('des-office-page::serious-comment-controls-accelerator'); }

  get genericFaultCommentBox() { return ('des-office-page::general-fault-comment-input'); }

  async completeOfficePage(
    data: Record<keyof OfficePageData, string>,
  ): Promise<void> {
    const {
      routeNumber, distinguishingFeatures, showMeQuestion, weatherCondition,
    } = data;

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();

      if (fieldInput !== 'na') {
        switch (field) {
          case 'activitycode':
            // @TODO: Code will need to be inputted for Unsuccesful and Terminated tests
            break;
          case 'routenumber':
            await setInputField('add', routeNumber, this.routeNumberInput);
            break;
          case 'independentdriving':
            switch (fieldInput) {
              case 'sat nav':
                await clickElement('click', 'selector', this.satNavButton);
                break;
              case 'traffic signs':
                await clickElement('click', 'selector', this.trafficSignsButton);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'truelikeness':
            switch (fieldInput) {
              case 'yes':
                await clickElement('click', 'selector', this.candidateLikenessYes);
                break;
              case 'no':
                await clickElement('click', 'selector', this.candidateLikenessNo);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'distinguishingfeatures':
            await scroll(this.distinguishingFeatureInput);
            await setInputField('add', distinguishingFeatures, this.distinguishingFeatureInput);
            break;
          case 'identification':
            await scroll(this.photoCardButton);
            switch (fieldInput) {
              case 'photo card':
                await clickElement('click', 'selector', this.photoCardButton);
                break;
              case 'passport':
                await clickElement('click', 'selector', this.passportButton);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'showmequestion':
            await scroll(this.showMeQuestionSelector);
            await clickElement('click', 'selector', this.showMeQuestionSelector);
            await clickElementWithText('click', 'button', showMeQuestion);
            await clickElementWithText('click', 'element', 'Submit');
            break;
          case 'weathercondition':
            await scroll(this.weatherConditionsSelector);
            await clickElement('click', 'selector', this.weatherConditionsSelector);
            await clickElementWithText('click', 'button', weatherCondition);
            await clickElementWithText('click', 'element', 'Submit');
            break;
          default:
            console.log(`Could not find ${field}`);
        }
      }
    }
  }

  async completeUnsuccessfullOfficePage(
    data: Record<keyof OfficePageData, string>,
  ): Promise<void> {
    const {
      routeNumber, distinguishingFeatures, showMeQuestion, weatherCondition, faultComment,
      eyesightFaultComment,
    } = data;

    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();

      if (fieldInput !== 'na') {
        switch (field) {
          case 'activitycode':
            // Code will need to be inputted for Unsuccesful and Terminated tests
            break;
          case 'routenumber':
            await setInputField('add', routeNumber, this.routeNumberInput);
            break;
          case 'independentdriving':
            switch (fieldInput) {
              case 'sat nav':
                await clickElement('click', 'selector', this.satNavButton);
                break;
              case 'traffic signs':
                await clickElement('click', 'selector', this.trafficSignsButton);
                break;
              case 'diagram':
                await clickElement('click', 'selector', this.diagramButton);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'truelikeness':
            switch (fieldInput) {
              case 'yes':
                await clickElement('click', 'selector', this.candidateLikenessYes);
                break;
              case 'no':
                await clickElement('click', 'selector', this.candidateLikenessNo);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'distinguishingfeatures':
            await scroll(this.distinguishingFeatureInput);
            await setInputField('add', distinguishingFeatures, this.distinguishingFeatureInput);
            break;
          case 'identification':
            await scroll(this.photoCardButton);
            switch (fieldInput) {
              case 'photo card':
                await clickElement('click', 'selector', this.photoCardButton);
                break;
              case 'passport':
                await clickElement('click', 'selector', this.passportButton);
                break;
              default:
                console.log(`Could not find ${fieldInput}`);
            }
            break;
          case 'showmequestion':
            await scroll(this.showMeQuestionSelector);
            await clickElement('click', 'selector', this.showMeQuestionSelector);
            await clickElementWithText('click', 'button', showMeQuestion);
            await clickElementWithText('click', 'element', 'Submit');
            break;
          case 'weathercondition':
            await scroll(this.weatherConditionsSelector);
            await clickElement('click', 'selector', this.weatherConditionsSelector);
            await clickElementWithText('click', 'button', weatherCondition);
            await clickElementWithText('click', 'element', 'Submit');
            break;
          case 'faultcomment':
            const getElementRefForPage = getElementByReference(this.genericFaultCommentBox);
            const nrOfElements = await $$(getElementRefForPage);
            for (let i = 0; i < nrOfElements.length; i += 1) {
              const faultCommentElement = `(${nrOfElements[i].selector})[${i + 1}]`;
              await scroll(faultCommentElement);
              await setInputField('add', faultComment, faultCommentElement);
            }
            break;
          case 'eyesightfaultcomment':
            await scroll(this.eyesightFaultComment);
            await setInputField('add', eyesightFaultComment, this.eyesightFaultComment);
            break;
          default:
            console.log(`Could not find ${field}`);
        }
      }
    }
  }
}

export default new OfficePageObject();
