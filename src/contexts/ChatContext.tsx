import { createContext, useContext, useState } from "react";

type ChatContextType = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  showNewChatIndicator: boolean;
  setShowNewChatIndicator: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Chat = {
  type: "EVENT" | "MESSAGE";
  content: string;
  userId?: string;
};

const ChatContext = createContext<ChatContextType | null>(null);

interface IChatContextProvider {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: IChatContextProvider) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [showNewChatIndicator, setShowNewChatIndicator] = useState(false);

  return <ChatContext.Provider value={{ chats, setChats, showNewChatIndicator, setShowNewChatIndicator }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat can only be used inside of a ChatContextProvider");
  }

  return context;
};
