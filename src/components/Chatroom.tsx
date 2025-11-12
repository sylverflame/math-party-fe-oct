import { useGame } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import cn from "classnames";
import { useState } from "react";
import { Input } from "./ui/input";
import { DISPLAY_CHAT_ITEMS } from "@/config/constants";

interface IChatroom {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const Chatroom = ({ sendMessage }: IChatroom) => {
  const [chatInput, setChatInput] = useState("");
  const {
    user: { userId: loggedUser },
  } = useUser();
  const { gameState, chats } = useGame();
  const { roomCode } = gameState;

  const onChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChatInput("");
    if (!chatInput) {
      return;
    }
    sendMessage("SEND_CHAT_MESSAGE", { message: chatInput, roomCode });
  };

  return (
    <div className="chatroom bg-muted text-card-foreground border rounded px-2 py-1">
      <div className="messages-container h-[300px] overflow-y-auto flex flex-col" style={{ scrollbarWidth: "thin", scrollbarColor: "var(--muted-foreground) var(--muted)"}}>
        {chats.slice(DISPLAY_CHAT_ITEMS).map((chat, index) => {
          const { userId, content } = chat;
          if (!content) {
            return;
          }
          if (chat.type === "MESSAGE") {
            return (
              <div
                className={cn(
                  "message fade-in text-white border px-2 py-1 rounded-lg my-2 flex flex-col",
                  { "bg-green-800 self-end": loggedUser === userId },
                  { "bg-blue-800 self-start": loggedUser !== userId }
                )}
                key={index}
              >
                <div className="text-[10px] font-bold self-end">{chat.userId}</div>
                <div className="text-[12px] ">{chat.content}</div>
              </div>
            );
          }
          if (chat.type === "EVENT") {
            return <div className="event text-muted-foreground text-[10px] uppercase my-1" key={index}>{chat.content}</div>;
          }
        })}
      </div>
      <form onSubmit={onChatSubmit}>
        <Input className="my-2" placeholder="Chat" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
      </form>
    </div>
  );
};

export default Chatroom;
