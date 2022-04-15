import { Menu } from "@grammyjs/menu";
import bot from "../bot";
import { constants } from "../config";
import { makeQuestionItem } from "../utils/functions";
import { BotContext } from "../types";

const updateListQuestion = async (ctx: BotContext) => {
  const questions = ctx.session.questions;
  const i = ctx.session.qIndex;
  if (questions.length === 0) await ctx.reply(constants.MSG_NO_Q);
  else await ctx.editMessageText(makeQuestionItem(questions, i));
};

export const menuQuestions = new Menu<BotContext>("questions-menu")
  .text(
    (ctx) =>
      ctx.session.questions.length > 0 && ctx.session.qIndex > 0 ? "⏪" : "",
    (ctx) => {
      ctx.session.qIndex = 0;
      updateListQuestion(ctx);
    }
  )
  .text(
    (ctx) =>
      ctx.session.questions.length > 0 && ctx.session.qIndex > 1 ? "◀️" : "",
    (ctx) => {
      ctx.session.qIndex--;
      updateListQuestion(ctx);
    }
  )
  .text(
    (ctx) =>
      ctx.session.questions.length > 0 &&
      ctx.session.qIndex < ctx.session.questions.length - 2
        ? "▶️"
        : "",
    (ctx) => {
      ctx.session.qIndex++;
      updateListQuestion(ctx);
    }
  )
  .text(
    (ctx) =>
      ctx.session.questions.length > 0 &&
      ctx.session.qIndex < ctx.session.questions.length - 1
        ? "⏩"
        : "",
    (ctx) => {
      ctx.session.qIndex = ctx.session.questions.length - 1;
      updateListQuestion(ctx);
    }
  );

bot.use(menuQuestions);
