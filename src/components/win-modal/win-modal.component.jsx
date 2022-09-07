import { useState, useEffect, useRef } from 'react';

import useMountTransition from '../../component-helpers/useMountTransition';
import './win-modal.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const WinModal = (props) => {
  const { show, turns, onClose } = props;
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
          <div className="modal-header">
            <h1>Congratulations!</h1>
          </div>
          <div className="modal-body">
            <span>Looks like your memory is still working! Hooray!</span>
            <span>You completed the game in {turns} turns</span>
          </div>
          <div className="modal-footer">
            <button onClick={handleClick} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default WinModal;
