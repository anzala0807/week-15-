var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1875119020:AAHGtM9gl6gdSqN7UOQwSFq207_CLw0Ic3o'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /menu to main menu`
    );   
});

bot.onText(/\/menu/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `this is your main menu`
    );   
});

// routers
r.get('/prediction/:x/:y/:z', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x), // string to float
            parseFloat(req.params.y),
            parseFloat(req.params.z)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
