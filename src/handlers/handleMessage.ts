import bot from "../bot";
import { constants, states } from "../config";
import { kbQuestion } from "../elements/keyboards";
import { BotContext } from "../types";
import { Question, Session } from "./../db/models";

const handleMessage = async (ctx: BotContext) => {
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
  if (ctx.chat?.id === constants.ID_GP && ctx.message?.from) {
    console.log("sudoer", ctx.message, ctx.session);
    const text = ctx.message.text;
    const repliedMessage = ctx.message.reply_to_message;
    const answerer = repliedMessage?.from;
    const answererId = answerer?.id.toString();
    const votes = ctx.session.votes;
    if (text === constants.TAG_ANSWER && !!answererId && votes > 0) {
      // decrease votes of current and notify
      ctx.session.votes--;
      await ctx.reply(constants.MSG_VOTED.replace("votes", votes.toString()));
      // increase score of answerer
      await Session.findOne(
        { key: answererId },
        async (err: any, session: any) => {
          console.log("findSession", session, err);
          if (session) {
            session.set("value", {
              ...session.value,
              score: session.value.score + 1,
            });
            await session.save();
            console.log("upvoted", answererId);
          }
        }
      );
      // notify upvote to answerer
      await bot.api.sendMessage(
        answererId,
        constants.MSG_CONGRAT.replace("answer", text)
      );
      // close comments
    } else {
      await ctx.reply(constants.ERR_CANT_VOTE);
    }
  }
};

export default handleMessage;
