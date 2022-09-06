import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameSettingsContext } from '../../contexts/game-settings.context';
import { GameStateContext } from '../../contexts/game-state.context';

import {
  MODE_SETTING_TYPES,
  DIFFICULTY_SETTING_TYPES,
} from '../../contexts/game-settings.context';

import './game-settings.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const Settings = () => {
  const { mode, setMode } = useContext(GameSettingsContext);
  const { difficulty, setDifficulty } = useContext(GameSettingsContext);
  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);

  const TAB_VALUES = {
    GAME_TAB: 'GAME_TAB',
    VISUALS_TAB: 'VISUALS_TAB',
  };

  const [activeTab, setActiveTab] = useState(TAB_VALUES.GAME_TAB);

  const navigate = useNavigate();

  const handleModeChange = (event) => {
    setMode(event.target.value);
    console.log('mode changed to: ', event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    console.log('difficulty changed to: ', event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setNumberOfCards(event.target.value);
    console.log('cardNumber changed to:', event.target.value);
  };

  const handleBackClick = () => {
    setNeedNewGame(false);
    navigate(-1);
  };

  const handleStartClick = () => {
    setNeedNewGame(true);
    navigate('/game');
  };

  const handleTabChange = (event) => {
    console.log('activetab change to:', event.target.value);
    if (event.target.value === TAB_VALUES.GAME_TAB) {
      setActiveTab(TAB_VALUES.GAME_TAB);
    } else if (event.target.value === TAB_VALUES.VISUALS_TAB) {
      setActiveTab(TAB_VALUES.VISUALS_TAB);
    }
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
        <div className="settings-tab-container">
          <button
            className={`settings-tab game-tab ${
              activeTab === TAB_VALUES.GAME_TAB ? 'active-tab' : ''
            }`}
            onClick={handleTabChange}
            value={TAB_VALUES.GAME_TAB}
          >
            Game
          </button>
          <button
            className={`settings-tab visuals-tab ${
              activeTab === TAB_VALUES.VISUALS_TAB ? 'active-tab' : ''
            }`}
            onClick={handleTabChange}
            value={TAB_VALUES.VISUALS_TAB}
          >
            Visuals
          </button>
        </div>

        <div className="settings-inner-container" id="mainMenuInner">
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.GAME_TAB ? 'active-settings' : ''
            }`}
          >
            <div className="cursor-not-allowed">
              <div className="settings-category mode-settings disabled-menu">
                <span>Mode</span>
                <div className="settings-input-group mode-group">
                  <label
                    htmlFor="timeBasedRadio"
                    className={`radio-label ${
                      mode === MODE_SETTING_TYPES.TIME_BASED
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    Time Based
                    <input
                      id="timeBasedRadio"
                      type="radio"
                      name="mode"
                      value={MODE_SETTING_TYPES.TIME_BASED}
                      checked={mode === MODE_SETTING_TYPES.TIME_BASED}
                      onChange={handleModeChange}
                    />
                  </label>

                  <label
                    htmlFor="turnBasedRadio"
                    className={`radio-label ${
                      mode === MODE_SETTING_TYPES.TURN_BASED
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    Turn Based
                    <input
                      id="turnBasedRadio"
                      type="radio"
                      name="mode"
                      value={MODE_SETTING_TYPES.TURN_BASED}
                      checked={mode === MODE_SETTING_TYPES.TURN_BASED}
                      onChange={handleModeChange}
                    />
                  </label>

                  <label
                    htmlFor="relaxedRadio"
                    className={`radio-label ${
                      mode === MODE_SETTING_TYPES.RELAXED
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    Relaxed
                    <input
                      id="relaxedRadio"
                      type="radio"
                      name="mode"
                      value={MODE_SETTING_TYPES.RELAXED}
                      checked={mode === MODE_SETTING_TYPES.RELAXED}
                      onChange={handleModeChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="cursor-not-allowed">
              <div className="settings-category difficulty-settings disabled-menu">
                <span>Difficulty</span>
                <div className="settings-input-group difficulty-group">
                  <label
                    htmlFor="easyRadio"
                    className={`radio-label ${
                      difficulty === DIFFICULTY_SETTING_TYPES.EASY
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    <input
                      id="easyRadio"
                      type="radio"
                      name="difficulty"
                      value={DIFFICULTY_SETTING_TYPES.EASY}
                      checked={difficulty === DIFFICULTY_SETTING_TYPES.EASY}
                      onChange={handleDifficultyChange}
                    ></input>
                    Easy
                  </label>
                  <label
                    htmlFor="mediumRadio"
                    className={`radio-label ${
                      difficulty === DIFFICULTY_SETTING_TYPES.MEDIUM
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    <input
                      id="mediumRadio"
                      type="radio"
                      name="difficulty"
                      value={DIFFICULTY_SETTING_TYPES.MEDIUM}
                      checked={difficulty === DIFFICULTY_SETTING_TYPES.MEDIUM}
                      onChange={handleDifficultyChange}
                    ></input>
                    Medium
                  </label>
                  <label
                    htmlFor="hardRadio"
                    className={`radio-label ${
                      difficulty === DIFFICULTY_SETTING_TYPES.HARD
                        ? 'radioSelected'
                        : 'radioNotSelected'
                    }`}
                  >
                    <input
                      id="hardRadio"
                      type="radio"
                      name="difficulty"
                      value={DIFFICULTY_SETTING_TYPES.HARD}
                      checked={difficulty === DIFFICULTY_SETTING_TYPES.HARD}
                      onChange={handleDifficultyChange}
                    ></input>
                    Hard
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-category card-number-settings">
              <span>Number of Cards</span>
              <div className="settings-input-group card-number-group">
                <label htmlFor="cardNumberSlider">
                  {numberOfCards}

                  <input
                    id="cardNumberSlider"
                    className="card-number-input"
                    type="range"
                    min="2"
                    max="20"
                    step="2"
                    value={numberOfCards}
                    onChange={handleCardNumberChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.VISUALS_TAB ? 'active-settings' : ''
            }`}
          >
            VISUAL SETTINGS
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
