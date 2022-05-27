/* eslint-disable no-await-in-loop */
import longClickElement from '@shared-custom/support/action/longClickElement';
import Page from '../base/page';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import waitFor from '../../../shared/boilerplate/support/action/waitFor';

class TestReportPageObject extends Page {
  get firstNSLegalReqTick() {
    return ('des-test-report-screen::test-requirement-first-ns-tick');
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

  async completeLegalRequirementsForCatC(): Promise<void> {
    await longClickElement(this.firstNSLegalReqTick, 500);
    await longClickElement(this.secondNSLegalReqTick, 500);
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
