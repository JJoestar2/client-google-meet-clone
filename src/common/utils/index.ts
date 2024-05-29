import { v4 as uuidv4 } from "uuid";
import { KeyValue, RoomId } from "../types";

const toggle = (trackKind: "audio" | "video") => {
  return (stream: MediaStream) => {
    const track = stream
      .getTracks()
      .find((track: MediaStreamTrack) => track.kind == trackKind);

    if (track) track.enabled = !track.enabled;
  };
};

const generateCustomId = (
  alphabet: string = "abcdefghijklmnopqrstuvxyz"
): string => {
  const alphabetLength = alphabet.length;
  const uuid = uuidv4().replace(/-/g, ""); // remove - from uuid
  let customId = "";
  let uuidIndex = 0;

  const pattern = "eee-eee-eee";

  for (const char of pattern) {
    if (char === "e") {
      const hexPair = uuid.substr(uuidIndex * 2, 2);
      const index = parseInt(hexPair, 16) % alphabetLength;
      customId += alphabet[index];
      uuidIndex++;
    } else {
      customId += char;
    }
  }

  return customId;
};

export const formatTimeHHMM = (milliseconds: number) => {
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const append = <T>(appendant: any) => {
  return (target: KeyValue<T> | T[]) => {
    if (target instanceof Array) return target.concat(appendant);

    return { ...target, ...appendant };
  };
};

export const toggleVideo = toggle("video");
export const toggleAudio = toggle("audio");

export const createRoomId = (): RoomId => generateCustomId();

export const createHost = (roomId: RoomId): void => {
  window.localStorage.setItem(roomId, "*");
};

export const error = (message: string) => {
  return (error: any) => {
    console.error(message);
    console.error(error);
  };
};
