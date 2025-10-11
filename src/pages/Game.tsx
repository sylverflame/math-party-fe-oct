import { useUser } from "@/contexts/UserContext";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

type GameState = {
  status: "NONE" | "CREATING_GAME" | "WAITING_TO_START" | "JOINING_GAME" | "GAME_STARTED";
  current?: {
    roomCode?: string;
    // settings: any;
    // isMultiplayer: boolean;
    // isPrivateGame: boolean;
    host?: string;
    players?: any;
  };
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

  useEffect(() => {
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
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          type: "AUTHENTICATE_USER",
          payload: {
            userId,
            token: "abc",
          },
        })
      );
    });

    socket.addEventListener("close", () => {
      console.log("Connection closed");
    });

    socket.addEventListener("message", (event) => {
      const jsonData = JSON.parse(event.data);
      const { type, payload } = jsonData;
      if (type === "ERROR") {
        toast.error(type, { description: payload.message });
      }
      if (type === "GAME_CREATED" || type === "PLAYER_JOINED") {
        if (payload.message) {
          toast.success(type, {
            description: payload.message,
          });
        }
        setGameState((prev) => ({
          ...prev,
          status: "WAITING_TO_START",
          current: payload.gameState,
        }));
      }

      if (type === "PLAYER_LEFT") {
        if (payload.message) {
          toast.error(type, {
            description: payload.message,
          });
        }
        setGameState((prev) => ({
          ...prev,
          current: payload.gameState,
        }));
      }
    });

    return () => {
      socket.close();
    };
  }, []);

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
        <div>{gameState.current?.roomCode}</div>
        <div>
          <Label>Players</Label>
          {gameState.current?.players.map((player: any) => {
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
