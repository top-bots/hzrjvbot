"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListeners = void 0;
const bot_1 = __importDefault(require("./bot"));
const config_1 = require("./config");
const handleCommands_1 = require("./handlers/handleCommands");
const handleMessage_1 = __importDefault(require("./handlers/handleMessage"));
const handleQuestion_1 = require("./handlers/handleQuestion");
const handleStart_1 = __importDefault(require("./handlers/handleStart"));
const addListeners = () => {
    /** COMMANDS */
    bot_1.default.command("start", handleStart_1.default);
    bot_1.default.command("questions", handleCommands_1.handleMyQuestions);
    bot_1.default.command("credit", handleCommands_1.handleCredit);
    bot_1.default.command("score", handleCommands_1.handleScore);
    bot_1.default.command("profile", () => { });
    bot_1.default.command("invite", () => { });
    /** HEARS */
    bot_1.default.hears(config_1.constants.M_ASK_Q, handleCommands_1.handleAskQuestion);
    bot_1.default.hears(config_1.constants.M_MY_QS, handleCommands_1.handleMyQuestions);
    bot_1.default.hears(config_1.constants.M_MY_SCORE, handleCommands_1.handleScore);
    bot_1.default.hears(config_1.constants.M_CREDIT, handleCommands_1.handleCredit);
    bot_1.default.hears(config_1.constants.Q_CANCEL, handleQuestion_1.handleQCancel);
    bot_1.default.hears(config_1.constants.Q_SEND, handleQuestion_1.handleQSend);
    bot_1.default.hears(config_1.constants.TAG_ANSWER, handleCommands_1.handleUpvote);
    /** HANDLE MESSAGE - DEPENGIN ON STATE */
    bot_1.default.on("message", handleMessage_1.default);
};
exports.addListeners = addListeners;
