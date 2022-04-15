import MongoStorage from "@satont/grammy-mongodb-storage";
import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import mongoose from "mongoose";
import { states } from "./config";
import { BotContext, SessionData } from "./types";

dotenv.config();

const initializeBot = async () => {
  // initial data for user session
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

  // Stores data per user.
  function getSessionKey(ctx: any): string | undefined {
    // Give every user their personal session storage
    // (will be shared across groups and in their private chat)
    return ctx.from?.id.toString();
  }

  // set-up db connections
  await mongoose.connect("mongodb://localhost:27017/test");

  const collection =
    mongoose.connection.db.collection<MongoStorage.ISession>("sessions");

  // use config
  bot.use(
    session({
      initial,
      getSessionKey,
      storage: new MongoStorage.MongoDBAdapter({ collection }),
    })
  );
};

const bot = new Bot<BotContext>(process.env.BOT_TOKEN ?? "");
initializeBot();

export default bot;
