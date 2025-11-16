import CopyIcon from "@/assets/copy.svg?react";
import { useDevice } from "@/contexts/DeviceContext";
import { useGame } from "@/contexts/GameContext";
import { ScreenSizes } from "@/types";
import { useRef } from "react";
import { toast } from "sonner";

const RoomCode = () => {
  const { gameState } = useGame();
  const { screenWidth } = useDevice();
  const roomCodeRef = useRef<HTMLDivElement>(null);

  const onClickRoomCode = async () => {
    if (!roomCodeRef.current) {
      return;
    }
    await navigator.clipboard.writeText(roomCodeRef.current.innerText);
    toast.success("Copied to clipboard!", {
      duration: 500,
    });
  };

  if (screenWidth < ScreenSizes.MEDIUM) {
    return (
      <div ref={roomCodeRef} onClick={onClickRoomCode} className="uppercase text-xs font-semibold text-foreground flex gap-2 items-center">
        {gameState.roomCode}
        <CopyIcon className="size-4 text-foreground" />
      </div>
    );
  }

  if (screenWidth >= ScreenSizes.MEDIUM) {
    return (
      <>
        <h6 className="text-card-foreground font-bold mb-2">{"Room Code"}</h6>
        <div ref={roomCodeRef} onClick={onClickRoomCode} className="text-muted-foreground border-2 rounded-xl border-border text-2xl p-2 cursor-pointer flex justify-center items-center gap-4">
          {gameState.roomCode}
          <CopyIcon className="size-6 text-muted-foreground opacity-50" />
        </div>
      </>
    );
  }
};

export default RoomCode;
