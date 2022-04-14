import * as dotenv from "dotenv";
import { Bot, Context, session, SessionFlavor } from "grammy";
import { states } from "./config";

dotenv.config();

interface SessionData {
  state: string;
  coins: number;
  question?: string;
  questions: string[];
  answers: string[];
}

type BotContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<BotContext>(process.env.BOT_TOKEN ?? "");

function initial(): SessionData {
  return { state: states.DEFAULT, coins: 5, questions: [], answers: [] };
}
bot.use(session({ initial }));

export default bot;
