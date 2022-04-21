import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  faultCount: number,
  fault: string,
  optional: boolean,
  selector: string,
) => {
  await TestReportPageObject.addingFault(faultCount, fault, selector);
};
