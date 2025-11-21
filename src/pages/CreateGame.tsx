import type { GameSettingForm } from "@/components/GameSettings";
import GameSettings from "@/components/GameSettings";
import { Button } from "@/components/ui/button";
import type { ClientMessageType } from "@/hooks/useWebSocket";
import { useForm, type SubmitHandler } from "react-hook-form";

type CreateGameProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
};

const CreateGame = ({ sendMessage }: CreateGameProps) => {
  const { register, handleSubmit } = useForm<GameSettingForm>({
    defaultValues:{
      totalRounds: 10
    }
  });

  const onCreateGame: SubmitHandler<GameSettingForm> = (data) => {
    const { totalRounds, timePerRound, difficulty, isPrivateGame } = data;
    sendMessage("CREATE_GAME", {
      settings: {
        totalRounds,
        timePerRound,
        isMultiplayer: true,
        isPrivateGame,
        difficulty,
      },
    });
  };

  return (
    <form className="w-[250px] fade-in" onSubmit={handleSubmit(onCreateGame)}>
      <h6 className="text-xl font-bold mb-2 text-card-foreground">{"Create Game"}</h6>
      <GameSettings register={register} />
      <Button type="submit" className="mt-6">
        {"Create Game"}
      </Button>
    </form>
  );
};

export default CreateGame;
