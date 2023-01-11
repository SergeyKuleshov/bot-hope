const TelegramApi = require('node-telegram-bot-api');

const token = '5934598084:AAEKTZwdo7uK67FFrOgjskBM4ksw3O82EO8';

const bot = new TelegramApi(token, { polling: true });

const { stopWords, isStopWord } = require('./functions');
const { gameOptions, againOptions } = require('./options');

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадай', gameOptions);
};
const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Приветствие' },
        { command: '/info', description: 'Как меня зовут' },
        { command: '/stop', description: 'Список стоп слов' },
        { command: '/game', description: 'Иииграаа' }
    ]);

    bot.on('message', async msg => { // как правило функции связанные с ботами асинхронные

        // console.log(msg);  // информация о сообщении в виде объекта
        const text = msg.text;
        console.log(text);  // возвращает в консоль текст, написанный в чате

        const chatId = msg.chat.id;
        console.log(chatId);

        // bot.sendMessage(chatId, `Ты написал мне ${text}`);  // возвращает в чат

        if (text === '/start') { // со слэшем (/) команда
            return bot.sendMessage(chatId, 'Приветствую тебя');
        }

        if (text === 'start') { // без слэша (/) сработает по другому
            return bot.sendMessage(chatId, 'Старт без слэша');
        }

        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
        }

        if (isStopWord(text)) {
            return bot.sendMessage(chatId, `${msg.from.first_name}, первое предупреждение`);
        }

        const sw = stopWords.join();
        if (text === '/stop') {
            return bot.sendMessage(chatId, `${sw}`);
        }

        if (text === '/game') {
            // await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9');
            // const randomNumber = Math.floor(Math.random() * 10);
            // chats[chatId] = randomNumber;
            // return bot.sendMessage(chatId, 'Отгадай', gameOptions);
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю!');
    });

    // это слушатель колбэков
    bot.on('callback_query', msg => {
        const data = msg.data; // мой выбор
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, 'угадал');
        } else {
            return bot.sendMessage(chatId, `Увы! Бот загадал ${chats[chatId]}`, againOptions);
        }

        bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        console.log(msg);
        console.log(chats);


    });
};

start();

// [Function: eventNames]
// [Function: listeners]
// [Function: listenerCount]
// [Function: emit]
// [Function: once]
// [Function: removeListener]
// [Function: removeAllListeners]
// [Function: removeListener]
// [Function: on]

// В Telegram можно обменивать не только стикерами, видео и текстом, но и опросами. Создавать их очень просто.
// bot.sendPoll(chatId, 'Is Telegram great?', [‘Sure’, ‘Of course’])


