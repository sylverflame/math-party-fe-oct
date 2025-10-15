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
    <div className="join-game">
      <form onSubmit={(e) => onJoinGame(e)}>
        <Input placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
        <Button type="submit">Join Game</Button>
      </form>
    </div>
  );
};

export default JoinGame;
