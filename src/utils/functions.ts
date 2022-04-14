import { constants } from "../config";

export const makeQuestionItem = (questions: string[], i: number) =>
  constants.MSG_Q_ITEM.replace("index", (i + 1).toString()).replace(
    "question",
    questions[i]
  );
