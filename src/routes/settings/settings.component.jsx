import { useState, useEffect, useRef, useContext } from 'react';

import './settings.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const Settings = () => {
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
              ></input>
              <label for="timeBasedRadio">Time Based</label>
              <input
                id="turnBasedRadio"
                type="radio"
                name="mode"
                value="turnBased"
              ></input>
              <label for="turnBasedRadio">Turn Based</label>
              <input
                id="relaxedRadio"
                type="radio"
                name="mode"
                value="relaxed"
              ></input>
              <label for="relaxedRadio">Relaxed</label>
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
              ></input>
              <label for="easyRadio">Easy</label>
              <input
                id="mediumRadio"
                type="radio"
                name="difficulty"
                value="medium"
              ></input>
              <label for="mediumRadio">Medium</label>
              <input
                id="hardRadio"
                type="radio"
                name="difficulty"
                value="hard"
              ></input>
              <label for="hardRadio">Hard</label>
            </div>
          </div>

          <div className="settings-category x-settings">
            <span>Number of Cards</span>
            <div className="settings-input-group card-number-group">
              <label for="cardNumberSlider">CardCount</label>
              <input
                id="cardNumberSlider"
                className="card-number-input"
                type="range"
                min="2"
                max="20"
                step="2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
