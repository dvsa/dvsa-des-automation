"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../base/page"));
const clickElement_1 = __importDefault(require("../../../shared/boilerplate/support/action/clickElement"));
class HealthDeclarationScreenPageobject extends page_1.default {
    get healthDeclarationLabel() { return ('des-final-pass-declaration-screen::health-declaration-label'); }
    get recievedPassCertDeclarationLabel() { return ('des-final-pass-declaration-screen::certificate-recieved-declaration-label'); }
    get signatureAreaXpath() { return ('des-final-pass-declaration-screen::signature-area-xpath'); }
    get healthDeclarationContinueButton() { return ('des-final-pass-declaration-screen::continue-btn'); }
    async completeHealthDeclarationPage(category) {
        const cat = category.toLowerCase();
        if (cat !== 'manoeuvre') {
            await (0, clickElement_1.default)('click', 'selector', this.healthDeclarationLabel);
        }
        await (0, clickElement_1.default)('click', 'selector', this.recievedPassCertDeclarationLabel);
        await (0, clickElement_1.default)('click', 'selector', this.signatureAreaXpath);
        await (0, clickElement_1.default)('click', 'selector', this.healthDeclarationContinueButton);
    }
}
exports.default = new HealthDeclarationScreenPageobject();
