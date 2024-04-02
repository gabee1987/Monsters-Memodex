import {
  CARDSET_SETTING_TYPES,
  CARDSET_ROBOHASH_IDS,
} from '../contexts/game-settings.context.jsx';

const getRoboHashId = (cardSet) => {
  switch (cardSet) {
    case CARDSET_SETTING_TYPES.MONSTERS:
      return CARDSET_ROBOHASH_IDS.MONSTERS;
    case CARDSET_SETTING_TYPES.ROBOTS:
      return CARDSET_ROBOHASH_IDS.ROBOTS;
    case CARDSET_SETTING_TYPES.ROBOTHEADS:
      return CARDSET_ROBOHASH_IDS.ROBOTHEADS;
    case CARDSET_SETTING_TYPES.CATS:
      return CARDSET_ROBOHASH_IDS.CATS;
    default:
      return CARDSET_ROBOHASH_IDS.MONSTERS;
  }
};

const generateCardImageUrl = (pictureId, cardSet, size) => {
  const roboHashId = getRoboHashId(cardSet);
  return `https://robohash.org/${pictureId}?set=set${roboHashId}&size=${Math.floor(
    size
  )}x${Math.floor(size)}`;
};

export const cardService = {
  generateCardImageUrl,
};
