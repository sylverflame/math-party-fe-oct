import useCountdown from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

interface ICountdownTmerProps {
  startTime: number;
  onTimedout: () => void;
  className?: string;
}

const CountdownTimer = ({ startTime, onTimedout, className }: ICountdownTmerProps) => {
  const { time } = useCountdown(startTime, onTimedout);
  let percentTime = (time / (startTime * 1000)) * 100;
  return <div className={cn("bg-green-400 h-2 rounded transition-all", className, { "bg-red-400": percentTime < 30 })} style={{ width: `${percentTime}%` }} />;
};

export default CountdownTimer;
