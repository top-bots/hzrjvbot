import { Context, SessionFlavor } from "grammy";

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
}

export type IBotContext = Context & SessionFlavor<ISessionData>;

export interface IQuestion {
  from: object;
  text: string;
}
