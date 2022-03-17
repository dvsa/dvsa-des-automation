import checkIfElementExists from '@shared-boilerplate/support/lib/checkIfElementExists';
import PageObjectsHelper from '../../helpers/pageobjectHelper';

export default (
  menuid: string,
) => {
  const elementSelector = PageObjectsHelper.elementPageFor(menuid);

  checkIfElementExists(elementSelector);
  $(elementSelector).click({ x: 200 });
};
