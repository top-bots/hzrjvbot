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
const mongoose_1 = __importDefault(require("mongoose"));
const telegraf_session_mongodb_1 = require("telegraf-session-mongodb");
const bot_1 = __importDefault(require("./src/bot"));
const config_1 = require("./src/config");
const listeners_1 = require("./src/listeners");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    // initial data for user session
    const initial = {
        id: 0,
        state: config_1.states.DEFAULT,
        coins: 5,
        score: 0,
        votes: 0,
        questions: [],
        qIndex: 0,
    };
    // set-up db connections
    yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/test");
    const db = mongoose_1.default.connection.db;
    bot_1.default.use((0, telegraf_session_mongodb_1.session)(db));
});
const startBot = () => __awaiter(void 0, void 0, void 0, function* () {
    yield bootstrap();
    //bot.use(menuQuestions);
    (0, listeners_1.addListeners)();
    bot_1.default.start((ctx) => ctx.reply("Welcome"));
    bot_1.default.launch();
});
startBot();
// Enable graceful stop
process.once("SIGINT", () => bot_1.default.stop("SIGINT"));
process.once("SIGTERM", () => bot_1.default.stop("SIGTERM"));
