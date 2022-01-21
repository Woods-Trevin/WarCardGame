import "./mainpage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as playerDecks from '../../store/playerdecks'
const deck = require('../../deck');


function Mainpage() {
    const [shuffledDeck, setShuffledDeck] = useState();
    // console.log(shuffledDeck);
    const [playerOneCards, setPlayerOneCards] = useState();
    const [playerTwoCards, setPlayerTwoCards] = useState();
    const dispatch = useDispatch();

    const pOneDeck = useSelector(state => state.playerDecks?.playerOneDeck)
    // console.log(pOneDeck.pop())
    const pTwoDeck = useSelector(state => state.playerDecks?.playerTwoDeck)
    // console.log(pTwoDeck.pop())

    const [renderStartBtn, setRenderStartBtn] = useState(true)




    function shuffle(deck) {
        let currentIndex = deck.length;
        let randomIndex = 0;

        // O(n)
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]]
        }
        // console.log(deck);
        return deck;

    }

    function distributeCards(deck) {
        let playerOneCards = deck.splice(0, 26);
        setPlayerOneCards(playerOneCards)
        let playerTwoCards = deck
        setPlayerTwoCards(playerTwoCards)

    }

    const translateFC = (cardVal) => {
        console.log(cardVal, "CARD VALUE FOR FACECARD")
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

    const calculate = (pOneCard, pTwoCard) => {
        const pOneCardSplit = pOneCard.split(',')
        console.log(pOneCardSplit)
        const pTwoCardSplit = pTwoCard.split(',')
        console.log(pTwoCardSplit)


        if ((pOneCardSplit[3] === 'false' && pTwoCardSplit[3] === 'false')) {
            //both cards are number cards
            //compare numbers from index 1 of initial split    
            if (Number(pOneCardSplit[1]) < Number(pTwoCardSplit[1])) {
                sessionStorage.setItem('winner', 2)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)
            } else if (Number(pOneCardSplit[1]) > Number(pTwoCardSplit[1])) {
                sessionStorage.setItem('winner', 1)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)
            } else {
                setPhase(Phase.War)
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
                sessionStorage.setItem('winner', 1)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)


            } else if (pOneVal < pTwoVal) {
                sessionStorage.setItem('winner', 2)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)

            } else {
                setPhase(Phase.War)
            }
        }


    }


    const Phase = {
        Draw: 'Draw',
        Calculation: 'Calculation',
        War: 'War',
        Distribution: 'Distribution',
        End: 'End',
    }

    const currentPhase = sessionStorage.getItem('phase')
    const [phase, setPhase] = useState(currentPhase ? currentPhase : null)
    console.log(phase, "CURRENT PHASE")



    useEffect(async () => {
        const shuffledDeck = shuffle(deck)
        setShuffledDeck(shuffledDeck)
        distributeCards(shuffledDeck)

        const data = await dispatch(playerDecks.get_player_decks())

        if (data.playerOneDeck.length && data.playerTwoDeck.length) {
            setRenderStartBtn(false)
        }

        // calculate("7H,8,Heart,false", "7D,8,Diamond,false")



        console.log("RERENDER")
        switch (phase) {
            case Phase.Draw:
                // console.log("Draw Phase")
                const pOneDraw = pOneDeck.shift()
                // console.log(pOneDraw, "PONE DRAW")
                const pTwoDraw = pTwoDeck.shift()
                // console.log(pTwoDraw, "PTWO DRAW")

                sessionStorage.setItem("pOneDraw",
                    [
                        pOneDraw?.association,
                        pOneDraw?.number,
                        pOneDraw?.suit,
                        pOneDraw?.face
                    ])
                sessionStorage.setItem("pTwoDraw",
                    [
                        pTwoDraw?.association,
                        pTwoDraw?.number,
                        pTwoDraw?.suit,
                        pTwoDraw?.face
                    ])
                const timeout = setTimeout(() => {
                    setPhase(Phase.Calculation)
                    sessionStorage.setItem('phase', Phase.Calculation)
                }, 1000)

                return () => clearTimeout(timeout)

            case Phase.Calculation:
                const pOneCard = sessionStorage.getItem("pOneDraw")
                const pTwoCard = sessionStorage.getItem("pTwoDraw")
                if (pOneCard && pTwoCard) {
                    const timeout = setTimeout(() => {
                        calculate(pOneCard, pTwoCard)
                    }, 1000)

                    return () => clearTimeout(timeout)
                }
                return;
            case Phase.War:
                console.log("REACHED WAR PHASE")
                return;
            case Phase.Distribution:
                console.log("REACHED DISTRIBUTION PHASE")
                const playerOneCard = sessionStorage.getItem("pOneDraw")
                const playerTwoCard = sessionStorage.getItem("pTwoDraw")
                const winner = sessionStorage.getItem("winner")

                if (Number(winner) === 1) {

                }
                return;
            case Phase.End:
                console.log("REACHED END PHASE")
                return;
        }

    }, [dispatch, renderStartBtn, phase])

    return (
        <div className="outmost_ctnr">
            <div className="card_count_ctnr">
                <p className="player_one_count_label">
                    Player One Card Count: {pOneDeck?.length}
                </p>
                <p className="player_two_count_label">
                    Player Two Card Count: {pTwoDeck?.length}
                </p>
            </div>
            <div className="cards_ctnr">
                <div className="card_ctnr--left">
                    <div className="player_one_card one" />
                    <div className="player_one_card two" />
                    <div className="player_one_card three" />
                    <div className="player_one_card four" />
                    <div className="player_one_card five" />
                    <div className="player_one_card six" />
                    <div className="player_one_card seven" />
                    <div className="player_one_card eight" />
                    <div className="player_one_card nine" />
                    <div className="player_one_card ten" />
                </div>
                <div className='phasePrompt'>
                    {renderStartBtn && <li className='startGame_btn'
                        onClick={async () => {
                            const data = await dispatch(playerDecks.addDecksToDatabase({ playerOneDeck: playerOneCards, playerTwoDeck: playerTwoCards }))
                            if (data) {
                                setRenderStartBtn(false);
                                sessionStorage.setItem('phase', Phase.Draw)
                                setPhase(Phase.Draw)
                            }
                        }}
                    >
                        Start Game
                    </li>}


                </div>
                <div className="card_ctnr--right">
                    <div className="player_two_card one" />
                    <div className="player_two_card two" />
                    <div className="player_two_card three" />
                    <div className="player_two_card four" />
                    <div className="player_two_card five" />
                    <div className="player_two_card six" />
                    <div className="player_two_card seven" />
                    <div className="player_two_card eight" />
                    <div className="player_two_card nine" />
                    <div className="player_two_card ten" />
                </div>
            </div>
            <div className="playing_field">
                <div className="pf--one">
                    <div className="playerOne_pf_card card-slot1">

                    </div>
                    <div className="playerOne_pf_card card-slot2">

                    </div>
                    <div className="playerOne_pf_card card-slot3">

                    </div>
                    <div className="playerOne_pf_card card-slot4">

                    </div>
                </div>
                <div className="pf--two">
                    <div className="playerTwo_pf_card card-slot1">

                    </div>
                    <div className="playerTwo_pf_card card-slot2">

                    </div>
                    <div className="playerTwo_pf_card card-slot3">

                    </div>
                    <div className="playerTwo_pf_card card-slot4">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;