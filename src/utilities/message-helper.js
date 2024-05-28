import {
  timeBasedGameOverMessages,
  turnBasedGameOverMessages,
  freeModeGameOverMessages,
} from '../game-end-utilities/game-over-messages';
import {
  timeBasedWinMessages,
  turnBasedWinMessages,
  freeModeWinMessages,
} from '../game-end-utilities/win-messages';
import { MODE_SETTING_TYPES } from '../contexts/game-settings.context';
import { GAME_END_TYPES } from '../game-end-utilities/game-end-types';

export const getRandomGameEndMessage = (messages) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getWeightedRandomMessage = (messages) => {
  const totalWeight = messages.reduce(
    (sum, message) => sum + message.weight,
    0
  );
  let random = Math.random() * totalWeight;

  for (let i = 0; i < messages.length; i++) {
    random -= messages[i].weight;
    if (random < 0) {
      return messages[i].text;
    }
  }
};

export const getGameEndMessage = (gameMode, gameEndType) => {
  switch (gameMode) {
    case MODE_SETTING_TYPES.TIME_BASED:
      if (gameEndType === GAME_END_TYPES.WIN) {
        return getWeightedRandomMessage(timeBasedWinMessages);
      } else {
        return getWeightedRandomMessage(timeBasedGameOverMessages);
      }
    case MODE_SETTING_TYPES.TURN_BASED:
      if (gameEndType === GAME_END_TYPES.WIN) {
        return getWeightedRandomMessage(turnBasedWinMessages);
      } else {
        return getWeightedRandomMessage(turnBasedGameOverMessages);
      }
    case MODE_SETTING_TYPES.FREE:
      if (gameEndType === GAME_END_TYPES.WIN) {
        return getWeightedRandomMessage(freeModeWinMessages);
      } else {
        return getWeightedRandomMessage(freeModeGameOverMessages);
      }
    default:
      return 'Game Over!';
  }
};

export const formatMessage = (message) => {
  return message.split('\n').map((part, index) => (
    <span key={index}>
      {part}
      <br />
    </span>
  ));
};
