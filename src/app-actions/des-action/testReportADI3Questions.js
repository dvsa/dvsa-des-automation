"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testReport_pageobject_1 = __importDefault(require("../../pageobjects/des/testReport.pageobject"));
exports.default = async (score, questionNumber, obsolete, section) => {
    await testReport_pageobject_1.default.testReportADI3Questions(score, questionNumber, section);
};
