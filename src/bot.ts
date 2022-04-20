import { Bot } from "grammy";
import { IBotContext } from "./types";
import * as dotenv from "dotenv";

dotenv.config();

const bot = new Bot<IBotContext>(process.env.BOT_TOKEN ?? "");

export default bot;
