import { videoWebSocket } from "@/services/talk/videoWS";

const VideoComponent = () => {
  const videoUrl = videoWebSocket("ws://localhost:8000");

  return (
    <div>
      {videoUrl ? (
        <video src={videoUrl} controls />
      ) : (
        <p>Waiting for video...</p>
      )}
    </div>
  );
};

export default VideoComponent;
