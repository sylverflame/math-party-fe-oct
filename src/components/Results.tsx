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
          <div key={player.userId} className={cn("bg-muted px-6 py-2 flex justify-between items-center gap-10 rounded shadow-lg w-[100%]")}>
            <div className="flex gap-2 items-center">
              {index === 0 && <GoldMedal className="size-8 fall-in-2s" />}
              {index === 1 && <SilverMedal className="size-8 fall-in-1s" />}
              <div className={cn(`text-card-foreground font-semibold`)}>{player.userId}</div>
            </div>
            <div className="font-bold text-primary text-3xl">{player.totalScore}</div>
            <div className="font-bold text-primary">{parseInt(player.elapsedTime)/1000}s</div>
          </div>
        );
      })}
    </>
  );
};

export default Results;
