import type { GameRound } from "@/types";
import { createContext, useContext, useState } from "react";

type GameState = {
  status: string;
  roomCode?: string;
  host?: string;
  players?: any;
  timePerRound?: any;
  results?: any;
};

const initialState: GameState = {
  status: "NONE",
};

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  currentRound: GameRound | null;
  setCurrentRound: React.Dispatch<React.SetStateAction<GameRound | null>>;
  isPlayerGameOver: boolean;
  setIsPlayerGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};
const GameContext = createContext<GameContextType | null>(null);

interface IGameContextProvider {
  children: React.ReactNode;
}

export const GameContextProvider = ({ children }: IGameContextProvider) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [isPlayerGameOver, setIsPlayerGameOver] = useState(false);
  return <GameContext.Provider value={{ gameState, setGameState, currentRound, setCurrentRound, isPlayerGameOver, setIsPlayerGameOver }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Game context can only be accessed inside a Game context provider");
  }
  return context;
};
