"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kbQuestion = exports.kbMain = void 0;
const grammy_1 = require("grammy");
const config_1 = require("../config");
exports.kbMain = new grammy_1.Keyboard()
    .text(config_1.constants.M_ASK_Q)
    .row()
    .text(config_1.constants.M_MY_QS)
    .text(config_1.constants.M_MY_AS)
    .row()
    .text(config_1.constants.M_PROFILE)
    .text(config_1.constants.M_HELP)
    .text(config_1.constants.M_CREDIT)
    .row()
    .text(config_1.constants.M_INVITE);
exports.kbQuestion = new grammy_1.Keyboard()
    .text(config_1.constants.Q_SEND)
    .text(config_1.constants.Q_CANCEL);
