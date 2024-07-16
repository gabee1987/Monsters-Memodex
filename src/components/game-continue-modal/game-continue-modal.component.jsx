import { useState, useEffect, useRef, useContext } from 'react';

import useMountTransition from '../../component-helpers/useMountTransition';
import './game-continue-modal.styels.scss';
import VanillaTilt from 'vanilla-tilt';

const GameContinueModal = (props) => {
  const { show, onClose, handleNewGame, handleContinue } = props;
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
    <div className="game-continue-modal">
      {(hasTransitionedIn || show) && (
        <div
          className={`game-continue-modal-content ${
            hasTransitionedIn && 'in'
          } ${show && 'visible'}`}
          onClick={(e) => e.stopPropagation()}
          ref={tilt}
        >
          <div className="game-continue-modal-inner-container">
            <div className="game-continue-modal-header">
              <h1>Continue Previous Game</h1>
            </div>
            <div className="game-continue-modal-body">
              Do you want to continue your previous game?
            </div>
            <div className="game-continue-modal-footer">
              <button
                variant="secondary"
                onClick={handleNewGame}
                className="modal-btn"
              >
                New Game
              </button>
              <button
                variant="primary"
                onClick={handleContinue}
                className="modal-btn"
              >
                Continue
              </button>
              <br />
              <br />
              <button onClick={handleClick} className="modal-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContinueModal;
