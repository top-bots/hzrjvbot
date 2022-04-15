"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_mongodb_storage_1 = __importDefault(require("@satont/grammy-mongodb-storage"));
const dotenv = __importStar(require("dotenv"));
const grammy_1 = require("grammy");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
dotenv.config();
const initializeBot = () => __awaiter(void 0, void 0, void 0, function* () {
    // initial data for user session
    function initial() {
        return {
            state: config_1.states.DEFAULT,
            coins: 5,
            score: 0,
            questions: ["aaaa", "bbbb", "ccc", "dddd", "eeee"],
            qIndex: 0,
            answers: [],
        };
    }
    // Stores data per user.
    function getSessionKey(ctx) {
        var _a;
        // Give every user their personal session storage
        // (will be shared across groups and in their private chat)
        return (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
    }
    // set-up db connections
    yield mongoose_1.default.connect("mongodb://localhost:27017/test");
    const collection = mongoose_1.default.connection.db.collection("sessions");
    // use config
    bot.use((0, grammy_1.session)({
        initial,
        getSessionKey,
        storage: new grammy_mongodb_storage_1.default.MongoDBAdapter({ collection }),
    }));
});
const bot = new grammy_1.Bot((_a = process.env.BOT_TOKEN) !== null && _a !== void 0 ? _a : "");
initializeBot();
exports.default = bot;
