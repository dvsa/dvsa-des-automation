import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  letter:string,
) => {
  await TestReportPageObject.keyboardClickLetter(letter);
};
