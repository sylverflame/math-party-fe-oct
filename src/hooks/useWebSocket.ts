import { useCallback, useEffect, useMemo, useState } from "react";
import z from "zod";

// Web scoket message schemas
const ClientMessageTypeSchema = z.enum(["AUTHENTICATE_USER", "CREATE_GAME", "JOIN_ROOM", "LEAVE_ROOM", "START_GAME", "SOLUTION_SUBMIT"]);
export const ClientMessageSchema = z.object({
  type: ClientMessageTypeSchema,
  payload: z.any(),
});

export type ClientMessageType = z.infer<typeof ClientMessageTypeSchema>;

const useWebSocket = (url: string, onMessage: (event: MessageEvent<any>) => void, onSocketOpen: () => void, onSocketClose: () => void) => {
  const socket = useMemo(() => new WebSocket(url), []);

  useEffect(() => {
    socket.addEventListener("open", onSocketOpen);
    socket.addEventListener("close", onSocketClose);
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("open", onSocketOpen);
      socket.removeEventListener("close", onSocketClose);
      socket.removeEventListener("message", onMessage);
      socket.close();
    };
  }, [socket]);

  const sendMessage = useCallback((type: ClientMessageType, payload: Record<string, any>) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const message = ClientMessageSchema.parse({ type, payload });
    socket.send(JSON.stringify(message));
  }, []);

  return { sendMessage };
};

export default useWebSocket;
