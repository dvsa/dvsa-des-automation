import DataTable from '@cucumber/cucumber/lib/models/data_table';
import TestReportPageObject from '../../pageobjects/des/testReport.pageobject';

export default async (lessonOptionTable: DataTable) => {
  const data = lessonOptionTable.raw();

  await TestReportPageObject.lessonOptionADI3(data);
};
