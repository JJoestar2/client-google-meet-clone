"use client";

import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { socket } from "../app/socket";

type RoomSocketContextType = {
  isConnected: boolean;
  isJoinedRoom: boolean;
};

type Props = {
  roomId?: string;
}

const RoomSocketContext = createContext<RoomSocketContextType | null>(null);

export const RoomSocketProvider: FC<PropsWithChildren<Props>> = ({
  roomId,
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);

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

  useEffect(() => {
    if (isConnected && !isJoinedRoom) {
      socket.emit('joinRoom', { roomId }, () => {
        setIsJoinedRoom(true);
      })
    }
  }, [roomId, isConnected, isJoinedRoom]);

  return (
    <RoomSocketContext.Provider value={{ isConnected, isJoinedRoom }}>
      {children}
    </RoomSocketContext.Provider>
  )
};

export const useRoomContext = (): RoomSocketContextType => {
  const context = useContext(RoomSocketContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomSocketProvider");
  }

  return context;
}
