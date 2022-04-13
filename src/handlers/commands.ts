import bot from "./bot";
import { constants } from "./config";
import { kbMain } from "./keyboards";

bot.command("start", async (ctx) => {
  await ctx.reply(constants.WELCOME);
  // await ctx.reply("Check out this menu:", { reply_markup: menu });
  await ctx.reply(constants.USE_MENU, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
});
