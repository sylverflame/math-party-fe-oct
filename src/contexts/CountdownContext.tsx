import { createContext, useContext, useRef, useState } from "react";

type CountdownContextType = {
  countdownTimeInContext: number | null;
  setcountdownTimeInContext: React.Dispatch<React.SetStateAction<number | null>>;
  countDownRef: React.RefObject<number>;
  showCountdownTimer: boolean;
  setShowCountdownTimer: React.Dispatch<React.SetStateAction<boolean>>
};

const CountdownContext = createContext<CountdownContextType | null>(null);

export const CountdownContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [countdownTimeInContext, setcountdownTimeInContext] = useState<number | null>(null);
  const [showCountdownTimer, setShowCountdownTimer] = useState<boolean>(false);
  const countDownRef = useRef(0);
  return <CountdownContext.Provider value={{ countdownTimeInContext, setcountdownTimeInContext, countDownRef, showCountdownTimer, setShowCountdownTimer }}>{children}</CountdownContext.Provider>;
};

export const useCountdownContext = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("Countdown context can only be accessed inside a Countdown context provider");
  }

  return context;
};
