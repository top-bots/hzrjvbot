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
exports.handleUpvote = exports.handleMyQuestions = exports.handleScore = exports.handleCredit = exports.handleAskQuestion = void 0;
const config_1 = require("../config");
const menus_1 = require("../elements/menus");
const functions_1 = require("../utils/functions");
const models_1 = require("./../db/models");
const bot_1 = __importDefault(require("../bot"));
// check if the ctx state is default
const checkDefaultState = (ctx) => ctx.session.state === config_1.states.DEFAULT;
const handleAskQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ctx.session.coins;
    if (coins > 0) {
        ctx.session.state = config_1.states.WRITE_Q;
        yield ctx.reply(config_1.constants.MSG_WRITE_Q, {
            reply_markup: { remove_keyboard: true },
        });
    }
    else
        ctx.reply(config_1.constants.ERR_CREDIT);
});
exports.handleAskQuestion = handleAskQuestion;
const handleCredit = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ctx.session.coins;
    const message = config_1.constants.MSG_CREDIT.replace("coins", coins === null || coins === void 0 ? void 0 : coins.toString());
    yield ctx.reply(message);
});
exports.handleCredit = handleCredit;
const handleScore = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const score = ctx.session.score;
    const votes = ctx.session.votes;
    const message = config_1.constants.MSG_SCORE.replace("score", score.toString()).replace("votes", votes === null || votes === void 0 ? void 0 : votes.toString());
    yield ctx.reply(message);
});
exports.handleScore = handleScore;
const handleMyQuestions = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = ctx.session.questions;
    const i = 0;
    ctx.session.qIndex = i; // reset qIndex for menu
    if (questions.length === 0)
        yield ctx.reply(config_1.constants.MSG_NO_Q);
    else
        yield ctx.reply((0, functions_1.makeQuestionItem)(questions, i), {
            reply_markup: menus_1.menuQuestions,
        });
});
exports.handleMyQuestions = handleMyQuestions;
const handleUpvote = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // check if it is correct chat - channel's supergroup
    if (((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id) === config_1.constants.ID_GP && ((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.from)) {
        console.log("voter", ctx.message, ctx.session);
        const repliedMessage = ctx.message.reply_to_message;
        const answerer = repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.from;
        const answererId = answerer === null || answerer === void 0 ? void 0 : answerer.id;
        const voter = ctx.message.from;
        const voterId = voter.id;
        if (!!answererId) {
            // decrease votes of current and notify
            yield models_1.Session.findOne({ key: voterId.toString() })
                .then((session) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("-vote", session);
                const newVotes = session.value.votes - 1;
                if (newVotes >= 0) {
                    // decrease votes
                    session.set("value", Object.assign(Object.assign({}, session.value), { votes: newVotes }));
                    yield session.save();
                    console.log("decrease votes of", voterId);
                    // notify to voter
                    yield bot_1.default.api.sendMessage(voterId, config_1.constants.MSG_VOTED.replace("votes", newVotes.toString()));
                }
                else {
                    yield bot_1.default.api.sendMessage(voterId, config_1.constants.ERR_CANT_VOTE);
                }
            }))
                .catch((err) => console.log("error findSession for votes", err));
            // increase score of answerer
            yield models_1.Session.findOne({ key: answererId.toString() })
                .then((session) => __awaiter(void 0, void 0, void 0, function* () {
                var _c, _d;
                console.log("+score", session);
                const score = session.value.score;
                // increase score
                session.set("value", Object.assign(Object.assign({}, session.value), { score: score + 1 }));
                yield session.save();
                console.log("upvoted", answererId);
                // notify upvote to answerer
                yield bot_1.default.api.sendMessage(answererId, config_1.constants.MSG_CONGRAT.replace("answer", (_d = (_c = repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.text) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""));
            }))
                .catch((err) => console.log("error findSession for scores", err));
        }
    }
});
exports.handleUpvote = handleUpvote;
