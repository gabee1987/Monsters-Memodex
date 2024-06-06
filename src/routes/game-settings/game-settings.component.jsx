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
import {
  ThemeContext,
  APP_BACKGROUND_TYPES,
} from '../../contexts/app-theme.context';

import VanillaTilt from 'vanilla-tilt';
import {
  enableHorizontalScrolling,
  disableHorizontalScrolling,
} from '../../component-helpers/horizontal-scrolling';

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

  const { appBackground, setAppBackground, theme, toggleTheme } =
    useContext(ThemeContext);

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

  // APP VISUAL SETTINGS HANDLES

  // App Theme handler
  const handleThemeChange = (event) => {
    const [themeName, mode] = event.target.value.split('-');
    toggleTheme(themeName, mode);
    console.log('Theme enabled in settings: ', themeName, mode);
  };

  // App Background handler
  const handleAppBackgroundChange = (event) => {
    setAppBackground(event.target.value);
    console.log('app background changed to:', event.target.value);
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
              <span>Number of Pairs</span>
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
            {/* App Theme Settings */}
            <div className="settings-category app-theme-settings">
              <span>App Theme</span>
              <div className="settings-input-group app-theme-group">
                {/* Dark Themes */}
                <div className="dark-themes-group">
                  {/* =========================DEFAULT DARK APP THEME */}
                  <RadioInput
                    id="defaultDarkTheme"
                    labelText="Default Dark"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="default-dark"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================RETRO DARK APP THEME */}
                  <RadioInput
                    id="retroDarkTheme"
                    labelText="Retro Dark"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="retro-dark"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================NEON DARK APP THEME */}
                  <RadioInput
                    id="neonDarkTheme"
                    labelText="Neon Dark"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="neon-dark"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================COOL DARK APP THEME */}
                  <RadioInput
                    id="coolDarkTheme"
                    labelText="Cool Dark"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="cool-dark"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================WARM DARK APP THEME */}
                  <RadioInput
                    id="warmDarkTheme"
                    labelText="Warm Dark"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="warm-dark"
                    onChangeHandler={handleThemeChange}
                  />
                </div>
                {/* Light Themes */}
                <div className="light-themes-group">
                  {/* =========================DEFAULT LIGHT APP THEME */}
                  <RadioInput
                    id="defaultLightTheme"
                    labelText="Default Light"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="default-light"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================RETRO LIGHT APP THEME */}
                  <RadioInput
                    id="retroLightTheme"
                    labelText="Retro Light"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="retro-light"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================NEON LIGHT APP THEME */}
                  <RadioInput
                    id="neonLightTheme"
                    labelText="Neon Light"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="neon-light"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================COOL LIGHT APP THEME */}
                  <RadioInput
                    id="coolLightTheme"
                    labelText="Cool Light"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="cool-light"
                    onChangeHandler={handleThemeChange}
                  />
                  {/* =========================WARM LIGHT APP THEME */}
                  <RadioInput
                    id="warmLightTheme"
                    labelText="Warm Light"
                    selectedValueType={`${theme.name}-${theme.mode}`}
                    selectedValue="warm-light"
                    onChangeHandler={handleThemeChange}
                  />
                </div>
              </div>
            </div>
            {/* App Background Settings */}
            <div className="settings-category app-background-settings">
              <span>App Background</span>
              <div
                id="appBgScrollContainer"
                className="settings-input-group horizontal-scroll-container tile-group app-bg-group"
              >
                {/* =========================BASIC APP DARK BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgDefaultDark"
                  labelText="Default Dark"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_DEFAULT_DARK}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================BASIC APP LIGHT BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgDefaultLight"
                  labelText="Default Light"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_DEFAULT_LIGHT}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================SOLID LIGHT APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgSolidLight"
                  labelText="SolidLight"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_SOLID_LIGHT}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================SOLID DARK APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgSolidDark"
                  labelText="SolidDark"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_SOLID_DARK}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================JAPANESE PATTERN APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgJapanese"
                  labelText="Japanese"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_JAPANESE}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================JAPANESE PATTERN 2 APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgJapanese2"
                  labelText="Japanese2"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_JAPANESE_2}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================HEXAGON PATTERN APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgHexagon"
                  labelText="HExagon"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_HEXAGON}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
                />

                {/* =========================GEOMETRIC 4 PATTERN APP BACKGROUND */}
                <RadioInputPicLabel
                  id="appBgGeometric4"
                  labelText="Geometric"
                  selectedValueType={appBackground}
                  selectedValue={APP_BACKGROUND_TYPES.BG_GEOMETRIC_4}
                  onChangeHandler={handleAppBackgroundChange}
                  cardSetId={null}
                  cardSetPicId={null}
                  isAppBackground={true}
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
