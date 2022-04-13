import { Menu } from "@grammyjs/menu";

// Create a simple menu.
export const menuProfile = new Menu("my-menu-identifier")
  .text("A", (ctx) => ctx.reply("You pressed A!"))
  .text("B", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("C", (ctx) => ctx.reply("You pressed C!"))
  .text("D", (ctx) => ctx.reply("You pressed D!"));
