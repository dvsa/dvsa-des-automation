import loginPageobject from '../../pageobjects/des/login.pageobject';

export default (
  typeOfUser: string
) => {
  loginPageobject.loginWebAsUser(typeOfUser);
};
