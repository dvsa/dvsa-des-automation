"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waitingRoomToCar_pageobject_1 = __importDefault(require("../../pageobjects/des/waitingRoomToCar.pageobject"));
exports.default = async (category, table) => {
    const data = table.rowsHash();
    await waitingRoomToCar_pageobject_1.default.completeWRTCPageDataTable(data, category);
};
