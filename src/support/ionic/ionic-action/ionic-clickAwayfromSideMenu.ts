import PageObjectsHelper from '../../helpers/pageobjectHelper';
import checkIfElementExists from '../../lib/checkIfElementExists';

export default (
    menuid: string
) => {
    const elementSelector =  PageObjectsHelper.elementPageFor(menuid);

    checkIfElementExists(elementSelector);
    $(elementSelector).click({x:200})
};
