"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket } from "socket.io-client";

import { socket } from "../socket";

type SocketContextType = {
  isConnected: boolean;
  socket: Socket;
};

type Props = {};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = () => setIsConnected(true);

    const disconnect = () => setIsConnected(false);

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useRoomContext = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useRoomContext must be used within a RoomSocketProvider");
  }

  return context;
};
