import { Keyboard } from "grammy";
import { constants } from "../config";

export const kbMain = new Keyboard()
  .text(constants.M_ASK_Q)
  .row()
  .text(constants.M_CREDIT)
  .text(constants.M_MY_SCORE)
  .text(constants.M_MY_QS)
  .row()
  .text(constants.M_INVITE);

export const kbQuestion = new Keyboard()
  .text(constants.Q_SEND)
  .text(constants.Q_CANCEL);
