import { Telegraf } from 'telegraf';

const TOKEN = '7364592888:AAFZ8gewgO_wPgWsSOfYGCxx8_z3iKbKluI';
const bot = new Telegraf(TOKEN);

const web_link = 'https://hilarious-treacle-fee17f.netlify.app';

bot.start((ctx) => {
    ctx.reply("Welcome to the Daily Horoscope Bot! Click 'Open horoscope' to view your daily horoscope.", {
        reply_markup: {
            keyboard: [
                [{ text: "Open horoscope", web_app: { url: web_link } }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

bot.launch();