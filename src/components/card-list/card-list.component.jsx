import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.scss';

const CardList = ({
  cards,
  handleChoice,
  firstChoice,
  secondChoice,
  isShufflingActive,
  disabled,
}) => {
  return (
    <div className="card-list-container">
      <div className="card-list">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              onClick={handleChoice}
              flipped={
                card === firstChoice ||
                card === secondChoice ||
                card.isPaired ||
                card.flippedOnGameOver
              }
              isShuffling={isShufflingActive}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CardList;
