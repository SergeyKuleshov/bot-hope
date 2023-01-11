const TelegramApi = require('node-telegram-bot-api');

const token = '5934598084:AAEKTZwdo7uK67FFrOgjskBM4ksw3O82EO8';

const bot = new TelegramApi(token, { polling: true });

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Инстукция' },
        { command: '/take', description: 'Вводи данные, дорогая' },
        { command: '/show', description: 'Покажи мне всех' }
    ]);


    bot.on('message',  msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return bot.sendMessage(chatId, 'Здесь будет интсрукция, как пользоваться');
        }

        if (text === '/take') {
            return bot.sendMessage(chatId, 'Введи имя, потом дату итд');
        }

        if (text === '/show') {
            return bot.sendMessage(chatId, 'Покажи моих клиентов. Позже можно будет выбрать блажайших по времент, или конкретно по фамилии');
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю!');
    });
};

start();