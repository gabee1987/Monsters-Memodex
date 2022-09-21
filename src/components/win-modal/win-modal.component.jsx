import { useState, useEffect, useRef, useContext } from 'react';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import useMountTransition from '../../component-helpers/useMountTransition';
import './win-modal.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const WinModal = (props) => {
  const { show, turns, time, mode, onClose } = props;
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

  // Convert the seconds to a time format
  function formatTime(stopWatchSeconds) {
    const h = Math.floor(stopWatchSeconds / 3600);
    const m = Math.floor((stopWatchSeconds % 3600) / 60);
    const s = Math.round(stopWatchSeconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

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
              Looks like your memory is still working! Hooray! <br /> You
              completed the game in
              {mode !== MODE_SETTING_TYPES.TIME_BASED && (
                <div>
                  <span>{formatTime(time)}</span> <br /> and it took
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
