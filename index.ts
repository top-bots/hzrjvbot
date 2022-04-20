import mongoose from "mongoose";
import { session } from "telegraf-session-mongodb";
import bot from "./src/bot";
import { states } from "./src/config";
import { addListeners } from "./src/listeners";
import { ISession } from "./src/types";

const bootstrap = async () => {
  // initial data for user session
  const initial: ISession = {
    id: 0,
    state: states.DEFAULT,
    coins: 5,
    score: 0,
    votes: 0,
    questions: [],
    qIndex: 0,
  };

  // set-up db connections
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  const db = mongoose.connection.db;
  bot.use(session(db));
};

const startBot = async () => {
  await bootstrap();
  //bot.use(menuQuestions);
  addListeners();
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.launch();
};

startBot();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
