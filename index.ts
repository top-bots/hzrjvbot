import { ISession, MongoDBAdapter } from "@satont/grammy-mongodb-storage";
import { session } from "grammy";
import mongoose from "mongoose";
import bot from "./src/bot";
import { states } from "./src/config";
import { menuQuestions } from "./src/elements/menus";
import { addListeners } from "./src/listeners";
import { SessionData } from "./src/types";

const bootstrap = async () => {
  // initial data for user session
  const initial = (): SessionData => ({
    id: 0,
    state: states.DEFAULT,
    coins: 5,
    score: 0,
    votes: 0,
    questions: [],
    qIndex: 0,
  });

  // Stores data per user.
  const getSessionKey = (ctx: any): string | undefined => {
    // Give every user their personal session storage
    // (will be shared across groups and in their private chat)
    return ctx.from?.id.toString();
  };

  // set-up db connections
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  const collection = mongoose.connection.db.collection<ISession>("sessions");

  // use config
  bot.use(
    session({
      initial,
      getSessionKey,
      storage: new MongoDBAdapter<SessionData>({ collection }),
    })
  );
};

const startBot = async () => {
  await bootstrap();
  bot.use(menuQuestions);
  addListeners();
  bot
    .start()
    .then((res) => console.log("BOT STARTED!", res))
    .catch((err) => console.log("BOT FAILED!", err));
};

startBot();
