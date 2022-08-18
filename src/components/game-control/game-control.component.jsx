import './game-control.styles.scss';

const GameControls = ({ newGameClick }) => {
  return (
    <div className="button-container">
      <button className="btn new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      <button className="btn turn-counter">TURNS: 0</button>
    </div>
  );
};

export default GameControls;
