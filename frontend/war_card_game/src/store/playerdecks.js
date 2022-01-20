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



export const AddToDecks = (body) => async (dispatch) => {

    const response = await fetch('/startgame', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);
        await dispatch(add_to_pOne_deck(responseData.playerOneDeck));
        await dispatch(add_to_pTwo_deck(responseData.playerTwoDeck));
        return responseData
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