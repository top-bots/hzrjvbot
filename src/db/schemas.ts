import { ISession } from "@satont/grammy-mongodb-storage";
import { Schema } from "mongoose";
import { IQuestion } from "../types";

export const questionSchema = new Schema<IQuestion>({
  from: Object,
  text: String,
  answer: {
    from: Object,
    text: String,
  },
});

export const sessionSchema = new Schema<ISession>({
  _id: { $oid: String },
  key: String,
  value: Object,
});
