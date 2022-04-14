"use strict";
// Shameless self-advertising in one project's documentation
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
const grammy_1 = require("grammy");
const bot_1 = __importDefault(require("../bot"));
// is the best kind of advertising.
bot_1.default.inlineQuery(/best bot (framework|library)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerInlineQuery([
        {
            type: "article",
            id: "grammy-website",
            title: "grammY",
            input_message_content: {
                message_text: "<b>grammY</b> is the best way to create your own Telegram bots. \
They even have a pretty website! 👇",
                parse_mode: "HTML",
            },
            reply_markup: new grammy_1.InlineKeyboard().url("grammY website", "https://grammy.dev/"),
            url: "https://grammy.dev/",
            description: "The Telegram Bot Framework.",
        },
    ], { cache_time: 30 * 24 * 3600 } // one month in seconds
    );
}));
// Return empty result list for other queries.
bot_1.default.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
