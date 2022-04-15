"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.states = exports.constants = void 0;
exports.constants = {
    SHOUT: "!!!!!!!!!!!!!!!1HERE!!!!!!!!!!!!!!!",
    // ids
    ID_BOT: "@hzrjvbot",
    ID_CH: "@hzrjvban",
    ID_GP: -1001560880892,
    ID_GP_CH: 1087968824,
    ID_TELEGRAM: 777000,
    ID_ADMIN: 1067234323,
    ID_ACC1: 496440443,
    ID_ACC2: 1806989359,
    //tags
    TAG_ANSWER: "#جواب",
    // messages
    MSG_WELCOME: `سلام به ربات حاضر جواب خوش اومدی 😍 
برای شروع میتونی از گزینه های موجود در منو استفاده کنی
و با مراجعه به کانال تلگرام حاضرجواب سوال خودتون رو مشاهده کنی
به ازای هر سوالی که میپرسی دوتا رای بهت داده میشه که میتونی هرجایی ازشون استفاده کنی
فقط کافیه اگه از جوابی خوشت اومد اونو با تگ #جواب ریپلای کنی

کانال رسمی ربات: @hzrjvban`,
    MSG_USE_MENU: "خانه 🏠 - از منوی زیر دستور مورد نظرتو انتخاب کن",
    MSG_WRITE_Q: "متن دلخواهت رو بنویس و بعدش گزینه ارسال رو بزن",
    MSG_POST_Q: "آیا از ارسال این سوال در کانال ربات مطئنی؟",
    MSG_Q_CANCEL: "باشه لغو شد",
    MSG_Q_SENT: (votes) => `سوال شما با موفقیت در کانال ارسال شد \nدو رای به رای های شما اضافه شد. \nتعداد رای های شما: ${votes}`,
    MSG_CREDIT: (coins) => `مقدار سکه های شما ${coins} می باشد`,
    MSG_SCORE: (score, votes) => `مقدار امتیاز شما ${score} می باشد \nتعداد رای های شما ${votes} می باشد`,
    MSG_NO_Q: "شما تاکنون سوالی نپرسیده اید",
    MSG_Q_ITEM: (questions, i) => `سوال ${i + 1}: \n\n${questions[i]}`,
    MSG_CONGRAT: (answer) => `تبریک شما یک امتیاز دریافت کردید! \n\nجواب شما: ${answer}`,
    MSG_VOTED: (votes) => `رای شما ثبت شد! \nتعداد رای های باقی مانده: ${votes}`,
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
    ERR_CREDIT: "شما سکه کافی برای سوال جدید ندارید",
    ERR_Q_LEN: "متن چت شما باید بین ۵ تا ۲۵۰ کلمه باشد",
    ERR_TRY_LATER: "سرور شلوغه یه بار دیگه امتحان کن",
    ERR_CANT_VOTE: "خطا! شما رای کافی ندارید و نمیتوانید رای دهید",
};
exports.states = {
    DEFAULT: "DEFAULT",
    WRITE_Q: "WRITE_Q",
};
