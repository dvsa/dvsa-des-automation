import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  score:number,
  questionNumber:number,
  obsolete:any,
  section:string,
) => {
  await TestReportPageObject.testReportADI3Questions(score, questionNumber, section);
};
