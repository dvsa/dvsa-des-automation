import scroll from '@shared-boilerplate/support/action/scroll';
import clickElement from '../../../shared/boilerplate/support/action/clickElement';
import clickElementWithText from '../../../shared/custom/support/action/clickElementWithText';
import setInputField from '../../../shared/boilerplate/support/action/setInputField';
import Page from '../base/page';

interface WaitingRoomToCarPageDataCatB {
  eyesightTest: 'pass'|'fail';
  tellMeQuestion:string;
  tellMeQuestionFault:'correct'|'1 driving fault';
  vehicleRegNum:string;
  transmission:'manual'|'automatic';
  instructorRegNum:string;
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  vehicleDetails:'school car'|'dual control';
}
interface WaitingRoomToCarPageDataCatManoeuvre {
  vehicleRegNum:string;
}

interface WaitingRoomToCarPageDataCatCPC {
  vehicleRegNum:string;
  combination:string;
  details:string;
  accompanied:string;
}

interface WaitingRoomToCarPageDataCatC {
  vehicleRegNum:string;
  showMeQuestion1:string;
  showMeQuestion2:string;
  showMeQuestion3:string;
  tellMeQuestion1:string;
  tellMeQuestion2:string;
  showMeQuestion1Fault:'correct'|'1 driving fault';
  showMeQuestion2Fault:'correct'|'1 driving fault';
  showMeQuestion3Fault:'correct'|'1 driving fault';
  tellMeQuestion1Fault:'correct'|'1 driving fault';
  tellMeQuestion2Fault:'correct'|'1 driving fault';
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
}

interface WaitingRoomToCarPageDataCatD {
  vehicleRegNum:string;
  showMeQuestion1:string;
  showMeQuestion2:string;
  showMeQuestion3:string;
  tellMeQuestion1:string;
  tellMeQuestion2:string;
  showMeQuestion1Fault:'correct'|'1 driving fault';
  showMeQuestion2Fault:'correct'|'1 driving fault';
  emergencyExit:'correct'|'1 driving fault';
  tellMeQuestion1Fault:'correct'|'1 driving fault';
  tellMeQuestion2Fault:'correct'|'1 driving fault';
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  showMeQuestion3Fault:'correct'|'1 driving fault';
  fireExtinguisher:'correct'|'1 driving fault';
  fuelCutoff:'school bike';
}

interface WaitingRoomToCarPageDataCatMod1 {
  categoryType:'AM' | 'A1' | 'A2' | 'A';
  transmission:'manual'|'automatic';
  vehicleRegNum:string;
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  vehicleDetails:'school bike';
}

interface WaitingRoomToCarPageDataCatMod2 {
  categoryType:'AM' | 'A1' | 'A2' | 'A';
  transmission:'manual'|'automatic';
  eyesightTest: 'pass'|'fail';
  vehicleRegNum:string;
  safetyQuestion1:string;
  safetyQuestion2:string;
  balanceQuestion1:string;
  safetyQuestion1Fault:'correct'|'wrong answer';
  safetyQuestion2Fault:'correct'|'wrong answer';
  balanceQuestion1Fault:'correct'|'wrong answer';
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  vehicleDetails:'school bike';
}

interface WaitingRoomToCarPageDataCatADI2 {
  eyesightTest: 'pass'|'fail';
  tellMeQuestion1:string;
  tellMeQuestion2:string;
  tellMeQuestion3:string;
  tellMeQuestion1Fault:'correct'|'1 driving fault';
  tellMeQuestion2Fault:'correct'|'1 driving fault';
  tellMeQuestion3Fault:'correct'|'1 driving fault';
  vehicleRegNum:string;
  transmission:'manual'|'automatic';
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  vehicleDetails:'school car'|'dual control';
  orditTrainer:'yes'|'no';
  trainerPRN:string;
  trainingRecords:'yes'|'no';
}

