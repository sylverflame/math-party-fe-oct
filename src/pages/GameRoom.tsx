import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { useTimerContext } from "@/contexts/TimerContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useState } from "react";

type GameRoomProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
};

const operators = {
  Add: "+",
  Subtract: "-",
  Multiply: "x",
  Divide: "/",
};

const GameRoom = ({ sendMessage }: GameRoomProps) => {
  const {
    user: { userId },
  } = useUser();
  const { gameState, currentRound, isPlayerGameOver } = useGame();
  const { elapsedTimeInContext: elapsedTime } = useTimerContext();
  // TODO: Implment solution checking logic
  // const [isSolutionValid, setIsSolutionValid] = useState(false);
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

  // TODO: Copy room code
  // const copyRoomCode = () => {};
  return (
    <div className="w-[100%] lg:w-[60%] border h-full rounded-2xl flex flex-col items-center p-4 fade-in">
      {gameState.status === "GAME_IN_PROGRESS" && currentRound && !isPlayerGameOver && (
        <>
          <Timer className="font-bold text-lg text-card-foreground self-center" />
          <form className="expression-container flex flex-col items-center" onSubmit={onSolutionSubmit}>
            <div className="expression text-card-foreground text-6xl font-extrabold my-8">{`${currentRound.firstNumber} ${operators[currentRound.operator]} ${currentRound.secondNumber}`}</div>
            <div className="flex items-center rounded-lg overflow-hidden border">
              <Input className="border-none rounded-[0px]" type="number" name="solution-field" id="solution-field" value={answerField} onChange={(e) => setAnswerField(e.target.value)} />
              <Button type="submit" className="text-2xl font-extrabold rounded-none">
                {"→"}
              </Button>
            </div>
          </form>
        </>
      )}
      {gameState.status === "WAITING_TO_START" && <div className="text-3xl my-4 text-muted-foreground h-[50%]">{"Waiting for host to start"}</div>}
      {gameState.status === "WAITING_TO_START" && userId === gameState.host && <Button onClick={onClickGameStart}>{"Start Game"}</Button>}
    </div>
  );
};

export default GameRoom;
