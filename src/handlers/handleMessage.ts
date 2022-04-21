import { constants, states } from "../elements/strings";
import { kbSendQ } from "../elements/keyboards";
import { BotContext } from "../types";

const handleMessage = async (ctx: BotContext) => {
  switch (ctx.session.state) {
    // record question
    case states.WRITE_Q:
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
      break;

    // in case of unknown message
    default:
      ctx.reply(constants.ERR_WTF);
  }
};

export default handleMessage;
