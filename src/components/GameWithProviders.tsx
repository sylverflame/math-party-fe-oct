import { GameContextProvider } from "@/contexts/GameContext";
import EBWrapper from "./EBWrapper";
import SuspenseWrapper from "./SuspenseWrapper";
import { lazy } from "react";
const Game = lazy(() => import("@/pages/Game"));
const GameWithProviders = () => {
  return <EBWrapper children={<SuspenseWrapper children={<GameContextProvider children={<Game />} />} />} />;
};

export default GameWithProviders;
