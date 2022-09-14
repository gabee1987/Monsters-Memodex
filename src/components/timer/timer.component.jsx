import { useEffect } from 'react';

const Timer = ({ minutesLeft, secondsLeft }) => {
  console.log(minutesLeft, secondsLeft);

  function formatTime(minutes, seconds, hours) {
    // if (hours < 10) {
    //   hours = '0' + hours;
    // }
    // if (minutes < 10) {
    //   minutes = '0' + minutes;
    // }
    // if (seconds < 10) {
    //   seconds = '0' + seconds;
    // }

    return [
      // hours,
      minutes > 9 ? minutes : hours ? '0' + minutes : minutes || '0',
      seconds > 9 ? seconds : '0' + seconds,
    ]
      .filter(Boolean)
      .join(':');
  }

  return <span>{formatTime(minutesLeft, secondsLeft, 0)}</span>;
};

export default Timer;
