"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waitingRoom_pageobject_1 = __importDefault(require("../../pageobjects/des/waitingRoom.pageobject"));
exports.default = async () => {
    await waitingRoom_pageobject_1.default.completeCommunicationPage();
};
