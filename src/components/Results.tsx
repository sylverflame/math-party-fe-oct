import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import GoldMedal from "@/assets/gold-medal.svg?react";
import SilverMedal from "@/assets/silver-medal.svg?react";

const Results = () => {
  const { gameState } = useGame();

  return (
    <>
      {gameState.results.map((player: any, index: number) => {
        return (
          <div key={player.userId} className={cn("bg-muted p-2 flex justify-around items-center gap-4 rounded shadow-lg w-[100%]")}>
            <div className="flex gap-2 items-center">
              {index === 0 && <GoldMedal className="size-8 fall-in-2s" />}
              {index === 1 && <SilverMedal className="size-8 fall-in-1s" />}
              <div className={cn(`text-card-foreground font-semibold`)}>{player.userId}</div>
            </div>
            <div>
              <div className="font-bold text-primary text-2xl">{(player.totalScore as number).toLocaleString()}</div>
              <div className="text-primary text-xs">{parseInt(player.elapsedTime)/1000}s</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Results;
