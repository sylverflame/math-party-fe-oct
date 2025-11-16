import { useDevice } from "@/contexts/DeviceContext";
import { useGame } from "@/contexts/GameContext";
import { ScreenSizes } from "@/types";
import { useRef } from "react";
import { toast } from "sonner";

const RoomCode = () => {
  const { gameState } = useGame();
  const { screenWidth } = useDevice();
  const roomCodeRef = useRef<HTMLDivElement>(null);

  const onClick = async () => {
    if (!roomCodeRef.current) {
      return;
    }
    await navigator.clipboard.writeText(roomCodeRef.current.innerText);
    toast.success("Copied to clipboard!", {
      duration: 500,
    });
  };

  if (screenWidth < ScreenSizes.MEDIUM) {
    return <h6 onClick={onClick} className="uppercase text-xs font-extralight text-muted-foreground">Roomcode - {gameState.roomCode}</h6>;
  }

  if (screenWidth >= ScreenSizes.MEDIUM) {
    return (
      <>
        <h6 className="text-card-foreground font-bold mb-2">{"Room Code"}</h6>
        <div ref={roomCodeRef} className="text-muted-foreground border-2 rounded-xl border-border text-2xl p-2 cursor-pointer flex justify-center" onClick={onClick}>
          {gameState.roomCode}
        </div>
      </>
    );
  }
};

export default RoomCode;
