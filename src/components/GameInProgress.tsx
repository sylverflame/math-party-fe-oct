import { useGame } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CountdownTimer from "./CountdownTimer";
import { useEffect, useRef, useState } from "react";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useCountdownContext } from "@/contexts/CountdownContext";
import type { Operator } from "@/types";
import { eventEmitter } from "@/main";
import { AppEvents } from "@/types/events";

interface IGameInProgress {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const operators = {
  Add: "+",
  Subtract: "-",
  Multiply: "x",
  Divide: "/",
};

const GameInProgress = ({ sendMessage }: IGameInProgress) => {
  const { gameState, currentRound } = useGame();
  const {
    user: { userId },
  } = useUser();
  const { countdownTimeInContext: countdownTime } = useCountdownContext();
  const [answerField, setAnswerField] = useState("");
  const countDownRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    eventEmitter.on(AppEvents.NEXT_ROUND_RECIEVED, () => {
      countDownRef.current += 1;
    });

    return () => {
      eventEmitter.removeListener(AppEvents.NEXT_ROUND_RECIEVED);
    };
  }, []);

  const onTimedout = () => {
    sendMessage("NO_ANSWER", {
      roomCode: gameState.roomCode,
      round: currentRound?.roundNumber,
    });
    setAnswerField("");
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

  // Submit answer when enter is pressed
  const onSolutionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
    if (!answerField) {
      return;
    }
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
      elapsedTime: gameState.timePerRound * 1000 - countdownTime!, // Pass the elaspsed time in the round
    });
  };

  // Submit answer without pressing enter
  const onChangeAnswerField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAnswerField(e.target.value);
    if (isSolutionValid(e.target.value)) {
      sendMessage("SOLUTION_SUBMIT", {
        roomCode: gameState.roomCode,
        round: currentRound?.roundNumber,
        elapsedTime: gameState.timePerRound * 1000 - countdownTime!, // Pass the elaspsed time in the round
      });
      setAnswerField("");
    }
  };

  if (!currentRound) {
    return null;
  }
  return (
    <>
      <div className="w-full flex justify-between font-bold text-lg text-card-foreground relative">
        <div>
          Round <span className="bg-accent px-3 py-1 rounded-4xl">{gameState.players.find((player: any) => player.userId === userId).currentRound}</span>
        </div>
        <div>
          Penalties <span className="bg-red-300 px-3 py-1 rounded-4xl dark:bg-red-800">{gameState.players.find((player: any) => player.userId === userId).penalties}</span>
        </div>
      </div>
      <form className="expression-container flex flex-col items-center relative" onSubmit={onSolutionSubmit}>
        <div className="expression text-card-foreground text-[calc(2rem+3vw)] font-extrabold my-8">{`${currentRound.firstNumber} ${operators[currentRound.operator]} ${
          currentRound.secondNumber
        }`}</div>
        <div className="flex items-center rounded-lg overflow-hidden border w-full">
          <Input
            autoFocus
            ref={inputRef}
            className="border-none rounded-[0px]"
            type="number"
            name="solution-field"
            id="solution-field"
            value={answerField}
            onChange={onChangeAnswerField}
          />
          <Button type="submit" className="text-2xl font-extrabold rounded-none">
            {"→"}
          </Button>
        </div>
        <CountdownTimer className="absolute -bottom-2 left-0" startTime={gameState.timePerRound} key={countDownRef.current} onTimedout={onTimedout} />
      </form>
    </>
  );
};

export default GameInProgress;
