import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IGameSidebar {
  gameState: any;
}

const GameSidebar = ({ gameState }: IGameSidebar) => {
  return (
    <div className="hidden lg:block game-sidebar w-[40%] p-4 transition-all">
      <h6 className="text-card-foreground font-bold mb-2">{"Room Code"}</h6>
      <div className="text-muted-foreground border-2 rounded-xl border-border text-2xl p-2 cursor-pointer flex justify-center">{gameState.roomCode}</div>
      <Tabs defaultValue="players" className="mt-4">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="players">
          {gameState.players.map((player: any) => {
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
        </TabsContent>
        <TabsContent value="chat">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default GameSidebar;
