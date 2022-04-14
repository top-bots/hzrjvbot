import { constants } from "../config";
import { kbMain } from "../elements/keyboards";
import { BotContext } from "../types";
import bot from "../bot";

export const handleQCancel = async (ctx: BotContext) => {
  await ctx.reply(constants.MSG_Q_CANCEL, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
};

export const handleQSend = async (ctx: BotContext) => {
  if (ctx.session.question)
    bot.api
      .sendMessage(constants.ID_CH, ctx.session.question)
      .then((res) => {
        if (ctx.session.question) {
          // add question to questions list
          ctx.session.questions = [
            ...ctx.session.questions,
            ctx.session.question,
          ];
          // reset question
          ctx.session.question = undefined;
        }
        // decrease coins
        ctx.session.coins--;
        // success
        ctx.reply(constants.MSG_Q_SENT, {
          reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
        });
      })
      .catch((err) => {
        console.log(err);
        ctx.reply(constants.ERR_TRY_LATER);
      });
};
