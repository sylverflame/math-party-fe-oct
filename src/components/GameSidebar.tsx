import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/contexts/GameContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import Chatroom from "./Chatroom";
import PlayersList from "./PlayersList";

interface IGameSidebar {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const GameSidebar = ({ sendMessage }: IGameSidebar) => {
  const { gameState } = useGame();
  return (
    <div className="hidden lg:block game-sidebar w-[40%] h-full transition-all fade-in">
      <h6 className="text-card-foreground font-bold mb-2">{"Room Code"}</h6>
      <div className="text-muted-foreground border-2 rounded-xl border-border text-2xl p-2 cursor-pointer flex justify-center">{gameState.roomCode}</div>
      <Tabs defaultValue="players" className="mt-4">
        <TabsList>
          <TabsTrigger value="players">{"Players"}</TabsTrigger>
          <TabsTrigger value="chat">{"Chat"}</TabsTrigger>
        </TabsList>
        <TabsContent value="players">
          <PlayersList />
        </TabsContent>
        <TabsContent value="chat">
          <Chatroom sendMessage={sendMessage} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameSidebar;
