import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useState } from "react";

type JoinGameProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
};

const JoinGame = ({ sendMessage }: JoinGameProps) => {
  const [roomCode, setRoomCode] = useState("");
  const onJoinGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage("JOIN_ROOM", {
      roomCode,
    });
  };
  return (
    <form onSubmit={(e) => onJoinGame(e)}>
      <Input placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
      <Button type="submit" className="mt-4">
        Join Game
      </Button>
    </form>
  );
};

export default JoinGame;
