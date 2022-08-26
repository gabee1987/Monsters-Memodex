import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameSettingsContext } from '../../contexts/game-settings.context';

import './game-settings.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const Settings = () => {
  const { mode, setMode } = useContext(GameSettingsContext);
  const { difficulty, setDifficulty } = useContext(GameSettingsContext);
  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);

  const navigate = useNavigate();

  const handleModeChange = (event) => {
    if (event.target.checked) {
      // handleModeChange(event.target.value);
      console.log('mode changed to: ', mode);
      setMode(event.target.value);
    }
  };

  const handleDifficultyChange = (event) => {
    console.log('difficulty changed to: ', difficulty);
    setDifficulty(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    console.log('cardNumber changed to:', numberOfCards);
    setNumberOfCards(event.target.value);
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleStartClick = () => {
    navigate('/game', { fromNewGame: true });
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
    <div className="settings">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-container" id="mainMenu" ref={tilt}>
        <div className="settings-inner-container" id="mainMenuInner">
          <div className="settings-category mode-settings">
            <span>Mode</span>
            <div className="settings-input-group mode-group">
              <input
                id="timeBasedRadio"
                type="radio"
                name="mode"
                value="timeBased"
                onChange={handleModeChange}
              ></input>
              <label htmlFor="timeBasedRadio">Time Based</label>
              <input
                id="turnBasedRadio"
                type="radio"
                name="mode"
                value="turnBased"
                onChange={handleModeChange}
              ></input>
              <label htmlFor="turnBasedRadio">Turn Based</label>
              <input
                id="relaxedRadio"
                type="radio"
                name="mode"
                value="relaxed"
                onChange={handleModeChange}
              ></input>
              <label htmlFor="relaxedRadio">Relaxed</label>
            </div>
          </div>

          <div className="settings-category difficulty-settings">
            <span>Difficulty</span>
            <div className="settings-input-group difficulty-group">
              <input
                id="easyRadio"
                type="radio"
                name="difficulty"
                value="easy"
                onChange={handleDifficultyChange}
              ></input>
              <label htmlFor="easyRadio">Easy</label>
              <input
                id="mediumRadio"
                type="radio"
                name="difficulty"
                value="medium"
                onChange={handleDifficultyChange}
              ></input>
              <label htmlFor="mediumRadio">Medium</label>
              <input
                id="hardRadio"
                type="radio"
                name="difficulty"
                value="hard"
                onChange={handleDifficultyChange}
              ></input>
              <label htmlFor="hardRadio">Hard</label>
            </div>
          </div>

          <div className="settings-category x-settings">
            <span>Number of Cards</span>
            <div className="settings-input-group card-number-group">
              <label htmlFor="cardNumberSlider">{numberOfCards}</label>
              <input
                id="cardNumberSlider"
                className="card-number-input"
                type="range"
                min="2"
                max="20"
                step="2"
                onChange={handleCardNumberChange}
              />
            </div>
          </div>
          <div className="settings-button-container">
            <button
              onClick={handleBackClick}
              className="menu-btn settings-close-btn"
            >
              Back
            </button>
            <button
              onClick={handleStartClick}
              className="menu-btn new-game-btn"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
