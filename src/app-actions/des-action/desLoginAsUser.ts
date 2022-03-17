import loginPageobject from '../../pageobjects/des/login.pageobject';

export default async (
  typeOfUser: string,
) => {
  await loginPageobject.login(typeOfUser);
};
