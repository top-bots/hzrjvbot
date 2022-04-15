import { constants } from "../config";
import { kbMain } from "../elements/keyboards";
import { BotContext } from "../types";

const handleStart = async (ctx: BotContext) => {
  // update user session id
  ctx.session.id = ctx.from?.id ?? 0;
  // say welcome
  await ctx.reply(constants.MSG_WELCOME);
  await ctx.reply(constants.MSG_USE_MENU, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
};

export default handleStart;
