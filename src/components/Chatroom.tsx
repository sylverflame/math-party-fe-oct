import { useUser } from "@/contexts/UserContext";
import cn from "classnames";
import { useState } from "react";
import { Input } from "./ui/input";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import type { Chat } from "@/contexts/GameContext";

interface IChatroom {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
  chats: Chat[];
}

const Chatroom = ({ sendMessage, chats }: IChatroom) => {
  const [chatInput, setChatInput] = useState("");
  const {
    user: { userId: loggedUser },
  } = useUser();

  const onChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput) {
      return;
    }
    sendMessage("SEND_CHAT_MESSAGE", { message: chatInput, roomCode: "ABCDE" });
  };

  return (
    <div className="chatroom bg-muted text-card-foreground border rounded px-2 py-1">
      <div className="messages-container h-[300px] overflow-y-auto flex flex-col">
        {chats.map((chat) => {
          const { userId, content } = chat;
          if (!content) {
            return;
          }
          if (chat.type === "MESSAGE") {
            return (
              <div
                className={cn("message text-white text-[10px] border p-3 rounded-2xl my-2", { "bg-green-800 self-end": loggedUser === userId }, { "bg-blue-800 self-start": loggedUser !== userId })}
              >
                {chat.content}
              </div>
            );
          }
          if (chat.type === "EVENT") {
            return <div className="event text-muted-foreground text-[10px] uppercase my-1">{chat.content}</div>;
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
