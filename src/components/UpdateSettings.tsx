import { useForm, type SubmitHandler } from "react-hook-form";
import type { GameSettingForm } from "./GameSettings";
import { Button } from "./ui/button";
import GameSettings from "./GameSettings";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useGame } from "@/contexts/GameContext";

interface IUpdateSettings {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
  setShowUpdateSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSettings = ({ sendMessage, setShowUpdateSettings }: IUpdateSettings) => {
  const {
    gameState: { settings, roomCode },
  } = useGame();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<GameSettingForm>({
    defaultValues: settings,
  });
  const onUpdateSettings: SubmitHandler<GameSettingForm> = (data) => {
    const { totalRounds, timePerRound, difficulty, isPrivateGame } = data;
    sendMessage("UPDATE_GAME_SETTINGS", {
      roomCode,
      settings: {
        totalRounds,
        timePerRound,
        isMultiplayer: true,
        isPrivateGame,
        difficulty,
      },
    });
    setShowUpdateSettings(false)
  };
  return (
    <form className="flex flex-col w-[80%]" onSubmit={handleSubmit(onUpdateSettings)}>
      <GameSettings register={register} />
      <div className="flex gap-2 mt-4">
        <Button type="button" variant={"secondary"} onClick={() => setShowUpdateSettings(false)}>
          {"Close"}
        </Button>
        <Button disabled={!isDirty} type="submit">
          {"Update"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateSettings;
