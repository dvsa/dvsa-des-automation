import WaitingRoomToCarPageObject from '../../pageobjects/des/waitingRoomToCar.pageobject';
import DataTable from '@cucumber/cucumber/lib/models/data_table';

export default async (table: DataTable): Promise<void> => {
  const data = table.rowsHash();

  await WaitingRoomToCarPageObject.completeWRTCPageDataTable(data);
};
