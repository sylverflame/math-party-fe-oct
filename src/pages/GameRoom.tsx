import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { useTimerContext } from "@/contexts/TimerContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import type { Operator } from "@/types";
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
  const [answerField, setAnswerField] = useState("");

  const onClickGameStart = () => {
    sendMessage("START_GAME", {
      roomCode: gameState.roomCode,
    });
  };
  const onClickGameRestart = () => {
    sendMessage("RESTART_GAME", {
      roomCode: gameState.roomCode,
    });
  };

  const getSolution = (firstNumber: number, secondNumber: number, operator: Operator): number | null => {
    switch (operator) {
      case "Add":
        return firstNumber + secondNumber;
      case "Subtract":
        return firstNumber - secondNumber;
      case "Divide":
        return firstNumber / secondNumber;
      case "Multiply":
        return firstNumber * secondNumber;
      default:
        return null;
    }
  };

  const isSolutionValid = (answer: string): boolean => {
    if (!currentRound) return false;
    const { firstNumber, secondNumber, operator } = currentRound;
    const answerNum = parseInt(answer);
    const solution = getSolution(firstNumber, secondNumber, operator);
    if (answerNum !== solution) return false;
    return true;
  };

  const onSolutionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswerField("");
    if (!isSolutionValid(answerField)) {
      sendMessage("PENALTY", {
        roomCode: gameState.roomCode,
      });
      return;
    }
    sendMessage("SOLUTION_SUBMIT", {
      roomCode: gameState.roomCode,
      round: currentRound?.roundNumber,
      score: elapsedTime,
    });
  };

  // TODO: Copy room code
  // const copyRoomCode = () => {};
  return (
    <div className="w-[100%] lg:w-[60%] border h-full rounded-lg flex flex-col items-center p-4 fade-in">
      {gameState.status === "GAME_IN_PROGRESS" && currentRound && !isPlayerGameOver && (
        <>
          <div className="w-full flex justify-between font-bold text-lg text-card-foreground">
            <div>
              Current Round <span className="bg-accent px-3 py-1 rounded-4xl">{gameState.players.find((player: any) => player.userId === userId).currentRound}</span>
            </div>
            <Timer className="font-bold text-lg text-card-foreground self-center" />
            <div>
              Penalties <span className="bg-red-600 px-3 py-1 rounded-4xl">{gameState.players.find((player: any) => player.userId === userId).penalties}</span>
            </div>
          </div>
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
      {gameState.status === "WAITING_TO_START" && (
        <>
          <div className="text-3xl my-4 text-muted-foreground h-[50%]">{"Waiting for host to start"}</div>
          {userId === gameState.host && <Button onClick={onClickGameStart}>{"Start Game"}</Button>}
        </>
      )}
      {gameState.status === "GAME_OVER" && (
        <>
          <div className="text-3xl my-4 text-muted-foreground h-[50%]">{"Waiting for host to restart the game"}</div>
          {userId === gameState.host && <Button onClick={onClickGameRestart}>{"Restart Game"}</Button>}
        </>
      )}
      {gameState.status !== "GAME_OVER" && isPlayerGameOver && <div className="text-3xl my-4 text-muted-foreground h-[50%]">{"Waiting for other players to finish"}</div>}
    </div>
  );
};

export default GameRoom;
