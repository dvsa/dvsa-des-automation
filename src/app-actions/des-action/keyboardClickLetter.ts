import Page from '../../pageobjects/base/page';

export default async (
  letter:string,
) => {
  await Page.keyboardClickLetter(letter);
};
