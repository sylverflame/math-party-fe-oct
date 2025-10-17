import { useTimer } from "@/hooks/useTimer";
import { memo } from "react";

type TimerProps = {
  className?: string;
};

/**
 * Returns time string formatted in mm:ss:ms
 *
 * @param time - Time in milliseconds
 * @returns Time string formatted in mm:ss:ms
 */
export const getFormattedTime = (time: number): string => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);

  let timeFormatted = `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()} :
                ${seconds < 10 ? "0" + seconds.toString() : seconds.toString()} :
                ${milliseconds < 10 ? "0" + milliseconds.toString() : milliseconds.toString()}`;

  return timeFormatted;
};

export const Timer = memo(({ className }: TimerProps): React.ReactNode => {
  const { elapsedTime } = useTimer();
  return <h6 className={className}>{getFormattedTime(elapsedTime)}</h6>;
});
