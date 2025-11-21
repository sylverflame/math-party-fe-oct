import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from "@/contexts/ChatContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Chatroom from "./Chatroom";
import NewChatIndicator from "./NewChatIndicator";
import PlayersList from "./PlayersList";
import RoomCode from "./RoomCode";
import SidebarCloseButton from "./SidebarCloseButton";
import { Button } from "./ui/button";
import { VscDebugRestart } from "react-icons/vsc";
import { useUser } from "@/contexts/UserContext";
import { useGame } from "@/contexts/GameContext";

interface IGameSidebar {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
  onClose: () => void;
  showSidebar: boolean;
}

const GameSidebar = ({ sendMessage, onClose, showSidebar }: IGameSidebar) => {
  const { setShowNewChatIndicator } = useChat();
  const [currentTab, setCurrentTab] = useState("players");

  // To hide new chat indicator when user moves away from the chats tab
  const onTabChange = (value: string) => {
    if (currentTab === "chat") {
      setShowNewChatIndicator(false);
    }
    setCurrentTab(value);
  };

  const sidebarClasses = {
    commonClasses: "game-sidebar transition-all fade-in h-full",
    smallScreen: "absolute left-0 top-0 w-full z-1 bg-gradient-70 p-4 backdrop-blur-sm",
    mediumScreen: "md:static md:block md:w-[40%] lg:w-[30%]",
  };

  return (
    <div className={cn(sidebarClasses.commonClasses, sidebarClasses.smallScreen, showSidebar ? "block" : "hidden", sidebarClasses.mediumScreen)}>
      <RoomCode />
      <SidebarCloseButton onClose={onClose} className="absolute right-4 top-4 md:hidden" />
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
      <RestartButton sendMessage={sendMessage} />
    </div>
  );
};

interface IRestartButton {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const RestartButton = ({ sendMessage }: IRestartButton) => {
  const {
    user: { userId },
  } = useUser();
  const {
    gameState: { host, roomCode, status },
  } = useGame();

  const onRestart = () => {
    sendMessage("RESTART_GAME", {
      roomCode,
    });
  };
  if (userId === host && status === "GAME_IN_PROGRESS") {
    return (
      <Button className="mt-2 mx-auto" onClick={onRestart}>
        <VscDebugRestart /> Restart
      </Button>
    );
  }
};

export default GameSidebar;
