const express = require('express');
const morgan = require('morgan');
const asyncHandler = require('express-async-handler');
const { PlayerDeckTwo, PlayerDeckOne, Pot, Victory } = require('./models');

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


app.get('/war/pot', asyncHandler(async (req, res) => {
    const pot = await Pot.findAll()
    res.json({ 'pot': pot })
}));

app.post('/war/pot', asyncHandler(async (req, res) => {
    const { drawnCards } = req.body
    for (let i = 0; i < drawnCards.length; i++) {
        let currentCard = drawnCards[i]
        await Pot.create({
            association: currentCard.association,
            number: currentCard.number,
            suit: currentCard.suit,
            face: currentCard.face,
        })
    }

    const currentPot = await Pot.findAll()
    if (currentPot) {
        res.json({
            'pot': currentPot
        })
    }
}));

app.delete('/war/deleteCards/', asyncHandler(async (req, res) => {
    const currentPot = await Pot.findAll()
    const { winner } = req.body
    console.log(winner)
    for (let i = 0; i < currentPot.length; i++) {
        const assoc = currentPot[i].association
        const findRecordInPOneDeck = await PlayerDeckOne.findAll({
            where: {
                association: assoc
            }
        })
        const findRecordInPTwoDeck = await PlayerDeckTwo.findAll({
            where: {
                association: assoc
            }
        })

        if (findRecordInPOneDeck) {
            await PlayerDeckOne.destroy({
                where: {
                    association: assoc
                }
            })
        }

        if (findRecordInPTwoDeck) {
            await PlayerDeckTwo.destroy({
                where: {
                    association: assoc
                }
            })
        }
    }

    if (winner === 1) {
        for (let i = 0; i < currentPot.length; i++) {
            let currentCard = currentPot[i]
            await PlayerDeckOne.create({
                association: currentCard.association,
                number: currentCard.number,
                suit: currentCard.suit,
                face: currentCard.face,
            })
        }

    }

    if (winner === 2) {
        for (let i = 0; i < currentPot.length; i++) {
            let currentCard = currentPot[i]
            await PlayerDeckTwo.create({
                association: currentCard.association,
                number: currentCard.number,
                suit: currentCard.suit,
                face: currentCard.face,
            })
        }

    }

    const destroyPot = await Pot.destroy({
        where: {},
        truncate: true
    })



    const newPOneDeck = await PlayerDeckOne.findAll()
    const newPTwoDeck = await PlayerDeckTwo.findAll()

    res.json({
        'newPOneDeck': newPOneDeck,
        'newPTwoDeck': newPTwoDeck
    })
}));

// const port = 8080;
// app.listen(port, () => console.log(`Listening on port ${port}....`));

module.exports = app;