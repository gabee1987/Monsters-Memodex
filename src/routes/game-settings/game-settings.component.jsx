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
  CARBACK_SETTING_TYPES,
} from '../../contexts/game-settings.context';

import './game-settings.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const cardSetPictureId = Math.floor(Math.random() * 100);

const Settings = () => {
  const { gameInProgress, setGameInProgress } = useContext(GameStateContext);
  const { gamePaused, setGamePaused } = useContext(GameStateContext);
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);
  const { inProgressDeck } = useContext(GameStateContext);
  // const { SetInitialTimer } = useContext(GameStateContext);
  const { setIsWon } = useContext(GameStateContext);

  const { gameMode, setGameMode } = useContext(GameSettingsContext);
  const { difficulty, setDifficulty } = useContext(GameSettingsContext);
  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);
  const { activeTab, setActiveTab } = useContext(GameSettingsContext);
  const { cardSet, setCardSet } = useContext(GameSettingsContext);
  const { cardBack, setCardBack } = useContext(GameSettingsContext);

  const isFeatureEnabled = false;

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
    setGameMode(event.target.value);
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

  const handleCardBackChange = (event) => {
    setCardBack(event.target.value);
    console.log('cardBack changed to:', event.target.value);
  };

  // GAME BUTTON HANDLES
  const handleBackClick = () => {
    console.log('deck before going back from settings:', inProgressDeck);
    setNeedNewGame(false);
    navigate(-1);
  };

  const handleStartClick = () => {
    setNeedNewGame(true);
    // setGamePaused(false);
    // setGameInProgress(false);
    // TODO Need to extract and centralize this state change
    setIsWon(false);
    // setTimeout(() => setNeedNewGame(true), 200);
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

  // Horizontal scrolling helper
  useEffect(() => {
    const scrollContainer = document.querySelector('#cardBackScrollContainer');

    scrollContainer.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
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
            <div className="settings-category mode-settings">
              <span>Mode</span>
              <div className="settings-input-group mode-group">
                <RadioInput
                  id="timeBasedRadio"
                  labelText="Time Based"
                  selectedValueType={gameMode}
                  selectedValue={MODE_SETTING_TYPES.TIME_BASED}
                  onChangeHandler={handleModeChange}
                />

                <RadioInput
                  className="disabled-menu"
                  id="turnBasedRadio"
                  labelText="Turn Based"
                  selectedValueType={gameMode}
                  selectedValue={MODE_SETTING_TYPES.TURN_BASED}
                  onChangeHandler={handleModeChange}
                  disabled={!isFeatureEnabled}
                />

                <RadioInput
                  id="relaxedRadio"
                  labelText="Free"
                  selectedValueType={gameMode}
                  selectedValue={MODE_SETTING_TYPES.FREE}
                  onChangeHandler={handleModeChange}
                />
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
                    disabled={!isFeatureEnabled}
                  />
                  <RadioInput
                    id="mediumRadio"
                    labelText="Medium"
                    selectedValueType={difficulty}
                    selectedValue={DIFFICULTY_SETTING_TYPES.MEDIUM}
                    onChangeHandler={handleDifficultyChange}
                    disabled={!isFeatureEnabled}
                  />
                  <RadioInput
                    id="hardRadio"
                    labelText="Hard"
                    selectedValueType={difficulty}
                    selectedValue={DIFFICULTY_SETTING_TYPES.HARD}
                    onChangeHandler={handleDifficultyChange}
                    disabled={!isFeatureEnabled}
                  />
                </div>
              </div>
            </div>

            <div className="settings-category card-number-settings">
              <span>Number of Pairs</span>
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
            {/* CARD SET SETTINGS */}
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

            {/* CARD BACK SETTINGS */}
            <div className="settings-category card-back-settings">
              <span>Card Back</span>
              <div
                id="cardBackScrollContainer"
                className="settings-input-group card-back-group"
              >
                {/* =========================BASIC CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackBasic"
                  labelText="Basic"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.BASIC}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================HEXAGON CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackHexagon"
                  labelText="Hexagon"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.HEXAGON}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================BUBBLES HEADS CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackBubbles"
                  labelText="Bubbles"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.BUBBLES}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================CIRCLES CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackCircles"
                  labelText="Circles"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.CIRCLES}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================DIAMONDS CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackDiamonds"
                  labelText="Diamonds"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.DIAMONDS}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================JAPANESE CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackJapanese"
                  labelText="Japanese"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.JAPANESE}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================SCALES CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackScales"
                  labelText="Scales"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.SCALES}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================TRIANGLES CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackTriangles"
                  labelText="Triangles"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.TRIANGLES}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
                />

                {/* =========================MEMPHIS CARD BACK */}
                <RadioInputPicLabel
                  id="cardBackMemphis"
                  labelText="Memphis"
                  selectedValueType={cardBack}
                  selectedValue={CARBACK_SETTING_TYPES.MEMPHIS}
                  onChangeHandler={handleCardBackChange}
                  cardSetId={null}
                  cardSetPicId={null}
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
