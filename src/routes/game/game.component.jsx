import { useState, useEffect } from 'react';
import CardList from '../../components/card-list/card-list.component.jsx';
import GameControls from '../../components/game-control/game-control.component.jsx';

import './game.styles.scss';

// const defaultCardDeck = {
//   id: 0,
//   isShown: false,
//   isInGame: true,
// };

const Game = () => {
  const [cardDeck, setCardDeck] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [isShufflingActive, setIsShufflingActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Create initial card deck
  useEffect(() => {
    const cardDeck = createInitialCardDeck();
    setCardDeck(cardDeck);
    setIsWon(false);

    // Shuffling the cards at start
    // setCardDeck(shuffledCardDeck);

    //console.log('initial turns: ', turns);
    // console.log('cardsAfterSet: ', cardDeck);
  }, []);

  const handleChoice = (card) => {
    if (card === firstChoice) {
      return;
    }
    if (firstChoice != null) {
      setSecondChoice(card);
      //console.log('the choice is: ', firstChoice);
    } else {
      setFirstChoice(card);
      //console.log('the second choice is: ', firstChoice);
    }
  };

  // Compare selected cards
  useEffect(() => {
    //console.log('setDisabledState', disabled);
    setIsWon(false);

    // Is any selected cards?
    if (firstChoice && secondChoice) {
      // Set all the cards to disabled to not be able to click them while the compairing and flip animation is running
      setDisabled(true);
      // Is the selected cards match?
      if (firstChoice.pictureId === secondChoice.pictureId) {
        //If so, set those cards property to paired
        setCardDeck((prevCards) => {
          // We generate a new carddeck with those 2 cards that matched with paired property
          return prevCards.map((card) => {
            if (card.pictureId === firstChoice.pictureId) {
              return { ...card, isPaired: true };
            } else {
              return card;
            }
          });
        });
        //console.log('its a match!');
        //console.log('before match the turns: ', turns);
        resetTurn();
        // setTimeout(() => resetTurn(), 1000);
      } else {
        //console.log('not a match...');
        //console.log('before not match the turns: ', turns);
        setTimeout(() => resetTurn(), 1000);
        //resetTurn();
      }
    }

    const iswon = checkWinCondition();
    console.log('won?', iswon);
    setIsWon(iswon);
    // if (isWon) {
    //   alert('Congratulation!');
    // }
    //console.log('firstChoice: ', firstChoice);
    //console.log('secondChoice: ', secondChoice);
  }, [firstChoice, secondChoice, disabled, isWon]);
  //console.log('cardsAfterSet: ', cardDeck);

  // TODO in a turn based mode we have to track the number of turns and if a certain amount is reached, game over
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    // Count the turns
    setTurns((prevTurns) => prevTurns + 1);
    console.log('turns: ', turns);
    // Cancel the disabled state of the cards
    setTimeout(() => setDisabled(false), 200);
  };

  const checkWinCondition = () => {
    console.log('cards:', cardDeck);
    const result = cardDeck.every((card) => {
      if (card.isPaired) {
        return true;
      } else {
        return false;
      }
    });

    console.log('result: ', result);

    return result;
  };

  const createInitialCardDeck = () => {
    // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
    const numOfCards = 2;
    let cards = [];

    for (let index = 0; index < numOfCards; index++) {
      cards.push({
        id: 'pairOne-' + index,
        pictureId: index,
        isPaired: false,
      });
      cards.push({
        id: 'pairTwo-' + index,
        pictureId: index,
        isPaired: false,
      });
    }
    //console.log('shuffled cards: ', cards);
    return cards;
  };

  const shufflingCards = (cards) => {
    let shuffledCardDeck = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isPaired: false }));

    setTurns(0);
    return shuffledCardDeck;
  };

  // Shuffle cards on New Game click
  const handleNewGameClick = () => {
    // Set the shuffle animation state
    setIsShufflingActive(true);

    const shuffledCardDeck = shufflingCards(cardDeck);
    // setTimeout(() => cardDeck.forEach((card) => (card.isPaired = false)), 1450);
    setTimeout(() => setCardDeck(shuffledCardDeck), 855);

    // Remove the animation state
    setTimeout(() => setIsShufflingActive(false), 860);

    resetTurn();
    //console.log('cardsAfterShuffle: ', cardDeck);
  };

  return (
    <div className="card-list-container">
      <GameControls newGameClick={handleNewGameClick} />
      <CardList
        cards={cardDeck}
        handleChoice={handleChoice}
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        isShufflingActive={isShufflingActive}
        disabled={disabled}
      />
    </div>
  );
};

export default Game;
