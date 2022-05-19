import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import clickElementWithText from '../../../shared/custom/support/action/clickElementWithText';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import Page from '../base/page';

interface WaitingRoomToCarPageDataCatB {
  eyesightTest: 'pass'|'fail';
  tellMeQuestion:string;
  tellMeQuestionFault:'correct'|'1 driving fault'
  vehicleRegNum:string;
  transmission:'manual'|'automatic';
  instructorRegNum:string;
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  vehicleDetails:'school car'|'dual control';
}

interface WaitingRoomToCarPageDataCatC {
  vehicleRegNum:string;
  showMeQuestion1:string;
  showMeQuestion2:string;
  showMeQuestion3:string;
  tellMeQuestion1:string;
  tellMeQuestion2:string;
  showMeQuestion1Fault:'correct'|'1 driving fault'
  showMeQuestion2Fault:'correct'|'1 driving fault'
  showMeQuestion3Fault:'correct'|'1 driving fault'
  tellMeQuestion1Fault:'correct'|'1 driving fault'
  tellMeQuestion2Fault:'correct'|'1 driving fault'
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
}

interface CombinedInterface {
  catB: WaitingRoomToCarPageDataCatB
  catC: WaitingRoomToCarPageDataCatC
}

class WaitingRoomPageToCarObject extends Page {
  get eyeSightPassLabel() { return ('des-waiting-room-to-car::eyesight-pass-label'); }

  get tellMeSeclector() { return ('des-waiting-room-to-car::tell-me-selector'); }

  get tellMeAnswerCorrectLabel() { return ('des-waiting-room-to-car::tell-me-answer-correct-label'); }

  get tellMeAnswerOneDrivingFaultLabel() { return ('des-waiting-room-to-car::tell-me-answer-fault-label'); }

  get vehRegInput() { return ('des-waiting-room-to-car::vehicle-registration-input-input'); }

  get manualTransmissionLabel() { return ('des-waiting-room-to-car::manual-transmission-label'); }

  get automaticTransmissionLabel() { return ('des-waiting-room-to-car::automatic-transmission-label'); }

  get continueToTestReportButton() { return ('des-waiting-room-to-car::continue-to-test-report-btn'); }

  get eyeSightFailLabel() { return ('des-waiting-room-to-car::eyesight-fail-label'); }

  get instructorRegNum() { return ('des-waiting-room-to-car::instructor-registration-input'); }

  get accompaniedByInstructorLabel() { return ('des-waiting-room-to-car::accompanied-instructor-label'); }

  get accompaniedBySupervisorLabel() { return ('des-waiting-room-to-car::accompanied-supervisor-label'); }

  get accompaniedByInterpreterLabel() { return ('des-waiting-room-to-car::accompanied-interpreter-label'); }

  get accompaniedByOtherLabel() { return ('des-waiting-room-to-car::accompanied-other-label'); }

  get vehicleDetailsSchoolCarLabel() { return ('des-waiting-room-to-car::vehicle-details-school-car-label'); }

  get vehicleDetailsDualControlLabel() { return ('des-waiting-room-to-car::vehicle-details-dual-label'); }

  get vehicleChecksShowQuestionsButton() { return ('des-waiting-room-to-car::vehicle-checks-show-questions-button'); }

  get firstShowMeQuestion() { return ('des-waiting-room-to-car::first-show-me-question'); }

  get secondShowMeQuestion() { return ('des-waiting-room-to-car::second-show-me-question'); }

  get thirdShowMeQuestion() { return ('des-waiting-room-to-car::third-show-me-question'); }

  get firstTellMeQuestion() { return ('des-waiting-room-to-car::first-tell-me-question'); }

  get secondTellMeQuestion() { return ('des-waiting-room-to-car::second-tell-me-question'); }

  get firstShowMeQuestionCorrectLabel() { return ('des-waiting-room-to-car::first-show-me-question-correct-label'); }

  get firstShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::first-show-me-question-fault-label'); }

  get secondShowMeQuestionCorrectLabel() { return ('des-waiting-room-to-car::second-show-me-question-correct-label'); }

  get secondShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::second-show-me-question-fault-label'); }

  get thirdShowMeQuestionCorrectLabel() { return ('des-waiting-room-to-car::third-show-me-question-correct-label'); }

