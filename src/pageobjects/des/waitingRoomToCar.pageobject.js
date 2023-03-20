"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scroll_1 = __importDefault(require("@shared-boilerplate/support/action/scroll"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
const clickElementWithText_1 = __importDefault(require("../../../shared/custom/support/action/clickElementWithText"));
const setInputField_1 = __importDefault(require("../../../shared/boilerplate/support/action/setInputField"));
const page_1 = __importDefault(require("../base/page"));
class WaitingRoomPageToCarObject extends page_1.default {
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
    async addVehicleQuestion(question, value) {
        await (0, clickElement_1.default)('click', 'selector', question);
        await (0, clickElementWithText_1.default)('click', 'button', value);
        await (0, clickElementWithText_1.default)('click', 'element', 'Submit');
    }
    async completeWRTCPageForCatB(data) {
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
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'transmission':
                        await this.setTransmission(fieldInput);
                        break;
                    case 'instructorregnum':
                        await (0, setInputField_1.default)('add', fieldInput, this.instructorRegNum);
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
    async completeWRTCPageForCatD(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'vehicleregnum':
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'showmequestion1':
                        await (0, clickElement_1.default)('click', 'selector', this.vehicleChecksShowQuestionsButton);
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
        await (0, clickElement_1.default)('click', 'selector', this.fireExtinguisher);
        await (0, clickElement_1.default)('click', 'selector', this.emergencyExit);
        await (0, clickElement_1.default)('click', 'selector', this.fuelCutoff);
        await (0, clickElement_1.default)('click', 'selector', this.submitVehicleChecks);
    }
    async completeWRTCPageForCatC(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'vehicleregnum':
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'showmequestion1':
                        await (0, clickElement_1.default)('click', 'selector', this.vehicleChecksShowQuestionsButton);
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
                        await (0, clickElement_1.default)('click', 'selector', this.submitVehicleChecks);
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
    async completeWRTCPageForCatMod1(data) {
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
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
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
    async completeWRTCPageForCatMod2(data) {
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
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'safetyquestion1':
                        await (0, clickElement_1.default)('click', 'selector', this.safetyBalanceShowQuestionButton);
                        await this.addVehicleQuestion(this.firstVehicleCheckQuestion, value);
                        break;
                    case 'safetyquestion2':
                        await this.addVehicleQuestion(this.secondVehicleCheckQuestion, value);
                        break;
                    case 'balancequestion1':
                        await this.addVehicleQuestion(this.thirdVehicleCheckQuestion, value);
                        break;
                    case 'safetyquestion1fault':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'correct' ? this.firstVehicleCheckQuestionCorrectLabel : this.firstShowMeQuestionFaultLabel);
                        break;
                    case 'safetyquestion2fault':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'correct' ? this.secondVehicleCheckQuestionCorrectLabel : this.secondShowMeQuestionFaultLabel);
                        break;
                    case 'balancequestion1fault':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'correct' ? this.thirdVehicleCheckQuestionCorrectLabel : this.thirdShowMeQuestionFaultLabel);
                        await (0, clickElement_1.default)('click', 'selector', this.submitVehicleChecksButton);
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
    async completeWRTCPageForCatADI2(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'eyesighttest':
                        await (0, scroll_1.default)(this.eyeSightPassLabel);
                        await this.setEyesightTest(fieldInput);
                        break;
                    case 'tellmequestion1':
                        await (0, clickElement_1.default)('click', 'selector', this.vehicleChecksShowQuestionsButton);
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
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'correct' ? this.thirdVehicleCheckQuestionCorrectLabel : this.thirdShowMeQuestionFaultLabel);
                        await (0, clickElement_1.default)('click', 'selector', this.submitVehicleChecksButton);
                        break;
                    case 'vehicleregnum':
                        await (0, scroll_1.default)(this.vehRegInput);
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'transmission':
                        await (0, scroll_1.default)(this.manualTransmissionLabel);
                        await this.setTransmission(fieldInput);
                        break;
                    case 'accompaniedby':
                        await (0, scroll_1.default)(this.accompaniedByInstructorLabel);
                        await this.setAccompaniedBy(fieldInput);
                        break;
                    case 'vehicledetails':
                        await (0, scroll_1.default)(this.vehicleDetailsSchoolCarLabel);
                        await this.setVehicleDetails(fieldInput);
                        break;
                    case 'ordittrainer':
                        await (0, scroll_1.default)(this.orditTrainedYesInput);
                        await this.setOrditTrainer(fieldInput);
                        break;
                    case 'trainerprn':
                        await (0, scroll_1.default)(this.trainedPRNInput);
                        await (0, setInputField_1.default)('add', fieldInput, this.trainedPRNInput);
                        break;
                    case 'trainingrecords':
                        await (0, scroll_1.default)(this.trainingRecordsYesInput);
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.trainingRecordsYesInput : this.trainingRecordsNoInput);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
    }
    async completeWRTCPageForCatHome(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'eyesighttest':
                        await (0, scroll_1.default)(this.eyeSightPassLabel);
                        await this.setEyesightTest(fieldInput);
                        break;
                    case 'showmequestion':
                        await (0, clickElement_1.default)('click', 'selector', this.vehicleChecksShowQuestionsButton);
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
                        await (0, clickElement_1.default)('click', 'selector', this.submitVehicleChecksButton);
                        break;
                    case 'vehicleregnum':
                        await (0, scroll_1.default)(this.vehRegInput);
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'accompaniedby':
                        await (0, scroll_1.default)(this.accompaniedByInstructorLabel);
                        await this.setAccompaniedBy(fieldInput);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
    }
    async completeWRTCPageForCPC(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'vehicleregnum':
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
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
    async completeWRTCPageForCatADI3(data) {
        for await (const [key, value] of Object.entries(data)) {
            const field = key.toLowerCase();
            const fieldInput = value.toLowerCase();
            if (fieldInput !== 'na') {
                switch (field) {
                    case 'vehicleregnum':
                        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
                        break;
                    case 'duelcontrols':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.duelControlsYesLabel : this.duelControlsNoLabel);
                        break;
                    case 'transmission':
                        await this.setTransmission(fieldInput);
                        break;
                    case 'pdilogbook':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.pdiLogbookYesLabel : this.pdiLogbookNoLabel);
                        break;
                    case 'traineelicence':
                        await (0, clickElement_1.default)('click', 'selector', fieldInput === 'yes' ? this.traineeLicenceYesLabel : this.traineeLicenceNoLabel);
                        break;
                    case 'ordittrainer':
                        await (0, scroll_1.default)(this.orditTrainedYesInput);
                        await this.setOrditTrainer(fieldInput);
                        break;
                    case 'accompaniedby':
                        await (0, scroll_1.default)(this.accompaniedByInstructorLabel);
                        await this.setAccompaniedBy(fieldInput);
                        break;
                    case 'trainerprn':
                        await (0, scroll_1.default)(this.trainedPRNInput);
                        await (0, setInputField_1.default)('add', fieldInput, this.trainedPRNInput);
                        break;
                    default:
                        console.info(`Could not find ${field}`);
                }
            }
        }
    }
    async completeWRTCPageDataTable(data, category) {
        const cat = category.toLowerCase();
        switch (cat) {
            case 'b':
                await this.completeWRTCPageForCatB(data);
                break;
            case 'c':
                await this.completeWRTCPageForCatC(data);
                break;
            case 'd':
                await this.completeWRTCPageForCatD(data);
                break;
            case 'manoeuvre':
                await this.completeWRTCPageForManoeuvre(data);
                break;
            case 'cpc':
                await this.completeWRTCPageForCPC(data);
                break;
            case 'mod1':
                await this.completeWRTCPageForCatMod1(data);
                break;
            case 'mod2':
                await this.completeWRTCPageForCatMod2(data);
                break;
            case 'adi2':
                await this.completeWRTCPageForCatADI2(data);
                break;
            case 'home':
                await this.completeWRTCPageForCatHome(data);
                break;
            case 'adi3':
                await this.completeWRTCPageForCatADI3(data);
                break;
            default:
                console.info(`${cat} does not exist`);
        }
    }
    async completeWRTCPageForManoeuvre(data) {
        const fieldInput = data.vehicleRegNum;
        await (0, setInputField_1.default)('add', fieldInput, this.vehRegInput);
    }
    async completeWRTCPageForFailEyesight() {
        await (0, clickElement_1.default)('click', 'selector', this.eyeSightFailLabel);
        await (0, clickElement_1.default)('click', 'selector', this.continueToDebriefButton);
    }
    async setEyesightTest(fieldInput) {
        switch (fieldInput) {
            case 'pass':
                await (0, clickElement_1.default)('click', 'selector', this.eyeSightPassLabel);
                break;
            case 'fail':
                await (0, clickElement_1.default)('click', 'selector', this.eyeSightFailLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setTellMeQuestionFault(fieldInput) {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', this.tellMeAnswerCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', this.tellMeAnswerOneDrivingFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setTransmission(fieldInput) {
        switch (fieldInput) {
            case 'manual':
                await (0, clickElement_1.default)('click', 'selector', this.manualTransmissionLabel);
                break;
            case 'automatic':
                await (0, clickElement_1.default)('click', 'selector', this.automaticTransmissionLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setAccompaniedBy(fieldInput) {
        switch (fieldInput) {
            case 'instructor':
                await (0, clickElement_1.default)('click', 'selector', this.accompaniedByInstructorLabel);
                break;
            case 'supervisor':
                await (0, clickElement_1.default)('click', 'selector', this.accompaniedBySupervisorLabel);
                break;
            case 'interpreter':
                await (0, clickElement_1.default)('click', 'selector', this.accompaniedByInterpreterLabel);
                break;
            case 'other':
                await (0, clickElement_1.default)('click', 'selector', this.accompaniedByOtherLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setVehicleDetails(fieldInput) {
        switch (fieldInput) {
            case 'school car':
                await (0, clickElement_1.default)('click', 'selector', this.vehicleDetailsSchoolCarLabel);
                break;
            case 'dual control':
                await (0, clickElement_1.default)('click', 'selector', this.vehicleDetailsDualControlLabel);
                break;
            case 'school bike':
                await (0, clickElement_1.default)('click', 'selector', this.vehicleDetailsSchoolBike);
                break;
            case 'rigid':
                await (0, clickElement_1.default)('click', 'selector', this.rigid);
                break;
            case 'articulated':
                await (0, clickElement_1.default)('click', 'selector', this.articulated);
                break;
            case 'drawbar':
                await (0, clickElement_1.default)('click', 'selector', this.drawbar);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setShowMeQuestion1Fault(fieldInput) {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', this.firstVehicleCheckQuestionCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', this.firstShowMeQuestionFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setShowMeQuestion2Fault(fieldInput) {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', this.secondVehicleCheckQuestionCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', this.secondShowMeQuestionFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setShowMeQuestion3Fault(fieldInput) {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', this.thirdVehicleCheckQuestionCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', this.thirdShowMeQuestionFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setTellMeQuestion1Fault(fieldInput, category) {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', category === 'adi2' ? this.firstVehicleCheckQuestionCorrectLabel : this.fourthVehicleCheckCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', category === 'adi2' ? this.firstShowMeQuestionFaultLabel : this.firstTellMeQuestionFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setTellMeQuestion2Fault(fieldInput, category = 'na') {
        switch (fieldInput) {
            case 'correct':
                await (0, clickElement_1.default)('click', 'selector', category === 'na' ? this.fifthVehicleCheckQuestionCorrectLabel : this.secondVehicleCheckQuestionCorrectLabel);
                break;
            case '1 driving fault':
                await (0, clickElement_1.default)('click', 'selector', category === 'na' ? this.secondTellMeQuestionFaultLabel : this.secondShowMeQuestionFaultLabel);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
    async setOrditTrainer(fieldInput) {
        switch (fieldInput) {
            case 'yes':
                await (0, clickElement_1.default)('click', 'selector', this.orditTrainedYesInput);
                break;
            case 'no':
                await (0, clickElement_1.default)('click', 'selector', this.orditTrainedNoInput);
                break;
            default:
                console.info(`Could not find ${fieldInput}`);
        }
    }
}
exports.default = new WaitingRoomPageToCarObject();
