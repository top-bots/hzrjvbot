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
const bot_1 = __importDefault(require("../bot"));
const config_1 = require("../config");
const menus_1 = require("../elements/menus");
const models_1 = require("./../db/models");
const keyboards_1 = require("./../elements/keyboards");
const handleAskQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ctx.session.coins;
    if (coins > 0) {
        ctx.session.state = config_1.states.WRITE_Q;
        yield ctx.reply(config_1.constants.MSG_WRITE_Q, {
            reply_markup: { keyboard: keyboards_1.kbWriteQ.build(), resize_keyboard: true },
        });
    }
    else
        ctx.reply(config_1.constants.ERR_CREDIT);
});
exports.handleAskQuestion = handleAskQuestion;
const handleCredit = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ctx.session.coins;
    const message = config_1.constants.MSG_CREDIT(coins);
    yield ctx.reply(message);
});
exports.handleCredit = handleCredit;
const handleScore = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const score = ctx.session.score;
    const votes = ctx.session.votes;
    const message = config_1.constants.MSG_SCORE(score, votes);
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
        yield ctx.reply(config_1.constants.MSG_Q_ITEM(questions, i), {
            reply_markup: menus_1.menuQuestions,
        });
});
exports.handleMyQuestions = handleMyQuestions;
const handleUpvote = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // check if it is correct chat - channel's supergroup
    if (((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id) === config_1.constants.ID_GP && ((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.from)) {
        const repliedMessage = ctx.message.reply_to_message;
        const answerer = repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.from;
        const answererId = answerer === null || answerer === void 0 ? void 0 : answerer.id;
        const voter = ctx.message.from;
        const voterId = voter.id;
        // vote system
        if (!!answererId && answererId !== voterId) {
            // decrease votes of current and notify
            const newVotes = ctx.session.votes - 1;
            if (newVotes >= 0) {
                // decrease votes
                ctx.session.votes = newVotes;
                console.log("-vote", ctx.session);
                // notify to voter privately
                yield bot_1.default.api.sendMessage(voterId, config_1.constants.MSG_VOTED(newVotes));
                // increase score of answerer
                yield models_1.Session.findOne({ key: answererId.toString() })
                    .then((answererSession) => __awaiter(void 0, void 0, void 0, function* () {
                    var _c;
                    // increase score
                    const newScore = answererSession.value.score + 1;
                    yield answererSession.set("value.score", newScore);
                    yield answererSession.markModified("value.score");
                    yield answererSession.save();
                    console.log("+score", answererSession);
                    // notify upvote to answerer
                    yield bot_1.default.api.sendMessage(answererId, config_1.constants.MSG_CONGRAT((_c = repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.text) !== null && _c !== void 0 ? _c : "---"));
                }))
                    .catch((err) => console.log("error findSession for scores", err));
            }
            else {
                yield bot_1.default.api.sendMessage(voterId, config_1.constants.ERR_CANT_VOTE);
            }
        }
    }
});
exports.handleUpvote = handleUpvote;
