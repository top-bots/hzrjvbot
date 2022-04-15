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
exports.menuQuestions = void 0;
const menu_1 = require("@grammyjs/menu");
const config_1 = require("../config");
const functions_1 = require("../utils/functions");
const updateListQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = ctx.session.questions;
    const i = ctx.session.qIndex;
    if (questions.length === 0)
        yield ctx.reply(config_1.constants.MSG_NO_Q);
    else
        yield ctx.editMessageText((0, functions_1.makeQuestionItem)(questions, i));
});
exports.menuQuestions = new menu_1.Menu("questions-menu")
    .text((ctx) => ctx.session.questions.length > 0 && ctx.session.qIndex > 0 ? "⏪" : "", (ctx) => {
    ctx.session.qIndex = 0;
    updateListQuestion(ctx);
})
    .text((ctx) => ctx.session.questions.length > 0 && ctx.session.qIndex > 1 ? "◀️" : "", (ctx) => {
    ctx.session.qIndex--;
    updateListQuestion(ctx);
})
    .text((ctx) => ctx.session.questions.length > 0 &&
    ctx.session.qIndex < ctx.session.questions.length - 2
    ? "▶️"
    : "", (ctx) => {
    ctx.session.qIndex++;
    updateListQuestion(ctx);
})
    .text((ctx) => ctx.session.questions.length > 0 &&
    ctx.session.qIndex < ctx.session.questions.length - 1
    ? "⏩"
    : "", (ctx) => {
    ctx.session.qIndex = ctx.session.questions.length - 1;
    updateListQuestion(ctx);
});
