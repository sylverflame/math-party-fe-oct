import { createContext, useContext, useState } from "react";

type TimerContextType = {
  elapsedTimeInContext: number;
  setElapsedTimeInContext: React.Dispatch<React.SetStateAction<number>>;
};

const initialValue = {
  elapsedTimeInContext: 0,
  setElapsedTimeInContext: () => {},
};
const TimerContext = createContext<TimerContextType>(initialValue);

const Provider = TimerContext.Provider;

type TimerContextProvider = {
  children: React.ReactNode;
};

export const TimerContextProvider = ({ children }: TimerContextProvider): React.ReactNode => {
  const [elapsedTimeInContext, setElapsedTimeInContext] = useState(0);

  return <Provider value={{ elapsedTimeInContext, setElapsedTimeInContext }}>{children}</Provider>;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("Context can only be used inside relevant provider");
  }
  return context;
};
