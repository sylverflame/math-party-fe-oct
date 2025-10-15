import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClientMessageType } from "@/hooks/useWebsocket";
import { useForm, type SubmitHandler } from "react-hook-form";

type CreateGameForm = {
  totalRounds: number;
  timePerRound: number;
  isMultiplayer: boolean;
  isPrivateGame: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Crazy";
};

type CreateGameProps = {
  sendMessage: (type: ClientMessageType, payload: Record<string, any>) => void;
};

const CreateGame = ({ sendMessage }: CreateGameProps) => {
  const { register, handleSubmit } = useForm<CreateGameForm>();

  const onCreateGame: SubmitHandler<CreateGameForm> = (data) => {
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
    <div className="create-game-page p-4">
      <form onSubmit={handleSubmit(onCreateGame)}>
        <div>
          <Label htmlFor="totalRounds">Total Rounds</Label>
          <select {...register("totalRounds")}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          <Label htmlFor="timePerRound">Time per Round</Label>
          <select {...register("timePerRound")}>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <select {...register("difficulty")}>
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
          </select>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Input type="checkbox" id="private-game" {...register("isPrivateGame")} />
            <Label htmlFor="private-game">Private Game</Label>
          </div>
        </div>
        <Button type="submit">Create Game</Button>
      </form>
    </div>
  );
};

export default CreateGame;
