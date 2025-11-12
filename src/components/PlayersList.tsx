import { useGame } from "@/contexts/GameContext";

const PlayersList = () => {
  const { gameState } = useGame();
  return (
    <>
      {gameState.players
        .sort((a: any, b: any) => b.totalScore - a.totalScore)
        .map((player: any) => {
          return (
            <div key={player.userId} className="bg-muted px-2 py-1 rounded border flex justify-between items-center shadow-lg mb-1">
              <div className="flex items-center gap-2">
                <div className="text-card-foreground font-semibold">{player.userId}</div>
                {player.userId === gameState.host && (
                  <span className="inline-flex text-green-800 border-green-800 dark:text-green-600 dark:border-green-600 rounded border-1  px-1 font text-[8px] align-middle mx-0.5">{"HOST"}</span>
                )}
              </div>
              <div className="font-bold text-primary text-xl">{player.totalScore}</div>
            </div>
          );
        })}
    </>
  );
};

export default PlayersList;
