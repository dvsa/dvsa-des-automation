import Page from '../base/page';

class ExamplePage extends Page {
  get username() { return $('#username'); }

  get password() { return $('#password'); }

  get submitBtn() { return $('form button[type="submit"]'); }

  get flash() { return $('#flash'); }

  get headerLinks() { return $$('#header a'); }

  open() {
    super.open('login');
  }

  submit() {
    this.submitBtn.click();
  }

  fillManatoryFields() {
    this.username.setValue('hello');
  }
}

export default new ExamplePage();
