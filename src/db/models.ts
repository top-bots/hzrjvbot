import { model } from "mongoose";
import { IBotSession } from "../types";
import { sessionSchema } from "./schemas";

export const Session = model<IBotSession>("Session", sessionSchema);
