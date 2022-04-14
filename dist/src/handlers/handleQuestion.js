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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQSend = exports.handleQCancel = void 0;
const config_1 = require("../config");
const keyboards_1 = require("../elements/keyboards");
const bot_1 = __importDefault(require("../bot"));
const handleQCancel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.MSG_Q_CANCEL, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
});
exports.handleQCancel = handleQCancel;
const handleQSend = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.session.question)
        bot_1.default.api
            .sendMessage(config_1.constants.ID_CH, ctx.session.question)
            .then((res) => {
            if (ctx.session.question) {
                // add question to questions list
                ctx.session.questions = [
                    ...ctx.session.questions,
                    ctx.session.question,
                ];
                // reset question
                ctx.session.question = undefined;
            }
            // decrease coins
            ctx.session.coins--;
            // success
            ctx.reply(config_1.constants.MSG_Q_SENT, {
                reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
            });
        })
            .catch((err) => {
            console.log(err);
            ctx.reply(config_1.constants.ERR_TRY_LATER);
        });
});
exports.handleQSend = handleQSend;
