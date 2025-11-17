import { OPERATORS } from "@/config/constants";
import { useCountdownContext } from "@/contexts/CountdownContext";
import { useGame } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { animate, getSolution } from "@/lib/utils";
import { useRef, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { useDevice } from "@/contexts/DeviceContext";
import { ScreenSizes } from "@/types";

import Keypad from "./Keypad";
import KeypadIcon from "@/assets/dial-keypad.svg?react";

interface IGameInProgress {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
}

const GameInProgress = ({ sendMessage }: IGameInProgress) => {
  const { gameState, currentRound } = useGame();
  const {
    user: { userId },
  } = useUser();
  const { countdownTimeInContext: countdownTime, showCountdownTimer: showTimer, setShowCountdownTimer: setShowTimer } = useCountdownContext();
  const { screenWidth, isTouchDevice } = useDevice();
  const [answerField, setAnswerField] = useState("");
  const [showKeypad, setShowKeypad] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const penaltiesRef = useRef<HTMLDivElement>(null);

  const onTimedout = () => {
    if (!showTimer) return;
    onWrongSolution("NO_ANSWER");
    setShowTimer(false);
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
    if (!showTimer) return;
    if (!answerField) {
      return;
    }
    if (!isSolutionValid(answerField)) {
      onWrongSolution("PENALTY");
      return;
    }
    onCorrectSolution();
  };

  const onCorrectSolution = () => {
    sendMessage("SOLUTION_SUBMIT", {
      roomCode: gameState.roomCode,
      round: currentRound?.roundNumber,
      elapsedTime: gameState.timePerRound * 1000 - countdownTime!, // Pass the elaspsed time in the round
    });
    setAnswerField("");
    setShowTimer(false);
  };

  const onWrongSolution = (type: "PENALTY" | "NO_ANSWER") => {
    sendMessage(type, {
      roomCode: gameState.roomCode,
      round: type === "NO_ANSWER" && currentRound?.roundNumber,
    });
    setAnswerField("");
    animate(penaltiesRef, "fall-in");
  };

  // Submit answer without pressing enter
  const onChangeAnswerField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // showTimer is made false when solution is submitted, enabled when next round is recieved. Hence just return if showTimer is false.
    if (!showTimer) return;
    const fieldValue = e.target.value;
    setAnswerField(fieldValue);
    if (isSolutionValid(fieldValue)) {
      onCorrectSolution();
      inputRef.current?.focus();
    }
  };

  const onKeypadNumberPressed = (number: number) => {
    setAnswerField((prev) => prev + number);
    if (isSolutionValid(answerField + number)) {
      onCorrectSolution();
    }
  };

  const onKeypadBackspace = () => {
    setAnswerField((prev) => prev.slice(0, prev.length - 1));
  };

  if (!currentRound) {
    return null;
  }
  return (
    <>
      <div className="w-full flex flex-col items-end md:flex-row md:items-center justify-between font-bold text-lg text-card-foreground gap-2">
        <div className="flex gap-2 items-center text-sm md:text-lg">
          Round <div className="bg-accent size-7 md:size-9 rounded-full flex items-center justify-center">{gameState.players.find((player: any) => player.userId === userId).currentRound}</div>
        </div>
        <div className="flex gap-2 items-center text-sm md:text-lg">
          Penalties
          <div ref={penaltiesRef} className="bg-red-300 dark:bg-red-800 size-7 md:size-9 rounded-full flex items-center justify-center">
            {gameState.players.find((player: any) => player.userId === userId).penalties}
          </div>
        </div>
      </div>
      <form className="expression-container flex flex-col items-center relative" onSubmit={onSolutionSubmit}>
        <div className="expression text-card-foreground text-[calc(2.5rem+3vw)] font-extrabold my-8">{`${currentRound.firstNumber} ${OPERATORS[currentRound.operator]} ${
          currentRound.secondNumber
        }`}</div>
        <div className="flex items-center rounded-lg overflow-hidden border w-full">
          <Input autoFocus={!isTouchDevice} ref={inputRef} className="border-none rounded-[0px]" type="number" name="solution-field" id="solution-field" value={answerField} onChange={onChangeAnswerField} />
          <Button disabled={!showTimer} type="submit" className="text-2xl font-extrabold rounded-none">
            {showTimer ? "→" : <Spinner />}
          </Button>
        </div>
        {showTimer && <CountdownTimer className="absolute -bottom-2 left-0" startTime={gameState.timePerRound} onTimedout={onTimedout} />}
      </form>
      {screenWidth >= ScreenSizes.MEDIUM && !showKeypad && (
        <Button className="mt-5" variant="outline" onClick={() => setShowKeypad(true)}>
          <KeypadIcon className="dark:invert size-4"/>
          {"Show Keypad"}
        </Button>
      )}
      {(screenWidth < ScreenSizes.MEDIUM || showKeypad) && <Keypad onNumberPressed={onKeypadNumberPressed} onBackspace={onKeypadBackspace} />}
    </>
  );
};

export default GameInProgress;
