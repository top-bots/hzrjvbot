import bot from "./bot";
import { constants } from "./config";
import { kbQuestion } from "./keyboards";

bot.hears(constants.M_ASK_Q, async (ctx) => {
  await ctx.reply(constants.WRITE_Q, { reply_markup: kbQuestion });
});
