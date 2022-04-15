"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const keyboards_1 = require("../elements/keyboards");
const handleMessage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // record question
    if (ctx.session.state === config_1.states.WRITE_Q) {
        // check question length
        const question = (_c = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
        if (question.length > 250 || question.length < 5) {
            yield ctx.reply(config_1.constants.ERR_Q_LEN);
        }
        else {
            ctx.session.state = config_1.states.DEFAULT;
            ctx.session.question = question;
            yield ctx.reply(config_1.constants.MSG_POST_Q, {
                reply_markup: { keyboard: keyboards_1.kbQuestion.build(), resize_keyboard: true },
            });
        }
    }
});
exports.default = handleMessage;
