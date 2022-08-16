import { useState } from 'react';

import './card.styles.scss';

const Card = ({ card, onClick, flipped, isShuffling, disabled }) => {
  const { id, pictureId, isPaired } = card;

  const handleClick = () => {
    // Only handle click if the card is not disabled
    console.log('isDisabled? ', disabled);
    if (!disabled) {
      // onClick(card);
      setTimeout(() => onClick(card), 500);
    }
    console.log('isFlipped after click?', flipped);
    console.log('singleCard clicked: ', card);
  };

  return (
    <div
      className={`card-container ${isPaired ? 'isPaired' : ''} ${
        isShuffling ? 'isShuffling' : ''
      }`}
    >
      <div className={`card-body ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img
            id={pictureId}
            alt={`card-${id}`}
            src={`https://robohash.org/${pictureId}?set=set1&size=250x250`}
          />
        </div>
        <div className="card-back" onClick={handleClick}>
          {/* <img src={CardBack} alt={`card-back-${id}`} />
          <div></div> */}
        </div>
      </div>
      {/* <script src="./card.styles.js"></script> */}
    </div>
  );
};

export default Card;
