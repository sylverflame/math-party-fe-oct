import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ClientMessageType } from "@/hooks/useWebSocket";
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
      <form className="w-[250px] fade-in"onSubmit={handleSubmit(onCreateGame)}>
        <h6 className="text-xl font-bold mb-2 text-card-foreground">{"Create Game"}</h6>
        <div className="flex gap-2 justify-between py-1 text-muted-foreground">
          <Label htmlFor="totalRounds">{"Total Rounds"}</Label>
          <select {...register("totalRounds")}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex gap-2 justify-between py-1 text-muted-foreground">
          <Label htmlFor="timePerRound">{"Time per Round"}</Label>
          <select {...register("timePerRound")}>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex gap-2 justify-between py-1 text-muted-foreground">
          <Label htmlFor="difficulty">{"Difficulty"}</Label>
          <select {...register("difficulty")}>
            <option value={"Easy"}>{"Easy"}</option>
            <option value={"Medium"}>{"Medium"}</option>
            <option value={"Hard"}>{"Hard"}</option>
            <option value={"Crazy"}>{"Crazy"}</option>
          </select>
        </div>
        <div className="flex gap-2 justify-between py-2 text-muted-foreground">
            <Label htmlFor="private-game">{"Private Game"}</Label>
            <input className="scale-120 cursor-pointer" type="checkbox" id="private-game" {...register("isPrivateGame")} />
        </div>
        <Button type="submit" className="mt-6">{"Create Game"}</Button>
      </form>
  );
};

export default CreateGame;
