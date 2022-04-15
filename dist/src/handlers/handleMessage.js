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
    var _a, _b, _c, _d, _e, _f;
    //console.log(ctx.session)
    console.log((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text);
    // record question
    if (ctx.session.state === config_1.states.WRITE_Q) {
        // check question length
        const question = (_d = (_c = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "";
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
    // look for upvotes replies and give score
    console.log(ctx.message);
    if (((_f = (_e = ctx.message) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.id) === config_1.constants.ID_GP) {
        console.log(config_1.constants.SHOUT);
        const answererId = ctx.message.from.id.toString();
        const repliedMessage = ctx.message.reply_to_message;
        const isAsnwererUser = true;
        if (!!repliedMessage && isAsnwererUser) {
            // increase answerers score
            // mark question as answered and set answer to question object
        }
    }
});
exports.default = handleMessage;
