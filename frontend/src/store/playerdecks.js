const ADD_CARDS_TO_DECKS = 'deck/ADD_CARDS_TO_DECKS';
const GET_DECKS = 'decks/GET_DECKS';
const ADD_TO_POT = 'pot/ADD_TO_POT';
const GET_POT = 'pot/GET_POT';
const DELETE_DISTRIBUTE_PLAYER_CARDS = 'delete/DELETE_DISTRIBUTE_PLAYER_CARDS';
const EMPTY_DECKS_AND_POT = 'delete/EMPTY_DECKS_AND_POT';
const GET_VICTORIES = 'victories/GET_VICTORIES';


const add_cards_to_decks = (deck) => {
    return {
        type: ADD_CARDS_TO_DECKS,
        payload: deck
    }
}

const get_decks = (deck) => {
    return {
        type: GET_DECKS,
        payload: deck
    }
}

const add_to_pot = (pot) => {
    return {
        type: ADD_TO_POT,
        payload: pot
    }
}

const get_pot = (pot) => {
    return {
        type: GET_POT,
        payload: pot
    }
}

const delete_distribute_player_card = (deck) => {
    return {
        type: DELETE_DISTRIBUTE_PLAYER_CARDS,
        payload: deck
    }
}

const empty_decks_and_pot = (data) => {
    return {
        type: EMPTY_DECKS_AND_POT,
        payload: data
    }
}

const get_victories = (victories) => {
    return {
        type: GET_VICTORIES,
        payload: victories
    }
}





export const get_player_decks = () => async (dispatch) => {

    const response = await fetch('/war/playerDecks')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_decks({ POneDeck: data.playerOneDeck, PTwoDeck: data.playerTwoDeck }))
        return data
    }
}



export const addDecksToDatabase = (body) => async (dispatch) => {
    console.log(body)

    const response = await fetch('/war/start', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(add_cards_to_decks({ pOneData: data.playerOneDeck, pTwoData: data.playerTwoDeck }))
        return data
    }

}

export const DeleteAndDistributePlayerCards = (body) => async (dispatch) => {
    const response = await fetch(`/war/deleteAndAddCards/`, {
        method: "Delete",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delete_distribute_player_card({ dataOne: data.newPOneDeck, dataTwo: data.newPTwoDeck }))
        return data
    }
}


export const getPot = (body) => async (dispatch) => {
    const response = await fetch('/war/pot')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_pot(data.pot))
        return data
    }

}

export const addToPot = (body) => async (dispatch) => {

    const response = await fetch('/war/pot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(add_to_pot({ pot: data.pot, newPOneDeck: data.newPlayerOneDeck, newPTwoDeck: data.newPlayerTwoDeck }))
        return data
    }

}

export const recordVictory = (body) => async (dispatch) => {
    const response = await fetch('/war/victory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json()
        return data
    }
}

export const resetDatabase = () => async (dispatch) => {
    const response = await fetch('/war/reset', {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(empty_decks_and_pot({ 'emptyDeckOne': data.emptyDeckOne, 'emptyDeckTwo': data.emptyDeckTwo, 'emptyPot': data.emptyPot }))
        return data
    }
}

export const emptyPotForWinner = (body) => async (dispatch) => {
    const response = await fetch(`/war/distributePot/${body.idx}`)

    if (response.ok) {
        const data = await response.json()
        return data
    }
}


export const getVictories = (body) => async (dispatch) => {
    const response = await fetch(`/war/victory`)

    if (response.ok) {
        const data = await response.json()
        dispatch(get_victories(data.victories))
        return data
    }
}





const initialState = { decks: null }

const playerDeckReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_DECKS:
            newState = Object.assign({}, state);
            newState.playerOneDeck = action.payload.POneDeck;
            newState.playerTwoDeck = action.payload.PTwoDeck;
            return newState;
        case ADD_CARDS_TO_DECKS:
            newState = Object.assign({}, state);
            newState.playerOneDeck = action.payload.pOneData;
            newState.playerTwoDeck = action.payload.pTwoData;
            return newState;
        case ADD_TO_POT:
            newState = Object.assign({}, state);
            newState.pot = action.payload.pot;
            newState.playerOneDeck = action.payload.newPOneDeck;
            newState.playerTwoDeck = action.payload.newPTwoDeck;
            return newState;
        case GET_POT:
            newState = Object.assign({}, state);
            newState.pot = action.payload;
            return newState;
        case DELETE_DISTRIBUTE_PLAYER_CARDS:
            newState = Object.assign({}, state);
            newState.playerOneDeck = action.payload.dataOne;
            newState.playerTwoDeck = action.payload.dataTwo;
            return newState;
        case EMPTY_DECKS_AND_POT:
            newState = Object.assign({}, state);
            newState.playerOneDeck = action.payload.emptyDeckOne;
            newState.playerTwoDeck = action.payload.emptyDeckTwo;
            newState.pot = action.payload.emptyPot
            return newState;
        case GET_VICTORIES:
            newState = Object.assign({}, state);
            newState.victories = action.payload
            return newState;
        default:
            return state;
    }
}

export default playerDeckReducer;