const express = require('express');
const morgan = require('morgan');
const asyncHandler = require('express-async-handler');
const { PlayerDeckTwo, PlayerDeckOne } = require('./models');

const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.post('/startgame', asyncHandler(async (req, res) => {
    const { playerOneDeck, playerTwoDeck } = req.body;

    for (let i = 0; i < playerOneDeck.length; i++) {
        let currentCard = playerOneDeck[i];
        const card = await PlayerDeckOne.create({

        })
    }

    for (let i = 0; i < playerTwoDeck.length; i++) {
        let currentCard = playerTwoDeck[i];
    }

}));

// const port = 8080;
// app.listen(port, () => console.log(`Listening on port ${port}....`));

module.exports = app;