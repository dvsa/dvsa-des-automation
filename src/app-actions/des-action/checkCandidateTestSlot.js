"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const candidateDetailsCard_pageobject_1 = __importDefault(require("../../pageobjects/des/candidateDetailsCard.pageobject"));
exports.default = async (table) => {
    const data = table.rowsHash();
    await candidateDetailsCard_pageobject_1.default.checkCandidateTestDetailsCard(data);
};
