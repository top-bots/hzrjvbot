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
const grammy_mongodb_storage_1 = require("@satont/grammy-mongodb-storage");
const grammy_1 = require("grammy");
const mongoose_1 = __importDefault(require("mongoose"));
const bot_1 = __importDefault(require("./src/bot"));
const config_1 = require("./src/config");
const menus_1 = require("./src/elements/menus");
const listeners_1 = require("./src/listeners");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    // initial data for user session
    const initial = () => ({
        id: 0,
        state: config_1.states.DEFAULT,
        coins: 5,
        score: 0,
        questions: ["aaaa", "bbbb", "ccc", "dddd", "eeee"],
        qIndex: 0,
        answers: [],
        votes: 0,
    });
    // Stores data per user.
    const getSessionKey = (ctx) => {
        var _a;
        // Give every user their personal session storage
        // (will be shared across groups and in their private chat)
        return (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
    };
    // set-up db connections
    yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/test");
    const collection = mongoose_1.default.connection.db.collection("sessions");
    // use config
    bot_1.default.use((0, grammy_1.session)({
        initial,
        getSessionKey,
        storage: new grammy_mongodb_storage_1.MongoDBAdapter({ collection }),
    }));
});
const startBot = () => __awaiter(void 0, void 0, void 0, function* () {
    yield bootstrap();
    bot_1.default.use(menus_1.menuQuestions);
    (0, listeners_1.addListeners)();
    bot_1.default
        .start()
        .then((res) => console.log("BOT STARTED!", res))
        .catch((err) => console.log("BOT FAILED!", err));
});
startBot();
