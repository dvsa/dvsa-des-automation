"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const myJournal_pageobject_1 = __importDefault(require("../../pageobjects/des/myJournal.pageobject"));
exports.default = async (selector) => {
    await myJournal_pageobject_1.default.startTest(selector);
};
