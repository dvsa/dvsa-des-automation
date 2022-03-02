import tabOnePageobject from '../../../pageobjects/testapp2/tabOne.pageobject';

export default (table: any) => {
  // const elementSelector: Selector = PageObjectsHelper.elementPageFor(selector);

  const data = table.rowsHash();

  tabOnePageobject.fillFields(data);
};
