import bot from "./bot";
import { constants } from "./config";
import handleStart from "./handlers/handleStart";

export const addListeners = () => {
  /** COMMANDS */
  bot.command("start", handleStart);
};
