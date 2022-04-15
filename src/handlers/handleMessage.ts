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
    console.log("voter", ctx.message, ctx.session);
    const text = ctx.message.text;
    const repliedMessage = ctx.message.reply_to_message;
    const answerer = repliedMessage?.from;
    const answererId = answerer?.id;
    const voter = ctx.message.from;
    const voterId = voter.id;
    if (text === constants.TAG_ANSWER && !!answererId) {
      // decrease votes of current and notify
      await Session.findOne({ key: voterId.toString() })
        .then(async (session: any) => {
          console.log("-vote", session);
          const votes = session.value.votes;
          if (votes > 0) {
            // decrease votes
            session.set("value", { ...session.value, votes: votes - 1 });
            await session.save();
            console.log("decrease votes of", voterId);
            // notify to voter
            await bot.api.sendMessage(
              voterId,
              constants.MSG_VOTED.replace("votes", votes.toString())
            );
          } else {
            await bot.api.sendMessage(voterId, constants.ERR_CANT_VOTE);
          }
        })
        .catch((err) => console.log("error findSession for votes", err));
      // increase score of answerer
      await Session.findOne({ key: answererId.toString() })
        .then(async (session: any) => {
          console.log("+score", session);
          const score = session.value.score;
          // increase score
          session.set("value", { ...session.value, score: score + 1 });
          await session.save();
          console.log("upvoted", answererId);
          // notify upvote to answerer
          await bot.api.sendMessage(
            answererId,
            constants.MSG_CONGRAT.replace("answer", text)
          );
        })
        .catch((err) => console.log("error findSession for scores", err));
    }
  }
};

export default handleMessage;
