const ADD_CARDS_TO_PONE_DECKS = 'deck/ADD_CARDS_TO_PONE_DECKS';
const ADD_CARDS_TO_PTWO_DECKS = 'deck/ADD_CARDS_TO_PTWO_DECKS';


const add_to_pOne_deck = (deck) => {
    return {
        type: ADD_CARDS_TO_PONE_DECKS,
        payload: deck
    }
}

const add_to_pTwo_deck = (deck) => {
    return {
        type: ADD_CARDS_TO_PTWO_DECKS,
        payload: deck
    }
}

export const get_player_decks = () => async (dispatch) => {

    const response = await fetch('/war/playerDecks')

    if (response.ok) {
        const data = await response.json()
        await dispatch(add_to_pOne_deck(data.playerOneDeck))
        await dispatch(add_to_pTwo_deck(data.playerTwoDeck))
        return data
    }
}



export const addDecksToDatabase = (body) => async (dispatch) => {

    const response = await fetch('/war/start', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(add_to_pOne_deck(data.playerOneDeck))
        await dispatch(add_to_pTwo_deck(data.playerTwoDeck))
        return data
    }

}


const initialState = { decks: null }

const playerDeckReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_CARDS_TO_PONE_DECKS:
            newState = Object.assign({}, state);
            newState.playerOneDeck = action.payload
            return newState;
        case ADD_CARDS_TO_PTWO_DECKS:
            newState = Object.assign({}, state);
            newState.playerTwoDeck = action.payload
            return newState;
        default:
            return state;
    }
}

export default playerDeckReducer;