import { createContext, useContext, useState } from "react";

type CountdownContextType = {
  countdownTimeInContext: number | null;
  setcountdownTimeInContext: React.Dispatch<React.SetStateAction<number | null>>;
};

const CountdownContext = createContext<CountdownContextType | null>(null);

export const CountdownContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [countdownTimeInContext, setcountdownTimeInContext] = useState<number | null>(null);
  return <CountdownContext.Provider value={{ countdownTimeInContext, setcountdownTimeInContext }}>{children}</CountdownContext.Provider>;
};

export const useCountdownContext = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("Countdown context can only be accessed inside a Game context provider");
  }

  return context;
};
