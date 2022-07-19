import PageobjectHelper, { PageObjectsHelper } from './pageobjectHelper';

describe('pageobjectHelper', () => {
  let page: typeof PageobjectHelper;
  beforeEach(() => {
    page = new PageObjectsHelper();
  });
  // Unit test is for demo purposes only
  describe('loadGlobalElements', () => {
    it('should return the correct json path for search', () => {
      const path = page.loadGlobalElements();
      expect(path).toEqual('../globalelements/globalelements.json');
    });
  });
});
