"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../../pageobjects/base/page"));
exports.default = async (letter) => {
    await page_1.default.keyboardClickLetter(letter);
};
