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

  get fireExtinguisher() { return ('des-waiting-room-to-car::safety-questions-correct-6'); }

  get emergencyExit() { return ('des-waiting-room-to-car::safety-questions-correct-7'); }

  get fuelCutoff() { return ('des-waiting-room-to-car::safety-questions-correct-8'); }

  get combination() { return ('des-waiting-room-to-car::combination'); }

  get articulated() { return ('des-waiting-room-to-car::articulated'); }

  get drawbar() { return ('des-waiting-room-to-car::drawbar'); }

  get rigid() { return ('des-waiting-room-to-car::rigid'); }

  get catType() { return ('des-waiting-room-to-car::category-type'); }

  get vehicleDetailsSchoolBike() { return ('des-waiting-room-to-car::vehicle-details-school-bike-label'); }

  async addVehicleQuestion(question:string, value:string): Promise<void> {
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
            await this.addVehicleQuestion(this.tellMeSeclector, value);
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

  async completeWRTCPageForCatMod1(
    data: Record<keyof WaitingRoomToCarPageDataCatMod1, any>,
  ): Promise<void> {
    for await (const [key, value] of Object.entries(data)) {
      const field = key.toLowerCase();
      const fieldInput = value.toLowerCase();
      if (fieldInput !== 'na') {
        switch (field) {
          case 'categorytype':
            await clickElement('click', 'selector', this.catType);
            await clickElementWithText('click', 'button', value);
            await clickElementWithText('click', 'element', 'Submit');
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
          case 'vehicleregnum':
            await setInputField('add', fieldInput, this.vehRegInput);
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
              case 'school bike':
                await clickElement('click', 'selector', this.vehicleDetailsSchoolBike);
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
      default:
        console.info(`${cat} does not exist`);
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
            switch (fieldInput) {
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
            break;
          case 'accompanied':
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
          case 'combination':
            await this.addVehicleQuestion(this.combination, value);
            break;
          default:
            console.info(`Could not find ${field}`);
        }
      }
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
}

export default new WaitingRoomPageToCarObject();
