const { expect } = require('chai');
const deck = require('../src/deck');


describe('should distribute cards to decks', function () {

    it('each deck has 26 cards', function () {
        let decks = distributeCards(deck)
        // console.log(decks[0].length, decks[1].length)
        expect(decks[0].length).equal(26)
        expect(decks[1].length).equal(26)

    });


});
describe('should check card values (char or num) and turn them into useable value', function () {

    it('give value to cards depending on the type of card', function () {
        const kingVal = translateFC('K')
        const queenVal = translateFC('Q')
        const nonFCVal = translateFC('7')

        expect(kingVal).to.equal(13)
        expect(queenVal).to.equal(12)
        expect(nonFCVal).to.equal(7)

    });


});
describe('should calculate outcome of drawn cards', function () {

    it('should show results of calculations for war or no war', function () {
        let cardOneDiff = '4H,3,Heart,false';
        let cardTwoDiff = '7S,6,Spade,false';
        let resultsOne = calculate(cardOneDiff, cardTwoDiff);
        expect(resultsOne[0]).to.equal(2)
        expect(resultsOne[1]).to.equal('Distribution')
        expect(resultsOne[2]).to.equal(false)
        let cardOneSame = '4H,3,Heart,false';
        let cardTwoSame = '4S,3,Spade,false';
        let resultsTwo = calculate(cardOneSame, cardTwoSame);
        expect(resultsTwo[0]).to.equal(0)
        expect(resultsTwo[1]).to.equal('War')
        expect(resultsTwo[2]).to.equal(true)


    });


});

describe('should determine the height of deck image in UI', function () {

    it('should shuffle original deck so cards are in different positions', function () {
        const result1 = amtCardsDisplayed([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
        const result2 = amtCardsDisplayed([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])
        const result3 = amtCardsDisplayed([1, 2, 3, 4, 5])
        const result4 = amtCardsDisplayed([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

        expect(result1).to.equal(3)
        expect(result2).to.equal(4)
        expect(result3).to.equal(0)
        expect(result4).to.equal(2)


    });


});








function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const otherVal = deck[randomIndex]
        deck[randomIndex] = deck[i]
        deck[i] = otherVal

    }
    return deck;

}

function distributeCards(deck) {
    let playerOneCards = deck.splice(0, 26);
    let playerTwoCards = deck
    return [playerOneCards, playerTwoCards]
}


function translateFC(cardVal) {
    if (cardVal === 'J') {
        return 11;
    } else if (cardVal === 'Q') {
        return 12;
    } else if (cardVal === 'K') {
        return 13;
    } else if (cardVal === 'A') {
        return 14;
    } else {
        return Number(cardVal);
    }
}

function calculate(pOneCard, pTwoCard) {
    const pOneCardSplit = pOneCard.split(',')
    console.log(pOneCardSplit)
    const pTwoCardSplit = pTwoCard.split(',')
    console.log(pTwoCardSplit)


    if ((pOneCardSplit[3] === 'false' && pTwoCardSplit[3] === 'false')) {
        //both cards are number cards
        //compare numbers from index 1 of initial split    
        if (Number(pOneCardSplit[1]) < Number(pTwoCardSplit[1])) {

            let winner = 2
            let nextPhase = 'Distribution'
            let war = false
            return [winner, nextPhase, war]
        } else if (Number(pOneCardSplit[1]) > Number(pTwoCardSplit[1])) {

            let winner = 1
            let nextPhase = 'Distribution'
            let war = false
            return [winner, nextPhase, war]
        } else {
            let winner = 0
            let nextPhase = 'War'
            let war = true
            return [winner, nextPhase, war]

        }
    } else if (!(pOneCardSplit[3] === 'false' && pTwoCardSplit[3] === 'false')) {
        //either both cards are not number cards or one card is not a number card
        const pOneCardVal = pOneCardSplit[1]
        const pTwoCardVal = pTwoCardSplit[1]
        const pOneVal = translateFC(pOneCardVal)
        console.log(pOneVal, "VALUE OF PLAYER ONE CARD")
        const pTwoVal = translateFC(pTwoCardVal)
        console.log(pTwoVal, "VALUE OF PLAYER TWO CARD")

        if (pOneVal > pTwoVal) {
            let winner = 2
            let nextPhase = 'Distribution'
            let war = false
            return [winner, nextPhase, war]


        } else if (pOneVal < pTwoVal) {
            let winner = 1
            let nextPhase = 'Distribution'
            let war = false
            return [winner, nextPhase, war]

        } else {
            let winner = 0
            let nextPhase = 'War'
            let war = true
            return [winner, nextPhase, war]
        }
    }


}

function amtCardsDisplayed(array) {
    if (array.length < 10) {
        return 0;
    } else if (array.length < 10) {
        return 1;
    } else if (array.length < 20) {
        return 2;
    } else if (array.length < 35) {
        return 3;
    } else if (array.length < 53) {
        return 4;
    }
}
