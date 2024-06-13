"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SimplePeer, { Instance as SimplePeerInstance } from "simple-peer";

import useMediaStream from "./useMediaStream";

import { socket } from "@/socket";
import { error } from "@/common/utils";
import { Nullable, PeerId } from "@/common/types";

/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */
const usePeer = (stream: MediaStream) => {
  const room = useRouter().query.roomId;
  const user = {}; // todo get authed user from store

  const { muted, visible } = useMediaStream(stream);

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<SimplePeerInstance>>(null);
  const [myId, setMyId] = useState<PeerId>("");

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        setPeer(peer);
        setIsLoading(false);

        peer.on("connect", () => {
          const id = uuidv4();
          console.log("your id: ", id);
          setMyId(id);
          socket.emit("room:join", {
            room,
            user: {
              id,
              muted,
              visible,
              name: user?.name || "",
              picture: user?.picture || "",
            },
          });
        });

        peer.on("error", error("Failed to setup peer connection"));
      } catch (e) {
        error("Unable to create peer")(e);
      }
    })();
  }, []);

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;

function useUser() {
  throw new Error("Function not implemented.");
}
