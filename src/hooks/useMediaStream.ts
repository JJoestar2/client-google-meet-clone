"use client";

import { useEffect, useState } from "react";
import { Status } from "@/common/types";
import { error as errorLogger } from "@/common/utils";

/**
 * @param    {MediaStream | null} stream
 *           stream of media content
 *
 * @returns  object with stream, muted, visible boolean states, toggle functor,
 *           toggleAudio, toggleVideo, isLoading, isError and isSuccess boolean statuses
 *
 * @example
 *  const ExampleComponent = () => {
 *      const { stream, muted, visible, isLoading, toggleAudio, toggleVideo } = useMediaStream()
 *
 *      if (isLoading) return <span>Getting your stream ready...</span>
 *
 *      return (
 *          <>
 *              <video
 *                  srcObject={stream}
 *                  autoPlay
 *                  muted={true} // so no echo on your side
 *              />
 *              <ControlPanel
 *                  muted={muted}
 *                  visible={visible}
 *                  toggleAudio={toggleAudio}
 *                  toggleVideo={toggleVideo}
 *              />
 *          </>
 *      )
 * }
 **/

const useMediaStream = (stream: MediaStream | null = null) => {
  const [state, setState] = useState<MediaStream | null>(stream);
  const [status, setStatus] = useState<Status>("loading");

  const [music, setMusic] = useState(false);
  const [video, setVideo] = useState(true);

  useEffect(() => {
    if (stream) {
      setStatus("idle");

      const [audio, video] = stream.getTracks();
      setMusic(!audio.enabled);
      setVideo(video.enabled);
    } else {
      (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });

          setState(stream);
          setStatus("success");
        } catch (error) {
          setStatus("rejected");
          errorLogger("Access denied for audio and video stream")(error);
        }
      })();
    }
  }, []);

  const toggle = (kind: "audio" | "video") => {
    return (s = state) => {
      if (!s) throw new Error("Failed. Could not find stream");

      const track = s.getTracks().find((track) => track.kind == kind);

      if (!track)
        throw new Error(`Failed. Could not find ${kind} track in given stream`);

      if (track.enabled) {
        track.enabled = false;
        track.kind == "audio" ? setMusic(true) : setVideo(false);
      } else {
        track.enabled = true;
        track.kind == "audio" ? setMusic(false) : setVideo(true);
      }
    };
  };

  const toggleVideo = async (cb?: unknown) => {
    if (!state) throw new Error("There is no a video stream to toggle");

    const videoTrack = state.getVideoTracks()[0];

    if (videoTrack.readyState === "live") {
      videoTrack.enabled = false;
      videoTrack.stop(); // * turns off web cam light indicator
      setVideo(false);
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];

      if (typeof cb === "function") {
        cb(newVideoTrack);
      }

      state.removeTrack(videoTrack);

      const [screenTrack] = state.getVideoTracks();

      if (screenTrack) {
        state.removeTrack(screenTrack);
        state.addTrack(newVideoTrack);
        state.addTrack(screenTrack);
      } else state.addTrack(newVideoTrack);

      setState(state);
      setVideo(true);
    }
  };

  return {
    stream: state,
    muted: music,
    visible: video,
    toggle,
    toggleAudio: toggle("audio"),
    toggleVideo,
    isLoading: status == "loading",
    isError: status == "rejected",
    isSuccess: status == "success" || status == "idle",
  };
};

export default useMediaStream;
