import { run } from "@grammyjs/runner";
import { ISession, MongoDBAdapter } from "@satont/grammy-mongodb-storage";
import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import mongoose from "mongoose";
import { bindAll } from "./binders";
import { states } from "./elements/strings";
import { BotContext, BotType, ISessionData } from "./types";
import { getSessionKey } from "./utils/functions";

dotenv.config();

const bootstrap = async (bot: BotType) => {
  // initial data for user session
  const initial = (): ISessionData => ({
    id: 0,
    state: states.DEFAULT,
    coins: 5,
    score: 0,
    votes: 0,
    questions: [],
    qIndex: 0,
    isInvited: false,
  });

  // set-up db connections
  await mongoose.connect("mongodb://hzrjvb-mongo:27017/botdb", {
    // auth: { username: "root", password: "example" },
  });
  const collection = mongoose.connection.db.collection<ISession>("sessions");
  const storage = new MongoDBAdapter<ISessionData>({ collection });

  // use config
  bot.use(session({ initial, getSessionKey, storage }));
};

const start = async () => {
  const bot = new Bot<BotContext>(process.env.BOT_TOKEN ?? "");
  await bootstrap(bot);
  bindAll(bot);
  run(bot);
};

start();