  get thirdShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::third-show-me-question-fault-label'); }

  get firstTellMeQuestionCorrectLabel() { return ('des-waiting-room-to-car::first-tell-me-question-correct-label'); }

  get firstTellMeQuestionFaultLabel() { return ('des-waiting-room-to-car::first-tell-me-question-fault-label'); }

  get secondTellMeQuestionCorrectLabel() { return ('des-waiting-room-to-car::second-tell-me-question-correct-label'); }

  get secondTellMeQuestionFaultLabel() { return ('des-waiting-room-to-car::second-tell-me-question-fault-label'); }

  get submitVehicleChecks() { return ('des-waiting-room-to-car::submit-vehicle-checks'); }

  get continueToDebriefButton() { return ('des-waiting-room-to-car::continue-to-debrief-btn'); }

  get catCVehicleChecks() { return ('des-waiting-room-to-car::vehicle-check-select-questions-btn'); }

  get vehicleChecksOne() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-one'); }

  get vehicleChecksTwo() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-two'); }

  get vehicleChecksThree() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-three'); }

  get vehicleChecksFour() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-four'); }

  get vehicleChecksFive() { return ('des-waiting-room-to-car::vehicle-checks-question-selector-five'); }

  get vehicleChecksCorrectOne() { return ('des-waiting-room-to-car::vehicleChecksCorrectOne'); }

  get vehicleChecksCorrectTwo() { return ('des-waiting-room-to-car::vehicleChecksCorrectTwo'); }

  get vehicleChecksCorrectThree() { return ('des-waiting-room-to-car::vehicleChecksCorrectThree'); }

  get vehicleChecksCorrectFour() { return ('des-waiting-room-to-car::vehicleChecksCorrectFour'); }

  get vehicleChecksCorrectFive() { return ('des-waiting-room-to-car::vehicleChecksCorrectFive'); }

  get submitVehicleChecks() { return ('des-waiting-room-to-car::submit-vehicle-checks'); }

