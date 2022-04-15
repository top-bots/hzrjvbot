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
const bot_1 = __importDefault(require("../bot"));
const config_1 = require("../config");
const keyboards_1 = require("../elements/keyboards");
const models_1 = require("./../db/models");
const handleMessage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
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
    // look for upvotes replies and give score
    if (((_d = ctx.chat) === null || _d === void 0 ? void 0 : _d.id) === config_1.constants.ID_GP && ((_e = ctx.message) === null || _e === void 0 ? void 0 : _e.from)) {
        console.log("voter", ctx.message, ctx.session);
        const text = ctx.message.text;
        const repliedMessage = ctx.message.reply_to_message;
        const answerer = repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.from;
        const answererId = answerer === null || answerer === void 0 ? void 0 : answerer.id;
        const voter = ctx.message.from;
        const voterId = voter.id;
        if (text === config_1.constants.TAG_ANSWER && !!answererId) {
            // decrease votes of current and notify
            yield models_1.Session.findOne({ key: voterId.toString() })
                .then((session) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("-vote", session);
                const votes = session.value.votes;
                if (votes > 0) {
                    // decrease votes
                    session.set("value", Object.assign(Object.assign({}, session.value), { votes: votes - 1 }));
                    yield session.save();
                    console.log("decrease votes of", voterId);
                    // notify to voter
                    yield bot_1.default.api.sendMessage(voterId, config_1.constants.MSG_VOTED.replace("votes", votes.toString()));
                }
                else {
                    yield bot_1.default.api.sendMessage(voterId, config_1.constants.ERR_CANT_VOTE);
                }
            }))
                .catch((err) => console.log("error findSession for votes", err));
            // increase score of answerer
            yield models_1.Session.findOne({ key: answererId.toString() })
                .then((session) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("+score", session);
                const score = session.value.score;
                // increase score
                session.set("value", Object.assign(Object.assign({}, session.value), { score: score + 1 }));
                yield session.save();
                console.log("upvoted", answererId);
                // notify upvote to answerer
                yield bot_1.default.api.sendMessage(answererId, config_1.constants.MSG_CONGRAT.replace("answer", text));
            }))
                .catch((err) => console.log("error findSession for scores", err));
        }
    }
});
exports.default = handleMessage;
