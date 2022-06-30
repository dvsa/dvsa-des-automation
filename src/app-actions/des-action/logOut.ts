import loginPageobject from '../../pageobjects/des/login.pageobject';

export default async () => {
  await loginPageobject.logout();
};
