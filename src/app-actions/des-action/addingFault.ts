import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  fault: string,
  selector: string,
) => {
  await TestReportPageObject.addingFault(fault, selector);
};
