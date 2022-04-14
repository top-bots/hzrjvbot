import bot from "./bot";
import { constants } from "./config";
import {
  handleAskQuestion,
  handleCredit,
  handleMyQuestions,
  handleScore,
} from "./handlers/handleCommands";
import handleMessage from "./handlers/handleMessage";
import { handleQCancel, handleQSend } from "./handlers/handleQuestion";
import handleStart from "./handlers/handleStart";

/** COMMANDS */
bot.command("start", handleStart);
bot.command("questions", handleMyQuestions);
bot.command("credit", handleCredit);
bot.command("score", handleScore);
bot.command("profile", () => {});
bot.command("invite", () => {});

/** HEARS */
bot.hears(constants.M_ASK_Q, handleAskQuestion);
bot.hears(constants.M_MY_QS, handleMyQuestions);
bot.hears(constants.M_MY_SCORE, handleScore);
bot.hears(constants.M_CREDIT, handleCredit);
bot.hears(constants.Q_CANCEL, handleQCancel);
bot.hears(constants.Q_SEND, handleQSend);

/** HANDLE MESSAGE - DEPENGIN ON STATE */
bot.on("message", handleMessage);