interface WaitingRoomToCarPageDataCatHome {
  eyesightTest: 'pass'|'fail';
  showMeQuestion:string;
  tellMeQuestion:string;
  showMeQuestionFault:'correct'|'1 driving fault';
  tellMeQuestionFault:'correct'|'1 driving fault';
  vehicleRegNum:string;
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
}

interface WaitingRoomToCarPageDataCatADI3 {
  vehicleRegNum:string;
  duelControls:'yes'|'no';
  transmission:'manual'|'automatic';
  pdiLogbook:'yes'|'no';
  traineeLicence:'yes'|'no';
  orditTrainer:'yes'|'no';
  accompaniedBy:'instructor'|'supervisor'|'interpreter'|'other';
  trainerPRN:string;
}

class WaitingRoomPageToCarObject extends Page {
  get eyeSightPassLabel() { return ('des-waiting-room-to-car::eyesight-pass-label'); }

  get tellMeSeclector() { return ('des-waiting-room-to-car::tell-me-selector'); }

  get tellMeAnswerCorrectLabel() { return ('des-waiting-room-to-car::tell-me-answer-correct-label'); }

  get tellMeAnswerOneDrivingFaultLabel() { return ('des-waiting-room-to-car::tell-me-answer-fault-label'); }

  get vehRegInput() { return ('des-waiting-room-to-car::vehicle-registration-input-input'); }

  get manualTransmissionLabel() { return ('des-waiting-room-to-car::manual-transmission-label'); }

  get automaticTransmissionLabel() { return ('des-waiting-room-to-car::automatic-transmission-label'); }

  get eyeSightFailLabel() { return ('des-waiting-room-to-car::eyesight-fail-label'); }

  get instructorRegNum() { return ('des-waiting-room-to-car::instructor-registration-input'); }

  get accompaniedByInstructorLabel() { return ('des-waiting-room-to-car::accompanied-instructor-label'); }

  get accompaniedBySupervisorLabel() { return ('des-waiting-room-to-car::accompanied-supervisor-label'); }

  get accompaniedByInterpreterLabel() { return ('des-waiting-room-to-car::accompanied-interpreter-label'); }

  get accompaniedByOtherLabel() { return ('des-waiting-room-to-car::accompanied-other-label'); }

  get vehicleDetailsSchoolCarLabel() { return ('des-waiting-room-to-car::vehicle-details-school-car-label'); }

  get vehicleDetailsDualControlLabel() { return ('des-waiting-room-to-car::vehicle-details-dual-label'); }

  get vehicleChecksShowQuestionsButton() { return ('des-waiting-room-to-car::vehicle-checks-show-questions-button'); }

  get firstVehicleCheckQuestion() { return ('des-waiting-room-to-car::first-show-me-question'); }

  get secondVehicleCheckQuestion() { return ('des-waiting-room-to-car::second-show-me-question'); }

  get thirdVehicleCheckQuestion() { return ('des-waiting-room-to-car::third-show-me-question'); }

  get fourthVehicleCheckQuestion() { return ('des-waiting-room-to-car::first-tell-me-question'); }

  get fifthVehicleCheckQuestion() { return ('des-waiting-room-to-car::second-tell-me-question'); }

  get firstVehicleCheckQuestionCorrectLabel() { return ('des-waiting-room-to-car::first-show-me-question-correct-label'); }

  get firstShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::first-show-me-question-fault-label'); }

  get secondVehicleCheckQuestionCorrectLabel() { return ('des-waiting-room-to-car::second-show-me-question-correct-label'); }

  get secondShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::second-show-me-question-fault-label'); }

  get thirdVehicleCheckQuestionCorrectLabel() { return ('des-waiting-room-to-car::third-show-me-question-correct-label'); }

  get thirdShowMeQuestionFaultLabel() { return ('des-waiting-room-to-car::third-show-me-question-fault-label'); }

