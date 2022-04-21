import { constants } from "../elements/strings";
import { Session } from "../db/models";
import { kbMain } from "../elements/keyboards";
import { BotContext, ISessionData } from "../types";

const handleStart = async (ctx: BotContext) => {
  // look for referal payload
  const inviterId = ctx.match;
  if (inviterId) {
    Session.findOne({ key: inviterId.toString() }).then(
      async (inviterSession) => {
        if (!ctx.session.isInvited) {
          ctx.reply(constants.ERR_ALREADY_INV);
        } else if (inviterSession?.value) {
          // set flag
          ctx.session.isInvited = true;
          // give reward
          const newCoins = inviterSession.value.coins + 20;
          inviterSession.set("value.coins", newCoins);
          inviterSession.markModified("value.coins");
          await inviterSession.save();
          // notify +coins to inviter
          await ctx.api.sendMessage(
            inviterId.toString(),
            constants.MSG_CONGRAT_INV(newCoins)
          );
        }
      }
    );
  }
  // update user session id
  ctx.session.id = ctx.from?.id ?? 0;
  ctx.session.name = ctx.from?.username;
  // say welcome
  await ctx.reply(constants.MSG_WELCOME);
  await ctx.reply(constants.MSG_USE_MENU, {
    reply_markup: { keyboard: kbMain.build(), resize_keyboard: true },
  });
};

export default handleStart;
