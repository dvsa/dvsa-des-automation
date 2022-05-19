import DataTable from '@cucumber/cucumber/lib/models/data_table';
import WaitingRoomToCarPageObject from '../../pageobjects/des/waitingRoomToCar.pageobject';

export default async (table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await WaitingRoomToCarPageObject.completeWRTCPageDataTable(data);
};
