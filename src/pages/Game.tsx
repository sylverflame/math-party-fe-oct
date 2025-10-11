import { useUser } from "@/contexts/UserContext";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

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
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const socket = useMemo(() => new WebSocket("ws://localhost:8080"), []);
  const { userId } = user;
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
    socket.addEventListener("open", onSocketOpen);
    socket.addEventListener("close", onSocketClose);
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("open", onSocketOpen);
      socket.removeEventListener("close", onSocketClose);
      socket.removeEventListener("message", onMessage);
      socket.close();
    };
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
    socket.send(
      JSON.stringify({
        type: "AUTHENTICATE_USER",
        payload: {
          userId,
          token: "abc",
        },
      })
    );
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
    if (type === "GAME_CREATED" || type === "PLAYER_JOINED" || type === "PLAYER_LEFT") {
      if (payload.message) {
        toast.success(type, {
          description: payload.message,
        });
      }
      setGameState({ ...payload.gameState });
    }
  };

  if (gameState.status === "CREATING_GAME") {
    return <CreateGame socket={socket} />;
  }

  if (gameState.status === "JOINING_GAME") {
    return <JoinGame socket={socket} />;
  }

  if (gameState.status === "WAITING_TO_START" || gameState.status === "GAME_STARTED") {
    return (
      <>
        <Label>Room Code</Label>
        <div>{gameState.roomCode}</div>
        <div>
          <Label>Players</Label>
          {gameState.players.map((player: any) => {
            return (
              <div key={player.userId}>
                {player.userId} - {player.totalScore}
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default Game;
