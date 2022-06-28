import WaitingRoomPageObject from '../../pageobjects/des/waitingRoom.pageobject';

export default async (category:string) => {
  await WaitingRoomPageObject.completeDeclartionPage(category);
};
