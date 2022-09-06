import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CARDSET_ROBOHASH_IDS,
  GameSettingsContext,
} from '../../contexts/game-settings.context';
import { GameStateContext } from '../../contexts/game-state.context';

import RadioInput from '../../components/radio-input/radio-input.component';
import RadioInputPicLabel from '../../components/radio-input-pic-label/radio-input-pic-label.component';

import {
  MODE_SETTING_TYPES,
  DIFFICULTY_SETTING_TYPES,
  CARDSET_SETTING_TYPES,
  TAB_VALUES,
} from '../../contexts/game-settings.context';

import './game-settings.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const cardSetPictureId = Math.floor(Math.random() * 100);

const Settings = () => {
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);
  const { mode, setMode } = useContext(GameSettingsContext);
  const { difficulty, setDifficulty } = useContext(GameSettingsContext);
  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);
  const { activeTab, setActiveTab } = useContext(GameSettingsContext);
  const { cardSet, setCardSet } = useContext(GameSettingsContext);

  const navigate = useNavigate();

  const handleTabChange = (event) => {
    console.log('activetab change to:', event.target.value);
    if (event.target.value === TAB_VALUES.GAME_TAB) {
      setActiveTab(TAB_VALUES.GAME_TAB);
    } else if (event.target.value === TAB_VALUES.VISUALS_TAB) {
      setActiveTab(TAB_VALUES.VISUALS_TAB);
    }
  };

  // GAME SETTINGS HANDLES
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

  // VISUAL SETTINGS HANDLES
  const handleCardSetChange = (event) => {
    setCardSet(event.target.value);
    console.log('cardSet changed to:', event.target.value);
  };

  // GAME BUTTON HANDLES
  const handleBackClick = () => {
    setNeedNewGame(false);
    navigate(-1);
  };

  const handleStartClick = () => {
    setNeedNewGame(true);
    navigate('/game');
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
          {/* Game Settings panel */}
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.GAME_TAB ? 'active-settings' : ''
            }`}
          >
            <div className="cursor-not-allowed">
              <div className="settings-category mode-settings disabled-menu">
                <span>Mode</span>
                <div className="settings-input-group mode-group">
                  <RadioInput
                    id="timeBasedRadio"
                    labelText="Time Based"
                    selectedValueType={mode}
                    selectedValue={MODE_SETTING_TYPES.TIME_BASED}
                    onChangeHandler={handleModeChange}
                  />
                  <RadioInput
                    id="turnBasedRadio"
                    labelText="Turn Based"
                    selectedValueType={mode}
                    selectedValue={MODE_SETTING_TYPES.TURN_BASED}
                    onChangeHandler={handleModeChange}
                  />
                  <RadioInput
                    id="relaxedRadio"
                    labelText="Relaxed"
                    selectedValueType={mode}
                    selectedValue={MODE_SETTING_TYPES.RELAXED}
                    onChangeHandler={handleModeChange}
                  />
                </div>
              </div>
            </div>

            <div className="cursor-not-allowed">
              <div className="settings-category difficulty-settings disabled-menu">
                <span>Difficulty</span>
                <div className="settings-input-group difficulty-group">
                  <RadioInput
                    id="easyRadio"
                    labelText="Easy"
                    selectedValueType={difficulty}
                    selectedValue={DIFFICULTY_SETTING_TYPES.EASY}
                    onChangeHandler={handleDifficultyChange}
                  />
                  <RadioInput
                    id="mediumRadio"
                    labelText="Medium"
                    selectedValueType={difficulty}
                    selectedValue={DIFFICULTY_SETTING_TYPES.MEDIUM}
                    onChangeHandler={handleDifficultyChange}
                  />
                  <RadioInput
                    id="hardRadio"
                    labelText="Hard"
                    selectedValueType={difficulty}
                    selectedValue={DIFFICULTY_SETTING_TYPES.HARD}
                    onChangeHandler={handleDifficultyChange}
                  />
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

          {/* Visual Settings panel */}
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.VISUALS_TAB ? 'active-settings' : ''
            }`}
          >
            <div className="settings-category card-set-settings">
              <span>Card Set</span>
              <div className="settings-input-group card-set-group">
                {/* =========================MONSTERS CARD SET */}
                <RadioInputPicLabel
                  id="cardSetMonsters"
                  labelText="Monsters"
                  selectedValueType={cardSet}
                  selectedValue={CARDSET_SETTING_TYPES.MONSTERS}
                  onChangeHandler={handleCardSetChange}
                  cardSetId={CARDSET_ROBOHASH_IDS.MONSTERS}
                  cardSetPicId={cardSetPictureId}
                />

                {/* =========================ROBOTS CARD SET */}
                <RadioInputPicLabel
                  id="cardSetRobots"
                  labelText="Robots"
                  selectedValueType={cardSet}
                  selectedValue={CARDSET_SETTING_TYPES.ROBOTS}
                  onChangeHandler={handleCardSetChange}
                  cardSetId={CARDSET_ROBOHASH_IDS.ROBOTS}
                  cardSetPicId={cardSetPictureId}
                />

                {/* =========================ROBOT HEADS CARD SET */}
                <RadioInputPicLabel
                  id="cardSetRoboHeads"
                  labelText="Robot Heads"
                  selectedValueType={cardSet}
                  selectedValue={CARDSET_SETTING_TYPES.ROBOTHEADS}
                  onChangeHandler={handleCardSetChange}
                  cardSetId={CARDSET_ROBOHASH_IDS.ROBOTHEADS}
                  cardSetPicId={cardSetPictureId}
                />

                {/* =========================CATS CARD SET */}
                <RadioInputPicLabel
                  id="cardSetCats"
                  labelText="Cats"
                  selectedValueType={cardSet}
                  selectedValue={CARDSET_SETTING_TYPES.CATS}
                  onChangeHandler={handleCardSetChange}
                  cardSetId={CARDSET_ROBOHASH_IDS.CATS}
                  cardSetPicId={cardSetPictureId}
                />
              </div>
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
