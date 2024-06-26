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
import { ThemeContext } from '../../contexts/app-theme.context';

import VanillaTilt from 'vanilla-tilt';
import {
  enableHorizontalScrolling,
  disableHorizontalScrolling,
} from '../../component-helpers/horizontal-scrolling';

import { themes } from '../../app-themes/app-themes';
import { backgrounds } from '../../app-themes/app-backgrounds';
import './game-settings.styles.scss';

const cardSetPictureId = Math.floor(Math.random() * 100);

const Settings = () => {
  const {
    needNewGame,
    setNeedNewGame,
    setIsGameOver,
    setIsWon,
    inProgressDeck,
    setIsNeedStaggerAnimation,
    setTurns,
  } = useContext(GameStateContext);

  const {
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    numberOfPairs,
    setNumberOfPairs,
    activeTab,
    setActiveTab,
    cardSet,
    setCardSet,
    cardBack,
    setCardBack,
  } = useContext(GameSettingsContext);

  const {
    isDarkMode,
    setIsDarkMode,
    appBackground,
    setAppBackground,
    theme,
    toggleTheme,
    backgroundClassName,
    setBackgroundClassName,
  } = useContext(ThemeContext);

  const isFeatureEnabled = false;

  const navigate = useNavigate();

  const handleTabChange = (event) => {
    console.log('activetab change to:', event.target.value);
    switch (event.target.value) {
      case TAB_VALUES.GAME_TAB:
        setActiveTab(TAB_VALUES.GAME_TAB);
        break;
      case TAB_VALUES.CARD_VISUALS_TAB:
        setActiveTab(TAB_VALUES.CARD_VISUALS_TAB);
        break;
      case TAB_VALUES.APP_VISUALS_TAB:
        setActiveTab(TAB_VALUES.APP_VISUALS_TAB);
        break;
      default:
        break;
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

  const handlePairNumberChange = (event) => {
    setNumberOfPairs(event.target.value);
    console.log('cardNumber changed to:', event.target.value);
  };

  // CARD VISUAL SETTINGS HANDLES
  const handleCardSetChange = (event) => {
    setCardSet(event.target.value);
    console.log('cardSet changed to:', event.target.value);
  };

  const handleCardBackChange = (event) => {
    setCardBack(event.target.value);
    console.log('cardBack changed to:', event.target.value);
  };

  // APP VISUAL SETTINGS HANDLERS

  // Light/Dark mode handler
  const handleDarkModeChange = (event) => {
    const mode = event.target.value;
    setIsDarkMode(mode === 'dark');
  };

  // App Theme handler
  const handleThemeChange = (event) => {
    const themeName = event.target.value;
    const darkMode = isDarkMode ? 'dark' : 'light';
    const newTheme = themes[themeName][darkMode];
    toggleTheme(themeName, darkMode);
    setAppBackground(backgrounds[newTheme.backgroundClass]);
  };

  // App Background handler
  const handleAppBackgroundChange = (event) => {
    const selectedBackground = Object.values(backgrounds).find(
      (bg) => bg.className === event.target.value
    );
    console.log('selectedBackground: ', selectedBackground);
    setAppBackground(selectedBackground);
  };

  // GAME BUTTON HANDLES
  const handleBackClick = () => {
    console.log('deck before going back from settings:', inProgressDeck);
    setNeedNewGame(false);
    setIsNeedStaggerAnimation(false);
    navigate(-1);
  };

  const handleStartClick = () => {
    setNeedNewGame(true);
    setIsNeedStaggerAnimation(true);
    // TODO Need to extract and centralize this state change
    setIsWon(false);
    setIsGameOver(false);
    setTurns(0);
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

  // Horizontal scrolling helpers
  useEffect(() => {
    enableHorizontalScrolling('.horizontal-scroll-container');

    // Cleanup function to remove event listeners
    return () => {
      disableHorizontalScrolling('.horizontal-scroll-container');
    };
  }, []);

  const themeEntries = Object.entries(themes);

  return (
    <div className="settings">
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
            className={`settings-tab card-visuals-tab ${
              activeTab === TAB_VALUES.CARD_VISUALS_TAB ? 'active-tab' : ''
            }`}
            onClick={handleTabChange}
            value={TAB_VALUES.CARD_VISUALS_TAB}
          >
            Card Visuals
          </button>
          <button
            className={`settings-tab app-visuals-tab ${
              activeTab === TAB_VALUES.APP_VISUALS_TAB ? 'active-tab' : ''
            }`}
            onClick={handleTabChange}
            value={TAB_VALUES.APP_VISUALS_TAB}
          >
            App Visuals
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
                  disabled={isFeatureEnabled}
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

            <div className="settings-category pair-number-settings">
              <span>Pairs to Match</span>
              <div className="settings-input-group pair-number-group">
                <label htmlFor="pairNumberSlider">
                  {numberOfPairs}

                  <input
                    id="pairNumberSlider"
                    className="pair-number-input"
                    type="range"
                    min="2"
                    max="20"
                    step="2"
                    value={numberOfPairs}
                    onChange={handlePairNumberChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Card Visual Settings panel */}
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.CARD_VISUALS_TAB ? 'active-settings' : ''
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
                className="settings-input-group horizontal-scroll-container tile-group card-back-group"
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

                {/* =========================RETRO CARD BACK */}

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
          {/* App Visual Settings panel */}
          <div
            className={`game-settings-container ${
              activeTab === TAB_VALUES.APP_VISUALS_TAB ? 'active-settings' : ''
            }`}
          >
            {/* App Dark Mode Settings */}
            <div className="settings-category app-darkmode-settings">
              <span>Dark/Light Mode</span>
              <div className="settings-input-group app-darkmode-group">
                <RadioInput
                  id="darkmode"
                  labelText="Dark Mode"
                  selectedValueType={isDarkMode ? 'dark' : 'light'}
                  selectedValue="dark"
                  onChangeHandler={handleDarkModeChange}
                />

                <RadioInput
                  id="lightmode"
                  labelText="Light Mode"
                  selectedValueType={isDarkMode ? 'dark' : 'light'}
                  selectedValue="light"
                  onChangeHandler={handleDarkModeChange}
                />
              </div>
            </div>
            {/* App Theme Settings */}
            <div className="settings-category app-theme-settings">
              <span>App Theme</span>
              <div className="settings-input-group app-theme-group">
                {/* =========================APP THEME RADIO BUTTONS */}
                {themeEntries.map(([themeKey, themeValue]) => (
                  <RadioInput
                    key={themeKey}
                    id={`theme-${themeKey}`}
                    name="appTheme"
                    labelText={themeValue.label}
                    selectedValueType={theme.name}
                    selectedValue={themeKey}
                    onChangeHandler={handleThemeChange}
                  />
                ))}
              </div>
            </div>
            {/* App Background Settings */}
            <div className="settings-category app-background-settings">
              <span>App Background</span>
              <div
                id="appBgScrollContainer"
                className="settings-input-group horizontal-scroll-container tile-group app-bg-group"
              >
                {/* =========================APP BACKGROUNDS */}
                {Object.entries(backgrounds).map(([key, value]) => (
                  <RadioInputPicLabel
                    key={key}
                    id={`appBg${key}`}
                    labelText={key}
                    selectedValueType={appBackground.className}
                    selectedValue={value.className}
                    onChangeHandler={handleAppBackgroundChange}
                    isAppBackground={true}
                  />
                ))}
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
