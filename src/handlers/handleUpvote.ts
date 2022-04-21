import { Session } from "../db/models";
import { constants } from "../elements/strings";
import { BotContext } from "../types";

const handleUpvote = async (ctx: BotContext) => {
  // check if it is correct chat - channel's supergroup
  if (ctx.chat?.id === constants.ID_GP && ctx.message?.from) {
    const repliedMessage = ctx.message.reply_to_message;
    const answerer = repliedMessage?.from;
    const answererId = answerer?.id;
    const voter = ctx.message.from;
    const voterId = voter.id;
    // vote system
    if (!!answererId && answererId !== voterId) {
      // decrease votes of current and notify
      const newVotes = ctx.session.votes - 1;
      if (newVotes >= 0) {
        // decrease votes
        ctx.session.votes = newVotes;
        console.log("-vote", ctx.session);
        // notify to voter privately
        await ctx.api.sendMessage(voterId, constants.MSG_VOTED(newVotes));

        // increase score of answerer
        await Session.findOne({ key: answererId.toString() })
          .then(async (answererSession) => {
            if (answererSession?.value) {
              // increase score
              const newScore = answererSession.value.score + 1;
              answererSession.set("value.score", newScore);
              answererSession.markModified("value.score");
              await answererSession.save();
              console.log("+score", answererSession);
              // notify upvote to answerer
              await ctx.api.sendMessage(
                answererId,
                constants.MSG_CONGRAT_ANS(repliedMessage?.text ?? "---")
              );
            }
          })
          .catch((err) => console.log("error findSession for scores", err));
      } else {
        await ctx.api.sendMessage(voterId, constants.ERR_CANT_VOTE);
      }
    }
  }
};

export default handleUpvote;
