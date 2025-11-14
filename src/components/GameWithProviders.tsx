import { GameContextProvider } from "@/contexts/GameContext";
import EBWrapper from "./EBWrapper";
import SuspenseWrapper from "./SuspenseWrapper";
import { lazy } from "react";
import { ChatContextProvider } from "@/contexts/ChatContext";
import { CountdownContextProvider } from "@/contexts/CountdownContext";
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
                  <CountdownContextProvider>
                    <Game />
                  </CountdownContextProvider>
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
