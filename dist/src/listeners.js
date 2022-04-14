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
const bot_1 = __importDefault(require("./bot"));
const config_1 = require("./config");
const keyboards_1 = require("./elements/keyboards");
/** COMMANDS */
bot_1.default.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.MSG_WELCOME);
    yield ctx.reply(config_1.constants.MSG_USE_MENU, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
}));
/** HEARS */
// ask qustion
bot_1.default.hears(config_1.constants.M_ASK_Q, (ctx) => {
    ctx.session.state = config_1.states.WRITE_Q;
    ctx.reply(config_1.constants.MSG_WRITE_Q);
});
// check credit
bot_1.default.hears(config_1.constants.M_CREDIT, (ctx) => {
    const coins = ctx.session.coins;
    const message = config_1.constants.MSG_CREDIT.replace("coins", coins.toString());
    ctx.reply(message);
});
// question - cancel
bot_1.default.hears(config_1.constants.Q_CANCEL, (ctx) => {
    ctx.reply(config_1.constants.MSG_Q_CANCEL, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
});
// question - send
bot_1.default.hears(config_1.constants.Q_SEND, (ctx) => {
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
                delete ctx.session.question;
            }
            // decrease coins
            ctx.session.coins = ctx.session.coins - 1;
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
/** HANDLE MESSAGE - DEPENGIN ON STATE */
bot_1.default.on("message", (ctx) => {
    var _a, _b;
    // send question to channel
    if (ctx.session.state === config_1.states.WRITE_Q) {
        // check question length
        const question = (_b = (_a = ctx.message.text) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
        if (question.length > 250 || question.length < 5) {
            ctx.reply(config_1.constants.ERR_Q_LEN);
        }
        else {
            ctx.session.state = config_1.states.DEFAULT;
            ctx.session.question = question;
            ctx.reply(config_1.constants.MSG_POST_Q, {
                reply_markup: { keyboard: keyboards_1.kbQuestion.build(), resize_keyboard: true },
            });
        }
    }
});
