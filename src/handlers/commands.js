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
const keyboards_1 = require("./keyboards");
bot_1.default.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(config_1.constants.WELCOME);
    // await ctx.reply("Check out this menu:", { reply_markup: menu });
    yield ctx.reply(config_1.constants.USE_MENU, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
}));
