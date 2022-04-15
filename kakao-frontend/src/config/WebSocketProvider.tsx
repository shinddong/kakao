import React, { createContext, useRef } from "react";
import websocket, { Socket } from "socket.io-client";

const WebSocketContext = createContext<any>(null);

const initialize = ({ children }: { children: React.ReactNode }) => {
  //eslint-disable-next-lie react-hooks/rules-of-hooks
  const ref = useRef<Socket | null>(null);
  const ws = websocket("ws://localhost:5000/chats");

  if (!ref.current) {
    ws.on("connect", () => {
      console.log("connected");
    });

    ws.on("error", (e) => {
      console.log(e);
    });
    ws.on("disconnect", () => {
      console.log("disconnected");
    });
    ws.connect();
    ref.current = ws;
  }
  return (
    <WebSocketContext.Provider value={ref}>
      {children}
    </WebSocketContext.Provider>
  );
};
export { WebSocketContext };
export default initialize;
