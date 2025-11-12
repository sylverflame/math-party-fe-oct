import type { GameRound } from "@/types";
import { createContext, useContext, useState } from "react";

type GameState = {
  status: string;
  roomCode?: string;
  host?: string;
  players?: any;
  timePerRound?: any;
};

const initialState: GameState = {
  status: "NONE",
};

export type Chat = {
  type: "EVENT" | "MESSAGE";
  content: string;
  userId?: string;
};

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  currentRound: GameRound | null;
  setCurrentRound: React.Dispatch<React.SetStateAction<GameRound | null>>;
  isPlayerGameOver: boolean;
  setIsPlayerGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};
const GameContext = createContext<GameContextType | null>(null);

interface IGameContextProvider {
  children: React.ReactNode;
}

export const GameContextProvider = ({ children }: IGameContextProvider) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [isPlayerGameOver, setIsPlayerGameOver] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  return <GameContext.Provider value={{ gameState, setGameState, currentRound, setCurrentRound, isPlayerGameOver, setIsPlayerGameOver, chats, setChats }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Game context can only be accessed inside a Game context provider");
  }
  return context;
};
