## War Card Game

War (also known as Battle in the United Kingdom) is a simple card game, typically played by two players using a standard playing card deck.

The goal is to be the first player to win all 52 cards

### THE DEAL
The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them.

### THE PLAY
Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.

If the cards are the same rank, it is War. Each player turns up one card face down and one card face up. The player with the higher cards takes both piles (six cards).If the turned-up cards are again the same rank, each player places another card face down and turns another card face up. The player with the higher card takes all 10 cards, and so on.

If a player runs out of cards or does not have enough cards for the war phase, that player loses.

## Application Architecture

This application is a fullstack Postgres, Express, React.js/Redux, and Node.js application. The backend interacts with the frontend by responding to frontend fetch requests, and fetching data from the Postgres database. The frontend displays this information to the user.

## Frontend Overview

The frontend is a mixture of React and Redux. The cards are brought from the backend and stored in different slices of state for each player's deck. As the game continues the current phase is shown and cards drawn at the start of each round is displayed. The decks also change images as the number of cards in player decks changes. Lastly, the number of cards in each deck are shown throughout the game.


### Frontend Tech Used:

#### React
There is only one component that handles all of the game functionality. The phases are controlled by a switch on a string signifying each phase. When a phase ends, the new phase is saved in sessionStorage and useState() hook variables. The DOM rerenders and the next phase starts based on the new phase string that was stored in sessionStorage and passed to the useState() hook variable.


#### Redux
Redux thunks are designed in a store directory in playerDecks.js. Each function handles some part of the redux functionality. These functions handle deletion of cards from the database, adding cards to a victors deck, retrieving the cards of both players, adding cards to the pot, retrieving cards from the pot, distributing cards won to victors, and resetting the application. All of the functions interact with the backend and store information sent back in responses in slices of state to be "used" by the players.

## Backend Overview
War uses Express for the backend interacting with Postgres as the database for persisting and storing most of the data. The server sends data requested to the frontend and the frontend displays that data at each phase when necessary.

### Backend Tech used:


#### Express
I chose to use a very simple implementation of Express without using express router since there was no need for multiple specific routes. The two specific endpoints to pay attention to are the POST '/war/start' and POST '/war/victory': 

- The former starts the game by taking the decks sent from the frontend in a fetch request and filling the respective player deck tables with cards. After the cards are populated there is a query for all elements in each table, ordered by id in ascending order, to be sent in a response to the frontend. 

- The latter is only triggered when the End Phase occurs signifying the end of the game. The only purpose of this endpoint is to store who wins in.

There are other endpoints that are important as well!

GET '/war/playerDecks'

- This endpoint collects all of the cards in each player deck table ordered by id in ascending order and sends each deck in a response to the frontend. The

GET '/war/pot'

-This endpoint collects all of the cards in the pot table and sends those cards in a response to the frontend.

POST '/war/pot'

-This endpoint takes cards sent to the backend by frontend fetch requests. These cards are in an array form so it was easy to loop over the "drawnCards" array and search for cards that belonged to either deck. When a card is found it is destroyed in the player deck table it belongs to. Then that same card is added to the pot. In the case of duplicates in the player deck table there is a secondary loop that destroys each duplicate. After overarching loop completes then each player deck table is queried for all cards remaining in either deck ordered by id in descending order. The new decks are sent in response to the frontend.

DELETE '/war/deleteCards/'

-This endpoint checks for the winner signifier sent to the backend and dependent on the winner the cards are taken from the pot and added to that winners deck table. The cards in the pot are deleted. In the end the player deck tables are queried for all remaining cards and each deck is sent in response to the frontend.

DELETE '/war/reset/'

-This endpoint is to delete every element from either table excluding victories.


#### Postgres
Postgres was an easy choice for my server-side framework. Postgres allows easy communication between the database and the backend server. I find it very straightforward to use.



## Conclusion and Possible Next Steps
This application was a lot of fun to build. There were some hiccups along the way for example needing to order information coming from the backend in a specific order to prevent cards magically shooting to the top of the deck. All in all this was a great learning experience for me. Building a sort of autonomous system has definitely been a bucketlist thing for me. Finally doing something autonomous outside of practice problems but in an actual application has shown me just how much I have grown as a developer in all aspects of the FullStack Development process.

Given more time I would like to put more indicators for when cards are distributed or when a player actually wins. Maybe a +2 somewhere on the screen or an actual prompt stating who was the winner. I would also like to refactor the application to be player vs computer instead of computer vs computer.


