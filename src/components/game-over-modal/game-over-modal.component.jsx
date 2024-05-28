import { useState, useEffect, useRef, useContext } from 'react';

import { GameSettingsContext } from '../../contexts/game-settings.context';

import {
  formatMessage,
  getGameEndMessage,
} from '../../utilities/message-helper';
import { GAME_END_TYPES } from '../../game-end-utilities/game-end-types';

import useMountTransition from '../../component-helpers/useMountTransition';
import './game-over-modal.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const GameOverModal = (props) => {
  const { show, onClose } = props;
  const { gameMode } = useContext(GameSettingsContext);
  const hasTransitionedIn = useMountTransition(show, 1000);

  const handleClick = () => {
    onClose(false);
  };

  // 3D perspective effect with Vanilla Tilt
  const tilt = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, {
      max: 10,
      scale: 1.05,
      speed: 600,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
    });
  }, []);

  const gameOverMessage = getGameEndMessage(gameMode, GAME_END_TYPES.GAME_OVER);

  return (
    <div className="game-over-modal">
      {(hasTransitionedIn || show) && (
        <div
          className={`game-over-modal-content ${hasTransitionedIn && 'in'} ${
            show && 'visible'
          }`}
          onClick={(e) => e.stopPropagation()}
          ref={tilt}
        >
          <div className="game-over-modal-inner-container">
            <div className="game-over-modal-header">
              <h1>Game Over!</h1>
            </div>
            <div className="game-over-modal-body">
              {formatMessage(gameOverMessage)}
            </div>
            <div className="game-over-modal-footer">
              <button onClick={handleClick} className="modal-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOverModal;
