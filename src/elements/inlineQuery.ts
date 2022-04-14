// Shameless self-advertising in one project's documentation

import { InlineKeyboard } from "grammy";
import bot from "../bot";

// is the best kind of advertising.
bot.inlineQuery(/best bot (framework|library)/, async (ctx) => {
  await ctx.answerInlineQuery(
    [
      {
        type: "article",
        id: "grammy-website",
        title: "grammY",
        input_message_content: {
          message_text:
            "<b>grammY</b> is the best way to create your own Telegram bots. \
They even have a pretty website! 👇",
          parse_mode: "HTML",
        },
        reply_markup: new InlineKeyboard().url(
          "grammY website",
          "https://grammy.dev/"
        ),
        url: "https://grammy.dev/",
        description: "The Telegram Bot Framework.",
      },
    ],
    { cache_time: 30 * 24 * 3600 } // one month in seconds
  );
});

// Return empty result list for other queries.
bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
