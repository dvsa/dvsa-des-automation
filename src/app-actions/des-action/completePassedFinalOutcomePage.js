"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const finalOutcomeScreen_pageobject_1 = __importDefault(require("../../pageobjects/des/finalOutcomeScreen.pageobject"));
exports.default = async (table) => {
    const data = table.rowsHash();
    await finalOutcomeScreen_pageobject_1.default.completePassedFinalOutcomePage(data);
};
