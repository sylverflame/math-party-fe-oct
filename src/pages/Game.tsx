import { useUser } from "@/contexts/UserContext";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import CreateGame from "./CreateGame";
import GameRoom from "./GameRoom";
import JoinGame from "./JoinGame";
import type { GameRound } from "@/types";
import { TimerContextProvider } from "@/contexts/TimerContext";
import useWebSocket from "@/hooks/useWebsocket";

type GameState = {
  status: string;
  roomCode?: string;
  // settings: any;
  // isMultiplayer: boolean;
  // isPrivateGame: boolean;
  host?: string;
  players?: any;
};

const initialState: GameState = {
  status: "NONE",
};

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [isPlayerGameOver, setIsPlayerGameOver] = useState(false);
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const { userId } = user;
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    if (searchParams.get("type") === "create") {
      setGameState({
        ...gameState,
        status: "CREATING_GAME",
      });
    }
    if (searchParams.get("type") === "join") {
      setGameState({
        ...gameState,
        status: "JOINING_GAME",
      });
    }
  };

  const onSocketOpen = () => {
    sendMessage("AUTHENTICATE_USER", {
      userId,
      token: "abc",
    });
  };

  const onSocketClose = () => {
    toast.error("ERROR", {
      description: "Connection closed!",
    });
    navigate("/app/home");
  };

  const onMessage = (event: MessageEvent<any>) => {
    const jsonData = JSON.parse(event.data);
    const { type, payload } = jsonData;
    if (type === "ERROR") {
      toast.error(type, { description: payload.message });
    }
    const allowedTypes = ["GAME_CREATED", "PLAYER_JOINED", "PLAYER_LEFT", "GAME_STARTED", "NEXT_ROUND", "STATE_UPDATED", "PLAYER_GAME_FINISED"];
    if (allowedTypes.includes(type)) {
      if (payload.message) {
        toast.success(type, {
          description: payload.message,
        });
      }
      if (payload.round) {
        setCurrentRound(payload.round);
      }
      if (payload.gameState) {
        setGameState({ ...payload.gameState });
      }
    }
    if (type === "PLAYER_GAME_FINISHED") {
      setIsPlayerGameOver(true);
    }
  };
  const { sendMessage } = useWebSocket("ws://localhost:8080", onMessage, onSocketOpen, onSocketClose);

  if (gameState.status === "CREATING_GAME") {
    return <CreateGame sendMessage={sendMessage} />;
  }

  if (gameState.status === "JOINING_GAME") {
    return <JoinGame sendMessage={sendMessage} />;
  }

  if (gameState.status === "WAITING_TO_START" || gameState.status === "GAME_IN_PROGRESS") {
    return (
      <TimerContextProvider>
        <GameRoom sendMessage={sendMessage} gameState={gameState} setGameState={setGameState} currentRound={currentRound} isPlayerGameOver={isPlayerGameOver} />
      </TimerContextProvider>
    );
  }
};

export default Game;
