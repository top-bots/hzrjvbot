"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListeners = void 0;
const config_1 = require("./config");
const handleCommands_1 = require("./handlers/handleCommands");
const handleMessage_1 = __importDefault(require("./handlers/handleMessage"));
const handleQuestion_1 = require("./handlers/handleQuestion");
const handleStart_1 = __importDefault(require("./handlers/handleStart"));
const addListeners = (bot) => {
    /** COMMANDS */
    bot.command("start", handleStart_1.default);
    bot.command("questions", handleCommands_1.handleMyQuestions);
    bot.command("credit", handleCommands_1.handleCredit);
    bot.command("score", handleCommands_1.handleScore);
    bot.command("profile", () => { });
    bot.command("invite", () => { });
    /** HEARS */
    bot.hears(config_1.constants.M_ASK_Q, handleCommands_1.handleAskQuestion);
    bot.hears(config_1.constants.M_MY_QS, handleCommands_1.handleMyQuestions);
    bot.hears(config_1.constants.M_MY_SCORE, handleCommands_1.handleScore);
    bot.hears(config_1.constants.M_CREDIT, handleCommands_1.handleCredit);
    bot.hears(config_1.constants.Q_CANCEL, handleQuestion_1.handleQCancel);
    bot.hears(config_1.constants.Q_SEND, handleQuestion_1.handleQSend);
    bot.hears(config_1.constants.TAG_ANSWER, handleCommands_1.handleUpvote);
    /** HANDLE MESSAGE - DEPENGIN ON STATE */
    bot.on("message", handleMessage_1.default);
};
exports.addListeners = addListeners;
