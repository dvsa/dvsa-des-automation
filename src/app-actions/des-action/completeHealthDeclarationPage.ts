import HealthDeclarationScreenPageobject from '../../pageobjects/des/healthDeclarationScreen.pageobject';

export default async (category:string) => {
  await HealthDeclarationScreenPageobject.completeHealthDeclarationPage(category);
};
