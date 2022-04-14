"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./src/bot"));
require("./src/listeners");
bot_1.default
    .start()
    .then((res) => console.log("BOT STARTED!", res))
    .catch((err) => console.log("BOT FAILED!", err));
