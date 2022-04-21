import { NextFunction } from "grammy";
import { kbMain } from "../elements/keyboards";
import { constants } from "../elements/strings";
import { BotContext } from "../types";

export const handleQCancel = async (ctx: BotContext) => {
  await ctx.reply(constants.MSG_Q_CANCEL, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
  ctx.session.question = undefined;
};

export const handleQSend = async (ctx: BotContext, next: NextFunction) => {
  const questions = ctx.session.questions;
  const question = ctx.session.question;
  const newCoins = ctx.session.coins - 1;
  const newVotes = ctx.session.votes + 2;
  if (question) {
    await ctx.api
      .sendMessage(constants.ID_CH, question)
      .then(async (res) => {
        console.log("messageSentToChannel", res);
        // add question to related session in db
        ctx.session = {
          ...ctx.session,
          questions: [...questions, question], // add question to list
          question: undefined, // remove question
          coins: newCoins, // decrease coins
          votes: newVotes, // increase votes
        };
        console.log("handleQSend", ctx.session);
        // success
        await ctx.reply(constants.MSG_Q_SENT(newVotes), {
          reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
        });
      })
      .catch(async (err) => {
        console.log(err);
        await ctx.reply(constants.ERR_TRY_LATER);
      });
  } else {
    ctx.reply(constants.ERR_Q_LEN);
  }
  return ctx.session;
};
