import { Schema } from "mongoose";
import { IBotSession } from "./../types";

export const sessionSchema = new Schema<IBotSession>({
  _id: { $oid: String },
  key: String,
  value: {
    id: Number,
    state: String,
    coins: Number,
    score: Number,
    votes: Number,
    question: String,
    questions: [String],
    qIndex: Number,
    name: String,
    isInvited: Boolean,
  },
});
