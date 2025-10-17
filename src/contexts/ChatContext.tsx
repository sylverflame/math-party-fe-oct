import type { Chat } from "@/pages/Game";
import { createContext } from "react";

type ChatContextType = {
  chats: Chat[];
  addChat: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

// TODO: Not sure if chat context is needed
const ChatContextProvider = () => {};
