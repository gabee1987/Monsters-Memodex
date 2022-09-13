import { useContext, useEffect } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import './game-control.styles.scss';
import { useState } from 'react';

const GameControls = ({ newGameClick }) => {
  const { turns } = useContext(GameStateContext);
  const { timeLeft } = useContext(GameStateContext);
  const { timeElapsed } = useContext(GameStateContext);

  const { mode } = useContext(GameSettingsContext);

  // Convert the seconds to a time format
  function formatTime(timeToFormat) {
    const h = Math.floor(timeToFormat / 3600);
    const m = Math.floor((timeToFormat % 3600) / 60);
    const s = Math.round(timeToFormat % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  // useEffect(() => {
  //   if (timerActive) {
  //     start();
  //   } else {
  //     pause();
  //   }
  // }, [timerActive]);

  // const onTimerTimeUpdate = ({ duration }) => {
  //   console.log('timer is at: ', time);
  //   setTimerTime(time);
  //   setTimerDuration(duration);
  // };

  // const onTimerTimeOver = () => {
  //   console.log('timer is finished!');
  // };

  // const { time, start, pause, reset, status } = useTimer({
  //   initialTime: 100,
  //   timerType: 'DECREMENTAL',
  //   onTimeOver: onTimerTimeOver,
  //   onTimeUpdate: onTimerTimeUpdate,
  // });

  // const [timerTime, setTimerTime] = useState();
  // const [timerDuration, setTimerDuration] = useState();

  // useEffect(() => {
  //   // let formattedTime = formatTime(timeLeft);
  //   // console.log('time from context: ', timeLeft);
  //   // console.log('formatted time: ', formattedTime);
  //   // setTimeLeft(formattedTime);
  // }, [timeLeft]);

  return (
    <div className="button-container">
      <button className="btn game-control new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      {mode === MODE_SETTING_TYPES.FREE && (
        <button className="btn game-control game-stat time-elapsed-btn">
          TIME: <span>{formatTime(timeElapsed)}</span>
        </button>
      )}
      {mode === MODE_SETTING_TYPES.TIME_BASED && (
        // <button className="btn game-control game-stat time-left-btn">
        //   TIME LEFT: <span>{formatTime(timeLeft)}</span>
        // </button>
        <button className="btn game-control game-stat time-left-btn">
          TIME LEFT:
          <span>{formatTime(timeLeft)}</span>
        </button>
      )}
      {/* {mode === MODE_SETTING_TYPES.TURN_BASED && (
        <button className="btn game-control game-stat turn-left-btn">
          TURN LEFT: <span>{formatTime(stopWatchSeconds)}</span>
        </button>
      )} */}
      <button className="btn game-control game-stat turn-taken-btn">
        TURNS: {turns}
      </button>
    </div>
  );
};

export default GameControls;
