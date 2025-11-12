import { useEffect, useState } from "react";
import { useCountdownContext } from "@/contexts/CountdownContext";

const useCountdown = (startTime: number, onTimedout: () => void) => {
  const [time, setTime] = useState(startTime * 1000);
  const { setcountdownTimeInContext } = useCountdownContext();
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setTime(start + startTime * 1000 - Date.now());
      setcountdownTimeInContext(start + startTime * 1000 - Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time < 0) {
      onTimedout()
    }
  }, [time]);

  return { time };
};

export default useCountdown;
