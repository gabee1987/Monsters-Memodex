import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.css';

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
    console.log('cardsAfterSet: ', cardDeck);
  }, []);

  // Compare selected cards
  useEffect(() => {
    if (firstChoice === null || secondChoice === null) {
      console.log('not enough cards');
      return;
    } else if (firstChoice.pictureId === secondChoice.pictureId) {
      resetTurn();
      console.log('the same');
    } else {
      console.log('not the same');
      resetTurn();
    }

    // console.log('firstChoice: ', firstChoice);
    // console.log('secondChoice: ', secondChoice);
  }, [firstChoice, secondChoice]);

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
        isActive: false,
      });
      cards.push({
        id: 'pairTwo-' + index,
        pictureId: index,
        isPaired: false,
        isActive: false,
      });
    }
    return cards;
  };

  return (
    <div className="card-list">
      {cardDeck.map((card) => {
        return <Card key={card.id} card={card} onClick={handleChoice} />;
      })}
    </div>
  );
};
export default CardList;
