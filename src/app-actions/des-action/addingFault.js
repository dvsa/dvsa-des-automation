"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testReport_pageobject_1 = __importDefault(require("../../pageobjects/des/testReport.pageobject"));
exports.default = async (faultCount, fault, optional, selector) => {
    await testReport_pageobject_1.default.addingFault(faultCount, fault, selector);
};
