import useCountdown from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";
import { forwardRef, useImperativeHandle } from "react";

interface ICountdownTmerProps {
  startTime: number;
  onTimedout: () => void;
  className?: string;
}

const CountdownTimer = forwardRef<{ takeSnapshot: () => number }, ICountdownTmerProps>(({ startTime, onTimedout, className }: ICountdownTmerProps, ref) => {
  const { time, takeSnapshot } = useCountdown(startTime, onTimedout);
  useImperativeHandle(ref, () => ({
    takeSnapshot,
  }));
  let percentTime = (time / (startTime * 1000)) * 100;
  return <div className={cn("bg-green-400 h-2 rounded transition-all", className, { "bg-red-400": percentTime < 30 })} style={{ width: `${percentTime}%` }} />;
});

export default CountdownTimer;
