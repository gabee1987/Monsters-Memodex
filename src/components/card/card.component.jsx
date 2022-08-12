import { useState } from 'react';

import './card.styles.scss';
import CardBack from '../../assets/card-back.png';

const Card = ({ card, onClick, flipped }) => {
  const { id, pictureId, isPaired } = card;

  const handleClick = () => {
    onClick(card);
    console.log('isFlipped after click?', flipped);
    console.log('singleCard clicked: ', card);
  };

  return (
    <div className="card-container">
      <div className={`card-body ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img
            id={pictureId}
            alt={`card-${id}`}
            src={`https://robohash.org/${pictureId}?set=set1&size=250x250`}
          />
        </div>
        <div className="card-back" onClick={handleClick}>
          <img src={CardBack} alt={`card-back-${id}`} />
        </div>
      </div>
    </div>
  );
};

export default Card;
