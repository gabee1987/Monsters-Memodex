import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.scss';

const CardList = () => {
  //const [selectedCards, setSelectedCards] = useState([]);

  const [cardDeck, setCardDeck] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  //const [turns, setTurns] = useState(0);

  // Create initial card deck
  useEffect(() => {
    const cardDeck = createInitialCardDeck();
    setCardDeck(cardDeck);
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
        resetTurn();
      } else {
        console.log('not a match...');
        resetTurn();
      }
    }

    console.log('firstChoice: ', firstChoice);
    console.log('secondChoice: ', secondChoice);
  }, [firstChoice, secondChoice]);
  console.log('cardsAfterSet: ', cardDeck);

  const handleChoice = (card) => {
    if (firstChoice != null) {
      setSecondChoice(card);
    } else {
      setFirstChoice(card);
    }
  };

  // TODO in a turn based mode we have to track the number of turns and if a certain amount is reached, game over
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const createInitialCardDeck = () => {
    // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
    const numOfCards = 10;
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
    return cards;
  };

  const shufflingCards = () => {};

  return (
    <div className="card-list">
      {cardDeck.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            onClick={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.isPaired
            }
          />
        );
      })}
    </div>
  );
};
export default CardList;
