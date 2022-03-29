import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (
  competencyItem: string,
) => {
  await TestReportPageObject.selectCompetencyButton(competencyItem);
};
