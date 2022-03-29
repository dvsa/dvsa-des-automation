import OfficePageObject from '../../pageobjects/des/office.pageobject';

export default async (table: any) => {
  const data = table.rowsHash();

  await OfficePageObject.completeOfficePage(data);
};
