import { useState, useContext, useEffect } from 'react';
import { useTimer } from 'use-timer';

import {
  GameStateContext,
  GetTimerDuration,
} from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';
import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

const TIMER_TYPE = {
  INCREMENTAL: 'INCREMENTAL',
  DECREMENTAL: 'DECREMENTAL',
};

const Timer = () => {
  const { timeLeft, setTimeLeft } = useContext(GameStateContext);
  const { timeElapsed, setTimeElapsed } = useContext(GameStateContext);
  const { gameInProgress } = useContext(GameStateContext);
  const { gamePaused } = useContext(GameStateContext);
  const { needNewGame } = useContext(GameStateContext);

  const { mode } = useContext(GameSettingsContext);
  const { numberOfCards } = useContext(GameSettingsContext);

  const [timerInitialType, setTimerInitialType] = useState(
    TIMER_TYPE.INCREMENTAL
  );
  const [timerInitialTime, setTimerInitialTime] = useState(0);

  // Convert the seconds to a time format
  function formatTime(timeToFormat) {
    const h = Math.floor(timeToFormat / 3600);
    const m = Math.floor((timeToFormat % 3600) / 60);
    const s = Math.round(timeToFormat % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  const onTimerTimeUpdate = () => {
    console.log('timer is at: ', timerTime);
    console.log('initial time: ', timerInitialTime);
    console.log('timer type: ', timerInitialType);
    console.log('timer status: ', timerStatus);
    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      setTimeLeft(timerTime);
    } else if (
      mode === MODE_SETTING_TYPES.FREE ||
      mode === MODE_SETTING_TYPES.TURN_BASED
    ) {
      setTimeElapsed(timerTime);
    }
  };

  const onTimerTimeOver = () => {
    console.log('timer is finished!');
  };

  const {
    time: timerTime = timerInitialTime,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
    status: timerStatus,
  } = useTimer({
    initialTime: timerInitialTime,
    timerType: timerInitialType,
    onTimeOver: onTimerTimeOver,
    onTimeUpdate: onTimerTimeUpdate,
  });

  useEffect(() => {
    console.log('Timer component initialized...');
    if (
      mode === MODE_SETTING_TYPES.FREE ||
      mode === MODE_SETTING_TYPES.TURN_BASED
    ) {
      resetTimer();

      setTimerInitialType(TIMER_TYPE.INCREMENTAL);
      setTimerInitialTime(5);
      setTimeLeft(timerInitialTime);
    }
    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      resetTimer();

      setTimerInitialType(TIMER_TYPE.DECREMENTAL);
      let time = GetTimerDuration(numberOfCards);
      setTimerInitialTime(50);
      setTimeLeft(timerInitialTime);
      console.log('after mode change timer set to: ', time);
    }
    resetTimer();
    console.log('timer status: ', timerStatus);
  }, []);

  //   useEffect(() => {
  //     console.log('mode change...');
  //     if (
  //       mode === MODE_SETTING_TYPES.FREE ||
  //       mode === MODE_SETTING_TYPES.TURN_BASED
  //     ) {
  //       setTimerInitialType(TIMER_TYPE.INCREMENTAL);
  //       setTimerInitialTime('5');
  //       setTimeLeft(timerInitialTime);
  //     }
  //     if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //       setTimerInitialType(TIMER_TYPE.DECREMENTAL);
  //       let time = GetTimerDuration(numberOfCards);
  //       setTimerInitialTime('500');
  //       setTimeLeft(timerInitialTime);
  //       console.log('after mode change timer set to: ', time);
  //     }
  //     resetTimer();
  //     console.log('timer status: ', timerStatus);
  //   }, [mode]);

  //   useEffect(() => {
  //     console.log('card number change...');
  //     if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //       let initialTime = GetTimerDuration(numberOfCards);
  //       setTimerInitialTime(initialTime);
  //       setTimeLeft(timerInitialTime);
  //       console.log('this shouzld be the time: ', initialTime);
  //       console.log('initial time set to: ', timerInitialTime);
  //     } else {
  //       setTimerInitialTime(0);
  //     }
  //     resetTimer();
  //   }, [numberOfCards]);

  // Start the timer when a game starts
  useEffect(() => {
    if (gameInProgress && needNewGame) {
      resetTimer();
      startTimer();
    } else {
      pauseTimer();
    }
  }, [gameInProgress]);

  // Pause/start the timer when a game starts or pauses
  useEffect(() => {
    if (gamePaused) {
      pauseTimer();
    } else if (!gamePaused && gameInProgress) {
      startTimer();
    }
  }, [gamePaused]);

  return (
    <div>
      {(mode === MODE_SETTING_TYPES.FREE ||
        mode === MODE_SETTING_TYPES.TURN_BASED) &&
        formatTime(timeElapsed)}
      {mode === MODE_SETTING_TYPES.TIME_BASED && formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
