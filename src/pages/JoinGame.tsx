import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useState } from "react";
import { toast } from "sonner";

type JoinGameProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
};

const JoinGame = ({ sendMessage }: JoinGameProps) => {
  const [roomCode, setRoomCode] = useState("");
  const onJoinGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomCode.length !== 5) {
      toast.error("Invalid room code!");
      return;
    }
    sendMessage("JOIN_ROOM", {
      roomCode,
    });
  };
  return (
    <form onSubmit={(e) => onJoinGame(e)} className="fade-in">
      <Input placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} maxLength={5}/>
      <Button type="submit" className="mt-4">
        Join Game
      </Button>
    </form>
  );
};

export default JoinGame;
