import GameContainer from "@/components/GameContainer";
import GameSidebar from "@/components/GameSidebar";
import { useChat, type Chat } from "@/contexts/ChatContext";
import { useCountdownContext } from "@/contexts/CountdownContext";
import { useGame } from "@/contexts/GameContext";
import { TimerContextProvider } from "@/contexts/TimerContext";
import { useUser } from "@/contexts/UserContext";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import CreateGame from "./CreateGame";
import GameRoom from "./GameRoom";
import JoinGame from "./JoinGame";

const Game = () => {
  const [searchParams] = useSearchParams();
  const { setGameState, setCurrentRound, setIsPlayerGameOver, gameState } = useGame();
  const { setChats, setShowNewChatIndicator } = useChat();
  const { setShowCountdownTimer: showTimer } = useCountdownContext();
  const {
    user: { userId: loggedUserId },
  } = useUser();

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
    const isMessage = type === "CHAT_MESSAGE"
    const newChatItem: Chat = {
      type: isMessage ? "MESSAGE" : "EVENT",
      content: payload.message,
      userId: payload.userId,
    };
    setChats((prev) => [...prev, newChatItem]);
    if (isMessage && newChatItem.userId !== loggedUserId) {
      setShowNewChatIndicator(true);
    }
  };

  const onMessage = (event: MessageEvent<any>) => {
    const jsonData = JSON.parse(event.data);
    const { type, payload } = jsonData;
    if (type === "ERROR") return toast.error(type, { description: payload.message });
    if (type === "CHAT_MESSAGE") return updateChat(type, payload);
    if (type === "PLAYER_GAME_FINISHED") return setIsPlayerGameOver(true);
    if (type === "GAME_RESTARTED") {
      setIsPlayerGameOver(false);
    }

    const allowedTypes = ["GAME_CREATED", "PLAYER_JOINED", "PLAYER_LEFT", "GAME_STARTED", "NEXT_ROUND", "STATE_UPDATED", "GAME_OVER", "GAME_RESTARTED"];
    if (allowedTypes.includes(type)) {
      if (payload.message) {
        toast.success("", {
          description: payload.message,
        });
      }
      if (payload.round) {
        setCurrentRound(payload.round);
        showTimer(true)
      }
      if (payload.gameState) {
        setGameState({ ...payload.gameState });
      }
      updateChat(type, payload);
    }
  };
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WS_SERVER, onMessage);

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

  if (gameState.status === "WAITING_TO_START" || gameState.status === "GAME_IN_PROGRESS" || gameState.status === "GAME_OVER") {
    return (
      <GameContainer>
        <TimerContextProvider>
            <GameSidebar sendMessage={sendMessage} />
            <GameRoom sendMessage={sendMessage} />
        </TimerContextProvider>
      </GameContainer>
    );
  }
};

export default Game;
