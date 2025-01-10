import "@/styles/videocomp.css";

const VideoComponent = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="flex justify-center items-center">
      <video src={videoUrl} controls className="mq-video w-[350px] rounded-[10px] shadow-lg"/>
    </div>
  );
};

export default VideoComponent;
