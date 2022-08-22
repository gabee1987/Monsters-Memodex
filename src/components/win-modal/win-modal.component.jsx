import { useState } from 'react';

import useMountTransition from '../../component-animation/useMountTransition';
import './win-modal.styles.scss';

const WinModal = (props) => {
  const { show, turns, onClose } = props;
  //const [isMounted, setIsMounted] = useState(false);

  const hasTransitionedIn = useMountTransition(show, 1000);
  // if (!show) {
  //   return null;
  // }

  const handleClick = () => {
    onClose(false);
  };

  return (
    <div className="win-modal">
      {(hasTransitionedIn || show) && (
        <div
          className={`modal-content ${hasTransitionedIn && 'in'} ${
            show && 'visible'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
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
      )}
    </div>
  );
};

export default WinModal;
