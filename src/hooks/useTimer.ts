import { useTimerContext } from "@/contexts/TimerContext";
import { useState, useEffect } from "react";

type Times = "hours" | "minutes" | "seconds" | "milliseconds" | "elapsedTime";
type Timer = {
  [key in Times]: number;
};

export const useTimer = (): Timer => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { setElapsedTimeInContext } = useTimerContext();

  useEffect(() => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
      setElapsedTimeInContext(Date.now() - startTime);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / 60000) % 60);
  const hours = Math.floor((elapsedTime / 3600000) % 24);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds,
    elapsedTime: elapsedTime,
  };
};
