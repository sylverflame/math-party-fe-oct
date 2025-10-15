import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTimerContext } from "@/contexts/TimerContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebsocket";
import type { GameRound } from "@/types";
import { useState } from "react";

type GameRoomProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
  gameState: any;
  setGameState: any;
  currentRound: GameRound | null;
  isPlayerGameOver: boolean;
};

const operators = {
  Add: "+",
  Subtract: "-",
  Multiply: "x",
  Divide: "/",
};

const GameRoom = ({ sendMessage, gameState, currentRound, isPlayerGameOver }: GameRoomProps) => {
  const {
    user: { userId },
  } = useUser();
  const { elapsedTimeInContext: elapsedTime } = useTimerContext();
  const [isSolutionValid, setIsSolutionValid] = useState(false);
  const [answerField, setAnswerField] = useState("");

  const onClickGameStart = () => {
    sendMessage("START_GAME", {
      roomCode: gameState.roomCode,
    });
  };

  const onSolutionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswerField("");
    sendMessage("SOLUTION_SUBMIT", {
      roomCode: gameState.roomCode,
      round: currentRound?.roundNumber,
      score: elapsedTime,
    });
  };
  return (
    <>
      <Label>{"Room Code"}</Label>
      <div>{gameState.roomCode}</div>
      <div>
        <Label>{"Players"}</Label>
        {gameState.players.map((player: any) => {
          return (
            <div key={player.userId}>
              {player.userId}
              {player.userId === gameState.host && <span className="inline-flex text-green-600 rounded border-1 border-green-600 px-1 font text-[8px] align-middle mx-0.5">{"Host"}</span>} -{" "}
              {player.totalScore}
            </div>
          );
        })}
      </div>
      {gameState.status === "WAITING_TO_START" && userId === gameState.host && <Button onClick={onClickGameStart}>{"Start Game"}</Button>}
      {gameState.status === "GAME_IN_PROGRESS" && currentRound && !isPlayerGameOver && (
        <>
          <Timer />
          <form className="expression-container" onSubmit={onSolutionSubmit}>
            <div className="expression">{`Expression - ${currentRound.firstNumber} ${operators[currentRound.operator]} ${currentRound.secondNumber}`}</div>
            <Input type="number" value={answerField} onChange={(e) => setAnswerField(e.target.value)} />
            <Button type="submit">{"Submit"}</Button>
          </form>
        </>
      )}
    </>
  );
};

export default GameRoom;
