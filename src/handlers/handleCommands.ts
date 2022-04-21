import { constants, states } from "../elements/strings";
import { menuQuestions } from "../elements/menus";
import { BotContext } from "../types";
import { kbWriteQ } from "./../elements/keyboards";

export const handleAskQuestion = async (ctx: BotContext) => {
  const coins = ctx.session.coins;
  if (coins > 0) {
    ctx.session.state = states.WRITE_Q;
    await ctx.reply(constants.MSG_WRITE_Q, {
      reply_markup: { keyboard: kbWriteQ.build(), resize_keyboard: true },
    });
  } else ctx.reply(constants.ERR_CREDIT);
};

export const handleMyQuestions = async (ctx: BotContext) => {
  const questions = ctx.session.questions;
  const i = 0;
  ctx.session.qIndex = i; // reset qIndex for menu
  if (questions.length === 0) await ctx.reply(constants.MSG_NO_Q);
  else
    await ctx.reply(constants.MSG_Q_ITEM(questions, i), {
      reply_markup: menuQuestions,
    });
};

export const handleCredit = async (ctx: BotContext) => {
  const coins = ctx.session.coins;
  const message = constants.MSG_CREDIT(coins);
  await ctx.reply(message);
};

export const handleScore = async (ctx: BotContext) => {
  const score = ctx.session.score;
  const votes = ctx.session.votes;
  const message = constants.MSG_SCORE(score, votes);
  await ctx.reply(message);
};

export const handleProfile = async (ctx: BotContext) => {};

export const handleInvite = async (ctx: BotContext) => {
  const id = ctx.from?.id;
  if (id) {
    const message = constants.MSG_INVITE_LINK(id);
    await ctx.reply(message);
  }
};
