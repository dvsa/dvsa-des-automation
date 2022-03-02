import addnoticespagePageobject from '../../../pageobjects/search/addnoticespage.pageobject';

export default (noticeName: any, dataTable:any) => {
  addnoticespagePageobject.addNoticeByName(noticeName, dataTable);
};
