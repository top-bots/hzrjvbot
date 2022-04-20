import { model } from "mongoose";
import { IQuestion, ISession } from "../types";
import { questionSchema, sessionSchema } from "./schemas";

export const Question = model<IQuestion>("Question", questionSchema);
export const Session = model<ISession>("Session", sessionSchema);
