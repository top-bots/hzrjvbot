import { constants, states } from "../config";
import { menuQuestions } from "../elements/menus";
import { makeQuestionItem } from "../utils/functions";
import { BotContext } from "../types";

// check if the ctx state is default
const checkDefaultState = (ctx: BotContext) =>
  ctx.session.state === states.DEFAULT;

export const handleAskQuestion = async (ctx: BotContext) => {
  const coins = ctx.session.coins;
  if (coins > 0) {
    ctx.session.state = states.WRITE_Q;
    await ctx.reply(constants.MSG_WRITE_Q, {
      reply_markup: { remove_keyboard: true },
    });
  } else ctx.reply(constants.ERR_CREDIT);
};

export const handleCredit = async (ctx: BotContext) => {
  const coins = ctx.session.coins;
  const message = constants.MSG_CREDIT.replace("coins", coins.toString());
  await ctx.reply(message);
};

export const handleScore = async (ctx: BotContext) => {
  const score = ctx.session.score;
  const message = constants.MSG_SCORE.replace("score", score.toString());
  await ctx.reply(message);
};

export const handleMyQuestions = async (ctx: BotContext) => {
  const questions = ctx.session.questions;
  const i = ctx.session.qIndex;
  if (questions.length === 0) await ctx.reply(constants.MSG_NO_Q);
  else
    await ctx.reply(makeQuestionItem(questions, i), {
      reply_markup: menuQuestions,
    });
};
