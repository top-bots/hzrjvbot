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
bot_1.default.hears(config_1.constants.M_ASK_Q, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.WRITE_Q);
    bot_1.default.on("message", (ctx) => ctx.reply(config_1.constants.POST_Q, {
        reply_markup: { keyboard: keyboards_1.kbQuestion.build(), resize_keyboard: true },
    }));
}));