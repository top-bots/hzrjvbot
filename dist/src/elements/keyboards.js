"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kbSendQ = exports.kbWriteQ = exports.kbMain = void 0;
const grammy_1 = require("grammy");
const config_1 = require("../config");
exports.kbMain = new grammy_1.Keyboard()
    .text(config_1.constants.M_ASK_Q)
    .row()
    .text(config_1.constants.M_CREDIT)
    .text(config_1.constants.M_MY_SCORE)
    .text(config_1.constants.M_MY_QS)
    .row()
    .text(config_1.constants.M_INVITE);
exports.kbWriteQ = new grammy_1.Keyboard().text(config_1.constants.Q_CANCEL);
exports.kbSendQ = new grammy_1.Keyboard()
    .text(config_1.constants.Q_SEND)
    .text(config_1.constants.Q_CANCEL);
