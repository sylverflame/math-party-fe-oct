import { GameContextProvider } from "@/contexts/GameContext";
import EBWrapper from "./EBWrapper";
import SuspenseWrapper from "./SuspenseWrapper";
import { lazy } from "react";
import { ChatContextProvider } from "@/contexts/ChatContext";
const Game = lazy(() => import("@/pages/Game"));
const GameWithProviders = () => {
  return (
    <EBWrapper
      children={
        <SuspenseWrapper
          children={
            <GameContextProvider
              children={
                <ChatContextProvider>
                  <Game />
                </ChatContextProvider>
              }
            />
          }
        />
      }
    />
  );
};

export default GameWithProviders;
