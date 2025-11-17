import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";

interface IPlayerCountIndicator {
  className: string;
}

const PlayerCountIndicator = ({ className }: IPlayerCountIndicator) => {
  const {
    gameState: { players },
  } = useGame();
  return <div className={cn("size-4 bg-cyan-500 dark:bg-cyan-800 text-foreground rounded-full flex items-center justify-center text-xs font-extralight", className)}>{players.length}</div>;
};

export default PlayerCountIndicator;
