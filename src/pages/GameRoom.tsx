import GameInfoWidget from "@/components/GameInfoWidget";
import GameInProgress from "@/components/GameInProgress";
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import UpdateSettings from "@/components/UpdateSettings";
import WaitingScreen from "@/components/WaitingScreen";
import { useGame } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

type GameRoomProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
  onClickChatIcon: () => void;
};

const GameRoom = ({ sendMessage, onClickChatIcon }: GameRoomProps) => {
  const {
    user: { userId },
  } = useUser();
  const {
    gameState: { roomCode, status, host },
    currentRound,
    isPlayerGameOver,
  } = useGame();

  const [showUpdateSettings, setShowUpdateSettings] = useState(false);

  const onClickGameStart = () => {
    sendMessage("START_GAME", {
      roomCode,
    });
  };
  const onClickGameRestart = () => {
    sendMessage("RESTART_GAME", {
      roomCode,
    });
  };

  const onSubmitScore = () => {};

  return (
    <div className="game-room w-[100%] md:w-[60%] lg:w-[70%] border h-full rounded-xl flex flex-col items-center p-4 fade-in relative">
      <GameInfoWidget onClickChatIcon={onClickChatIcon} />
      {status === "WAITING_TO_START" && (
        <WaitingScreen
          title={"Game Starting"}
          description={"Waiting for host to start."}
          content={[
            showUpdateSettings && <UpdateSettings sendMessage={sendMessage} setShowUpdateSettings={setShowUpdateSettings} allowUpdate={userId === host} />,
            !showUpdateSettings && (
              <div className="flex flex-col gap-2">
                <Button variant="secondary" onClick={() => setShowUpdateSettings(true)}>
                  <IoSettingsOutline className="size-5" />
                  {"Game Settings"}
                </Button>
                {userId === host && <Button onClick={onClickGameStart}>{"Start Game"}</Button>}
              </div>
            ),
          ]}
          showSpinner={true}
        />
      )}
      {status === "GAME_IN_PROGRESS" && currentRound && !isPlayerGameOver && <GameInProgress sendMessage={sendMessage} />}
      {status !== "GAME_OVER" && isPlayerGameOver && <WaitingScreen title={"Game in Progress"} description={"Waiting for other players to finish."} showSpinner={true} />}
      {status === "GAME_OVER" && (
        <WaitingScreen
          title={"Game Over"}
          description={"Waiting for host to restart the game."}
          content={[
            <Results />,
            <div className="flex gap-4">
              {<Button onClick={onSubmitScore}>{"Submit Score"}</Button>}
              {userId === host && (
                <Button variant={"outline"} onClick={onClickGameRestart}>
                  {"Restart Game"}
                </Button>
              )}
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default GameRoom;
