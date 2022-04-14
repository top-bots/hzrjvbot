"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.states = exports.constants = void 0;
exports.constants = {
    // ids
    ID_BOT: "@hzrjvbot",
    ID_CH: "@hzrjvban",
    // messages
    MSG_WELCOME: `سلام به ربات حاضر جواب خوش اومدی 😍 
برای شروع میتونی از گزینه های موجود در منو استفاده کنی
و با مراجعه به کانال تلگرام حاضرجواب سوال خودتون رو مشاهده کنی
در نهایت اگه از جواب کسی خوشت اومد اون رو با تگ #جواب ریپلای کن`,
    MSG_USE_MENU: "خانه 🏠 - از منوی زیر دستور مورد نظرتو انتخاب کن",
    MSG_WRITE_Q: "متن چت طرفت رو بنویس و بعدش گزینه ارسال رو بزن",
    MSG_POST_Q: "آیا از ارسال این سوال در کانال ربات مطئنی؟",
    MSG_Q_CANCEL: "باشه لغو شد",
    MSG_Q_SENT: "سوال شما با موفقیت در کانال ارسال شد",
    MSG_CREDIT: "مقدار سکه های شما coins می باشد",
    MSG_SCORE: "مقدار امتیاز شما score می باشد",
    MSG_NO_Q: "شما تاکنون سوالی نپرسیده اید",
    MSG_Q_ITEM: "سوال index: \n\nquestion",
    // queries
    M_ASK_Q: "➕ پرسیدن یک سوال جدید",
    M_MY_QS: "❔ سوال هام",
    M_MY_SCORE: "⭐️ امتیازات",
    M_PROFILE: "👤 پروفایل",
    M_HELP: "ℹ️ راهنما",
    M_CREDIT: "🪙 سکه",
    M_INVITE: "🫂 معرفی به دوستان (سکه رایگان) 💰",
    // question
    Q_SEND: "✔️ ارسال",
    Q_CANCEL: "❌ لغو",
    // errors
    ERR_Q_LEN: "متن چت شما باید بین ۵ تا ۲۵۰ کلمه باشد",
    ERR_TRY_LATER: "سرور شلوغه یه بار دیگه امتحان کن",
};
exports.states = {
    DEFAULT: "DEFAULT",
    WRITE_Q: "WRITE_Q",
};