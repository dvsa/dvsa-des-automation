import Page from '../base/page';

class Tab1Page extends Page {
  get firstname() { return this.getSelector('ionicapp-homepage::firstname'); }

  get lastname() { return this.getSelector('ionicapp-homepage::lastname'); }

  get email() { return this.getSelector('ionicapp-homepage::email'); }

  get age() { return this.getSelector('ionicapp-homepage::age'); }

  get dateofbirth() { return this.getSelector('ionicapp-homepage::dateofbirth'); }

  get aboutme() { return this.getSelector('ionicapp-homepage::aboutme'); }

  get submitbutton() { return this.getSelector('ionicapp-homepage::submitbutton'); }

  get starttime() { return this.getSelector('ionicapp-homepage::starttime'); }

  get startdate() { return this.getSelector('ionicapp-homepage::startdate'); }

  get enddate() { return this.getSelector('ionicapp-homepage::enddate'); }

  get soemthingelse() { return this.getSelector('ionicapp-homepage::enddate'); }

  // get firstname() { return $('#firstNameTextbox input') }
  // get lastname() { return $('#lastNameTextbox input') }
  // get email() { return $('#emailTextbox input') }
  // get age() { return $('#ageTextbox input') }
  // get dateofbirth() { return $('#dateOfBirth') }
  // get aboutme() { return $('#aboutmeTextBox div textarea') }
  // get submitbutton() { return $('#submitButton') }
  // get starttime() { return $('#startTime') }
  // get startdate() { return $('#startdate') }
  // get enddate() { return $('#endDate') }

  open() {
    super.open('login');
  }

  submit() {
    this.submitbutton.click();
  }

  fillFields(data: any) {
    const {
      firstname, lastname, email, age, aboutme,
    } = data;
    // console.log(firstname, lastname, email, aboutme, age);

    // Click some buttons here
    for (const property in data) {
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data[property]);
      this[property].waitForEnabled();
      this[property].scrollIntoView();
      this[property].setValue(data[property]);
    }

    // And then fill in some more here!

    // this.firstname.setValue(firstname);
    // this.lastname.setValue(lastname);
    // this.email.setValue(email);
    // this.age.setValue(age);
    // this.aboutme.scrollIntoView();
    // this.aboutme.setValue(aboutme);
  }

  fillManatoryFields() {
    // this.username.setValue('hello');
  }
}

export default new Tab1Page();
