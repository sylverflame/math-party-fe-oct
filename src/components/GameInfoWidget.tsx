import { Button } from "./ui/button";
import ChatIcon from "@/assets/chat.svg?react";
import PlayerIcon from "@/assets/player.svg?react";
import NewChatIndicator from "@/components/NewChatIndicator";
import PlayerCountIndicator from "@/components/PlayerCountIndicator";
import RoomCode from "./RoomCode";
import { useGame } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import { MAX_SCORE } from "@/config/constants";
import Scorebar from "./Scorebar";

interface IGameInfoWidget {
  onClickChatIcon: () => void;
}

const GameInfoWidget = ({ onClickChatIcon }: IGameInfoWidget) => {
  return (
    <Button className="md:hidden absolute top-4 left-4 fade-in flex gap-2 items-center justify-center bg-muted text-foreground py-6" onClick={onClickChatIcon}>
      <PlayerIconWithIndicator />
      <ChatIconWithIndicator />
      <RoomCode />
      <PlayerScoreWithScorebar />
    </Button>
  );
};

const PlayerIconWithIndicator = () => {
  return (
    <div className="player-icon relative">
      <PlayerIcon className="size-6" />
      <PlayerCountIndicator className="absolute top-0 -left-1" />
    </div>
  );
};
const ChatIconWithIndicator = () => {
  return (
    <div className="chat-icon relative">
      <ChatIcon className="size-7" />
      <NewChatIndicator className="absolute top-0 -left-1" />
    </div>
  );
};

const PlayerScoreWithScorebar = () => {
  const {
    gameState: { players },
  } = useGame();
  const {
    user: { userId },
  } = useUser();
  return (
    <>
      {players
        .filter((player: any) => player.userId === userId)
        .map((player: any) => (
          <Scorebar key={player.userId} value={player.totalScore} maximum={MAX_SCORE} className="left-0 bottom-0" />
        ))}
    </>
  );
};

export default GameInfoWidget;