  get fourthVehicleCheckCorrectLabel() { return ('des-waiting-room-to-car::first-tell-me-question-correct-label'); }

  get firstTellMeQuestionFaultLabel() { return ('des-waiting-room-to-car::first-tell-me-question-fault-label'); }

  get fifthVehicleCheckQuestionCorrectLabel() { return ('des-waiting-room-to-car::second-tell-me-question-correct-label'); }

  get secondTellMeQuestionFaultLabel() { return ('des-waiting-room-to-car::second-tell-me-question-fault-label'); }

  get submitVehicleChecks() { return ('des-waiting-room-to-car::submit-vehicle-checks'); }

  get continueToDebriefButton() { return ('des-waiting-room-to-car::continue-to-debrief-btn'); }

  get fireExtinguisher() { return ('des-waiting-room-to-car::safety-questions-correct-6'); }

  get emergencyExit() { return ('des-waiting-room-to-car::safety-questions-correct-7'); }

  get fuelCutoff() { return ('des-waiting-room-to-car::safety-questions-correct-8'); }

  get combination() { return ('des-waiting-room-to-car::combination'); }

  get articulated() { return ('des-waiting-room-to-car::articulated'); }

  get drawbar() { return ('des-waiting-room-to-car::drawbar'); }

  get rigid() { return ('des-waiting-room-to-car::rigid'); }

  get catType() { return ('des-waiting-room-to-car::category-type'); }

  get vehicleDetailsSchoolBike() { return ('des-waiting-room-to-car::vehicle-details-school-bike-label'); }

  get safetyBalanceShowQuestionButton() { return ('des-waiting-room-to-car::safety-balance-question-button'); }

  get firstSafetyQuestionFaultLabel() { return ('des-waiting-room-to-car::first-safety-question-fault-label'); }

  get secondSafetyQuestionFaultLabel() { return ('des-waiting-room-to-car::second-safety-question-fault-label'); }

  get firstBalanceQuestionFaultLabel() { return ('des-waiting-room-to-car::first-balance-question-fault-label'); }

  get submitVehicleChecksButton() { return ('des-waiting-room-to-car::safety-balance-questions-continue-button'); }

  get orditTrainedYesInput() { return ('des-waiting-room-to-car::ordit-trainer-yes-input'); }

  get orditTrainedNoInput() { return ('des-waiting-room-to-car::ordit-trainer-no-input'); }

  get trainedPRNInput() { return ('des-waiting-room-to-car::trainer-prn-input'); }

  get trainingRecordsYesInput() { return ('des-waiting-room-to-car::training-records-yes-input'); }

  get trainingRecordsNoInput() { return ('des-waiting-room-to-car::training-records-no-input'); }

  get duelControlsYesLabel() { return ('des-waiting-room-to-car::duel-controls-yes-label'); }

  get duelControlsNoLabel() { return ('des-waiting-room-to-car::duel-controls-no-label'); }

  get pdiLogbookYesLabel() { return ('des-waiting-room-to-car::pdi-logbook-yes-label'); }

  get pdiLogbookNoLabel() { return ('des-waiting-room-to-car::pdi-logbook-no-label'); }

  get traineeLicenceYesLabel() { return ('des-waiting-room-to-car::trainee-licence-yes-label'); }

  get traineeLicenceNoLabel() { return ('des-waiting-room-to-car::trainee-licence-no-label'); }

  async addVehicleQuestion(question:string, value:string): Promise<void> {
    await scroll(question);
    await clickElement('click', 'selector', question);
    await clickElementWithText('click', 'button', value);
    await clickElementWithText('click', 'element', 'Submit');
  }

