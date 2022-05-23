import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (category:string) => {
  await TestReportPageObject.completeLegalRequirements(category);
};
