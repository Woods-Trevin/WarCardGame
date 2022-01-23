import "./mainpage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as playerDecks from '../../store/playerdecks'
import club from '../images/club.png'
import spade from '../images/spade.png'
import heart from '../images/heart.jpeg'
import diamond from '../images/diamond.png'
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
                sessionStorage.setItem('war', 'No War')
            } else if (Number(pOneCardSplit[1]) > Number(pTwoCardSplit[1])) {
                sessionStorage.setItem('winner', 1)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)
                sessionStorage.setItem('war', 'No War')
            } else {
                setPhase(Phase.War)
                sessionStorage.setItem('phase', Phase.War)
                sessionStorage.setItem('war', 'War')

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
                sessionStorage.setItem('war', 'No War')


            } else if (pOneVal < pTwoVal) {
                sessionStorage.setItem('winner', 2)
                setPhase(Phase.Distribution)
                sessionStorage.setItem('phase', Phase.Distribution)
                sessionStorage.setItem('war', 'No War')

            } else {
                setPhase(Phase.War)
                sessionStorage.setItem('phase', Phase.War)
                sessionStorage.setItem('war', 'War')
            }
        }


    }

    function battle(pOneFaceUp, pTwoFaceUp) {
        let fd1 = 1
        let fd2 = 2
        let fd3 = 3
        let potArray = [];

        if (pOneFaceUp.face === 'false' && pTwoFaceUp.face === 'false') {
            let pOneFaceDownOne = pOneDeck[fd1]
            let pOneFaceDownTwo = pOneDeck[fd2]
            let pOneFaceDownThree = pOneDeck[fd3]

            let pTwoFaceDownOne = pTwoDeck[fd1]
            let pTwoFaceDownTwo = pTwoDeck[fd2]
            let pTwoFaceDownThree = pTwoDeck[fd3]

            potArray.push(pOneFaceDownOne)
            potArray.push(pOneFaceDownTwo)
            potArray.push(pOneFaceDownThree)
            potArray.push(pOneFaceUp)

            potArray.push(pTwoFaceDownOne)
            potArray.push(pTwoFaceDownTwo)
            potArray.push(pTwoFaceDownThree)
            potArray.push(pTwoFaceUp)
            // console.log(potArray, "POT ARRAY WHEN CARDS ARE NOT FCs")

            if (Number(pOneFaceUp.number) < Number(pTwoFaceUp.number)) {
                sessionStorage.setItem('winner', 2)
            } else {
                sessionStorage.setItem('winner', 1)
            }

        } else {
            let pOneFaceDownOne = pOneDeck[fd1]
            let pOneFaceDownTwo = pOneDeck[fd2]
            let pOneFaceDownThree = pOneDeck[fd3]

            potArray.push(pOneFaceDownOne)
            potArray.push(pOneFaceDownTwo)
            potArray.push(pOneFaceDownThree)
            potArray.push(pOneFaceUp)

            let pTwoFaceDownOne = pTwoDeck[fd1]
            let pTwoFaceDownTwo = pTwoDeck[fd2]
            let pTwoFaceDownThree = pTwoDeck[fd3]

            potArray.push(pTwoFaceDownOne)
            potArray.push(pTwoFaceDownTwo)
            potArray.push(pTwoFaceDownThree)
            potArray.push(pTwoFaceUp)
            // console.log(potArray, "POT ARRAY WHEN ATLEAST ONE CARD IS FC")

            let pOneFUVal = translateFC(pOneFaceUp.number)
            let pTwoFUVal = translateFC(pTwoFaceUp.number)
            if (pOneFUVal > pTwoFUVal) {
                sessionStorage.setItem('winner', 1)
            } else {
                sessionStorage.setItem('winner', 2)
            }

        }
        return potArray;
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
    const [pOneCardSuit, setPOneCardSuit] = useState();
    const [pTwoCardSuit, setPTwoCardSuit] = useState();
    const [pOneCardNumber, setPOneCardNumber] = useState();
    const [pTwoCardNumber, setPTwoCardNumber] = useState();
    // console.log(phase, "CURRENT PHASE")

    let OPERATIONSPEED = 1000;


    useEffect(async () => {
        const shuffledDeck = shuffle(deck)
        setShuffledDeck(shuffledDeck)
        distributeCards(shuffledDeck)

        const data = await dispatch(playerDecks.get_player_decks())
        await dispatch(playerDecks.getPot())

        if (data.playerOneDeck.length && data.playerTwoDeck.length) {
            setRenderStartBtn(false)
        }

        // calculate("7H,8,Heart,false", "7D,8,Diamond,false")



        console.log("RERENDER")
        switch (phase) {
            case Phase.Draw:
                console.log("REACHED DRAW PHASE")
                const pOneDraw = pOneDeck.shift()
                console.log(pOneDraw, "PONE DRAW")
                const pTwoDraw = pTwoDeck.shift()
                console.log(pTwoDraw, "PTWO DRAW")

                if (!pOneDeck.length || !pTwoDeck.length) {
                    const timeout = setTimeout(async () => {
                        setPhase(Phase.End)
                        sessionStorage.setItem('phase', Phase.End)
                    }, OPERATIONSPEED)
                    return () => clearTimeout(timeout)
                }

                const payload = [
                    pOneDraw,
                    pTwoDraw
                ]
                sessionStorage.setItem("pOneDraw",
                    [
                        pOneDraw?.association,
                        pOneDraw?.number,
                        pOneDraw?.suit,
                        pOneDraw?.face
                    ])
                sessionStorage.setItem("pOneCardSuit", pOneDraw?.suit)
                sessionStorage.setItem("pOneCardNum", pOneDraw?.number)
                setPOneCardSuit(sessionStorage.getItem("pOneCardSuit"))
                setPOneCardNumber(sessionStorage.getItem("pOneCardNum"))


                sessionStorage.setItem("pTwoDraw",
                    [
                        pTwoDraw?.association,
                        pTwoDraw?.number,
                        pTwoDraw?.suit,
                        pTwoDraw?.face
                    ])
                sessionStorage.setItem("pTwoCardSuit", pTwoDraw?.suit)
                sessionStorage.setItem("pTwoCardNum", pTwoDraw?.number)
                setPTwoCardSuit(sessionStorage.getItem("pTwoCardSuit"))
                setPTwoCardNumber(sessionStorage.getItem("pTwoCardNum"))


                await dispatch(playerDecks.addToPot({ drawnCards: payload }))
                const timeout = setTimeout(async () => {
                    setPhase(Phase.Calculation)
                    sessionStorage.setItem('phase', Phase.Calculation)
                }, OPERATIONSPEED)

                return () => clearTimeout(timeout)

            case Phase.Calculation:
                console.log("REACHED CALCULATION PHASE")
                const pOneCard = sessionStorage.getItem("pOneDraw")
                const pTwoCard = sessionStorage.getItem("pTwoDraw")
                if (pOneCard && pTwoCard) {
                    const timeout = setTimeout(() => {
                        calculate(pOneCard, pTwoCard)
                    }, OPERATIONSPEED)

                    return () => clearTimeout(timeout)
                }
                return;
            case Phase.War:
                console.log("REACHED WAR PHASE")

                //getting 5th card at index 4
                let new_fu = 4
                let pOneFaceUp = pOneDeck[new_fu]
                console.log(pOneFaceUp, "CURRENT FACEUP PLAYER ONE")
                let pTwoFaceUp = pTwoDeck[new_fu]
                console.log(pTwoFaceUp, "CURRENT FACEUP PLAYER TWO")

                if (!pTwoFaceUp || !pOneFaceUp) {
                    const timeout = setTimeout(async () => {
                        setPhase(Phase.End)
                        sessionStorage.setItem('phase', Phase.End)
                    }, OPERATIONSPEED)
                    return () => clearTimeout(timeout)
                }

                if (pOneFaceUp !== pTwoFaceUp) {
                    const potArray = battle(pOneFaceUp, pTwoFaceUp)
                    console.log(potArray, "FINAL POT ARRAY WHEN SOMEONE WINS")
                    dispatch(playerDecks.addToPot({ drawnCards: potArray }))
                    const timeout = setTimeout(() => {
                        sessionStorage.setItem('phase', Phase.Distribution)
                        setPhase(Phase.Distribution)
                    }, OPERATIONSPEED)
                    return () => clearTimeout(timeout)
                }
                //getting all facedown cards after cards already held in pot
                let fd1 = 1
                let fd2 = 2
                let fd3 = 3

                let potArray = [];

                while (pOneFaceUp === pTwoFaceUp) {

                    let pOneFaceDownOne = pOneDeck[fd1]
                    let pOneFaceDownTwo = pOneDeck[fd2]
                    let pOneFaceDownThree = pOneDeck[fd3]

                    potArray.push(pOneFaceDownOne)
                    potArray.push(pOneFaceDownTwo)
                    potArray.push(pOneFaceDownThree)
                    potArray.push(pOneFaceUp)

                    let pTwoFaceDownOne = pTwoDeck[fd1]
                    let pTwoFaceDownTwo = pTwoDeck[fd2]
                    let pTwoFaceDownThree = pTwoDeck[fd3]

                    potArray.push(pTwoFaceDownOne)
                    potArray.push(pTwoFaceDownTwo)
                    potArray.push(pTwoFaceDownThree)
                    potArray.push(pTwoFaceUp)
                    console.log(potArray, "POT ARRAY DURING AN ITERATION")

                    new_fu += new_fu
                    fd1 += new_fu
                    fd2 += new_fu
                    fd3 += new_fu

                }
                console.log(potArray, "FINAL POT ARRAY")

                let pOneFUVal = translateFC(pOneFaceUp.number)
                let pTwoFUVal = translateFC(pTwoFaceUp.number)

                if (potArray) {
                    if (pOneFUVal < pTwoFUVal) {
                        sessionStorage.setItem('winner', 2)
                        dispatch(playerDecks.addToPot({ drawnCards: potArray }))
                        const timeout = setTimeout(() => {
                            sessionStorage.setItem('war', 'War')
                            sessionStorage.setItem('phase', Phase.Distribution)
                            setPhase(Phase.Distribution)
                        }, OPERATIONSPEED)
                        return () => clearTimeout(timeout)
                    } else {
                        sessionStorage.setItem('winner', 1)
                        dispatch(playerDecks.addToPot({ drawnCards: potArray }))
                        const timeout = setTimeout(() => {
                            sessionStorage.setItem('war', 'War')
                            sessionStorage.setItem('phase', Phase.Distribution)
                            setPhase(Phase.Distribution)
                        }, OPERATIONSPEED)
                        return () => clearTimeout(timeout)
                    }

                }

                return;
            case Phase.Distribution:
                console.log("REACHED DISTRIBUTION PHASE")
                // const playerOneCard = sessionStorage.getItem("pOneDraw")
                // const playerTwoCard = sessionStorage.getItem("pTwoDraw")
                const winner = sessionStorage.getItem("winner")
                const war = sessionStorage.getItem("war")

                if (war === "No War") {
                    console.log("NO WAR")
                    if (Number(winner) === 1) {
                        console.log('PLAYER ONE WON')
                        const data = await dispatch(playerDecks.DeleteAndDistributePlayerCards({ winner: Number(winner) }))
                        if (data) {
                            const timeout = setTimeout(() => {
                                setPhase(Phase.Draw)
                                sessionStorage.setItem('phase', Phase.Draw)
                            }, OPERATIONSPEED)
                            return () => clearTimeout(timeout)
                        }
                    }
                    if (Number(winner) === 2) {
                        console.log('PLAYER TWO WON')
                        const data = await dispatch(playerDecks.DeleteAndDistributePlayerCards({ winner: Number(winner) }))
                        if (data) {
                            const timeout = setTimeout(() => {
                                setPhase(Phase.Draw)
                                sessionStorage.setItem('phase', Phase.Draw)
                            }, OPERATIONSPEED)
                            return () => clearTimeout(timeout)
                        }
                    }
                } else {
                    console.log("WAR")
                    if (Number(winner) === 1) {
                        console.log('PLAYER ONE WON WAR')
                        const data = await dispatch(playerDecks.DeleteAndDistributePlayerCards({ winner: Number(winner) }))
                        if (data) {
                            const timeout = setTimeout(() => {
                                setPhase(Phase.Draw)
                                sessionStorage.setItem('phase', Phase.Draw)
                            }, OPERATIONSPEED)
                            return () => clearTimeout(timeout)
                        }
                    }
                    if (Number(winner) === 2) {
                        console.log('PLAYER TWO WON WAR')
                        const data = await dispatch(playerDecks.DeleteAndDistributePlayerCards({ winner: Number(winner) }))
                        if (data) {
                            const timeout = setTimeout(() => {
                                setPhase(Phase.Draw)
                                sessionStorage.setItem('phase', Phase.Draw)
                            }, OPERATIONSPEED)
                            return () => clearTimeout(timeout)
                        }
                    }
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
                        <div className="top_suit_ctnr--left">
                            <li className="card_num">{pOneCardNumber}</li>
                            <img src={(pOneCardSuit === 'Club' ? club : undefined) || (pOneCardSuit === 'Heart' ? heart : undefined) || (pOneCardSuit === 'Diamond' ? diamond : undefined) || (pOneCardSuit === 'Spade' ? spade : undefined)} className="suit--top" />
                        </div>
                        <div className="mid_suit_ctnr">
                            <img src={(pOneCardSuit === 'Club' ? club : undefined) || (pOneCardSuit === 'Heart' ? heart : undefined) || (pOneCardSuit === 'Diamond' ? diamond : undefined) || (pOneCardSuit === 'Spade' ? spade : undefined)} className="suit--mid" />
                        </div>
                        <div className="bottom_suit_ctnr--left">
                            <img src={(pOneCardSuit === 'Club' ? club : undefined) || (pOneCardSuit === 'Heart' ? heart : undefined) || (pOneCardSuit === 'Diamond' ? diamond : undefined) || (pOneCardSuit === 'Spade' ? spade : undefined)} className="suit--bottom" />
                            <li className="card_num">{pOneCardNumber}</li>
                        </div>
                    </div>
                </div>
                <div className="pf--two">
                    <div className="playerTwo_pf_card card-slot1">
                        <div className="top_suit_ctnr--right">
                            <li className="card_num" >{pTwoCardNumber}</li>
                            <img src={(pTwoCardSuit === 'Club' ? club : undefined) || (pTwoCardSuit === 'Heart' ? heart : undefined) || (pTwoCardSuit === 'Diamond' ? diamond : undefined) || (pTwoCardSuit === 'Spade' ? spade : undefined)} className="suit--top" />
                        </div>
                        <div className="mid_suit_ctnr">
                            <img src={(pTwoCardSuit === 'Club' ? club : undefined) || (pTwoCardSuit === 'Heart' ? heart : undefined) || (pTwoCardSuit === 'Diamond' ? diamond : undefined) || (pTwoCardSuit === 'Spade' ? spade : undefined)} className="suit--mid" />
                        </div>
                        <div className="bottom_suit_ctnr--right">
                            <img src={(pTwoCardSuit === 'Club' ? club : undefined) || (pTwoCardSuit === 'Heart' ? heart : undefined) || (pTwoCardSuit === 'Diamond' ? diamond : undefined) || (pTwoCardSuit === 'Spade' ? spade : undefined)} className="suit--bottom" />
                            <li className="card_num">{pTwoCardNumber}</li>
                        </div>

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