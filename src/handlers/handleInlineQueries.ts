import { InlineQueryResultArticle } from "grammy/out/platform.node";
import { BotContext } from "../types";

export const handleQuestionsInlineQuery = async (ctx: BotContext) => {
  const colors = [
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-red-circle_1f534.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-orange-circle_1f7e0.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-yellow-circle_1f7e1.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-green-circle_1f7e2.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-blue-circle_1f535.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-purple-circle_1f7e3.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/large-brown-circle_1f7e4.png",
  ];
  const questionsList: InlineQueryResultArticle[] = ctx.session.questions.map(
    (question, i) => ({
      type: "article",
      id: `question-${i}`,
      title: `سوال شماره ${i + 1}`,
      description: question,
      hide_url: true,
      thumb_url: colors[i % colors.length],
      input_message_content: {
        message_text: question,
        parse_mode: "HTML",
      },
      // reply_markup: new InlineKeyboard().url(
      //   "grammY website",
      //   "https://grammy.dev/"
      // ),
    })
  );
  const config = { cache_time: 5 }; // one month in seconds 30 * 24 * 3600
  await ctx.answerInlineQuery(questionsList, config);
};
