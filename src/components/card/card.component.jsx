import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import {
  CARDSET_SETTING_TYPES,
  CARDSET_ROBOHASH_IDS,
  CARBACK_SETTING_TYPES,
} from '../../contexts/game-settings.context.jsx';

import './card.styles.scss';

const Card = ({ card, onClick, flipped, isShuffling, disabled }) => {
  const { id, pictureId, isPaired } = card;
  const { cardSet } = useContext(GameSettingsContext);
  const { cardBack } = useContext(GameSettingsContext);
  const [roboHashId, setRoboHashId] = useState();

  useEffect(() => {
    getRoboHashIdFromSettingsType();
    // console.log('robohash id: ', roboHashId);
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
      }`}
    >
      <div className={`card-body ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img
            id={pictureId}
            alt={`card-${id}`}
            src={`https://robohash.org/${pictureId}?set=set${roboHashId}&size=250x250`}
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
