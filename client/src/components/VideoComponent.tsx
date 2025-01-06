const VideoComponent = () => {
  const videoUrl = "idk bruh"

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
