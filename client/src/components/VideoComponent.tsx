const VideoComponent = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div>
      <video src={videoUrl} controls/>
    </div>
  );
};

export default VideoComponent;
