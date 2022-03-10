import PageObjectsHelper from '../../helpers/pageobjectHelper';
import checkIfElementExists from '@shared-boilerplate/support/lib/checkIfElementExists';

export default (
    menuid: string
) => {
    const elementSelector =  PageObjectsHelper.elementPageFor(menuid);

    checkIfElementExists(elementSelector);
    $(elementSelector).click({x:200})
};
