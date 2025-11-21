import type { UseFormRegister } from "react-hook-form";
import { Label } from "./ui/label";

export type GameSettingForm = {
  totalRounds: number;
  timePerRound: number;
  isMultiplayer: boolean;
  isPrivateGame: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Crazy";
};

interface IGameSettings {
  register: UseFormRegister<GameSettingForm>;
}
const GameSettings = ({ register }: IGameSettings) => {
  return (
    <>
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
          <option value={5}>5</option>
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
    </>
  );
};

export default GameSettings
