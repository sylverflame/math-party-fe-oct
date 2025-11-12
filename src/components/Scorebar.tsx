import { cn } from "@/lib/utils";

interface IScorebar {
  value: number;
  maximum: number;
  className?: string;
}

const Scorebar = ({ value, maximum, className }: IScorebar) => {
  const percentage = (value / maximum) * 100;
  return (
    <div
      className={cn(`w-full absolute  h-1 rounded bg-green-400 transition-all`, className, { "bg-red-400": percentage < 40 }, { "bg-amber-400": percentage > 40 && percentage < 80 })}
      style={{ width: `${percentage}%` }}
    />
  );
};

export default Scorebar;
