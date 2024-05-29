export type Nullable<T> = T | null;

export type KeyValue<T> = Record<string, T>;

export type RoomId = string;

export type AppendVideoStream = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => (stream: MediaStream) => void;

export type PeerId = string;

export type Status = "loading" | "idle" | "rejected" | "success";

export type Kind = "audio" | "video" | "users" | "screen" | "fullscreen";
