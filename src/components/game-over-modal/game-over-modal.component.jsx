import { useState, useEffect, useRef, useContext } from 'react';

import {
  GameSettingsContext,
  MODE_SETTING_TYPES,
} from '../../contexts/game-settings.context';

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
              {gameMode === MODE_SETTING_TYPES.TIME_BASED && (
                <div className="time-based-mode-modal-body">
                  Oops! The clock beat you to it. <br />
                  Maybe try a sundial next time?
                </div>
              )}
              {gameMode === MODE_SETTING_TYPES.TURN_BASED && (
                <div className="turned-based-mode-modal-body">
                  Turns out, you needed more turns. :( <br />
                  Try again and turn the tables!
                </div>
              )}
              {gameMode === MODE_SETTING_TYPES.FREE && (
                <div className="free-mode-modal-body">
                  Well, that’s a wrap! Free mode just gave you a free lesson in
                  perseverance!
                </div>
              )}
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
