"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQuestionItem = void 0;
const config_1 = require("./config");
const makeQuestionItem = (questions, i) => config_1.constants.MSG_Q_ITEM.replace("index", (i + 1).toString()).replace("question", questions[i]);
exports.makeQuestionItem = makeQuestionItem;
