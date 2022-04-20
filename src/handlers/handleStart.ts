import { constants } from "../config";
import { kbMain } from "../elements/keyboards";
import { IBotContext } from "../types";

const handleStart = async (ctx: IBotContext) => {
  // update user session id
  ctx.session.id = ctx.from?.id ?? 0;
  ctx.session.name = ctx.from?.username;
  // say welcome
  await ctx.reply(constants.MSG_WELCOME);
  await ctx.reply(constants.MSG_USE_MENU, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
};

export default handleStart;
