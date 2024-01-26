import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({ initialTimeInSeconds, isStart }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  const nav = useNavigate();

  useEffect(() => {
    let timerId;

    if (timeRemaining > 0 && isStart) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);

  }, [timeRemaining, isStart]);

  const formatTime = (seconds) => {
    localStorage.setItem("remainTime", seconds);
    if(seconds <= 0){
      nav('/')
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <div>
      <p>Thời gian còn lại: {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default Timer;
