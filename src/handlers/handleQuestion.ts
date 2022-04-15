import { constants } from "../config";
import { kbMain } from "../elements/keyboards";
import { BotContext } from "../types";
import bot from "../bot";
import { Question } from "../db/models";
import { NextFunction } from "grammy";

export const handleQCancel = async (ctx: BotContext) => {
  await ctx.reply(constants.MSG_Q_CANCEL, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
};

export const handleQSend = async (ctx: BotContext, next: NextFunction) => {
  const questions = ctx.session.questions;
  const question = ctx.session.question;
  const coins = ctx.session.coins;
  if (question)
    await bot.api
      .sendMessage(constants.ID_CH, question)
      .then(async (res) => {
        console.log("messageSendt", res);
        // add question to questions db
        const questionObj = new Question({
          from: ctx.from,
          text: question,
          channel_msg: res,
        });
        await questionObj.save();
        // add questionId to related session in db
        const questionId = questionObj._id.toString();
        const updatedSession = {
          ...ctx.session,
          questions: [...questions, questionId], // add question to list
          question: undefined, // remove question
          coins: coins - 1, // decrease coins
        };
        ctx.session = updatedSession;
        console.log("handleQSend", ctx.session, questionObj);
        // success
        await ctx.reply(constants.MSG_Q_SENT, {
          reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
        });
      })
      .catch(async (err) => {
        console.log(err);
        await ctx.reply(constants.ERR_TRY_LATER);
      });
  // await next();
  return ctx.session;
};
