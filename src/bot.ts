import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { IBotContext } from "./types";

dotenv.config();

const bot = new Telegraf<IBotContext>(process.env.BOT_TOKEN ?? "", {});

export default bot;
