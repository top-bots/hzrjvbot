import { constants, states } from "../config";
import { kbQuestion } from "../elements/keyboards";
import { BotContext } from "../types";

const handleMessage = async (ctx: BotContext) => {
  console.log(ctx.session);
  // send question to channel
  if (ctx.session.state === states.WRITE_Q) {
    // check question length
    const question = ctx.message?.text?.toString() ?? "";
    if (question.length > 250 || question.length < 5) {
      await ctx.reply(constants.ERR_Q_LEN);
    } else {
      ctx.session.state = states.DEFAULT;
      ctx.session.question = question;
      await ctx.reply(constants.MSG_POST_Q, {
        reply_markup: { keyboard: kbQuestion.build(), resize_keyboard: true },
      });
    }
  }
};

export default handleMessage;
