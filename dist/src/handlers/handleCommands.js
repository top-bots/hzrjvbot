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
exports.handleMyQuestions = exports.handleScore = exports.handleCredit = exports.handleAskQuestion = void 0;
const config_1 = require("../config");
const menus_1 = require("../elements/menus");
const functions_1 = require("../functions");
const handleAskQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.state = config_1.states.WRITE_Q;
    yield ctx.reply(config_1.constants.MSG_WRITE_Q);
});
exports.handleAskQuestion = handleAskQuestion;
const handleCredit = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ctx.session.coins;
    const message = config_1.constants.MSG_CREDIT.replace("coins", coins.toString());
    yield ctx.reply(message);
});
exports.handleCredit = handleCredit;
const handleScore = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const score = ctx.session.score;
    const message = config_1.constants.MSG_SCORE.replace("score", score.toString());
    yield ctx.reply(message);
});
exports.handleScore = handleScore;
const handleMyQuestions = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = ctx.session.questions;
    const i = ctx.session.qIndex;
    if (questions.length === 0)
        yield ctx.reply(config_1.constants.MSG_NO_Q);
    else
        yield ctx.reply((0, functions_1.makeQuestionItem)(questions, i), {
            reply_markup: menus_1.menuQuestions,
        });
});
exports.handleMyQuestions = handleMyQuestions;
