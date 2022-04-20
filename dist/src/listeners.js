"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListeners = void 0;
const bot_1 = __importDefault(require("./bot"));
const handleStart_1 = __importDefault(require("./handlers/handleStart"));
const addListeners = () => {
    /** COMMANDS */
    bot_1.default.command("start", handleStart_1.default);
};
exports.addListeners = addListeners;
