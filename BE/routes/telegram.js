const telegramBot = require('node-telegram-bot-api')

const router = require('express').Router();



//GET ALL USER

router.post('/', async (req, res) => {
    const tokenTele = process.env.TELEGRAM_TOKEN
    const bot = new telegramBot(tokenTele, { polling: true });
    bot.sendMessage("-933492543", req.body.message, { parse_mode: "Markdown" }) 
    return res.status(200).json('Send Message Successfuly')
});

module.exports = router