import { useState, useEffect, useContext } from 'react';
import { useTimer } from 'react-timer-hook';
import { GameSettingsContext } from '../contexts/game-settings.context';

export const useGameTimer = (
  numberOfCards,
  difficulty,
  mode,
  gameInProgress,
  isWon
) => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { calculateTimerValue } = useContext(GameSettingsContext);

  // Calculate expiryTimestamp based on card number and difficulty
  const calculateExpiryTimestamp = () => {
    const timerValue = calculateTimerValue(numberOfCards, difficulty);
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerValue);
    return time;
  };

  const [expiryTimestamp, setExpiryTimestamp] = useState(
    calculateExpiryTimestamp()
  );

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: () => setIsTimeUp(true),
    });

  useEffect(() => {
    if (mode === 'TIME_BASED') {
      const newExpiryTimestamp = calculateExpiryTimestamp();
      if (expiryTimestamp.getTime() !== newExpiryTimestamp.getTime()) {
        setExpiryTimestamp(newExpiryTimestamp);
      } // Recalculate expiry timestamp if needed
      if (gameInProgress && !isWon) {
        restart(expiryTimestamp);
      }
    } else {
      pause();
    }
  }, [numberOfCards, difficulty, mode, gameInProgress, restart, pause]);

  return { isTimeUp, minutes, seconds, isRunning, start, pause, resume };
};
