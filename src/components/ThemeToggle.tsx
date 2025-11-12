import { useTheme } from "@/contexts/ThemeContext";
import { useRef } from "react";
import Moon from "@/assets/moon.svg?react";
import Sun from "@/assets/sun.svg?react";

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const toggleRef = useRef<HTMLDivElement>(null);
  const onThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-center gap-1">
      <Sun className="size-4 invert" />
      <div className="theme-toggle w-10 h-6 p-1 bg-zinc-100 rounded-4xl cursor-pointer" onClick={onThemeToggle}>
        <div className={`size-4 bg-zinc-800 rounded-4xl transition-transform duration-150 ease-in-out ${isDarkMode ? "translate-x-4" : "translate-x-0"}`} ref={toggleRef} />
      </div>
      <Moon className="size-4 invert" />
    </div>
  );
};

export default ThemeToggle;
