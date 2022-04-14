import bot from "./bot";
import { constants, states } from "./config";
import { kbMain, kbQuestion } from "./elements/keyboards";

/** COMMANDS */
bot.command("start", async (ctx) => {
  await ctx.reply(constants.MSG_WELCOME);
  await ctx.reply(constants.MSG_USE_MENU, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
});

/** HEARS */
// ask qustion
bot.hears(constants.M_ASK_Q, (ctx) => {
  ctx.session.state = states.WRITE_Q;
  ctx.reply(constants.MSG_WRITE_Q);
});
// check credit
bot.hears(constants.M_CREDIT, (ctx) => {
  const coins = ctx.session.coins;
  const message = constants.MSG_CREDIT.replace("coins", coins.toString());
  ctx.reply(message);
});
// question - cancel
bot.hears(constants.Q_CANCEL, (ctx) => {
  ctx.reply(constants.MSG_Q_CANCEL, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
});
// question - send
bot.hears(constants.Q_SEND, (ctx) => {
  if (ctx.session.question)
    bot.api
      .sendMessage(constants.ID_CH, ctx.session.question)
      .then((res) => {
        if (ctx.session.question) {
          // add question to questions list
          ctx.session.questions = [
            ...ctx.session.questions,
            ctx.session.question,
          ];
          // reset question
          delete ctx.session.question;
        }
        // decrease coins
        ctx.session.coins = ctx.session.coins - 1;
        // success
        ctx.reply(constants.MSG_Q_SENT, {
          reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
        });
      })
      .catch((err) => {
        console.log(err);
        ctx.reply(constants.ERR_TRY_LATER);
      });
});

/** HANDLE MESSAGE - DEPENGIN ON STATE */
bot.on("message", (ctx) => {
  // send question to channel
  if (ctx.session.state === states.WRITE_Q) {
    // check question length
    const question = ctx.message.text?.toString() ?? "";
    if (question.length > 250 || question.length < 5) {
      ctx.reply(constants.ERR_Q_LEN);
    } else {
      ctx.session.state = states.DEFAULT;
      ctx.session.question = question;
      ctx.reply(constants.MSG_POST_Q, {
        reply_markup: { keyboard: kbQuestion.build(), resize_keyboard: true },
      });
    }
  }
});
