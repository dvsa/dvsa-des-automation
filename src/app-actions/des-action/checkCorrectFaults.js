"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debriefScreen_pageobject_1 = __importDefault(require("../../pageobjects/des/debriefScreen.pageobject"));
exports.default = async (table) => {
    const data = table.hashes();
    await debriefScreen_pageobject_1.default.checkCorrectFaults(data);
};
