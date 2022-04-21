import { constants, queries } from "./elements/strings";
import menus from "./elements/menus";
import {
  handleAskQuestion,
  handleCredit,
  handleInvite,
  handleMyQuestions,
  handleProfile,
  handleScore,
} from "./handlers/handleCommands";
import { handleQuestionsInlineQuery } from "./handlers/handleInlineQueries";
import handleMessage from "./handlers/handleMessage";
import { handleQCancel, handleQSend } from "./handlers/handleQuestion";
import handleStart from "./handlers/handleStart";
import handleUpvote from "./handlers/handleUpvote";
import { BotType } from "./types";

export const bindListeners = (bot: BotType) => {
  /** COMMANDS */
  bot.command("start", handleStart);
  bot.command("new", handleAskQuestion);
  bot.command("questions", handleMyQuestions);
  bot.command("credit", handleCredit);
  bot.command("score", handleScore);
  bot.command("profile", handleProfile);
  bot.command("invite", handleInvite);
  /** HEARS */
  bot.hears(constants.M_ASK_Q, handleAskQuestion);
  bot.hears(constants.M_MY_QS, handleMyQuestions);
  bot.hears(constants.M_CREDIT, handleCredit);
  bot.hears(constants.M_MY_SCORE, handleScore);
  bot.hears(constants.M_PROFILE, handleProfile);
  bot.hears(constants.M_INVITE, handleInvite);
  // non-command
  bot.hears(constants.Q_CANCEL, handleQCancel);
  bot.hears(constants.Q_SEND, handleQSend);
  // tags
  bot.hears(constants.TAG_ANSWER, handleUpvote);
  /** HANDLE MESSAGE - DEPENGIN ON STATE */
  bot.on("message", handleMessage);
};

export const bindMenus = (bot: BotType) => {
  menus.forEach((menu) => {
    bot.use(menu);
  });
};

export const bindInlineQueries = (bot: BotType) => {
  bot.inlineQuery(queries.questions, handleQuestionsInlineQuery);
  // Return empty result list for other queries.
  bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
};

export const bindAll = (bot: BotType) => {
  bindMenus(bot);
  bindInlineQueries(bot);
  bindListeners(bot);
};
