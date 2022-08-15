import { useState, useEffect } from 'react';
import CardList from '../../components/card-list/card-list.component.jsx';

import './home.styles.scss';

// const defaultCardDeck = {
//   id: 0,
//   isShown: false,
//   isInGame: true,
// };

const Home = () => {
  // const onClick = () =>

  //const [selectedCards, setSelectedCards] = useState([]);

  const [cardDeck, setCardDeck] = useState([]);
  //const [shuffledCardDeck, setShuffledCardDeck] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  //const [turns, setTurns] = useState(0);

  // Create initial card deck
  useEffect(() => {
    const cardDeck = createInitialCardDeck();
    setCardDeck(cardDeck);

    // Shuffling the cards
    // const shuffledCardDeck = shufflingCards();
    // setShuffledCardDeck(shuffledCardDeck);

    //setTurns(0);
    // console.log('cardsAfterSet: ', cardDeck);
  }, []);

  // Compare selected cards
  useEffect(() => {
    // Is any selected cards?
    if (firstChoice && secondChoice) {
      // IS the selected cards match?
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
        console.log('its a match!');
        setTimeout(() => resetTurn(), 1000);
      } else {
        console.log('not a match...');
        setTimeout(() => resetTurn(), 1000);
      }
    }

    //console.log('firstChoice: ', firstChoice);
    //console.log('secondChoice: ', secondChoice);
  }, [firstChoice, secondChoice]);
  console.log('cardsAfterSet: ', cardDeck);

  const handleChoice = (card) => {
    if (firstChoice != null) {
      setSecondChoice(card);
      console.log('the choice is: ', firstChoice);
    } else {
      setFirstChoice(card);
      console.log('the second choice is: ', firstChoice);
    }
  };

  // TODO in a turn based mode we have to track the number of turns and if a certain amount is reached, game over
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const createInitialCardDeck = () => {
    // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
    const numOfCards = 12;
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

    // shuffle cards
    //cards = shufflingCards(cards);
    //console.log('shuffled cards: ', cards);
    return cards;
  };

  const shufflingCards = (cards) => {
    let shuffledCardDeck = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    return shuffledCardDeck;
  };

  return (
    <div className="card-list-container">
      <button className="btn new-game-btn">NEW GAME</button>
      {/* <button>SETTINGS</button> */}
      <CardList
        cards={cardDeck}
        handleChoice={handleChoice}
        firstChoice={firstChoice}
        secondChoice={secondChoice}
      />
    </div>
  );
};

export default Home;
