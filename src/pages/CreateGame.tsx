import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";

type CreateGameForm = {
  totalRounds: number;
  timePerRound: number;
  isMultiplayer: boolean;
  isPrivateGame: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Crazy";
};

type CreateGameProps = {
  socket: WebSocket;
};

const CreateGame = ({ socket }: CreateGameProps) => {
  const { register, handleSubmit } = useForm<CreateGameForm>();

  const onSubmit: SubmitHandler<CreateGameForm> = (data) => {
    const { totalRounds, timePerRound, difficulty, isPrivateGame } = data;

    socket.send(
      JSON.stringify({
        type: "CREATE_GAME",
        payload: {
          settings: {
            totalRounds,
            timePerRound,
            isMultiplayer: true,
            isPrivateGame,
            difficulty,
          },
        },
      })
    );
  };

  return (
    <div className="create-game-page p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
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


export default CreateGame
