import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import Chatroom from "./Chatroom";
import PlayersList from "./PlayersList";
import RoomCode from "./RoomCode";

interface IGameSidebar {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const GameSidebar = ({ sendMessage }: IGameSidebar) => {
  return (
    <div className="hidden md:block game-sidebar w-[40%] lg:w-[30%] h-full transition-all fade-in">
      <RoomCode />
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
