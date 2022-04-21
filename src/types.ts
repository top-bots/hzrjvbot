import { ISession } from "@satont/grammy-mongodb-storage";
import { Bot, Context, SessionFlavor } from "grammy";

export interface ISessionData {
  id: number;
  state: string;
  coins: number;
  score: number;
  votes: number;
  question?: string;
  questions: string[];
  qIndex: number;
  name?: string;
  isInvited: boolean;
}

export interface IBotSession extends ISession {
  value: ISessionData;
}

export type BotContext = Context & SessionFlavor<ISessionData>;

export type BotType = Bot<BotContext>;
