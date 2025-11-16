import { Button } from "./ui/button";
import SwapIcon from "@/assets/swap.svg?react";
import Backspace from "@/assets/backspace.svg?react";
import { useMemo, useState } from "react";
import { useDevice } from "@/contexts/DeviceContext";

interface IKeypad {
  onNumberPressed: (number: number) => void;
  onBackspace: () => void;
}

const Keypad = ({ onNumberPressed, onBackspace }: IKeypad) => {
  const [isAscendingKeys, setIsAscendingKeys] = useState(true);
  const { isTouchDevice, canVibrate } = useDevice();
  const onSwap = () => {
    setIsAscendingKeys((prev) => !prev);
  };

  const ASC_KEYS = useMemo(() => [7, 8, 9, 4, 5, 6, 1, 2, 3, { type: "swap" }, 0, { type: "backspace" }], []);
  const DESC_KEYS = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, { type: "swap" }, 0, { type: "backspace" }], []);
  const keys = isAscendingKeys ? ASC_KEYS : DESC_KEYS;

  const handleClick = (key: number | { type: string }) => {
    if (canVibrate) navigator.vibrate(50);
    if (typeof key === "number") {
      onNumberPressed(key);
      return;
    }

    if (key.type === "swap") {
      onSwap();
      return;
    }

    if (key.type === "backspace") {
      onBackspace();
      return;
    }
  };
  return (
    <div className="grid grid-cols-3 w-full gap-1 mt-6">
      {keys.map((key, index) => {
        return (
          <Button
            key={index}
            className="bg-muted text-center text-card-foreground font-bold active:bg-border active:scale-80 h-[70px] text-2xl sm:text-3xl"
            onTouchStart={() => isTouchDevice && handleClick(key)}
            onClick={() => !isTouchDevice && handleClick(key)}
          >
            {typeof key === "number" ? key : key.type === "swap" ? <SwapIcon className="swap dark:invert size-6" /> : <Backspace className="backspace dark:invert size-8" />}
          </Button>
        );
      })}
    </div>
  );
};

export default Keypad;
