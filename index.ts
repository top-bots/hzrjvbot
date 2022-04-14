import bot from "./src/bot";
import "./src/listeners";

bot
  .start()
  .then((res) => console.log("BOT STARTED!", res))
  .catch((err) => console.log("BOT FAILED!", err));
