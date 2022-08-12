import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.css';

const CardList = () => {
  //const [selectedCards, setSelectedCards] = useState([]);
  //let selectedCardIds = [];

  const [firstSelectedCard, setfirstSelectedCard] = useState(null);
  const [secondSelectedCard, setsecondSelectedCard] = useState(null);
  const [cardDeck, setCardDeck] = useState([]);
  const [filteredCardDeck, setFilteredCardDeck] = useState(cardDeck);
  //const { id, pictureId, isShown, isInGame } = monstersDeck;

  useEffect(() => {
    createCardDeck();
  }, []);

  useEffect(() => {
    // TODO here comes the filtering of the deck after a successful pairing
    const newFilteredCardDeck = cardDeck.filter((card) => {
      return card.id !== selectedCardId;
    });

    console.log('lefut');
    setFilteredCardDeck(newFilteredCardDeck);
  }, [cardDeck, selectedCardId]);

  console.log('selectedCardToSet: ', selectedCardId);

  const handleClick = (event) => {
    // event.preventDefault();
    const cardId = event.target.id;

    // Store the selected card id if no card is selected yet
    if (selectedCardId == null) {
      setselectedCardId(cardId);
    }
    // If the same id selected again, store it and then remove the selected cards from the main deck
    else if (selectedCardId === cardId) {
      console.log('before filter: ', selectedCardId);
      // const newFilteredCardDeck = cardDeck.filter((card) => {
      //   return card.pictureId !== selectedCardId;
      // });

      let newFilteredCardDeck = [5];
      console.log('filteredCardDeck: ', newFilteredCardDeck);
      setFilteredCardDeck(newFilteredCardDeck);
    }
    // If a different card was selected, delete the selected id
    else {
      setselectedCardId(cardId);
    }
  };

  const removeSelectedCardsFromDeck = ({ selectedCardIds }) => {};

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
      {filteredCardDeck.map((card) => {
        return <Card key={card.id} monster={card} onClick={handleClick} />;
      })}
    </div>
  );
};
export default CardList;
