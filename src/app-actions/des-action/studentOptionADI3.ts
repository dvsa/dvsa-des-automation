import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  studentOption: 'Partly trained'|'Trained'|'FLH New'|'FLH experienced',
) => {
  await TestReportPageObject.studentOptionADI3(studentOption);
};
