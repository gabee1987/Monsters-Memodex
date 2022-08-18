import { useContext } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';

import './game-control.styles.scss';

const GameControls = ({ newGameClick }) => {
  const { turns } = useContext(GameStateContext);
  return (
    <div className="button-container">
      <button className="btn new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      <button className="btn turn-counter">TURNS: {turns}</button>
    </div>
  );
};

export default GameControls;
