import { useState, useEffect, useRef, useContext } from 'react';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import useMountTransition from '../../component-helpers/useMountTransition';
import './win-modal.styles.scss';
import VanillaTilt from 'vanilla-tilt';

import {
  formatMessage,
  getGameEndMessage,
} from '../../utilities/message-helper';
import { GAME_END_TYPES } from '../../game-end-utilities/game-end-types';

const WinModal = (props) => {
  const { show, turns, timer, stopWatch, gameMode, onClose } = props;
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

  const winMessage = getGameEndMessage(gameMode, GAME_END_TYPES.WIN);

  return (
    <div className="win-modal">
      {(hasTransitionedIn || show) && (
        // <div className="modal-tilt" id="modalTilt" ref={tilt}>
        <div
          className={`modal-content ${hasTransitionedIn && 'in'} ${
            show && 'visible'
          }`}
          onClick={(e) => e.stopPropagation()}
          ref={tilt}
        >
          <div className="firework"></div>
          <div className="win-modal-inner-container">
            <div className="modal-header">
              <h1>Congratulations!</h1>
            </div>
            <div className="modal-body">
              {formatMessage(winMessage)}
              <br />
              <br />
              You've finished the game in
              {gameMode === MODE_SETTING_TYPES.TIME_BASED && (
                <div>
                  <span>{timer}</span> <br /> taking
                </div>
              )}
              {gameMode === MODE_SETTING_TYPES.FREE && (
                <div>
                  <span>{stopWatch}</span> <br />
                </div>
              )}
              <span>{turns}</span> turns
            </div>
            <div className="modal-footer">
              <button onClick={handleClick} className="modal-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default WinModal;
