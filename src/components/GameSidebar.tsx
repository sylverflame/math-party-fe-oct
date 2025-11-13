import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import Chatroom from "./Chatroom";
import PlayersList from "./PlayersList";
import RoomCode from "./RoomCode";
import { useChat } from "@/contexts/ChatContext";
import { useState } from "react";
import NewChatIndicator from "./NewChatIndicator";

interface IGameSidebar {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const GameSidebar = ({ sendMessage }: IGameSidebar) => {
  const { setShowNewChatIndicator } = useChat();
  const [currentTab, setCurrentTab] = useState("players");
  // To hide new chat indicator when user moves away from the chats tab
  const onTabChange = (value: string) => {
    if (currentTab === "chat") {
      setShowNewChatIndicator(false);
    }
    setCurrentTab(value);
  };

  return (
    <div className="hidden md:block game-sidebar w-[40%] lg:w-[30%] h-full transition-all fade-in">
      <RoomCode />
      <Tabs defaultValue="players" className="mt-4" onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="players">{"Players"}</TabsTrigger>
          <TabsTrigger value="chat" className="relative" onClick={() => setShowNewChatIndicator(false)}>
            {"Chat"}
            <NewChatIndicator />
          </TabsTrigger>
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
