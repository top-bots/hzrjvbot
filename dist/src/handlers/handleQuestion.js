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
const bot_1 = __importDefault(require("../bot"));
const config_1 = require("../config");
const keyboards_1 = require("../elements/keyboards");
const handleQCancel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.MSG_Q_CANCEL, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
    ctx.session.question = undefined;
});
exports.handleQCancel = handleQCancel;
const handleQSend = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = ctx.session.questions;
    const question = ctx.session.question;
    const newCoins = ctx.session.coins - 1;
    const newVotes = ctx.session.votes + 2;
    if (question) {
        yield bot_1.default.api
            .sendMessage(config_1.constants.ID_CH, question)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("messageSentToChannel", res);
            // add question to related session in db
            ctx.session = Object.assign(Object.assign({}, ctx.session), { questions: [...questions, question], question: undefined, coins: newCoins, votes: newVotes });
            console.log("handleQSend", ctx.session);
            // success
            yield ctx.reply(config_1.constants.MSG_Q_SENT(newVotes), {
                reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
            });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            yield ctx.reply(config_1.constants.ERR_TRY_LATER);
        }));
    }
    else {
        ctx.reply(config_1.constants.ERR_Q_LEN);
    }
    return ctx.session;
});
exports.handleQSend = handleQSend;
