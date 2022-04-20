import {MenuTemplate, MenuMiddleware} from 'telegraf-inline-menu';
import { constants } from "../config";
import { IBotContext } from "../types";

const updateListQuestion = async (ctx: IBotContext) => {
  const questions = ctx.session.questions;
  const i = ctx.session.qIndex;
  if (questions.length === 0) await ctx.reply(constants.MSG_NO_Q);
  else await ctx.editMessageText(constants.MSG_Q_ITEM(questions, i));
};

export const menuQuestions = new Menu<IBotContext>("questions-menu")
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