  async completeWRTCPage(): Promise<void> {
    await clickElement('click', 'selector', this.eyeSightPassLabel);
    await clickElement('click', 'selector', this.tellMeSeclector);
    await clickElementWithText('click', 'button', 'T1 - Brakes');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.tellMeAnswerCorrectLabel);
    await setInputField('add', 'vehreg', this.vehRegInput);
    await clickElement('click', 'selector', this.manualTransmissionLabel);
    await clickElement('click', 'selector', this.continueToTestReportButton);
  }

  async completeCatCWRTCPage(): Promise<void> {
    await setInputField('add', 'vehreg', this.vehRegInput);

    await clickElement('click', 'selector', this.catCVehicleChecks);
    await clickElement('click', 'selector', this.vehicleChecksOne);
    await clickElementWithText('click', 'button', 'Q2 - Air leaks');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectOne);

    await clickElement('click', 'selector', this.vehicleChecksTwo);
    await clickElementWithText('click', 'button', 'Q6 - Mudguards condition');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectTwo);

    await clickElement('click', 'selector', this.vehicleChecksThree);
    await clickElementWithText('click', 'button', 'Q15 - Brake lights');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectThree);

    await clickElement('click', 'selector', this.vehicleChecksFour);
    await clickElementWithText('click', 'button', 'Q9 - Body safety');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectFour);

    await clickElement('click', 'selector', this.vehicleChecksFive);
    await clickElementWithText('click', 'button', 'Q16 - Engine coolant');
    await clickElementWithText('click', 'element', 'Submit');
    await clickElement('click', 'selector', this.vehicleChecksCorrectFive);

    await clickElement('click', 'selector', this.submitVehicleChecks);
    await clickElement('click', 'selector', this.continueToTestReportButton);
  }

  async addVehicleQuestion(question:string, value:string): Promise<void> {
    await clickElement('click', 'selector', question);
    await clickElementWithText('click', 'button', value);
    await clickElementWithText('click', 'element', 'Submit');
  }

  async completeWRTCPageForCatB(
    data: Record<keyof CombinedInterface, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'eyesighttest':
            switch (fieldInput) {
              case 'pass':
                await clickElement('click', 'selector', this.eyeSightPassLabel);
                break;
              case 'fail':
                await clickElement('click', 'selector', this.eyeSightFailLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'tellmequestion':
            await clickElement('click', 'selector', this.tellMeSeclector);
            await clickElementWithText('click', 'button', value);
            await clickElementWithText('click', 'element', 'Submit');
            break;
          case 'tellmequestionfault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.tellMeAnswerCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.tellMeAnswerOneDrivingFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'transmission':
            switch (fieldInput) {
              case 'manual':
                await clickElement('click', 'selector', this.manualTransmissionLabel);
                break;
              case 'automatic':
                await clickElement('click', 'selector', this.automaticTransmissionLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'instructorregnum':
            await setInputField('add', fieldInput, this.instructorRegNum);
            break;
          case 'accompaniedby':
            switch (fieldInput) {
              case 'instructor':
                await clickElement('click', 'selector', this.accompaniedByInstructorLabel);
                break;
              case 'supervisor':
                await clickElement('click', 'selector', this.accompaniedBySupervisorLabel);
                break;
              case 'interpreter':
                await clickElement('click', 'selector', this.accompaniedByInterpreterLabel);
                break;
              case 'other':
                await clickElement('click', 'selector', this.accompaniedByOtherLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'vehicledetails':
            switch (fieldInput) {
              case 'school car':
                await clickElement('click', 'selector', this.vehicleDetailsSchoolCarLabel);
                break;
              case 'dual control':
                await clickElement('click', 'selector', this.vehicleDetailsDualControlLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatC(
    data: Record<keyof CombinedInterface, string>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'showmequestion1':
            await clickElement('click', 'selector', this.vehicleChecksShowQuestionsButton);
            await this.addVehicleQuestion(this.firstShowMeQuestion, value);
            break;
          case 'showmequestion2':
            await this.addVehicleQuestion(this.secondShowMeQuestion, value);
            break;
          case 'showmequestion3':
            await this.addVehicleQuestion(this.thirdShowMeQuestion, value);
            break;
          case 'tellmequestion1':
            await this.addVehicleQuestion(this.firstTellMeQuestion, value);
            break;
          case 'tellmequestion2':
            await this.addVehicleQuestion(this.secondTellMeQuestion, value);
            break;
          case 'showmequestion1fault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.firstShowMeQuestionCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.firstShowMeQuestionFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'showmequestion2fault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.secondShowMeQuestionCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.secondShowMeQuestionFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'showmequestion3fault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.thirdShowMeQuestionCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.thirdShowMeQuestionFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'tellmequestion1fault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.firstTellMeQuestionCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.firstTellMeQuestionFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          case 'tellmequestion2fault':
            switch (fieldInput) {
              case 'correct':
                await clickElement('click', 'selector', this.secondTellMeQuestionCorrectLabel);
                break;
              case '1 driving fault':
                await clickElement('click', 'selector', this.secondTellMeQuestionFaultLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            await clickElement('click', 'selector', this.submitVehicleChecks);
            break;
          case 'accompaniedby':
            switch (fieldInput) {
              case 'instructor':
                await clickElement('click', 'selector', this.accompaniedByInstructorLabel);
                break;
              case 'supervisor':
                await clickElement('click', 'selector', this.accompaniedBySupervisorLabel);
                break;
              case 'interpreter':
                await clickElement('click', 'selector', this.accompaniedByInterpreterLabel);
                break;
              case 'other':
                await clickElement('click', 'selector', this.accompaniedByOtherLabel);
                break;
              default:
                console.info(`Could not find ${fieldInput}`);
            }
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageDataTable(
    data: Record<keyof CombinedInterface, string>,
    category:string,
  ): Promise<void> {
    const cat = category.toLowerCase();
    switch (cat) {
      case 'b':
        await this.completeWRTCPageForCatB(data);
        break;
      case 'c':
        await this.completeWRTCPageForCatC(data);
        break;
      default:
        console.info(`${cat} does not exist`);
    }
  }

  async completeWRTCPageForFailEyesight(): Promise<void> {
    await clickElement('click', 'selector', this.eyeSightFailLabel);
    await clickElement('click', 'selector', this.continueToDebriefButton);
  }
}

export default new WaitingRoomPageToCarObject();
