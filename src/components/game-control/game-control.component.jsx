import './game-control.styles.scss';

const GameControls = ({ newGameClick }) => {
  return (
    <div className="button-container">
      <button className="btn new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
    </div>
  );
};

export default GameControls;
