import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  id: number;
  state: string;
  coins: number;
  score: number;
  question?: string;
  questions: string[];
  qIndex: number;
  answers: string[];
  name?: string;
  votes: number;
}

export type BotContext = Context & SessionFlavor<SessionData>;

export interface IQuestion {
  from: object;
  text: string;
}
