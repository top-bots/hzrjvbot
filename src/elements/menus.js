"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuProfile = void 0;
const menu_1 = require("@grammyjs/menu");
// Create a simple menu.
exports.menuProfile = new menu_1.Menu("my-menu-identifier")
    .text("A", (ctx) => ctx.reply("You pressed A!"))
    .text("B", (ctx) => ctx.reply("You pressed B!"))
    .row()
    .text("C", (ctx) => ctx.reply("You pressed C!"))
    .text("D", (ctx) => ctx.reply("You pressed D!"));
