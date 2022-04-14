import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import { states } from "./config";
import { BotContext, SessionData } from "./types";

dotenv.config();

const bot = new Bot<BotContext>(process.env.BOT_TOKEN ?? "");

function initial(): SessionData {
  return {
    state: states.DEFAULT,
    coins: 5,
    score: 0,
    questions: ["aaaa", "bbbb", "ccc", "dddd", "eeee"], //TODO
    qIndex: 0,
    answers: [],
  };
}
bot.use(session({ initial }));

export default bot;
