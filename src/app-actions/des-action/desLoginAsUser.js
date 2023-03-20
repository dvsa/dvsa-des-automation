"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_pageobject_1 = __importDefault(require("../../pageobjects/des/login.pageobject"));
exports.default = async (typeOfUser) => {
    await login_pageobject_1.default.login(typeOfUser);
};
