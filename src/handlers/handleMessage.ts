import { constants, states } from "../config";
import { kbQuestion } from "../elements/keyboards";
import { BotContext } from "../types";

const handleMessage = async (ctx: BotContext) => {
  //console.log(ctx.session)
  console.log(ctx.message?.text);

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
        reply_markup: { keyboard: kbQuestion.build(), resize_keyboard: true },
      });
    }
  }

  // look for upvotes replies and give score
  console.log(ctx.message);
  if (ctx.message?.from?.id === constants.ID_GP) {
    console.log(constants.SHOUT);
    const answererId = ctx.message.from.id.toString();
    const repliedMessage = ctx.message.reply_to_message;
    const isAsnwererUser = true;
    if (!!repliedMessage && isAsnwererUser) {
      // increase answerers score
      // mark question as answered and set answer to question object
    }
  }
};

export default handleMessage;
