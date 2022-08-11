import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.css';

const CardList = () => {
  const [cardDeck, setCardDeck] = useState([]);
  const [filteredCardDeck, setFilteredCardDeck] = useState(cardDeck);
  //const { id, pictureId, isShown, isInGame } = monstersDeck;

  useEffect(() => {
    createCardDeck();
  }, []);

  useEffect(() => {
    // TODO here comes the filtering of the deck after a successful pairing
  }, []);

  console.log('card-list component');
  console.log(cardDeck);

  const handleOnClick = (event, param) => {
    // event.preventDefault();
    const cardId = event.target.id;
    console.log('clicked');
    console.log(cardId);
  };

  const createCardDeck = () => {
    // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
    const numOfCards = 10;
    let cards = [];

    for (let index = 0; index < numOfCards; index++) {
      cards.push({
        id: 'pairOne' + index,
        pictureId: index,
        isShown: false,
        isInGame: true,
      });
      cards.push({
        id: 'pairTwo' + index,
        pictureId: index,
        isShown: false,
        isInGame: true,
      });
    }
    setCardDeck(cards);
  };

  return (
    <div className="card-list">
      {cardDeck.map((card) => {
        return (
          <Card
            key={card.id}
            monster={card}
            onClick={(event) => handleOnClick(event, [])}
          />
        );
      })}
    </div>
  );
};
export default CardList;
