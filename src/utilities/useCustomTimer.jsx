import { useState, useCallback, useEffect } from 'react';

// Custom hook for timer logic
export const useCustomTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = useCallback(() => {
    if (!isActive) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    }
  }, [isActive]);

  const pauseTimer = useCallback(() => {
    if (isActive) {
      clearInterval(intervalId);
      setIsActive(false);
    }
  }, [isActive, intervalId]);

  const resetTimer = useCallback(() => {
    clearInterval(intervalId);
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime, intervalId]);

  // Cleanup
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return { timeLeft, startTimer, pauseTimer, resetTimer, isActive };
};
