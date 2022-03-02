import Page from '../base/page';

class TestReportPageObject extends Page {
  selectCompetencyButton(competencyItem:string) {
    $(`competency-button='${competencyItem}'`).waitForDisplayed();
    return $(`competency-button='${competencyItem}'`).click();
  }

  waitForHeaderSectionDisplayed(headertitle:string) {
    return $(`.section-header="${headertitle}"`).waitForDisplayed();
  }
}

export default new TestReportPageObject();
