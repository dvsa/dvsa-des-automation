/* eslint-disable no-await-in-loop */
import longClickElement from '@shared-custom/support/action/longClickElement';
import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import waitFor from '../../../shared/boilerplate/support/action/waitFor';

class TestReportPageObject extends Page {
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

  selectCompetencyButton(competencyItem:string) {
    $(`competency-button='${competencyItem}'`).waitForDisplayed();
    return $(`competency-button='${competencyItem}'`).click();
  }

  async completeLegalRequirementsForCatB(): Promise<void> {
    await longClickElement(this.firstNSLegalReqTick, 500);
    await longClickElement(this.secondNSLegalReqTick, 500);
    await longClickElement(this.firstASLegalReqTick, 500);
    await longClickElement(this.hsdsLegalReqTick, 500);
    await longClickElement(this.maneuversLegalReqTick, 500);
    await waitFor(this.maneuversReverseRightLegalReqButton, '', false, 'be displayed');
    await clickElement('click', 'selector', this.maneuversReverseRightLegalReqButton);
    await longClickElement(this.maneuversLegalReqTick, 500);
    await longClickElement(this.ecoLegalReqTick, 500);
    await longClickElement(this.showTellLegalReqTick, 500);
  }

  async completeLegalRequirementsForCatCPC(status: string): Promise<void> {
    for (let i = 1; i <= 4; i += 1) {
      await clickElement('click', 'selector', this.answerLabelOne);

      if (status === 'pass') {
        await clickElement('click', 'selector', this.answerLabelTwo);
        await clickElement('click', 'selector', this.answerLabelThree);
        await clickElement('click', 'selector', this.answerLabelFour);
      }

      await clickElement('click', 'selector', this.nextPageButton);
    }
    await clickElement('click', 'selector', this.answerLabelOne);
    await clickElement('click', 'selector', this.answerLabelTwo);
    await clickElement('click', 'selector', this.answerLabelThree);
    await clickElement('click', 'selector', this.answerLabelFour);
    await clickElement('click', 'selector', this.answerLabelFive);
    await clickElement('click', 'selector', this.answerLabelSix);
    await clickElement('click', 'selector', this.answerLabelSeven);
    await clickElement('click', 'selector', this.answerLabelEight);
    await clickElement('click', 'selector', this.answerLabelNine);
    await clickElement('click', 'selector', this.answerLabelTen);
  }

  async completeLegalRequirementsForCatC(): Promise<void> {
    await longClickElement(this.firstNSLegalReqTick, 500);
    await longClickElement(this.secondNSLegalReqTick, 500);
    await longClickElement(this.uhLegalReqTick, 500);
    await longClickElement(this.dhLegalReqTick, 500);
    await longClickElement(this.asCsLegalReqTick, 500);
    await longClickElement(this.ecoLegalReqTick, 500);
  }

  async completeLegalRequirementsForCatD(): Promise<void> {
    await longClickElement(this.NSCatD, 500);
    await longClickElement(this.NSCatD, 500);
    await longClickElement(this.BSCatD, 500);
    await longClickElement(this.BSCatD, 500);
    await longClickElement(this.uhLegalReqTick, 500);
    await longClickElement(this.dhLegalReqTick, 500);
    await longClickElement(this.asCsLegalReqTick, 500);
    await longClickElement(this.ecoLegalReqTick, 500);
  }

  async completeLegalRequirementsForCatManoeuvre(): Promise<void> {
    await longClickElement(this.competencyButton, 500);
  }

  async completeLegalRequirements(category:string): Promise<void> {
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
      default:
        console.info(`${cat} does not exist`);
    }
  }

  async addingFault(faultCount:number, fault: string, selector: string): Promise<void> {
    let i:number = 0;
    while (i < faultCount) {
      switch (fault.toLowerCase()) {
        case 'driving':
          await longClickElement(selector, 500);
          break;
        case 'serious':
          await clickElement('click', 'selector', this.seriousFaultButton);
          await longClickElement(selector, 500);
          break;
        case 'dangerous':
          await clickElement('click', 'selector', this.dangerousFaultButton);
          await longClickElement(selector, 500);
          break;
        default:
          console.error('This is not the correct selector');
      }
      i += 1;
    }
  }
}

export default new TestReportPageObject();
