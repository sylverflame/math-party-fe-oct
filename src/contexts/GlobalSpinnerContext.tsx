import { createContext, useContext, useState } from "react";

type GlobalSpinnerContextType = {
  isShown: boolean;
  showGlobalSpinner: () => void;
  hideGlobalSpinner: () => void;
};

const GlobalSpinnerContext = createContext<GlobalSpinnerContextType | null>(null);

interface ISpinnerProvider {
  children: React.ReactNode;
}

export const SpinnerProvider = ({ children }: ISpinnerProvider) => {
  const [isShown, setIsShown] = useState(false);

  const showGlobalSpinner = () => {
    setIsShown(true);
  };

  const hideGlobalSpinner = () => {
    setIsShown(false);
  };

  return <GlobalSpinnerContext.Provider value={{ isShown, showGlobalSpinner, hideGlobalSpinner }}>{children}</GlobalSpinnerContext.Provider>;
};

export const useSpinner = () => {
  const context = useContext(GlobalSpinnerContext);
  if (!context) {
    throw new Error("useSpinned can only be used inside a SpinnerProvider");
  }
  return context;
};
