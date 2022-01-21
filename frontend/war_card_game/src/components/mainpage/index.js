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
    // console.log(pOneDeck?.length)
    const pTwoDeck = useSelector(state => state.playerDecks?.playerTwoDeck)
    // console.log(pTwoDeck?.length)

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


    const Phase = {
        Draw: 'Draw',
        Calculation: 'Calculation',
        War: 'War',
        Distribution: 'Distribution',
        End: 'End',
    }

    const [phase, setPhase] = useState(Phase.Draw)


    useEffect(async () => {
        const shuffledDeck = shuffle(deck)
        setShuffledDeck(shuffledDeck)
        distributeCards(shuffledDeck)
        const data = await dispatch(playerDecks.get_player_decks())

        if (data.playerOneDeck.length && data.playerTwoDeck.length) {
            setRenderStartBtn(false)
        }

        switch (phase) {
            case Phase.Draw:
                return;
            case Phase.Calculation:
                return;
            case Phase.War:
                return;
            case Phase.Distribution:
                return;
            case Phase.End:
                return;
        }

    }, [dispatch, renderStartBtn])

    return (
        <div className="outmost_ctnr">
            <div className="card_count_ctnr">
                <p className="player_one_count_label">
                    Player One Card Count:
                </p>
                <p className="player_two_count_label">
                    Player Two Card Count:
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
                        onClick={() => {
                            dispatch(playerDecks.addDecksToDatabase({ playerOneDeck: playerOneCards, playerTwoDeck: playerTwoCards }))
                            setRenderStartBtn(false);
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