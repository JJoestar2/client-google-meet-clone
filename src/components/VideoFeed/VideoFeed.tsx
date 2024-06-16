import { FC } from "react";

interface Props {
    mediaStream: MediaStream;
    isMuted?: boolean;
  }

const VideoFeed: FC<Props> = ({mediaStream, isMuted }) => {
    return (
        <video
            ref={(ref) => {
                ref && (ref.srcObject = mediaStream)}
            }
            autoPlay
            muted={isMuted}
        />
    )
}

export default VideoFeed;