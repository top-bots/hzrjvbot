import { Context } from "telegraf";

export interface ISession {
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

export interface IBotContext extends Context {
  session: ISession;
}
export interface IQuestion {
  from: object;
  text: string;
}
