import { useEffect, useState } from "react";
import { generateTalk } from "@/services/generateTalk";

interface VideoComponentProps {
  source_url: string;
  input: string;
}

const VideoComponent = ({ source_url, input }: VideoComponentProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await generateTalk(source_url, input);
      setVideoUrl(url);
    };

    fetchVideo();
  }, [source_url, input]);

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
