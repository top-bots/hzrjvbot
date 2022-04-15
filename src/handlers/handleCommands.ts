import { constants, states } from "../config";
import { menuQuestions } from "../elements/menus";
import { makeQuestionItem } from "../utils/functions";
import { BotContext } from "../types";
import { Question, Session } from "./../db/models";
import bot from "../bot";

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
  const message = constants.MSG_CREDIT.replace("coins", coins?.toString());
  await ctx.reply(message);
};

export const handleScore = async (ctx: BotContext) => {
  const score = ctx.session.score;
  const votes = ctx.session.votes;
  const message = constants.MSG_SCORE.replace(
    "score",
    score.toString()
  ).replace("votes", votes?.toString());
  await ctx.reply(message);
};

export const handleMyQuestions = async (ctx: BotContext) => {
  const questions = ctx.session.questions;
  const i = 0;
  ctx.session.qIndex = i; // reset qIndex for menu
  if (questions.length === 0) await ctx.reply(constants.MSG_NO_Q);
  else
    await ctx.reply(makeQuestionItem(questions, i), {
      reply_markup: menuQuestions,
    });
};

export const handleUpvote = async (ctx: BotContext) => {
  // check if it is correct chat - channel's supergroup
  if (ctx.chat?.id === constants.ID_GP && ctx.message?.from) {
    console.log("voter", ctx.message, ctx.session);
    const repliedMessage = ctx.message.reply_to_message;
    const answerer = repliedMessage?.from;
    const answererId = answerer?.id;
    const voter = ctx.message.from;
    const voterId = voter.id;
    if (!!answererId) {
      // decrease votes of current and notify
      await Session.findOne({ key: voterId.toString() })
        .then(async (session: any) => {
          console.log("-vote", session);
          const newVotes = session.value.votes - 1;
          if (newVotes >= 0) {
            // decrease votes
            session.set("value", { ...session.value, votes: newVotes });
            await session.save();
            console.log("decrease votes of", voterId);
            // notify to voter
            await bot.api.sendMessage(
              voterId,
              constants.MSG_VOTED.replace("votes", newVotes.toString())
            );
          } else {
            await bot.api.sendMessage(voterId, constants.ERR_CANT_VOTE);
          }
        })
        .catch((err) => console.log("error findSession for votes", err));
      // increase score of answerer
      await Session.findOne({ key: answererId.toString() })
        .then(async (session: any) => {
          console.log("+score", session);
          const score = session.value.score;
          // increase score
          session.set("value", { ...session.value, score: score + 1 });
          await session.save();
          console.log("upvoted", answererId);
          // notify upvote to answerer
          await bot.api.sendMessage(
            answererId,
            constants.MSG_CONGRAT.replace(
              "answer",
              repliedMessage?.text?.toString() ?? ""
            )
          );
        })
        .catch((err) => console.log("error findSession for scores", err));
    }
  }
};
