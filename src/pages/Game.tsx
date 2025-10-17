import GameContainer from "@/components/GameContainer";
import GameSidebar from "@/components/GameSidebar";
import { useGame, type Chat } from "@/contexts/GameContext";
import { TimerContextProvider } from "@/contexts/TimerContext";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import CreateGame from "./CreateGame";
import GameRoom from "./GameRoom";
import JoinGame from "./JoinGame";

const Game = () => {
  const [searchParams] = useSearchParams();
  const { setGameState, setChats, setCurrentRound, setIsPlayerGameOver, gameState } = useGame();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    if (searchParams.get("type") === "create") {
      setGameState((prev) => ({
        ...prev,
        status: "CREATING_GAME",
      }));
    }
    if (searchParams.get("type") === "join") {
      setGameState((prev) => ({
        ...prev,
        status: "JOINING_GAME",
      }));
    }
  };

  const updateChat = (type: any, payload: any) => {
    const newChatItem: Chat = {
      type: type === "CHAT_MESSAGE" ? "MESSAGE" : "EVENT",
      content: payload.message,
      userId: payload.userId,
    };
    setChats((prev) => [...prev, newChatItem]);
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
      updateChat(type, payload);
    }
    if (type === "CHAT_MESSAGE") {
      updateChat(type, payload);
    }

    if (type === "PLAYER_GAME_FINISHED") {
      setIsPlayerGameOver(true);
    }
  };
  const { sendMessage } = useWebSocket("ws://localhost:8080", onMessage);

  if (gameState.status === "CREATING_GAME") {
    return (
      <GameContainer>
        <CreateGame sendMessage={sendMessage} />
      </GameContainer>
    );
  }

  if (gameState.status === "JOINING_GAME") {
    return (
      <GameContainer>
        <JoinGame sendMessage={sendMessage} />
      </GameContainer>
    );
  }

  if (gameState.status === "WAITING_TO_START" || gameState.status === "GAME_IN_PROGRESS") {
    return (
      <GameContainer>
        <TimerContextProvider>
          <GameRoom sendMessage={sendMessage} />
          <GameSidebar sendMessage={sendMessage} />
        </TimerContextProvider>
      </GameContainer>
    );
  }
};

export default Game;
