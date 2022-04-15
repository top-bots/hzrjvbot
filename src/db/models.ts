import { ISession } from "@satont/grammy-mongodb-storage";
import { model } from "mongoose";
import { IQuestion } from "../types";
import { questionSchema, sessionSchema } from "./schemas";

export const Question = model<IQuestion>("Question", questionSchema);
export const Session = model<ISession>("Session", sessionSchema);
