import { useState } from 'react';

import './card.styles.css';
import CardBack from '../../assets/card-back.png';

const Card = ({ card, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  //const { id, pictureId, isPaired, isActive } = card;

  const handleClick = () => {
    onClick(card);
    setIsActive((isActive) => !isActive);
    //console.log('singleCard clicked: ', card);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`card-body ${!isActive ? 'flipped' : ''}`}>
        <div className="card-front">
          <img
            id={card.pictureId}
            alt={`card-${card.id}`}
            src={`https://robohash.org/${card.pictureId}?set=set1&size=250x250`}
          />
        </div>
        <div className="card-back">
          <img src={CardBack} alt={`card-back-${card.id}`} />
        </div>
      </div>
    </div>
  );
};

export default Card;
