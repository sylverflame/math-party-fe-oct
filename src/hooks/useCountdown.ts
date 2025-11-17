import { useEffect, useState } from "react";

const useCountdown = (startTime: number, onTimedout: () => void) => {
  const [time, setTime] = useState(startTime * 1000);
  const [isTimedOut, setIsTimedOut] = useState(false);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setTime(start + startTime * 1000 - Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time < 0 && !isTimedOut) {
      onTimedout();
      setIsTimedOut(true);
    }
  }, [time]);

  const takeSnapshot = () => {
    return time;
  };

  return { time, takeSnapshot };
};

export default useCountdown;
