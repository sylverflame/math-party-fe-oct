import { useEffect, useState } from "react";
import { useCountdownContext } from "@/contexts/CountdownContext";

const useCountdown = (startTime: number, onTimedout: () => void) => {
  const [time, setTime] = useState(startTime * 1000);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const { setcountdownTimeInContext } = useCountdownContext();
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setTime(start + startTime * 1000 - Date.now());
      setcountdownTimeInContext(start + startTime * 1000 - Date.now());
    }, 100);
    console.log("Timer mounted");
    return () => clearInterval(interval);
    
  }, []);

  useEffect(() => {
    if (time < 0 && !isTimedOut) {
      onTimedout();
      setIsTimedOut(true);
    }
  }, [time]);

  return { time };
};

export default useCountdown;
