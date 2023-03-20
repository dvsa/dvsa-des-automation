"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const checkCandidateTestSlot_1 = __importDefault(require("../../app-actions/des-action/checkCandidateTestSlot"));
(0, cucumber_1.Then)(/^the candidates test details are shown$/, checkCandidateTestSlot_1.default);
