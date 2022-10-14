import Page from '../../../src/pageobjects/base/page';

describe('base page object', () => {
  const basePageObject = new Page();
  it('should be truthy', () => {
    expect(basePageObject.title).toEqual('My Page');
  });
});
