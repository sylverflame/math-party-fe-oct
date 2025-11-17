import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { toast } from "sonner";
import { BsDoorOpen } from "react-icons/bs";

interface IRoomCode {
  className?: string;
  showIcon?: boolean;
}
const RoomCode = ({ showIcon = true, className }: IRoomCode) => {
  const { gameState } = useGame();
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

  return (
    <div ref={roomCodeRef} onClick={onClickRoomCode} className={cn("uppercase text-sm font-semibold text-foreground flex gap-2 items-center", className)}>
        {showIcon && <BsDoorOpen className="size-5" />}
        {gameState.roomCode}
    </div>
  );
};

export default RoomCode;
