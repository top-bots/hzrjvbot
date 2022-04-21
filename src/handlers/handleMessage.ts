import { constants, states } from "../config";
import { kbSendQ } from "../elements/keyboards";
import { IBotContext } from "../types";

const handleMessage = async (ctx: IBotContext) => {
  // record question
  if (ctx.session.state === states.WRITE_Q) {
    // check question length
    const question = ctx.message?.text?.toString() ?? "";
    if (question.length > 250 || question.length < 5) {
      await ctx.reply(constants.ERR_Q_LEN);
    } else {
      ctx.session.state = states.DEFAULT;
      ctx.session.question = question;
      await ctx.reply(constants.MSG_POST_Q, {
        reply_markup: { keyboard: kbSendQ.build(), resize_keyboard: true },
      });
    }
  }
};

export default handleMessage;
