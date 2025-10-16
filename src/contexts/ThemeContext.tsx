import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const Provider = ThemeContext.Provider;

interface IThemeProvider {
  children: React.ReactNode;
}
export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return <Provider value={{ isDarkMode, setIsDarkMode }}>{children}</Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Context provider error");
  }

  return context;
};