  async completeWRTCPageForCatB(
    data: Record<keyof WaitingRoomToCarPageDataCatB, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'eyesighttest':
            await this.setEyesightTest(fieldInput);
            break;
          case 'tellmequestion':
            await this.addVehicleQuestion(this.tellMeSeclector, value);
            break;
          case 'tellmequestionfault':
            await this.setTellMeQuestionFault(fieldInput);
            break;
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'transmission':
            await this.setTransmission(fieldInput);
            break;
          case 'instructorregnum':
            await setInputField('add', fieldInput, this.instructorRegNum);
            break;
          case 'accompaniedby':
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'vehicledetails':
            await this.setVehicleDetails(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatD(
    data: Record<keyof WaitingRoomToCarPageDataCatC, any>,
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
            await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
            break;
          case 'showmequestion2':
            await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
            break;
          case 'showmequestion3':
            await this.addVehicleQuestion(this.thirdVehicleCheckQuestion, value);
            break;
          case 'tellmequestion1':
            await this.addVehicleQuestion(this.fourthVehicleCheckQuestion, value);
            break;
          case 'tellmequestion2':
            await this.addVehicleQuestion(this.fifthVehicleCheckQuestion, value);
            break;
          case 'showmequestion1fault':
            await this.setShowMeQuestion1Fault(fieldInput);
            break;
          case 'showmequestion2fault':
            await this.setShowMeQuestion2Fault(fieldInput);
            break;
          case 'showmequestion3fault':
            await this.setShowMeQuestion3Fault(fieldInput);
            break;
          case 'tellmequestion1fault':
            await this.setTellMeQuestion1Fault(fieldInput);
            break;
          case 'tellmequestion2fault':
            await this.setTellMeQuestion2Fault(fieldInput);
            break;
          case 'accompaniedby':
            await this.setAccompaniedBy(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
    await clickElement('click', 'selector', this.fireExtinguisher);
    await clickElement('click', 'selector', this.emergencyExit);
    await clickElement('click', 'selector', this.fuelCutoff);
    await clickElement('click', 'selector', this.submitVehicleChecks);
  }

  async completeWRTCPageForCatC(
    data: Record<keyof WaitingRoomToCarPageDataCatC, any>,
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
            await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
            break;
          case 'showmequestion2':
            await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
            break;
          case 'showmequestion3':
            await this.addVehicleQuestion(this.thirdVehicleCheckQuestion, value);
            break;
          case 'tellmequestion1':
            await this.addVehicleQuestion(this.fourthVehicleCheckQuestion, value);
            break;
          case 'tellmequestion2':
            await this.addVehicleQuestion(this.fifthVehicleCheckQuestion, value);
            break;
          case 'showmequestion1fault':
            await this.setShowMeQuestion1Fault(fieldInput);
            break;
          case 'showmequestion2fault':
            await this.setShowMeQuestion2Fault(fieldInput);
            break;
          case 'showmequestion3fault':
            await this.setShowMeQuestion3Fault(fieldInput);
            break;
          case 'tellmequestion1fault':
            await this.setTellMeQuestion1Fault(fieldInput);
            break;
          case 'tellmequestion2fault':
            await this.setTellMeQuestion2Fault(fieldInput);
            await clickElement('click', 'selector', this.submitVehicleChecks);
            break;
          case 'accompaniedby':
            await this.setAccompaniedBy(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatMod1(
    data: Record<keyof WaitingRoomToCarPageDataCatMod1, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'categorytype':
            await this.selectAndCloseIonSelectByText(this.catType, value, 'Confirm');
            break;
          case 'transmission':
            await this.setTransmission(fieldInput);
            break;
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'accompaniedby':
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'vehicledetails':
            await this.setVehicleDetails(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatMod2(
    data: Record<keyof WaitingRoomToCarPageDataCatMod2, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'categorytype':
            await this.selectAndCloseIonSelectByText(this.catType, value, 'Confirm');
            break;
          case 'transmission':
            await this.setTransmission(fieldInput);
            break;
          case 'eyesighttest':
            await this.setEyesightTest(fieldInput);
            break;
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'safetyquestion1':
            await clickElement('click', 'selector', this.safetyBalanceShowQuestionButton);
            await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
            break;
          case 'safetyquestion2':
            await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
            break;
          case 'balancequestion1':
            await this.addVehicleQuestion(this.thirdVehicleCheckQuestion, value);
            break;
          case 'safetyquestion1fault':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'correct' ? this.firstVehicleCheckQuestionCorrectLabel : this.firstShowMeQuestionFaultLabel,
            );
            break;
          case 'safetyquestion2fault':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'correct' ? this.secondVehicleCheckQuestionCorrectLabel : this.secondShowMeQuestionFaultLabel,
            );
            break;
          case 'balancequestion1fault':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'correct' ? this.thirdVehicleCheckQuestionCorrectLabel : this.thirdShowMeQuestionFaultLabel,
            );
            await clickElement('click', 'selector', this.submitVehicleChecksButton);
            break;
          case 'accompaniedby':
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'vehicledetails':
            await this.setVehicleDetails(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatADI2(
    data: Record<keyof WaitingRoomToCarPageDataCatADI2, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'eyesighttest':
            await scroll(this.eyeSightPassLabel);
            await this.setEyesightTest(fieldInput);
            break;
          case 'tellmequestion1':
            await clickElement('click', 'selector', this.vehicleChecksShowQuestionsButton);
            await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
            break;
          case 'tellmequestion2':
            await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
            break;
          case 'tellmequestion3':
            await this.addVehicleQuestion(this.thirdVehicleCheckQuestion, value);
            break;
          case 'tellmequestion1fault':
            await this.setTellMeQuestion1Fault(fieldInput, 'adi2');
            break;
          case 'tellmequestion2fault':
            await this.setTellMeQuestion2Fault(fieldInput, 'adi2');
            break;
          case 'tellmequestion3fault':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'correct' ? this.thirdVehicleCheckQuestionCorrectLabel : this.thirdShowMeQuestionFaultLabel,
            );
            await clickElement('click', 'selector', this.submitVehicleChecksButton);
            break;
          case 'vehicleregnum':
            await scroll(this.vehRegInput);
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'transmission':
            await scroll(this.manualTransmissionLabel);
            await this.setTransmission(fieldInput);
            break;
          case 'accompaniedby':
            await scroll(this.accompaniedByInstructorLabel);
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'vehicledetails':
            await scroll(this.vehicleDetailsSchoolCarLabel);
            await this.setVehicleDetails(fieldInput);
            break;
          case 'ordittrainer':
            await scroll(this.orditTrainedYesInput);
            await this.setOrditTrainer(fieldInput);
            break;
          case 'trainerprn':
            await scroll(this.trainedPRNInput);
            await setInputField('add', fieldInput, this.trainedPRNInput);
            break;
          case 'trainingrecords':
            await scroll(this.trainingRecordsYesInput);
            await clickElement(
              'click',
              'selector',
              fieldInput === 'yes' ? this.trainingRecordsYesInput : this.trainingRecordsNoInput,
            );
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatHome(
    data: Record<keyof WaitingRoomToCarPageDataCatHome, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'eyesighttest':
            await scroll(this.eyeSightPassLabel);
            await this.setEyesightTest(fieldInput);
            break;
          case 'showmequestion':
            await clickElement('click', 'selector', this.vehicleChecksShowQuestionsButton);
            await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
            break;
          case 'tellmequestion':
            await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
            break;
          case 'showmequestionfault':
            await this.setShowMeQuestion1Fault(fieldInput);
            break;
          case 'tellmequestionfault':
            await this.setTellMeQuestion2Fault(fieldInput, 'home');
            await clickElement('click', 'selector', this.submitVehicleChecksButton);
            break;
          case 'vehicleregnum':
            await scroll(this.vehRegInput);
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'accompaniedby':
            await scroll(this.accompaniedByInstructorLabel);
            await this.setAccompaniedBy(fieldInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCPC(
    data: Record<keyof WaitingRoomToCarPageDataCatCPC, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'details':
            await this.setVehicleDetails(fieldInput);
            break;
          case 'accompanied':
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'combination':
            await this.addVehicleQuestion(this.combination, value);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageForCatADI3(
    data: Record<keyof WaitingRoomToCarPageDataCatADI3, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
            break;
          case 'duelcontrols':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'yes' ? this.duelControlsYesLabel : this.duelControlsNoLabel,
            );
            break;
          case 'transmission':
            await this.setTransmission(fieldInput);
            break;
          case 'pdilogbook':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'yes' ? this.pdiLogbookYesLabel : this.pdiLogbookNoLabel,
            );
            break;
          case 'traineelicence':
            await clickElement(
              'click',
              'selector',
              fieldInput === 'yes' ? this.traineeLicenceYesLabel : this.traineeLicenceNoLabel,
            );
            break;
          case 'ordittrainer':
            await scroll(this.orditTrainedYesInput);
            await this.setOrditTrainer(fieldInput);
            break;
          case 'accompaniedby':
            await scroll(this.accompaniedByInstructorLabel);
            await this.setAccompaniedBy(fieldInput);
            break;
          case 'trainerprn':
            await scroll(this.trainedPRNInput);
            await setInputField('add', fieldInput, this.trainedPRNInput);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
    }
  }

  async completeWRTCPageDataTable(
    data: Record<string, string>,
    category:string,
  ): Promise<void> {
    const cat = category.toLowerCase();
    switch (cat) {
      case 'b':
        await this.completeWRTCPageForCatB(
          data as Record<keyof WaitingRoomToCarPageDataCatB, string>,
        );
        break;
      case 'c':
        await this.completeWRTCPageForCatC(
            data as Record<keyof WaitingRoomToCarPageDataCatC, string>,
        );
        break;
      case 'd':
        await this.completeWRTCPageForCatD(
          data as Record<keyof WaitingRoomToCarPageDataCatD, string>,
        );
        break;
      case 'manoeuvre':
        await this.completeWRTCPageForManoeuvre(
          data as Record<keyof WaitingRoomToCarPageDataCatManoeuvre, string>,
        );
        break;
      case 'cpc':
        await this.completeWRTCPageForCPC(
            data as Record<keyof WaitingRoomToCarPageDataCatCPC, string>,
        );
        break;
      case 'mod1':
        await this.completeWRTCPageForCatMod1(
          data as Record<keyof WaitingRoomToCarPageDataCatMod1, string>,
        );
        break;
      case 'mod2':
        await this.completeWRTCPageForCatMod2(
          data as Record<keyof WaitingRoomToCarPageDataCatMod2, string>,
        );
        break;
      case 'adi2':
        await this.completeWRTCPageForCatADI2(
          data as Record<keyof WaitingRoomToCarPageDataCatADI2, string>,
        );
        break;
      case 'home':
        await this.completeWRTCPageForCatHome(
          data as Record<keyof WaitingRoomToCarPageDataCatHome, string>,
        );
        break;
      case 'adi3':
        await this.completeWRTCPageForCatADI3(
          data as Record<keyof WaitingRoomToCarPageDataCatADI3, string>,
        );
        break;
      default:
        console.info(`${cat} does not exist`);
    }
  }

  async completeWRTCPageForManoeuvre(
    data: Record<keyof WaitingRoomToCarPageDataCatManoeuvre, any>,
  ): Promise<void> {
    const fieldInput = data.vehicleRegNum;
    await setInputField('add', fieldInput, this.vehRegInput);
  }

  async completeWRTCPageForFailEyesight(): Promise<void> {
    await clickElement('click', 'selector', this.eyeSightFailLabel);
    await clickElement('click', 'selector', this.continueToDebriefButton);
  }

  async setEyesightTest(fieldInput:string) {
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
  }

  async setTellMeQuestionFault(fieldInput:string) {
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
  }

  async setTransmission(fieldInput:string) {
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
  }

  async setAccompaniedBy(fieldInput:string) {
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
  }

  async setVehicleDetails(fieldInput:string) {
    switch (fieldInput) {
      case 'school car':
        await clickElement('click', 'selector', this.vehicleDetailsSchoolCarLabel);
        break;
      case 'dual control':
        await clickElement('click', 'selector', this.vehicleDetailsDualControlLabel);
        break;
      case 'school bike':
        await clickElement('click', 'selector', this.vehicleDetailsSchoolBike);
        break;
      case 'rigid':
        await clickElement('click', 'selector', this.rigid);
        break;
      case 'articulated':
        await clickElement('click', 'selector', this.articulated);
        break;
      case 'drawbar':
        await clickElement('click', 'selector', this.drawbar);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setShowMeQuestion1Fault(fieldInput:string) {
    await scroll(this.firstVehicleCheckQuestionCorrectLabel);
    switch (fieldInput) {
      case 'correct':
        await clickElement('click', 'selector', this.firstVehicleCheckQuestionCorrectLabel);
        break;
      case '1 driving fault':
        await clickElement('click', 'selector', this.firstShowMeQuestionFaultLabel);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setShowMeQuestion2Fault(fieldInput:string) {
    await scroll(this.secondVehicleCheckQuestionCorrectLabel);
    switch (fieldInput) {
      case 'correct':
        await clickElement('click', 'selector', this.secondVehicleCheckQuestionCorrectLabel);
        break;
      case '1 driving fault':
        await clickElement('click', 'selector', this.secondShowMeQuestionFaultLabel);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setShowMeQuestion3Fault(fieldInput:string) {
    await scroll(this.thirdVehicleCheckQuestionCorrectLabel);
    switch (fieldInput) {
      case 'correct':
        await clickElement('click', 'selector', this.thirdVehicleCheckQuestionCorrectLabel);
        break;
      case '1 driving fault':
        await clickElement('click', 'selector', this.thirdShowMeQuestionFaultLabel);
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setTellMeQuestion1Fault(fieldInput:string, category?:string) {
    await scroll(category === 'adi2' ? this.firstVehicleCheckQuestionCorrectLabel : this.fourthVehicleCheckCorrectLabel);
    switch (fieldInput) {
      case 'correct':
        await clickElement(
          'click',
          'selector',
          category === 'adi2' ? this.firstVehicleCheckQuestionCorrectLabel : this.fourthVehicleCheckCorrectLabel,
        );
        break;
      case '1 driving fault':
        await clickElement(
          'click',
          'selector',
          category === 'adi2' ? this.firstShowMeQuestionFaultLabel : this.firstTellMeQuestionFaultLabel,
        );
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setTellMeQuestion2Fault(fieldInput:string, category:string | undefined = 'na') {
    await scroll(category === 'na' ? this.fifthVehicleCheckQuestionCorrectLabel : this.secondVehicleCheckQuestionCorrectLabel);
    switch (fieldInput) {
      case 'correct':
        await clickElement(
          'click',
          'selector',
          category === 'na' ? this.fifthVehicleCheckQuestionCorrectLabel : this.secondVehicleCheckQuestionCorrectLabel,
        );
        break;
      case '1 driving fault':
        await clickElement(
          'click',
          'selector',
          category === 'na' ? this.secondTellMeQuestionFaultLabel : this.secondShowMeQuestionFaultLabel,
        );
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }

  async setOrditTrainer(fieldInput:string) {
    switch (fieldInput) {
      case 'yes':
        await clickElement(
          'click',
          'selector',
          this.orditTrainedYesInput,
        );
        break;
      case 'no':
        await clickElement(
          'click',
          'selector',
          this.orditTrainedNoInput,
        );
        break;
      default:
        console.info(`Could not find ${fieldInput}`);
    }
  }
}

export default new WaitingRoomPageToCarObject();
