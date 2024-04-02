import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import {
  CARDSET_SETTING_TYPES,
  CARDSET_ROBOHASH_IDS,
  CARBACK_SETTING_TYPES,
} from '../../contexts/game-settings.context.jsx';

import './card.styles.scss';

const Card = ({ card, onClick, flipped, isShuffling, disabled, size }) => {
  const { id, pictureId, isPaired, flippedOnGameOver } = card;
  const { cardSet } = useContext(GameSettingsContext);
  const { cardBack } = useContext(GameSettingsContext);
  const [roboHashId, setRoboHashId] = useState();

  useEffect(() => {
    getRoboHashIdFromSettingsType();
  }, []);

  const getRoboHashIdFromSettingsType = () => {
    switch (cardSet) {
      case CARDSET_SETTING_TYPES.MONSTERS:
        setRoboHashId(CARDSET_ROBOHASH_IDS.MONSTERS);
        break;
      case CARDSET_SETTING_TYPES.ROBOTS:
        setRoboHashId(CARDSET_ROBOHASH_IDS.ROBOTS);
        break;
      case CARDSET_SETTING_TYPES.ROBOTHEADS:
        setRoboHashId(CARDSET_ROBOHASH_IDS.ROBOTHEADS);
        break;
      case CARDSET_SETTING_TYPES.CATS:
        setRoboHashId(CARDSET_ROBOHASH_IDS.CATS);
        break;

      default:
        setRoboHashId(CARDSET_ROBOHASH_IDS.MONSTERS);
        break;
    }
  };

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
          <img
            id={pictureId}
            alt={`card-${id}`}
            src={`https://robohash.org/${pictureId}?set=set${roboHashId}&size=${Math.floor(
              size
            )}x${Math.floor(size)}`}
          />
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
