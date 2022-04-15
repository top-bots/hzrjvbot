import { Bot } from "grammy";
import { BotContext } from "./types";
import * as dotenv from "dotenv";

dotenv.config();

const bot = new Bot<BotContext>(process.env.BOT_TOKEN ?? "");

export default bot;
