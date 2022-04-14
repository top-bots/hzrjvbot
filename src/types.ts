import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  state: string;
  coins: number;
  score: number;
  question?: string;
  questions: string[];
  qIndex: number;
  answers: string[];
}

export type BotContext = Context & SessionFlavor<SessionData>;
