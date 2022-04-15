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
const models_1 = require("../db/models");
const handleQCancel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.MSG_Q_CANCEL, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
});
exports.handleQCancel = handleQCancel;
const handleQSend = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = ctx.session.questions;
    const question = ctx.session.question;
    const coins = ctx.session.coins;
    const votes = ctx.session.votes;
    if (question)
        yield bot_1.default.api
            .sendMessage(config_1.constants.ID_CH, question)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("messageSendt", res);
            // add question to questions db
            const questionObj = new models_1.Question({
                from: ctx.from,
                text: question,
                channel_msg: res,
            });
            yield questionObj.save();
            // add questionId to related session in db
            const questionId = questionObj._id.toString();
            const updatedSession = Object.assign(Object.assign({}, ctx.session), { questions: [...questions, questionId], question: undefined, coins: coins - 1, votes: votes + 2 });
            ctx.session = updatedSession;
            console.log("handleQSend", ctx.session, questionObj);
            // success
            yield ctx.reply(config_1.constants.MSG_Q_SENT, {
                reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
            });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            yield ctx.reply(config_1.constants.ERR_TRY_LATER);
        }));
    return ctx.session;
});
exports.handleQSend = handleQSend;
