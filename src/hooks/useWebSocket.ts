import { useUser } from "@/contexts/UserContext";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

// Web scoket message schemas
const ClientMessageTypeSchema = z.enum(["AUTHENTICATE_USER", "CREATE_GAME", "JOIN_ROOM", "LEAVE_ROOM", "START_GAME", "SOLUTION_SUBMIT", "MESSAGE", "SEND_CHAT_MESSAGE", "PENALTY", "RESTART_GAME", "NO_ANSWER"]);
export const ClientMessageSchema = z.object({
  type: ClientMessageTypeSchema,
  payload: z.any(),
});

export type ClientMessageType = z.infer<typeof ClientMessageTypeSchema>;

const useWebSocket = (url: string, onMessage: (event: MessageEvent<any>) => void) => {
  const { user } = useUser();
  const { userId } = user;
  const navigate = useNavigate();
  const socket = useMemo(() => new WebSocket(url), []);

  useEffect(() => {
    socket.addEventListener("open", onSocketOpen);
    socket.addEventListener("close", onSocketClose);
    socket.addEventListener("message", onMessage);
    socket.addEventListener("error", onError);

    return () => {
      socket.removeEventListener("open", onSocketOpen);
      socket.removeEventListener("close", onSocketClose);
      socket.removeEventListener("message", onMessage);
      socket.removeEventListener("error", onError);
      socket.close();
    };
  }, [socket]);

  const onSocketOpen = () => {
    sendMessage("AUTHENTICATE_USER", {
      userId,
      token: sessionStorage.getItem("token"),
    });
  };

  const onSocketClose = () => {
    toast.error("ERROR", {
      description: "Connection closed!",
    });
    navigate("/app/home");
  };

  const onError = () => {
    toast.error("ERROR", {
      description: "Something went wrong with the socket connection!",
    });
  };

  const sendMessage = useCallback((type: ClientMessageType, payload: Record<string, any>) => {
    try {
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      const message = ClientMessageSchema.parse({ type, payload });
      socket.send(JSON.stringify(message));
    } catch (error) {
      toast.error("Error", { description: (error as any).message });
    }
  }, []);

  return { sendMessage };
};

export default useWebSocket;
