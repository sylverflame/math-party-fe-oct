import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type JoinGameProps = {
  socket: WebSocket;
};

const JoinGame = ({ socket }: JoinGameProps) => {
  const [roomCode, setRoomCode] = useState("");
  const onClickJoinGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        payload: {
          roomCode,
        },
      })
    );
  };
  return (
    <div className="join-game">
      <form onSubmit={(e) => onClickJoinGame(e)}>
        <Input placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
        <Button type="submit">Join Game</Button>
      </form>
    </div>
  );
};

export default JoinGame;
