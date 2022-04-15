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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const keyboards_1 = require("../elements/keyboards");
const handleStart = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // update user session id
    ctx.session.id = (_b = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0;
    ctx.session.name = (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.username;
    // say welcome
    yield ctx.reply(config_1.constants.MSG_WELCOME);
    yield ctx.reply(config_1.constants.MSG_USE_MENU, {
        reply_markup: { keyboard: keyboards_1.kbMain.build(), resize_keyboard: true },
    });
});
exports.default = handleStart;
