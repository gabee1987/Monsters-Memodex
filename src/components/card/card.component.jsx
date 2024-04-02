import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import { cardService } from '../../services/card.service.jsx';

import './card.styles.scss';

const Card = ({ card, onClick, flipped, isShuffling, disabled, size }) => {
  const { id, pictureId, isPaired, flippedOnGameOver } = card;
  const { cardSet } = useContext(GameSettingsContext);
  const { cardBack } = useContext(GameSettingsContext);
  const [roboHashId, setRoboHashId] = useState();

  const imageUrl = cardService.generateCardImageUrl(pictureId, cardSet, size);

  const handleClick = () => {
    // Only handle click if the card is not disabled
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div
      className={`card-container ${isPaired ? 'isPaired' : ''} ${
        isShuffling ? 'isShuffling' : ''
      } ${flippedOnGameOver ? 'flippedOnGameOver' : ''}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className={`card-body ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img id={pictureId} alt={`card-${id}`} src={imageUrl} />
        </div>
        <div
          className={`card-back type-${cardBack}`}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default Card;
