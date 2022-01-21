const express = require('express');
const morgan = require('morgan');
const asyncHandler = require('express-async-handler');
const { PlayerDeckTwo, PlayerDeckOne } = require('./models');

const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.get('/war/playerDecks', asyncHandler(async (req, res) => {
    const deckOne = await PlayerDeckOne.findAll()
    const deckTwo = await PlayerDeckTwo.findAll()

    res.json({ "playerOneDeck": deckOne, "playerTwoDeck": deckTwo })
}));


app.post('/war/start', asyncHandler(async (req, res) => {
    const { playerOneDeck, playerTwoDeck } = req.body;

    for (let i = 0; i < playerOneDeck.length; i++) {
        let currentCard = playerOneDeck[i];
        await PlayerDeckOne.create({
            association: currentCard.association,
            number: currentCard.number,
            suit: currentCard.suit,
            face: currentCard.face,
        })
    }

    for (let i = 0; i < playerTwoDeck.length; i++) {
        let currentCard = playerTwoDeck[i];
        await PlayerDeckTwo.create({
            association: currentCard.association,
            number: currentCard.number,
            suit: currentCard.suit,
            face: currentCard.face,
        })
    }

    const deckOne = await PlayerDeckOne.findAll()
    const deckTwo = await PlayerDeckTwo.findAll()

    res.json({ "playerOneDeck": deckOne, "playerTwoDeck": deckTwo })
}));

// const port = 8080;
// app.listen(port, () => console.log(`Listening on port ${port}....`));

module.exports = app;